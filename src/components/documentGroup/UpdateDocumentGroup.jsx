import React, { useEffect, useState } from 'react';
import CLoader from '../../utils/CLoader';

function UpdateDocumentGroup({ handleEditModal, data, updateHandle, isBeingProcessed }) {
    const [formData, setFormData] = useState({
        GroupName: "",
        GroupDescription: "",
        AllowMultipleFilesUpload: false,
        MaxCount: 0,
        ParentId: null,
        ParentName: "",
    });

    //to remove the children of incoming data
    function removeChildren(dt) {
        const { children, ...rest } = dt; // Destructure to exclude `children`
        return rest; // Return the rest of the object
    }

    useEffect(() => {
        if (data) {
            const withoutChildren = removeChildren(data);
            setFormData({ ...formData, ...withoutChildren });
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert the AllowMultipleFilesUpload field to a boolean
        if (name === "AllowMultipleFilesUpload") {
            setFormData({
                ...formData,
                [name]: value === "true",  // Convert string "true" to boolean true, and "false" to false
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        console.log(formData)
        if (!formData?.GroupName.trim() || !formData?.GroupDescription.trim() ) {
            showToast('All Fields are required!', 'error');
            return;
        }
        updateHandle(formData);
    }

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='flex mx-auto w-full justify-center mt-[64px] max-h-[100%]'>
                    <div className='w-full border bg-white sm:max-w-xl m-4 p-4 sm:m-10 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
                        <div className='flex justify-end'>
                            <button
                                className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                                onClick={handleEditModal}
                            >
                                X
                            </button>
                        </div>
                        <div className="-mt-4">
                            {/* Heading */}
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Update Document Group
                            </h1>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                                {/* Group Name */}
                                <div className="md:col-span-2">
                                    <label htmlFor="GroupName" className="block text-lg font-medium text-gray-800 mb-1">
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

                                {/* Group Description */}
                                <div className="md:col-span-2">
                                    <label htmlFor="GroupDescription" className="block text-lg font-medium text-gray-800 mb-1">
                                        Group Description
                                    </label>
                                    <textarea
                                        name="GroupDescription"
                                        id="GroupDescription"
                                        value={formData?.GroupDescription || ""}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                    ></textarea>
                                </div>

                                {/* Allowing Multiple Files */}
                                <div>
                                    <label htmlFor="AllowMultipleFilesUpload" className="block text-lg font-medium text-gray-800 mb-1">
                                        Allow Multiple Upload
                                    </label>
                                    <select id="AllowMultipleFilesUpload"
                                        name="AllowMultipleFilesUpload"
                                        value={formData?.AllowMultipleFilesUpload}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required>
                                        <option value={false}>False</option>
                                        <option value={true}>True</option>
                                    </select>
                                </div>

                                {/* For Max Count */}
                                <div>
                                    <label htmlFor="MaxCount" className="block text-lg font-medium text-gray-800 mb-1">
                                        Max Count
                                    </label>
                                    <input
                                        type="number"
                                        id="MaxCount"
                                        name="MaxCount"
                                        value={formData?.MaxCount}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Parent Name */}
                                {formData?.ParentId && formData?.ParentName && <div className="md:col-span-2">
                                    <label htmlFor="ParentName" className="block text-lg font-medium text-gray-800 mb-1">
                                        Parent Name
                                    </label>
                                    <input
                                        type="text"
                                        id="ParentName"
                                        name="ParentName"
                                        value={formData?.ParentName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                        disabled
                                    />
                                </div>}

                               

                                {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">

                                    {isBeingProcessed ? (<CLoader />) : (
                                        <button
                                            type='submit'
                                            onClick={submitUpdate}
                                            className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                        >
                                            Update
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateDocumentGroup;
