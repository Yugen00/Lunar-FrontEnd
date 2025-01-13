import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CLoader from '../../utils/CLoader';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import customAxios from '../../utils/http';

function InsertDocumentGroup({ setOriginalData, setInsertModalOpen, ParentId = null, ParentName = '' }) {
  const navigate = useNavigate();
  const [isBeingProcessed, setIsBeingProcessed] = useState(false);
  const [formData, setFormData] = useState({
    GroupName: '',
    GroupDescription: '',
    AllowMultipleFilesUpload: false,
    MaxCount: 0,
    ParentId,
    ParentName
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.GroupName?.trim() || !formData?.GroupDescription?.trim()) {
      showToast('All Fields are required!', 'error');
      return;
    }

    try {
      setIsBeingProcessed(true);
      const response = await customAxios.post('/documentGroup/insert', formData);
      if (response.status == 200) {
        const data = await response.data;
        const newData = { ...data, children: [] }; // Adding children to the response data
        if (ParentId && ParentName) {
          // Find the parent in the original data
          setOriginalData((prev) => {
            const updatedData = prev.map((item) => {
              if (item.GroupId === formData.ParentId) {
                // If parent is found, append new data to its children
                return {
                  ...item,
                  children: [...(item.children || []), newData], // Ensure children is an array
                };
              }
              return item;
            });
            return updatedData;
          });
        } 
        else {
          setOriginalData((prev) => [...prev, newData]);
        }
        setInsertModalOpen(false);
        showToast("Document Group Inserted Successfully", "success");
      }

    } catch (error) {
      handleCatchError(error, navigate);
    }
    finally {
      setIsBeingProcessed(false);
    }
  };

  return (
    <>
      <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
        <div className='flex mx-auto w-full justify-center mt-[64px] max-h-[100%]'>
          <div className='w-full border bg-white sm:max-w-xl m-4 p-4 sm:m-10 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
            <div className='flex justify-end'>
              <button
                className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                onClick={() => setInsertModalOpen(false)}
              >
                X
              </button>
            </div>
            <div className="-mt-4">
              {/* Heading */}
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {ParentId ? `Add Sub Document` : `Insert New Document`}
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
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                    required>
                    <option value="false">False</option>
                    <option value="true">True</option>
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
                    defaultValue={1}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                    required
                  />
                </div>

                {/* Parent Name */}
                {ParentId && ParentName && <div className='md:col-span-2'>
                  <label htmlFor="ParentName" className="block text-lg font-medium text-gray-800 mb-1">
                    Parent Name
                  </label>
                  <input
                    type="text"
                    id="ParentName"
                    name="ParentName"
                    value={ParentName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                    disabled
                    required
                  />
                </div>}


                {/* Buttons */}
                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                  <button
                    type="reset"
                    className="px-6 py-3 bg-red-700 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                  >
                    Clear
                  </button>
                  {isBeingProcessed ? (<CLoader />) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      Insert
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

export default InsertDocumentGroup;
