import React, { useState } from 'react';
import CLoader from '../../utils/CLoader';

function UpdateCourseGroup({ handleEditModal, data, updateHandle, isBeingProcessed }) {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        updateHandle(formData);
    }

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='flex mx-auto w-full justify-center '>
                    <div className='w-full bg-white border sm:max-w-xl border-indigo-400 m-4 p-4 sm:m-10'>
                        <div className='flex justify-end'>
                            <button
                                className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                                onClick={handleEditModal}
                            >
                                X
                            </button>
                        </div>
                        <div className="mt-4">
                            {/* Heading */}
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Update Course Group
                            </h1>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 place-content-center">
                                {/* Group Name */}
                                <div className="md:col-span-2">
                                    <label htmlFor="GroupName" className="block text-lg font-medium text-gray-600 mb-1">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        id="GroupName"
                                        name="GroupName"
                                        value={formData?.GroupName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-center gap-4">

                                    {
                                        isBeingProcessed ? (<CLoader />) :
                                            (<button
                                                type="submit"
                                                onClick={submitUpdate}
                                                className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                            >
                                                Save
                                            </button>)
                                    }
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateCourseGroup;
