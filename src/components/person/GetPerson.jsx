import React, { useEffect, useState } from 'react'
import customAxios from '../../utils/http';
import Loader from '../../utils/Loader';
import { Link, useNavigate } from 'react-router-dom';
import handleCatchError from '../../utils/handleCatchError';
import PersonTableRow from './PersonTableRow';
import PersonCard from './PersonCard';

function GetPerson() {
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [isSeeAll] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showArchive, setShowArchive] = useState("");
  const [showInactive, setShowInActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [filterColumn, setFilterColumn] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");

  // Toggle Archive data view
  const handleArchive = () => {
    setShowInActive(false);
    showArchive === "" ? setShowArchive("/true") : setShowArchive("");
  };

  // Toggle Inactive data view
  const handleInactive = ()=>{
    setShowArchive("");
    setShowInActive(!showInactive);
  }

  // Fetch data from the API
  const fetchPerson = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios.get(`/Person/GetList${showArchive}`);
      const dt = await response.data;

      if(!showArchive){
        let onlyInactiveData = dt?.filter(data => data?.LoginStatus !== true);
        if(showInactive){
          setDatas(onlyInactiveData);
          setFilteredData(onlyInactiveData);
          return;
        }else{
          let onlyActiveData = dt?.filter(data => data?.LoginStatus == true);
          setDatas(onlyActiveData);
          setFilteredData(onlyActiveData);
        }
      }
      else{
        let onlyArchivedData = dt?.filter(data => data?.EndDateAd !== null);
        setDatas(onlyArchivedData);
        setFilteredData(onlyArchivedData);
      }
      console.table(dt)
    } catch (error) {
      handleCatchError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };
  // Callback function for child components
  const handleDataChange = () => {
    fetchPerson(); // Refetch data when a change occurs
  };

  useEffect(() => {
    document.title = "Person List";
    fetchPerson();
  }, [showArchive,showInactive]);

  //reset all the filter and search columns when blocked and unbocked data toggled
  useEffect(() => {
    setFilterColumn('default');
    setSortOrder('default');
    setSearchQuery('');
    setDatas(datas);
  }, [showArchive]);
  
  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log(searchQuery)
    const filtered = datas.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Handle column filter and sort
  const handleFilterAndSort = () => {
    let updatedData = [...datas];

    if(sortOrder == "default" && filterColumn == "default"){
      return ;
    }

    if (filterColumn) {
      updatedData = datas.filter((item) =>
        item[filterColumn]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder && filterColumn) {
      updatedData.sort((a, b) => {
        const valueA = a[filterColumn]?.toString().toLowerCase();
        const valueB = b[filterColumn]?.toString().toLowerCase();

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(updatedData);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterAndSort();
  }, [filterColumn, sortOrder, searchQuery,datas]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-center min-[750px]:justify-end gap-8">
            <Link to={`/Person/insert`}>
              <button className="bg-green-700 text-white p-2 gap-1 sm:p-4 rounded-xl  flex sm:gap-2 items-center">
                <i className="bx bx-plus-medical"></i>Insert
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-xl w-4 h-4 cursor-pointer"
                onChange={handleInactive}
                onClick={handleFilterAndSort}
                checked={showInactive}
              />
              <p className='text-[13px] sm:text-base'>Inactive</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-xl w-4 h-4 cursor-pointer"
                onChange={handleArchive}
                onClick={handleFilterAndSort}
                checked={showArchive}
              />
              <p className='text-[13px] sm:text-base'>Show Archived</p>
            </div>
          </div>
          
          <div className="text-3xl text-center">{!showArchive && !showInactive? `Active `:`${!showArchive? `Inactive `:`Archived `}`}Person List </div>
          <div className="flex justify-between items-center mt-4 mb-2 gap-4 flex-wrap w-full">
            <input
              type="text"
              className="border p-2 rounded w-screen min-[440px]:w-auto"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <select
              className="border p-2 rounded cursor-pointer"
              onChange={(e) => setFilterColumn(e.target.value)}
              value={filterColumn}
            >
              <option value="default" disabled >--Filter by Column--</option>
              <option value="FullName">Full Name</option>
              <option value="Sex">Sex</option>
              <option value="FatherName">Father Name</option>
            </select>
            <select
              className="border p-2 rounded cursor-pointer"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="default" disabled>--Sort Order--</option>
              <option value="asc" disabled={filterColumn === "default"} className={filterColumn === "default"? "text-red-400":""}>Ascending</option>
              <option value="desc" disabled={filterColumn === "default"} className={filterColumn === "default"? "text-red-400":""}>Descending</option>
            </select>
          </div>
          {/* Table view for larger display FROM 750px */}
          <table className="min-w-full divide-y border-spacing-x-4 hidden min-[750px]:table min-[750px]:table-fixed  divide-gray-200 ">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sex</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 overflow">
              {
                currentRows.length === 0 ? (
                  <tr>
                    <td className=" text-3xl bg-red-200 py-20 text-center rounded-3xl" colSpan={6}>
                      No data available
                    </td>
                  </tr>
                ) : (
                currentRows.map((data, index) => {
                    return (
                      <PersonTableRow 
                      key={data.PersonId} 
                      index={indexOfFirstRow + index} 
                      data={data}
                      handleDataChange ={handleDataChange}
                      />
                    )
                  })
                )
              }

            </tbody>
          </table>

          {/* Card view for mobile */}
          <div className="visible min-[750px]:hidden flex flex-col">
            {
              currentRows.length === 0 ? (
                <div>
                  <p className="text-3xl my-5 bg-red-200 py-20 text-center rounded-3xl">
                    No data available
                  </p>
                </div>
              ) : (
                currentRows.map((data, index) => {
                  return (
                    <PersonCard
                      key={data.PersonId}
                      index={indexOfFirstRow + index}
                      data={data}
                      handleDataChange ={handleDataChange}
                      isSeeAll={isSeeAll} />
                  )
                })
              )
            }
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800 "
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`p-2 border rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "hover:bg-blue-800 hover:text-white"
                    }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800"
            >
              Next
            </button>
          </div>
        </div >
      )
      }
    </>
  );
}

export default GetPerson
