import React from 'react'
import CLoader from '../../utils/CLoader'

function ArchiveModal({ handleModal, deleteHandle, name, isBeingProcessed }) {
    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='bg-white p-6 md:p-10 rounded-lg shadow-lg w-11/12 max-w-md'>
                    <h2 className="text-xl font-bold mb-4 text-center">Confirm Archieve</h2>
                    <p className="mb-6 text-center">
                        Are you sure you want to archive the "<span className="font-semibold">{name}</span>"?
                    </p>
                    <div className="flex justify-center gap-4">
                        {/* Cancel Button */}
                        {!isBeingProcessed && <button
                            onClick={handleModal}
                            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all duration-300">
                            Cancel
                        </button>}

                        {/* Block Button */}
                        {!isBeingProcessed && <button
                            onClick={deleteHandle}
                            className="px-6 py-3 bg-yellow-700 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-800 transition-all duration-300"
                        >
                            Archive
                        </button>}

                        {isBeingProcessed && <CLoader />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArchiveModal
