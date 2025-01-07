import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customAxios from "../../utils/http";
import { showToast } from "../../utils/ReactToast";
import handleCatchError from "../../utils/handleCatchError";
import DeleteItem from "../DeleteItem";
import { createTokenizedID } from "../../utils/encryption";
import DisableLogin from "./DisableLogin";

function PersonCard({ index, data, handleDataChange, isSeeAll }) {
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

  const handleDisableModal = () => {
    setIsDisableModelOpen(!isDisableModelOpen);
  }

  const disableLogin = async () => {
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
      {/* Course Group Card */}
      <div className={`p-6 m-4 ${isSeeAll ? ('sm:max-w-[50%]') : ('')} bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
        <div className="flex justify-between">
          <h3 className="text-2xl font-semibold text-gray-800">
            {isSeeAll ? (data.FullName) : (`${index + 1}.   ${data.FullName}`)}
          </h3>
          {/* For back in details page */}
          {isSeeAll && 
            <Link to={`/Person`}>
              <button className="px-4 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
                <i className='bx bx-arrow-back text-lg'></i>
              </button>
            </Link>
          }
        </div>
        {isSeeAll && (
          <div>
            {/* Personal Details */}
            <div className="border-gray-400 border-b-2 my-1 pb-2">
              <p className="text-gray-600 mt-2"><b>Sex:</b> {data?.Sex || "None"}</p>
              <p className="text-gray-600 mt-2"><b>Dob (Ad):</b> {data?.DobAd || "None"}</p>
              <p className="text-gray-600 mt-2"><b>Email:</b> {data?.EmailAddress || "None"}</p>
              <p className="text-gray-600 mt-2"><b>CitizenshipNo:</b> {data?.CitizenshipNo || "None"}</p>
              <p className="text-gray-600 mt-2"><b>Phone:</b> {data?.ContactPhone || "None"}</p>
              <p className="text-gray-600 mt-2"><b>Address:</b> {data?.ContactAddress || "None"}</p>
            </div>
            {/* Family Details */}
            <div className="border-gray-400 border-b-2 my-1 pb-2">
              <p className="text-gray-800 mt-2 text-lg font-bold">Family Details</p>
              <p className="text-gray-600 mt-2"><b>Father Name:</b> {data?.FatherName || "None"}</p>
              <p className="text-gray-600 mt-2"><b>Mother Name:</b> {data?.MotherName || "None"}</p>
              <p className="text-gray-600 mt-2"><b>GrandFather Name:</b> {data?.GrandFatherName || "None"}</p>
            </div>
            <div className="border-gray-400 border-b-2 my-1 pb-2">
              <p className="text-gray-800 mt-2 text-lg font-bold">Office Details</p>
              <p className="text-gray-600 mt-2"><b>OfficeName:</b> {data?.OfficeName || "None"}</p>
              <p className="text-gray-600 mt-2"><b>BranchAddress:</b> {data?.BranchAddress || "None"}</p>
              <p className="text-gray-600 mt-2"><b>Branch Phone:</b> {data?.BranchPhonePrimary || "None"}</p>
            </div>
            <div className="border-gray-400 border-b-2 my-1 pb-2">
              <p className="text-gray-800 mt-2 text-lg font-bold">Others</p>
              <p className="text-gray-600 mt-2"><b>Person Category:</b> {data?.PersonalCategory || "None"}</p>
              <p className="text-gray-600 mt-2"><b>StartDate (Bs):</b> {data?.StartDateBs || "None"}</p>
              {!data?.LoginStatus && <p className="text-gray-600 mt-2"><b>EndDate (Bs):</b> {data?.EndDateBs}</p>}
              <p className="text-gray-600 mt-2"><b>ContactAddress:</b> {data?.ContactAddress || "None"}</p>
              
            </div>

          </div>
        )}
        {!isSeeAll && (
          <div>
            <p
              className=" text-gray-600 mt-2 text-ellipsis whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/Person/seeDetail/${encodeURIComponent(tokenizedId)}`)}
              title="Click to see full details">
              <b>Father Name:</b> {data?.FatherName?.length > 10 ? (`${data?.FatherName.slice(0, 10)} ...`) : (data?.FatherName || "None")}
            </p>
            <p
              className=" text-gray-600 mt-2 text-ellipsis whitespace-nowrap cursor-pointer"
              onClick={() => navigate(`/Person/seeDetail/${encodeURIComponent(tokenizedId)}`)}
              title="Click to see full details">
              <b>Email:</b> {data?.EmailAddress?.length > 10 ? (`${data?.EmailAddress.slice(0, 10)} ...`) : (data?.EmailAddress || "None")}
            </p>
          </div>
        )}


        <div className="mt-4">
          <span
            className={`inline-block px-4 py-4 md:py-1 rounded-full text-white text-sm font-medium ${data.LoginStatus ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {data.LoginStatus ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Action Buttons */}
        {!isSeeAll && <div className="mt-6 flex justify-start gap-4">
          {
            data?.LoginStatus && (
              <Link to={`/person/update/${encodeURIComponent(tokenizedId)}`}>
                <button className="p-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
              </Link>)
          }
          {
            data?.LoginStatus && !data?.EndDateAd && (
              <button onClick={handleModal} className={`p-2 py-2 text-sm text-white bg-yellow-600 rounded-md hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-600 transition duration-150 ease-in-out`}>Archive</button>)
          }
          {
            data?.LoginStatus && (
              <button onClick={handleDisableModal} className={`p-2 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out`}>Disable Login</button>)
          }
          {
            !data?.LoginStatus && (
              <Link to={`/Person/enableLogin/${encodeURIComponent(tokenizedId)}`}>
                <button className="p-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-green active:bg-green-600 transition duration-150 ease-in-out">Enable Login</button>
              </Link>)
          }
        </div>}

        {/* For back in details page
        {isSeeAll && <div className="mt-6 flex justify-start gap-4">
          <Link to={`/Person`}>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
              Go Back
            </button>
          </Link>
        </div> }*/}
        
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.CatName} />
      )}
      {/* Handaling Disable modal */}
      {isDisableModelOpen &&
        <DisableLogin isDisableModelOpen={isDisableModelOpen} handleDisableModal={handleDisableModal} disableLogin={disableLogin} name={data?.FullName} />
      }

    </>
  );
}

export default PersonCard;
