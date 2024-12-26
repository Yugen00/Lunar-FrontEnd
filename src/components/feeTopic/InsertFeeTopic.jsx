import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import CLoader from '../../utils/CLoader';

function InsertFeeTopic() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await customAxios.post('/feeTopic/insert', formData);
      if(response.status == 200){
        showToast("Fee Topic Inserted Successfully","success");
        setIsLoading(false);
        navigate('/feeTopic');
      }
    } catch (error) {
      handleCatchError(error,navigate);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex mx-auto w-full justify-center'>
        <div className='w-full border sm:max-w-xl border-indigo-400 m-4 p-4 sm:m-10'>
          <div className='flex justify-end'>
              <button
              className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
              onClick={() => navigate('/feeTopic')}
              >
              X
              </button>
          </div> 
          <div className="mt-4">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Insert Fee Topic
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Topic Name */}
              <div className="md:col-span-2">
                <label htmlFor="TopicName" className="block text-lg font-medium text-gray-800 mb-1">
                  Topic Name
                </label>
                <input
                  type="text"
                  id="TopicName"
                  name="TopicName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              {/* OfficeName */}
              <div className="md:col-span-2">
                <label htmlFor="OfficeName" className="block text-lg font-medium text-gray-800 mb-1">
                  Office Name
                </label>
                <input
                  type="text"
                  id="OfficeName"
                  name="OfficeName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                <button
                  type="reset"
                  className="px-6 py-3 bg-red-700 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                >
                  Clear
                </button>
                {isLoading ? (<CLoader />) :(
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
    </>
  );
}

export default InsertFeeTopic;