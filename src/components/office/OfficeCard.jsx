import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import DeleteItem from "../DeleteItem";
import { createTokenizedID } from "../../utils/encryption";

function OfficeCard({ index, data,handleDataChange, isSeeAll }) {
  const navigate = useNavigate();
  const [isModalOpen,setIsModalOpen]= useState(false);
  const [tokenizedId, setTokenizedId] = useState('');

  useEffect(() => {
    const tokenizedId = data?.OfficeId ? createTokenizedID(data.OfficeId.toString()) : '';
    setTokenizedId(tokenizedId);
  }, [])

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(
        `/office/Block/${data.OfficeId}`
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        showToast("Data Blocked Successfully", "success");
        handleDataChange();
      }
    } catch (error) {
      handleCatchError(error, navigate);
    }
  };

  return (
    <>
      {/* Document Group Card */}
      <div className={`p-6 m-4 ${isSeeAll ? ('sm:max-w-[50%]') : ('')} bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
        <h3 className="text-2xl font-semibold text-gray-800">
          {isSeeAll ? (data?.OfficeName) : (`${index + 1}.   ${data?.OfficeName}`)}
        </h3>
        {isSeeAll && (
          <div>
            <p className="text-gray-600 mt-2"><b>Office Short Name:</b> {data?.OfficeShortName}</p>
            <p className="text-gray-600 mt-2"><b>Office Address:</b> {data?.OfficeAddress}</p>
            <p className="text-gray-600 mt-2"><b>Establish Date:</b> {data?.EstdDate}</p>
            <p className="text-gray-600 mt-2"><b>Pan No:</b> {data?.Pan}</p>
            <p className="text-gray-600 mt-2"><b>Registration No:</b> {data?.RegistrationNo}</p>
          </div>
        )}
        {!isSeeAll && <p
          className=" text-gray-600 mt-2 text-ellipsis break-words cursor-pointer"
          onClick={() => navigate(`/office/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          <b>Office Address:</b> {`${data.OfficeAddress?.slice(0, 15) || "No description available"} ...`}
        </p>}
        <p className="text-gray-600 mt-2"><b>Office Email:</b> {data?.OfficeEmail}</p>
        <p className="text-gray-600 mt-2"><b>Phone Number:</b> {data?.OfficePhonePrimary}</p>
        {/* For only viewAll */}
        {isSeeAll && (<div>
          <p className="text-gray-600 mt-2"><b>Secondary Phone Number:</b> {data?.OfficePhoneSecondary}</p>
          <p className="text-gray-600 mt-2"><b>Moto:</b> {data?.Motto}</p>
          <p className="text-gray-600 mt-2"><b>Website:</b> {data?.WebSite}</p>

          <div className="text-gray-500 mt-8 text-sm">
            <p className=" mt-2"><b>Developed By:</b> {data?.DevelopedBy}</p>
            <p className=" mt-2"><b>Developer Site:</b> {data?.DeveloperSite}</p>
          </div>
        </div>
        )}

        <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {data.IsActive ? "Active" : "Blocked"}
          </span>
        </div>

        {/* Action Buttons */}
        {!isSeeAll && <div className="mt-6 flex justify-start gap-4">
          {data.IsActive && (<Link to={`/office/update/${encodeURIComponent(tokenizedId)}`}>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
              Edit
            </button>
          </Link>)}

          {/* Block Button */}
          {data.IsActive && (
            <button
              onClick={handleModal}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 transition duration-300"
            >
              Block
            </button>
          )}
        </div>}

        {/* For back in details page */}
        {isSeeAll && <div className="mt-6 flex justify-start gap-4">
          <Link to={`/office`}>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
              Go Back
            </button>
          </Link>
        </div>
        }
      </div>

      {/* Handaling delete modal */}
      {isModalOpen &&
        <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.OfficeName} />
      }
    </>
  );
}

export default OfficeCard;
