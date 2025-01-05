import React, { useEffect, useState } from 'react'
import customAxios from '../../utils/http';
import Loader from '../../utils/Loader';
import { Link, useNavigate } from 'react-router-dom';
import handleCatchError from '../../utils/handleCatchError';
import DocumentGroupTableRow from './DocumentGroupTableRow';
import DocumentGroupCard from './DocumentGroupCard';

function GetDocumentGroup() {
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [isSeeAll] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBlocked, setShowBlocked] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [filterColumn, setFilterColumn] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");

  // Toggle blocked data view
  const handleBlockList = () => {
    showBlocked === "" ? setShowBlocked("/true") : setShowBlocked("");
  };

  // Fetch data from the API
  const fetchDocumentGroup = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios.get(`/DocumentGroup/GetList${showBlocked}`);
      const dt = await response.data;
      const buildedData= buildHierarchy(dt);
      setDatas(buildedData);
      setFilteredData(buildedData);
    } catch (error) {
      handleCatchError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };
  // Callback function for child components
  const handleDataChange = () => {
    fetchDocumentGroup(); // Refetch data when a change occurs
  };

  useEffect(() => {
    document.title = "Certificate Type List";
    fetchDocumentGroup();
  }, [showBlocked]);

  //reset all the filter and search columns when blocked and unbocked data toggled
  useEffect(() => {
    setFilterColumn('default');
    setSortOrder('default');
    setSearchQuery('');
  }, [showBlocked]);
  
  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const searchInItem = (item) => {
      // Check the current item's properties
      const matches = Object.values(item || {} ).some((value) =>{
        return value?.toString().toLowerCase().includes(query)}
      );
      
      // Check recursively in the children array, if present
      if (item.children && Array.isArray(item.children)) {
        const childMatches = item.children.some((child) => searchInItem(child));
        return matches || childMatches;
      }
  
      return matches;
    };
  
    const filtered = datas.filter(searchInItem);
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Handle column filter and sort
  const handleFilterAndSort = () => {
    let updatedData = [...datas];

    if(sortOrder == "default" && filterColumn == "default"){
      return 1;
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

  const buildHierarchy = (data) => {
    // Create a map of groups
    const groupMap = {};
    data.forEach(item => {
      groupMap[item.GroupName] = { ...item, children: [] };
    });
  
    // Build the hierarchy
    const hierarchy = [];
    data.forEach(item => {
      if (item.ParentName) {
        // If the item has a parent, add it to the parent's children
        groupMap[item.ParentName]?.children.push(groupMap[item.GroupName]);
      } else {
        // If no parent, it's a top-level group
        hierarchy.push(groupMap[item.GroupName]);
      }
    });
  
    return hierarchy;
  };
  
  useEffect(() => {
    handleFilterAndSort();
  }, [filterColumn, sortOrder,searchQuery]);

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
            <Link to={`/DocumentGroup/insert`}>
              <button className="bg-green-700 text-white p-4 rounded-xl  flex gap-2 items-center">
                <i className="bx bx-plus-medical"></i> New Doc
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-xl w-4 h-4 cursor-pointer"
                onChange={handleBlockList}
                onClick={handleFilterAndSort}
                checked={showBlocked}
              />
              <p>Show Blocked</p>
            </div>
          </div>
          
          <div className="text-3xl text-center">All Document Group</div>
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
              <option value="GroupName">Group Name</option> 
              <option value="GroupDescription">Group Description</option>
              <option value="OfficeName">Office Name</option>
              <option value="ParentName">Parent Name</option>
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
          <table className="text-sm w-full divide-y border-spacing-x-4 hidden min-[750px]:table min-[750px]:table-auto divide-gray-200">
            <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Description</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Office Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200 overflow">
              {
                currentRows.length === 0 ? (
                  <tr>
                    <td className=" text-3xl bg-red-200 py-20 text-center rounded-3xl" colSpan={7}>
                      No data available
                    </td>
                  </tr>
                ) : (
                currentRows.map((data, index) => {
                    return (
                      <DocumentGroupTableRow 
                      key={data.GroupId} 
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
                    <DocumentGroupCard
                      key={data.GroupId}
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
export default GetDocumentGroup
