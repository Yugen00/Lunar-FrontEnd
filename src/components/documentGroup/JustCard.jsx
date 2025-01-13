import React, { useEffect, useState } from 'react'
import DeleteItem from '../DeleteItem'
import { Link, useNavigate } from 'react-router-dom';
import customAxios from '../../utils/http';
import handleCatchError from '../../utils/handleCatchError';
import { showToast } from '../../utils/ReactToast';
import InsertDocumentGroup from './InsertDocumentGroup';
import UpdateDocumentGroup from './UpdateDocumentGroup';
import SeeAllDocumentGroup from './SeeAllDocumentGroup';

function JustCard({ data, setOriginalData, toggleChildren, index, childIndex, level }) {
  const navigate = useNavigate();
  const [isBeingProcessed, setIsBeingProcessed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSubDocModalOpen, setSubDocModalOpen] = useState(false);
  const [isSeeAllModalOpen, setSeeAllModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  //Hande modal boxes
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  }

  const handleSubDocModal = () => {
    setSubDocModalOpen(!isSubDocModalOpen);
  }

  const handleSeeAllModal = () => {
    setSeeAllModalOpen(!isSeeAllModalOpen);
  }

  //handling the api request towards the endpoint
  const deleteHandle = async () => {
    try {
      setIsBeingProcessed(true);
      const response = await customAxios.delete(`/documentGroup/Block/${data.GroupId}`);
      if (response.status == 200) {
        // Remove the deleted GroupId (parent or child) from the originalData
        const removeGroupId = (items, groupIdToDelete) => {
          return items.filter((item) => {
            if (item.GroupId === groupIdToDelete) {
              // Remove the item if it matches the GroupId
              return false;
            }
            if (item.children && item.children.length > 0) {
              // Recursively process children
              item.children = removeGroupId(item.children, groupIdToDelete);
            }
            return true; // Keep the item if it doesn't match
          });
        };

        // Update the state with filtered data
        setOriginalData((prev) => removeGroupId(prev, data.GroupId));


        handleModal();
        showToast("Data Blocked Successfully", "success");
      }

    } catch (error) {
      handleCatchError(error, navigate)
    }
    finally {
      setIsBeingProcessed(false);
    }
  }

  const updateHandle = async (formData) => {
    try {
      setIsBeingProcessed(true);
      const response = await customAxios.put('/documentGroup/update', formData);
      if (response.status == 200) {
        const data = await response.data;
        const updatedData = { ...data, children:[] }; // Adding children to the response data

        // Update the originalData with the updated entry
        setOriginalData((prev) =>
          prev.map((item) =>
            item.GroupId === updatedData.GroupId ? updatedData : item
          )
        );

        handleEditModal();
        showToast("Document Group Updated Successfully", "success");
      }
    } catch (error) {
      handleCatchError(error, navigate);
    }
    finally {
      setIsBeingProcessed(false);
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

  useEffect(() => {
    const idx = getHierarchicalIndex(index, childIndex);
    setCurrentIndex(idx);
  }, [])

  // List of colors for each level
  const levelColors = ['bg-white', 'bg-cyan-100', 'bg-yellow-100', 'bg-green-100'];

  // Get the background color based on the level
  const getBackgroundColor = (level) => {
    return levelColors[level % levelColors.length]; // Loop through the list if there are more levels than colors
  };

  // Determine the background color depending on whether the row is a child or not
  const backgroundColor = childIndex ? getBackgroundColor(level) : '';

  return (
    <>
      {/* Document Group Card */}
      <div
        className={`p-6 m-4 ${backgroundColor} border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}
        style={{ marginLeft: `${level * 10}px` }}
      >
        <h3 className="text-2xl font-semibold text-gray-800">
          {(`${currentIndex}   ${data.GroupName}`)}
        </h3>
        <p className=" text-gray-600 mt-2 text-ellipsis">
          <b>Description:</b> {data?.GroupDescription?.length > 15 ? (`${data.GroupDescription.slice(0, 15)} ...`) : (data.GroupDescription)}
        </p>
        <p className="text-gray-600 mt-2"><b>Parent Name:</b> {data.ParentName || "Self"}</p>

        <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {data.IsActive ? "Active" : "Blocked"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-start gap-1">
          {
            data.IsActive && (
              <button
                title="Edit"
                onClick={handleEditModal}
                className="px-2 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                <i className='bx bx-edit text-2xl' ></i>
              </button>)
          }
          {
            data.IsActive && data?.children?.length === 0 && (
              <button
                title="Block"
                onClick={handleModal}
                className={`px-2 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-block text-2xl' ></i>
              </button>)
          }

          {
            data.IsActive && (
              <button
                onClick={handleSubDocModal}
                title="Add Sub-Doc"
                className={`px-2 py-1 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-plus-medical text-2xl'></i>
              </button>
            )
          }
          {/* See all details */}
          <button
            onClick={handleSeeAllModal}
            title="See Details"
            className={`px-2 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out`}>
            <i className='bx bx-info-circle text-2xl' ></i>
          </button>

          {
            data?.children?.length > 0 && (
              <span className='ml-1 px-2 py-1 font-medium'>
                <i
                  title="View Children"
                  className=' bx bxs-down-arrow cursor-pointer text-base text-blue-800 hover:text-blue-600'
                  onClick={toggleChildren}></i>
              </span>
            )
          }
        </div>

      </div>

      {/* Handaling delete modal */}
      {isModalOpen &&
        <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.GroupName} isBeingProcessed={isBeingProcessed} />
      }
      {isEditModalOpen &&
        <UpdateDocumentGroup handleEditModal={handleEditModal} data={data} updateHandle={updateHandle} isBeingProcessed={isBeingProcessed} />
      }

      {isSubDocModalOpen &&
        <InsertDocumentGroup setOriginalData={setOriginalData} setInsertModalOpen={setSubDocModalOpen} ParentId={data?.GroupId} ParentName={data?.GroupName} />
      }

      {isSeeAllModalOpen &&
        <SeeAllDocumentGroup currentIndex={currentIndex} handleSeeAllModal={handleSeeAllModal} data={data} />
      }
    </>
  )
}

export default JustCard
