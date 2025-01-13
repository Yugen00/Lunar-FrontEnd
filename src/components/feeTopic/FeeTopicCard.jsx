import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import DeleteItem from "../DeleteItem";
import UpdateFeeTopic from './UpdateFeeTopic';
import SeeAllFeeTopic from './SeeAllFeeTopic';

function FeeTopicCard({ index, data, setOriginalData }) {
  const navigate = useNavigate();
  const [isBeingProcessed, setIsBeingProcessed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSeeAllModalOpen, setSeeAllModalOpen] = useState(false);

  // Handle modal boxes
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditModal = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  const handleSeeAllModal = () => {
    setSeeAllModalOpen(!isSeeAllModalOpen);
  };

  // Handling the API request towards the endpoint
  const deleteHandle = async () => {
    try {
      setIsBeingProcessed(true);
      const response = await customAxios.delete(`/feeTopic/Block/${data.TopicId}`);
      if (response.status == 200) {
        // Remove the deleted data from originalData
        setOriginalData((prev) =>
          prev.filter((item) => item.TopicId !== data.TopicId)
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
      const response = await customAxios.put('/feeTopic/update', formData);
      if (response.status == 200) {
        const updatedData = await response.data;

        // Update the originalData with the updated entry
        setOriginalData((prev) =>
          prev.map((item) =>
            item.TopicId === updatedData.TopicId ? updatedData : item
          )
        );

        handleEditModal();
        showToast("Fee Topic Updated Successfully", "success");
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
      {/* Fee Topic Card */}
      <div className={`p-6 m-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
        <h3 className="text-2xl font-semibold text-gray-800">
          {(`${index + 1}.   ${data?.TopicName?.length > 15 ? (`${data.TopicName.slice(0, 15)} ...`) : (data.TopicName)}`)}
        </h3>
       <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {data.IsActive ? "Active" : "Blocked"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-start gap-2">
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
                className={`px-2 py-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-block text-2xl' ></i>
              </button>)
          }
          {/* See all details */}
          <button
            title="See Details"
            onClick={handleSeeAllModal}
            className={`px-2 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out`}>
            <i className='bx bx-info-circle text-2xl' ></i>
          </button>
        </div>

      </div>

      {/* Handling delete modal */}
      {isModalOpen &&
        <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.TopicName} isBeingProcessed={isBeingProcessed} />
      }
      {isEditModalOpen &&
        <UpdateFeeTopic handleEditModal={handleEditModal} data={data} updateHandle={updateHandle} isBeingProcessed={isBeingProcessed} />
      }

      {isSeeAllModalOpen &&
        <SeeAllFeeTopic index={index} handleSeeAllModal={handleSeeAllModal} data={data}/>
      }
    </>
  );
}

export default FeeTopicCard;
