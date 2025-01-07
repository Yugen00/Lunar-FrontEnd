import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import DeleteItem from '../DeleteItem';
import { createTokenizedID } from '../../utils/encryption';
import DisableLogin from './DisableLogin';

function PersonTableRow({ index, data, handleDataChange }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisableModelOpen, setIsDisableModelOpen] = useState(false);
  const [tokenizedId, setTokenizedId] = useState('');

  useEffect(() => {
    const tokenizedId = data?.PersonId ? createTokenizedID(data.PersonId.toString()) : '';
    setTokenizedId(tokenizedId);
  }, [])

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleDisableModal = ()=>{
    setIsDisableModelOpen(!isDisableModelOpen);
  }

  const disableLogin = async ()=>{
    try {
      const response = await customAxios.put(`/Person/DisableLogin/${data.PersonId}`);

      if (response.status == 200) {
        setIsDisableModelOpen(false);
        showToast("Person login disabled successfully", "success");
        handleDataChange();
      }

    } catch (error) {
      handleCatchError(error, navigate)
    }
  }

  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(`/Person/Archive/${data.PersonId}`);

      if (response.status == 200) {
        setIsModalOpen(false);
        showToast("Data Blocked Successfully", "success");
        handleDataChange();
      }

    } catch (error) {
      handleCatchError(error, navigate)
    }
  }
  return (
    <>
      <tr>
        <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>

        <td className="px-3 py-2 whitespace-nowrap">{data?.FullName}</td>
        <td className="px-3 py-2 whitespace-nowrap">{data?.Sex}</td>
        <td
          className="px-3 py-2 whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/Person/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          {data?.FatherName?.length > 10 ? (`${data?.FatherName.slice(0, 10)} ...`) : (data?.FatherName || "None")}
        </td>
        <td
          className="px-3 py-2 whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/Person/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          {data?.EmailAddress?.length > 10 ? (`${data?.EmailAddress.slice(0, 10)} ...`) : (data?.EmailAddress || "None")}
        </td>

        <td className="px-3 py-2 whitespace-nowrap ">
          <span className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-full ${data.LoginStatus ? 'bg-green-100' : 'bg-red-200'} text-black`}>{data.LoginStatus ? "Active" : "Inactive"}</span>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          {
            data?.LoginStatus && (
              <Link to={`/person/update/${encodeURIComponent(tokenizedId)}`}>
                <button className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
              </Link>)
          }
          {
            data?.LoginStatus && !data?.EndDateAd && (
              <button onClick={handleModal} className={`ml-2 px-4 z-10 py-2 font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-600 transition duration-150 ease-in-out`}>Archive</button>)
          }
          {
            data?.LoginStatus && (
              <button onClick={handleDisableModal} className={`ml-2 px-4 z-10 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>Disable Login</button>)
          }
          {
            !data?.LoginStatus && (
              <Link to={`/Person/enableLogin/${encodeURIComponent(tokenizedId)}`}>
                <button className="px-4 py-2 z-10 font-medium text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out">Enable Login</button>
              </Link>)
          }
        </td>

      </tr>
      <tr>
        {/* Handaling delete modal */}
        {isModalOpen &&
          <td>
            <DeleteItem isModalOpen={isModalOpen} handleModal={handleModal} deleteHandle={deleteHandle} name={data?.FullName} />
          </td>
        }

        {/* Handaling Disable modal */}
        {isDisableModelOpen &&
          <td>
            <DisableLogin isDisableModelOpen={isDisableModelOpen} handleDisableModal={handleDisableModal} disableLogin={disableLogin} name={data?.FullName} />
          </td>
        }
      </tr>
    </>
  )
}

export default PersonTableRow
