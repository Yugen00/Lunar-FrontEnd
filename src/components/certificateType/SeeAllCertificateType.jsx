import React from 'react'

function SeeAllCertificateType({ handleSeeAllModal, data, index }) {

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className={`p-6 m-4 sm:max-w-[50%] sm:min-w-[30%] bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}>
                    <div className="flex justify-end -mt-4">
                        <button
                            className="text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={handleSeeAllModal}>
                            X
                        </button>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-800 overflow-hidden">
                        {(`${index + 1}.   ${data.TypeName}`)}
                    </h3>

                    <div className="mt-4 flex justify-center">
                        <span
                            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
                                }`}
                        >
                            {data.IsActive ? "Active" : "Blocked"}
                        </span>
                    </div>


                    {/* For back in details page */}
                    {/* <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={handleSeeAllModal}
                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
                            Cancel
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default SeeAllCertificateType
