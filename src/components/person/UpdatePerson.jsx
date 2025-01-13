import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import Loader from '../../utils/Loader';
import CLoader from '../../utils/CLoader';

function UpdatePerson({ handleEditModal, data, updateHandle, isBeingProcessed }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(data);
    const [isLoading, setIsLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [branches, setBranches] = useState([]);


    const fetchPersonCategories = async () => {
        try {
            setIsLoading(true);
            const response = await customAxios.get('/PersonCategory/GetList')
            const dt = await response.data;
            console.log(dt)
            setCategories(dt);

        } catch (error) {
            handleCatchError(error, navigate);
        }
    }

    const fetchPersonBranches = async () => {
        try {
            const response = await customAxios.get('/Branch/GetList')
            const dt = await response.data;
            setBranches(dt);

        } catch (error) {
            handleCatchError(error, navigate);
        }
        finally {
            setIsLoading(false);
        }
    }

    // For fetching the categoryId 
    useEffect(() => {
        fetchPersonCategories();
        fetchPersonBranches();
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        const formFields = [
            { name: 'FirstName', label: 'First Name', required: true },
            { name: 'LastName', label: 'Last Name', required: true },
            { name: 'Sex', label: 'Sex', required: true },
            { name: 'DobBs', label: 'Date of Birth (AD)', required: true },
            { name: 'ContactAddress', label: 'Address', required: true },
            { name: 'EmailAddress', label: 'Email', required: true },
            { name: 'ContactPhone', label: 'Phone', required: true },
            { name: 'CatId', label: 'Category', required: true },
            { name: 'BranchId', label: 'Branch', required: true },
            { name: 'StartDateBs', label: 'Start Date (BS)', required: true },
        ];
        const missingField = formFields.find((field) => {
            const value = formData[field.name];
            return field.required && (!value || value.toString().trim() === '');
        });

        if (missingField) {
            showToast(`"${missingField.label}" is required!`, 'error');
            return;
        }

        console.log(formData)
        //update if correct
        updateHandle(formData);
    }

    return (
        <>
            <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center'>
                <div className='flex mx-auto w-full justify-center mt-[64px] max-h-[100%]'>
                        <div className='w-full border bg-white sm:max-w-xl m-4 p-4 sm:m-10 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
                            <div className='flex justify-end '>
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
                                    Update Person Category
                                </h1>

                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                                    <div>
                                        <label htmlFor="FirstName" className="block text-lg font-medium text-gray-800 mb-1">
                                            First Name <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="FirstName"
                                            name="FirstName"
                                            value={formData?.FirstName}
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
                                            value={formData?.LastName}
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
                                            value={formData?.Sex}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                            required
                                        >
                                            <option value="" disabled={true} selected>--Select Sex--</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="DobBs" className="block text-lg font-medium text-gray-800 mb-1">
                                            Date of Birth (AD) <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="DobBs"
                                            name="DobBs"
                                            value={formData?.DobBs}
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
                                            value={formData?.FatherName}
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
                                            value={formData?.MotherName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="GrandFatherName" className="block text-lg font-medium text-gray-800 mb-1">
                                            Grand Father Name
                                        </label>
                                        <input
                                            type="text"
                                            id="GrandFatherName"
                                            name="GrandFatherName"
                                            value={formData?.GrandFatherName}
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
                                            value={formData?.ContactAddress}
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
                                            value={formData?.CitizenshipNo}
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
                                            value={formData?.EmailAddress}
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
                                            value={formData?.ContactPhone}
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
                                            value={formData?.CatId?.toString()}
                                            onChange={handleChange} required>
                                            <option value="" disabled>--Select Category--</option>
                                            {
                                                categories.map((category) => {
                                                    return <option key={category.CatId} value={category.CatId}>{category.CatName}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="BranchId" className="block text-lg font-medium text-gray-800 mb-1">
                                            Branch <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <select name="BranchId" id="BranchId"
                                            value={formData?.BranchId?.toString()}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                            onChange={handleChange} required>
                                            <option value="" disabled>--Select Branch--</option>
                                            {
                                                branches.map((branch) => {
                                                    return <option key={branch?.BranchId} value={branch?.BranchId}>{branch?.BranchAddress}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="StartDateBs" className="block text-lg font-medium text-gray-800 mb-1">
                                            Start Date (BS) <span className='text-red-600 text-lg'>*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="StartDateBs"
                                            name="StartDateBs"
                                            value={formData?.StartDateBs}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="Remarks" className="block text-lg font-medium text-gray-800 mb-1">
                                            Remarks
                                        </label>
                                        <input
                                            type="text"
                                            id="Remarks"
                                            name="Remarks"
                                            value={formData?.Remarks}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        />
                                    </div>


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

export default UpdatePerson;
