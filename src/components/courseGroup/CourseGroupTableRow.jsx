import React, { useState } from 'react'
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import DeleteItem from '../DeleteItem';
import UpdateCourseGroup from './UpdateCourseGroup';
import { useNavigate } from 'react-router-dom';
import SeeAllCourseGroup from './SeeAllCourseGroup';

function CourseGroupTableRow({ index, data, setOriginalData }) {
  const navigate = useNavigate();
  const [isBeingProcessed, setIsBeingProcessed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSeeAllModalOpen, setSeeAllModalOpen] = useState(false);

  //Hande modal boxes
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  }

  const handleSeeAllModal = () => {
    setSeeAllModalOpen(!isSeeAllModalOpen);
  }

  //handling the api request towards the endpoint
  const deleteHandle = async () => {
    try {
      setIsBeingProcessed(true);
      const response = await customAxios.delete(`/courseGroup/Block/${data.GroupId}`);
      if (response.status == 200) {
        // Remove the deleted data from originalData
        setOriginalData((prev) =>
          prev.filter((item) => item.GroupId !== data.GroupId)
        );

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
      const response = await customAxios.put('/courseGroup/update', formData);
      if (response.status == 200) {
        const updatedData = await response.data;

        // Update the originalData with the updated entry
        setOriginalData((prev) =>
          prev.map((item) =>
            item.GroupId === updatedData.GroupId ? updatedData : item
          )
        );

        handleEditModal();
        showToast("Course Group Updated Successfully", "success");
      }
    } catch (error) {
      handleCatchError(error, navigate);
    }
    finally {
      setIsBeingProcessed(false);
    }
  };

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
        <td className="px-3 py-2 whitespace-nowrap">
          {data?.GroupName.length > 25 ? (`${data.GroupName.slice(0, 25)} ...`) : (data.GroupName)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap text-center">
          <span className={`px-6 py-4 w-fit inline-flex justify-center text-base leading-5 font-semibold rounded-full ${data.IsActive ? 'bg-green-100' : 'bg-red-200'} text-black`}>{data.IsActive ? "Active" : "Blocked"}</span>
        </td>
        <td className="px-3 py-2 whitespace-nowrap text-center">
          {
            data.IsActive && (
              <button
                title="Edit"
                onClick={handleEditModal}
                className="px-2 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                <i className='bx bx-edit text-2xl' ></i>
              </button>
            )
          }
          {
            data.IsActive && (
              <button
                title="Block"
                onClick={handleModal}
                className={`ml-2 px-2 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-block text-2xl' ></i>
              </button>)
          }
          {/* See all details */}
          <button
            title="See Details"
            onClick={handleSeeAllModal}
            className={`ml-2 px-2 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out`}>
            <i className='bx bx-info-circle text-2xl' ></i>
          </button>

        </td>
      </tr>
      <tr>
        {isModalOpen && <td>
          <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.GroupName} isBeingProcessed={isBeingProcessed}/>
        </td>}

        {isEditModalOpen && <td>
            <UpdateCourseGroup handleEditModal={handleEditModal} data={data} updateHandle={updateHandle} isBeingProcessed={isBeingProcessed} />
        </td>}

        {isSeeAllModalOpen && <td>
          <SeeAllCourseGroup index={index} handleSeeAllModal={handleSeeAllModal} data={data} />
        </td>}

      </tr>

    </>
  )
}

export default CourseGroupTableRow
