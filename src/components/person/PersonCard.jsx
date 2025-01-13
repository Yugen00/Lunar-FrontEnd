import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";

import ArchiveModal from "./ArchiveModal";
import UpdatePerson from "./UpdatePerson";
import SeeAllPerson from "./SeeAllPerson";

function PersonCard({ index, data, setOriginalData }) {
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
  const archiveHandle = async () => {
    try {
      setIsBeingProcessed(true);
      const response = await customAxios.delete(`/person/Archive/${data.PersonId}`);
      if (response.status == 200) {
        // Remove the deleted data from originalData
        setOriginalData((prev) =>
          prev.filter((item) => item.PersonId !== data.PersonId)
        );

        handleModal();
        showToast("Data Archived Successfully", "success");
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
      const response = await customAxios.put('/person/update', formData);
      if (response.status == 200) {
        const updatedData = await response.data;

        // Update the originalData with the updated entry
        setOriginalData((prev) =>
          prev.map((item) =>
            item.PersonId === updatedData.PersonId ? updatedData : item
          )
        );

        handleEditModal();
        showToast("Person Updated Successfully", "success");
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
      {/* Person Card */}
      <div className={`p-6 m-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>

        <h3 className="text-2xl font-semibold text-gray-800">
          {(`${index + 1}.   ${data.FullName}`)}
        </h3>

        <div>
          <p className=" text-gray-600 mt-2 text-ellipsis whitespace-nowrap">
            <b>Father Name:</b> {data?.FatherName?.length > 10 ? (`${data?.FatherName.slice(0, 10)} ...`) : (data?.FatherName || "None")}
          </p>
          <p className=" text-gray-600 mt-2 text-ellipsis whitespace-nowrap">
            <b>Email:</b> {data?.EmailAddress?.length > 10 ? (`${data?.EmailAddress.slice(0, 10)} ...`) : (data?.EmailAddress || "None")}
          </p>
        </div>


        <div className="mt-4">
          <span
            className={`inline-block px-4 py-4 md:py-1 rounded-full text-white text-sm font-medium ${data.LoginStatus ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {data.LoginStatus ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-start gap-1">
          <button
            title="Edit"
            onClick={handleEditModal}
            className="px-2 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
            <i className='bx bx-edit text-2xl' ></i>
          </button>

          {
            !data?.EndDateAd && (
              <button
                title="Archieve"
                onClick={handleModal}
                className={`px-2 py-1 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-archive-in text-2xl' ></i>
              </button>)
          }
          {/* See all details */}
          <button
            title="See Details"
            onClick={handleSeeAllModal} // Use the updated prop name here
            className={`px-2 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out`}>
            <i className='bx bx-info-circle text-2xl' ></i>
          </button>
        </div>

      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ArchiveModal handleModal={handleModal} deleteHandle={archiveHandle} name={data?.FullName} isBeingProcessed={isBeingProcessed} />
      )}

      {isEditModalOpen &&
        <UpdatePerson handleEditModal={handleEditModal} data={data} updateHandle={updateHandle} isBeingProcessed={isBeingProcessed} />
      }

      {isSeeAllModalOpen &&
        <SeeAllPerson index={index} handleSeeAllModal={handleSeeAllModal} data={data} />
      }


    </>
  );
}

export default PersonCard;
