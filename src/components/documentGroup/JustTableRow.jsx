import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import DeleteItem from '../DeleteItem';

function JustTableRow({ data, handleDataChange, toggleChildren, index, childIndex,level}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(`/documentGroup/Block/${data.GroupId}`);
      if (response.status == 200) {
        setIsModalOpen(false);
        showToast("Data Blocked Successfully", "success");
        handleDataChange();
      }
    } catch (error) {
      handleCatchError(error, navigate);
    }
  };

  // Recursive index generation for each row
  const getHierarchicalIndex = (index, childIndex) => {
    let indexString = `${index + 1}`; // Main index
    childIndex.forEach((childIdx) => {
        indexString += `.${childIdx + 1}`; // Add child index at the current level
    });
    return indexString;
  };

  // List of colors for each level
  const levelColors = ['bg-white','bg-cyan-100','bg-yellow-100', 'bg-green-100'];

  // Get the background color based on the level
  const getBackgroundColor = (level) => {
    return levelColors[level % levelColors.length]; // Loop through the list if there are more levels than colors
  };

   // Determine the background color depending on whether the row is a child or not
   const backgroundColor = childIndex ? getBackgroundColor(level) : '';

  return (
    <>
      <tr className={backgroundColor}>
        <td className={`px-3 py-2 whitespace-nowrap  pl-[${level * 50}px]`}>
            {getHierarchicalIndex(index, childIndex)} {/* Render hierarchical index */}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">{data.GroupName}</td>
        <td className="px-3 py-2 text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/documentGroup/seeDetail/${data.GroupId}`)}
          title="Click to see full details">
          {data?.GroupDescription?.length > 15 ? (`${data.GroupDescription.slice(0, 15)} ...`) : (data.GroupDescription)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/documentGroup/seeDetail/${data.GroupId}`)}
          title="Click to see full details">
          {data?.OfficeName?.length > 15 ? (`${data.OfficeName.slice(0, 15)} ...`) : (data.OfficeName)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/documentGroup/seeDetail/${data.GroupId}`)}
          title="Click to see full details">
          {data?.ParentName?.length > 15 ? (`${data.ParentName.slice(0, 15)} ...`) : (data.ParentName || "Self")}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          <span className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-full ${data.IsActive ? 'bg-green-100' : 'bg-red-200'} text-black`}>
            {data.IsActive ? "Active" : "Blocked"}
          </span>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          {
            data.IsActive && (
              <Link to={`/documentGroup/update/${data.GroupId}`}>
                <button className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  Edit
                </button>
              </Link>
            )
          }
          {
            data.IsActive && data?.children?.length === 0 && (
              <button onClick={handleModal} className={`ml-2 px-4 z-10 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>
                Block
              </button>
            )
          }
          {
            data.IsActive && (
              <Link to={`/documentGroup/insert?id=${data?.GroupId}&name=${data?.GroupName}`}>
                <button className="ml-2 px-4 py-2 z-10 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  <i className='bx bx-plus-medical mr-1'></i> Sub-Doc
                </button>
              </Link>
            )
          }
          {
            data?.children?.length > 0 && (
              <i className='ml-1 bx bxs-down-arrow cursor-pointer text-blue-800' onClick={toggleChildren}></i>
            )
          }
        </td>
      </tr>

      <tr>
        {/* Handling delete modal */}
        {isModalOpen &&
          <td>
            <DeleteItem isModalOpen={isModalOpen} handleModal={handleModal} deleteHandle={deleteHandle} name={data?.GroupName} />
          </td>}
      </tr>
    </>
  );
}

export default JustTableRow;
