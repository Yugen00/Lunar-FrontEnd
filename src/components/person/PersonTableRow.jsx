import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import ArchiveModal from './ArchiveModal';
import UpdatePerson from './UpdatePerson';
import SeeAllPerson from './SeeAllPerson';

function PersonTableRow({ index, data, setOriginalData }) {
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
      <tr>
        <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>

        <td className="px-3 py-2 whitespace-nowrap">
          {data?.FullName?.length > 10 ? (`${data?.FullName.slice(0, 10)} ...`) : (data?.FullName)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">{data?.Sex}</td>
        <td className="px-3 py-2 whitespace-nowrap">
          {data?.EmailAddress?.length > 10 ? (`${data?.EmailAddress.slice(0, 10)} ...`) : (data?.EmailAddress || "None")}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          {data?.FatherName?.length > 10 ? (`${data?.FatherName.slice(0, 10)} ...`) : (data?.FatherName || "None")}
        </td>

        <td className="px-3 py-2 whitespace-nowrap ">
          <span className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-full ${data.LoginStatus ? 'bg-green-100' : 'bg-red-200'} text-black`}>{data.LoginStatus ? "Active" : "Inactive"}</span>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          <button
            onClick={handleEditModal}
            title="Edit"
            className="px-2 py-1 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
            <i className='bx bx-edit text-2xl' ></i>
          </button>

          {
            !data?.EndDateAd && (
              <button
                title="Archive"
                onClick={handleModal}
                className={`ml-2 px-2 py-1 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-600 transition duration-150 ease-in-out`}>
                <i className='bx bx-archive-in text-2xl' ></i>
              </button>)
          }
          {/* See all details */}
          <button title="See Details" onClick={handleSeeAllModal} className={`ml-2 px-2 py-1 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out`}><i className='bx bx-info-circle text-2xl' ></i></button>

        </td>

      </tr>
      <tr>
        {/* Handaling delete modal */}
        {isModalOpen &&
          <td>
            <ArchiveModal isModalOpen={isModalOpen} handleModal={handleModal} deleteHandle={archiveHandle} name={data?.FullName} isBeingProcessed={isBeingProcessed} />
          </td>
        }

        {isEditModalOpen && <td>
          <UpdatePerson handleEditModal={handleEditModal} data={data} updateHandle={updateHandle} isBeingProcessed={isBeingProcessed} />
        </td>
        }

        {isSeeAllModalOpen && <td>
          <SeeAllPerson index={index} handleSeeAllModal={handleSeeAllModal} data={data} />
        </td>
        }
      </tr>
    </>
  )
}

export default PersonTableRow
