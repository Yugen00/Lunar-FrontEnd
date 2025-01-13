import React, { useEffect, useState } from 'react'

function SeeAllPerson({ handleSeeAllModal, data, index }) {

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='relative sm:max-w-[50%] sm:min-w-[35%] max-h-[90vh] flex justify-center items-center p-4 mt-[64px]'>
                    {/* Card container */}
                    <div className={`w-full bg-white border rounded-lg shadow-md p-6 m-4 
                        overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent`}>
                        <button
                            className="absolute right-[10%] top-[7%] text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={handleSeeAllModal}>
                            X
                        </button>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {(`${index + 1}.   ${data.FullName}`)}
                        </h3>
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
                                <p className="text-gray-600 mt-2"><b>Office Date (Bs):</b> {data?.StartDateBs || "None"} <b>to</b> {data?.EndDateBs || "Present"}</p>
                                {/* <p className="text-gray-600 mt-2"><b>EndDate (Bs):</b> {data?.EndDateBs || "Present"}</p> */}
                                <p className="text-gray-600 mt-2"><b>ContactAddress:</b> {data?.ContactAddress || "None"}</p>

                            </div>

                        </div>
                        <div className="mt-4">
                            <span
                                className={`inline-block px-4 py-4 md:py-1 rounded-full text-white text-sm font-medium ${data.LoginStatus ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                {data.LoginStatus ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeeAllPerson;
