import React, { useEffect, useState } from 'react'

function SeeAllFeeTopic({ handleSeeAllModal, data, index }) {

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className={`p-6 m-4 sm:max-w-[50%] bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
                    <div className="flex justify-end -mt-4">
                        <button
                            className="text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={handleSeeAllModal}>
                            X
                        </button>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-800">
                        {(`${index + 1}.   ${data.TopicName}`)}
                    </h3>
                    
                    <div className="mt-4">
                        <span
                            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
                                }`}
                        >
                            {data.IsActive ? "Active" : "Blocked"}
                        </span>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default SeeAllFeeTopic
