import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import DeleteItem from '../DeleteItem';
import { createTokenizedID } from '../../utils/encryption';

function OfficeTableRow({ index, data, handleDataChange }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenizedId, setTokenizedId] = useState('');

  useEffect(() => {
    const tokenizedId = data?.OfficeId ? createTokenizedID(data.OfficeId.toString()) : '';
    setTokenizedId(tokenizedId);
  }, [])

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(`/office/Block/${data.OfficeId}`);

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
        <td
          className="px-3 py-2 text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/office/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          {data?.OfficeName?.length > 25 ? (`${data?.OfficeName.slice(0, 25)} ...`) : (data?.OfficeName)}
        </td>
        <td
          className="px-3 py-2 text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/office/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          {data?.OfficeAddress?.length > 15 ? (`${data?.OfficeAddress.slice(0, 15)} ...`) : (data?.OfficeAddress)}
        </td>
        <td
          className="px-3 py-2 text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/office/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          {data?.OfficeEmail?.length > 25 ? (`${data?.OfficeEmail.slice(0, 25)} ...`) : (data?.OfficeEmail)}
        </td>
        <td className="px-3 py-2 whitespace-nowrap">{data?.OfficePhonePrimary}</td>
        <td className="px-3 py-2 whitespace-nowrap ">
          <span className={`p-4 w-full inline-flex justify-center text-base leading-5 font-semibold rounded-full ${data.IsActive ? 'bg-green-100' : 'bg-red-200'} text-black`}>{data.IsActive ? "Active" : "Blocked"}</span>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
          {
            data.IsActive && (
              <Link to={`/office/update/${encodeURIComponent(tokenizedId)}`}>
                <button className="px-4 py-2 z-10 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
              </Link>)
          }
          {
            data.IsActive && (
              <button onClick={handleModal} className={`ml-2 px-4 z-10 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>Block</button>)
          }
        </td>

      </tr>
      <tr>
        {
          isModalOpen && (
            <td>
              <DeleteItem isModalOpen={isModalOpen} handleModal={handleModal} deleteHandle={deleteHandle} name={data?.OfficeName} />
            </td>
          )
        }
      </tr>
    </>
  )
}

export default OfficeTableRow
