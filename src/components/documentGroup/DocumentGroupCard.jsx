import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import DeleteItem from "../DeleteItem";

function DocumentGroupCard({ index, data, handleDataChange, isSeeAll}) {
  const navigate = useNavigate();
  const [isModalOpen,setIsModalOpen] =useState(false);
  
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(
        `/documentGroup/Block/${data.GroupId}`
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
      <div className={`p-6 m-4 ${isSeeAll? ('sm:max-w-[50%]'):('')} bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
        <h3 className="text-2xl font-semibold text-gray-800">
          {isSeeAll? (data.GroupName):(`${index + 1}.   ${data.GroupName}`)}
        </h3>
        {isSeeAll && <div>
            <p className="text-gray-600 mt-2 break-words"><b>Description:</b> {data?.GroupDescription}</p>
            <p className="text-gray-600 mt-2 break-words"><b>Office:</b> {data?.OfficeName}</p>
          </div>  
        }
        {!isSeeAll &&  <div>
            <p 
              className=" text-gray-600 mt-2 text-ellipsis cursor-pointer" 
              onClick={() => navigate(`/documentGroup/seeDetail/${data.GroupId}`)}
              title="Click to see full details">
              <b>Description:</b> {data?.GroupDescription?.length > 15 ? (`${data.GroupDescription.slice(0,15)} ...`):(data.GroupDescription)}               
            </p>
            <p 
              className=" text-gray-600 mt-2 text-ellipsis cursor-pointer" 
              onClick={() => navigate(`/documentGroup/seeDetail/${data.GroupId}`)}
              title="Click to see full details">
                <b>Office:</b> {data?.OfficeName?.length > 15 ? (`${data.OfficeName.slice(0,15)} ...`):(data.OfficeName)}
            </p>
          </div>
        }
        <p className="text-gray-600 mt-2"><b>Parent Name:</b> {data.ParentName || "Self"}</p>
        {/* For only viewAll */}
        { isSeeAll && (<div>
            <p className="text-gray-600 mt-2"><b>Max Count:</b> {data.MaxCount}</p>
            <p className="text-gray-600 mt-2"><b>Allow Multiple Files Upload:</b> {data.AllowMultipleFilesUpload? "True":"False"}</p>
          
          </div>)}

        <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${
              data.IsActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {data.IsActive ? "Active" : "Blocked"}
          </span>
        </div>

        {/* Action Buttons */}
        {!isSeeAll && <div className="mt-6 flex justify-start gap-4">
          {data.IsActive && (<Link to={`/documentGroup/update/${data.GroupId}`}>
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
            <Link to={`/documentGroup`}>
              <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
                Go Back
              </button>
            </Link>
          </div>
          }
      </div>

      {/* Handaling delete modal */}
      { isModalOpen &&
        <DeleteItem  handleModal={handleModal} deleteHandle={deleteHandle} name={data?.GroupName}/>
      }
    </>
  );
}

export default DocumentGroupCard;
