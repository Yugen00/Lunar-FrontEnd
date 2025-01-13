import React from 'react'

function SeeAllDocumentGroup({ currentIndex, handleSeeAllModal, data }) {

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='relative sm:max-w-[35%] sm:min-w-[25%] max-h-[90vh] flex justify-center items-center p-4 mt-[64px]'>
                    {/* Card container */}
                    <div className={`w-full bg-white border rounded-lg shadow-md p-6 m-4 text-base
                        overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent`}>
                        <button
                            className="absolute right-[11%] top-[10%] text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={handleSeeAllModal}>
                            X
                        </button>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {` ${currentIndex}  ${data.GroupName}`}
                        </h3>
                        <div>
                            <p className="text-gray-600 mt-2 break-words"><b>Description:</b> {data?.GroupDescription}</p>
                            <p className="text-gray-600 mt-2"><b>Parent Name:</b> {data.ParentName || "Self"}</p>
                            <p className="text-gray-600 mt-2"><b>Max Count:</b> {data.MaxCount}</p>
                            <p className="text-gray-600 mt-2"><b>Allow Multiple Files Upload:</b> {data.AllowMultipleFilesUpload ? "True" : "False"}</p>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <span
                                className={`inline-block  px-4 py-1 rounded-full text-white text-base font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                {data.IsActive ? "Active" : "Blocked"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeeAllDocumentGroup
