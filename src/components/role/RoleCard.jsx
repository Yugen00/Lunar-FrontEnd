import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import DeleteItem from "../DeleteItem";
import { createTokenizedID } from "../../utils/encryption";

function RoleCard({ index, data, handleDataChange, isSeeAll }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenizedId, setTokenizedId] = useState('');

  useEffect(() => {
    const tokenizedId = data?.RoleId ? createTokenizedID(data.RoleId.toString()) : '';
    setTokenizedId(tokenizedId);
  }, [])
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(
        `/role/Block/${data.GroupId}`
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
      {/* Course Group Card */}
      <div className={`p-6 m-4 ${isSeeAll ? ('sm:max-w-[50%]') : ('')} bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
        <h3 className="text-2xl font-semibold text-gray-800">
          {isSeeAll ? (data.RoleName) : (`${index + 1}.   ${data.RoleName}`)}
        </h3>
        {isSeeAll && <p className="text-gray-600 mt-2"><b>Remarks:</b> {data?.Remarks}</p>}
        {!isSeeAll && <p
          className=" text-gray-600 mt-2 text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={() => navigate(`/role/seeDetail/${encodeURIComponent(tokenizedId)}`)}
          title="Click to see full details">
          <b>Remarks:</b>{data?.Remarks?.length > 25 ? (`${data?.Remarks.slice(0, 25)} ...`) : (data?.Remarks)}
        </p>}


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
          {data.IsActive && (<Link to={`/role/update/${encodeURIComponent(tokenizedId)}`}>
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
          <Link to={`/role`}>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
              Go Back
            </button>
          </Link>
        </div>
        }
      </div>

      {/* Handaling delete modal */}
      {isModalOpen &&
        <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.RoleName} />
      }
    </>
  );
}

export default RoleCard;
