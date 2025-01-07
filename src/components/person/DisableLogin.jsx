import React from 'react'

function DisableLogin({name,handleDisableModal,disableLogin}) {
  return (
    <div>
       <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
            <div className='bg-white p-6 md:p-10 rounded-lg shadow-lg w-11/12 max-w-md'>
                <h2 className="text-xl font-bold mb-4 text-center">Confirm Disable Login</h2>
                <p className="mb-6 text-center">
                    Do you want to disable login of "<span className="font-semibold">{name}</span>"?
                </p>
                <div className="flex justify-center gap-4">
                    {/* Cancel Button */}
                    <button
                        onClick={handleDisableModal}
                        className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all duration-300">
                        Cancel
                    </button>

                    {/* Block Button */}
                    <button
                        onClick={disableLogin}
                        className="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all duration-300"
                    >
                        Disable
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DisableLogin
