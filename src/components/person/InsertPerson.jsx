import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import CLoader from '../../utils/CLoader';

function InsertPerson() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const [categories,setCategories] = useState([]);
  const fetchPersonCategories = async () => {
    try {
      const response = await customAxios.get('/PersonCategory/GetList')
      const dt= await response.data;
      console.log(dt)
      setCategories(dt);

    } catch (error) {
      handleCatchError(error,navigate);
    }
  }

  const [branches,setBranches] = useState([]);
  const fetchPersonBranches = async () => {
    try {
      const response = await customAxios.get('/Branch/GetList')
      const dt= await response.data;
      console.log(dt)
      setBranches(dt);

    } catch (error) {
      handleCatchError(error,navigate);
    }
  }
  // For fetching the categoryId 
  useEffect(()=>{
    fetchPersonCategories();
    fetchPersonBranches();
  },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await customAxios.post('/person/insert', formData);
      if(response.status == 200){
        showToast("Fee Topic Inserted Successfully","success");
        setIsLoading(false);
        navigate('/person');
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
              onClick={() => navigate('/person')}
            >
              X
            </button>
          </div>
          <div className="mt-4">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Insert Person
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="FirstName" className="block text-lg font-medium text-gray-800 mb-1">
                  First Name <span className='text-red-600 text-lg'>*</span>
                </label>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="LastName" className="block text-lg font-medium text-gray-800 mb-1">
                  Last Name <span className='text-red-600 text-lg'>*</span>
                </label>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              <div >
                <label htmlFor="Sex" className="block text-lg font-medium text-gray-800 mb-1">
                  Sex <span className='text-red-600 text-lg'>*</span>
                </label>
                <select name="Sex" id="Sex"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                > 
                  <option disabled={true} selected>--Select Sex--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              
              <div >
                <label htmlFor="DobAd" className="block text-lg font-medium text-gray-800 mb-1">
                  Date of Birth (AD) <span className='text-red-600 text-lg'>*</span>
                </label>
                <input
                  type="date"
                  id="DobAd"
                  name="DobAd"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              

              <div>
                <label htmlFor="FatherName" className="block text-lg font-medium text-gray-800 mb-1">
                  Father Name
                </label>
                <input
                  type="text"
                  id="FatherName"
                  name="FatherName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="MotherName" className="block text-lg font-medium text-gray-800 mb-1">
                  Mother Name
                </label>
                <input
                  type="text"
                  id="MotherName"
                  name="MotherName"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                />
              </div>

              <div>
                <label htmlFor="ContactAddress" className="block text-lg font-medium text-gray-800 mb-1">
                  Address <span className='text-red-600 text-lg'>*</span>
                </label>
                <input
                  type="text"
                  id="ContactAddress"
                  name="ContactAddress"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="CitizenshipNo" className="block text-lg font-medium text-gray-800 mb-1">
                  CitizenshipNo
                </label>
                <input
                  type="text"
                  id="CitizenshipNo"
                  name="CitizenshipNo"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                />
              </div>
              <div>
                <label htmlFor="EmailAddress" className="block text-lg font-medium text-gray-800 mb-1">
                  Email <span className='text-red-600 text-lg'>*</span>
                </label>
                <input
                  type="email"
                  id="EmailAddress"
                  name="EmailAddress"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="ContactPhone" className="block text-lg font-medium text-gray-800 mb-1">
                  Phone <span className='text-red-600 text-lg'>*</span>
                </label>
                <input
                  type="text"
                  id="ContactPhone"
                  name="ContactPhone"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="CatId" className="block text-lg font-medium text-gray-800 mb-1">
                  Category <span className='text-red-600 text-lg'>*</span>
                </label>
                <select name="CatId" id="CatId"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  onChange={handleChange} required>
                    <option disabled selected>--Select Category--</option>
                    {
                      categories.map((category)=>{
                      return  <option key={category.CatId} value={category.CatId}>{category.CatName}</option>
                      })
                    }
                </select>
              </div>

              <div>
                <label htmlFor="BranchId" className="block text-lg font-medium text-gray-800 mb-1">
                  Branch <span className='text-red-600 text-lg'>*</span>
                </label>
                <select name="BranchId" id="BranchId"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                  onChange={handleChange} required>
                    <option disabled selected>--Select Branch--</option>
                    {
                      branches.map((branch)=>{
                       return  <option key={branch?.BranchId} value={branch?.BranchId}>{branch?.BranchAddress}</option>
                      })
                    }
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="Remarks" className="block text-lg font-medium text-gray-800 mb-1">
                  Remarks
                </label>
                <input
                  type="text"
                  id="Remarks"
                  name="Remarks"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                />
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                <button
                  type="reset"
                  className="px-6 py-3 bg-red-700 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                  onClick={() => setFormData({})}
                >
                  Clear
                </button>
                {isLoading ? (
                  <CLoader />
                ) : (
                  <button
                    type="submit"
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

export default InsertPerson;
