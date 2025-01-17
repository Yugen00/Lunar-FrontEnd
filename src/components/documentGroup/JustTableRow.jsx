import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import DeleteItem from '../DeleteItem';
import UpdateDocumentGroup from './UpdateDocumentGroup';
import SeeAllDocumentGroup from './SeeAllDocumentGroup';
import InsertDocumentGroup from './InsertDocumentGroup';

function JustTableRow({ data, setOriginalData, toggleChildren, index, childIndex, level }) {
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
        const updatedData = { ...data, children: [] };

        setOriginalData((prev) => {
          const updateParent = (data) => {
            return data.map((item) => {
              if (item.GroupId === formData.GroupId) {
                // It's the item we're updating, so we replace it with the updated data
                return { ...updatedData, children: item.children || [] };
              }

              // If this item has children, we need to check those as well
              if (item.children && item.children.length > 0) {
                return { ...item, children: updateParent(item.children) }; // Recursively update children
              }

              return item;
            });
          };

          if (formData.ParentId && formData.ParentName) {
            // It's a child; we need to find its parent and update/add the child to the parent's children
            return prev.map((item) => {
              if (item.GroupId === formData.ParentId) {
                // Parent found, update or add the child
                const updatedChildren = updateParent(item.children || []);
                const isChildPresent = updatedChildren.some(
                  (child) => child.GroupId === formData.GroupId
                );

                if (!isChildPresent) {
                  updatedChildren.push(updatedData); // Add the new child if it doesn't exist
                }

                return { ...item, children: updatedChildren };
              }
              return item;
            });
          } else {
            // It's a parent, so we update the parent and preserve any existing children
            return updateParent(prev); // Recursively update if there are any nested children
          }
        });


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
      <tr className={`${backgroundColor} text-base`}>
        <td className={`px-3 py-2 whitespace-nowrap  pl-[${level * 50}px]`}>
          {currentIndex} {/* Render hierarchical index */}
        </td>
        <td className="px-3 py-2 text-ellipsis whitespace-nowrap">
          {data?.GroupName?.length > 10 ? (`${data.GroupName.slice(0, 10)} ...`) : (data.GroupName)}
        </td>
        <td className="px-3 py-2 text-ellipsis whitespace-nowrap">
          {data?.GroupDescription?.length > 20 ? (`${data.GroupDescription.slice(0, 20)} ...`) : (data.GroupDescription)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          {data?.ParentName?.length > 15 ? (`${data.ParentName.slice(0, 15)} ...`) : (data.ParentName || "Self")}
        </td>
        <td className="px-3 py-2 whitespace-nowrap text-center">
          <span className={`px-6 py-4 w-fit inline-flex justify-center text-base leading-5 font-semibold rounded-full ${data.IsActive ? 'bg-green-100' : 'bg-red-200'} text-black`}>{data.IsActive ? "Active" : "Blocked"}</span>
        </td>
        <td className={`px-3 py-2 whitespace-nowrap  text-center`}>
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
                className={`ml-2 px-2 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-block text-2xl' ></i>
              </button>)
          }

          {
            data.IsActive && (
              <button
                onClick={handleSubDocModal}
                title="Add Sub-Doc"
                className={`ml-2 px-2 py-1 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-plus-medical text-2xl'></i>
              </button>
            )
          }
          {/* See all details */}
          <button
            onClick={handleSeeAllModal}
            title="See Details"
            className={`ml-2 px-2 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out`}>
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
        </td>
      </tr>

      <tr>
        {/* Handling delete modal */}
        {isModalOpen &&
          <td>
            <DeleteItem isModalOpen={isModalOpen} handleModal={handleModal} deleteHandle={deleteHandle} name={data?.GroupName} isBeingProcessed={isBeingProcessed} />
          </td>}

        {isEditModalOpen && <td>
          <UpdateDocumentGroup handleEditModal={handleEditModal} data={data} updateHandle={updateHandle} isBeingProcessed={isBeingProcessed} />
        </td>}

        {isSubDocModalOpen && <td>
          <InsertDocumentGroup setOriginalData={setOriginalData} setInsertModalOpen={setSubDocModalOpen} ParentId={data?.GroupId} ParentName={data?.GroupName} />
        </td>}

        {isSeeAllModalOpen && <td>
          <SeeAllDocumentGroup currentIndex={currentIndex} handleSeeAllModal={handleSeeAllModal} data={data} />
        </td>}
      </tr>
    </>
  );
}

export default JustTableRow;
