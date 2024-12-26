import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import Loader from '../../utils/Loader';
import CLoader from '../../utils/CLoader';
import { verifyTokenizedID } from '../../utils/encryption';

function UpdateCourseGroup() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [decryptedId,setDecryptedId]= useState('');

    const workWithToken = async() =>{
        try {
            const decodedId = verifyTokenizedID(id)
            
            if (!decodedId) {
                throw new Error();
            } else {
                setDecryptedId(decodedId);
                fetchCourseGroup(decodedId);
            }
            
        } catch (error) {
            showToast("Invalid request. Please try again later!", "error");
            navigate("/error");
        }
    }
    useEffect(() => {
        workWithToken();
    }, [id]);

    //for fectching the data at first
    const fetchCourseGroup = async (decodedId) => {
        try {
            setIsLoading(true);
            const response = await customAxios.get(`/courseGroup/getItem/${decodedId}`);
            const dt = await response.data;
            setFormData(dt);
            setIsLoading(false);
        }
        catch (error) {
            handleCatchError(error, navigate);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await customAxios.put('/courseGroup/update', formData);
            if (response.status == 200) {
                showToast("CourseGroup Updated Successfully", "success");
                setIsLoading(false);
                navigate('/courseGroup');
            }
        } catch (error) {
            handleCatchError(error, navigate);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='flex mx-auto w-full justify-center'>
                    <div className='w-full border sm:max-w-xl border-indigo-400 m-4 p-4 sm:m-10'>
                        <div className='flex justify-end'>
                            <button
                            className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                            onClick={() => navigate('/courseGroup')}
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

                                {/* Office Name */}
                                <div className='md:col-span-2'>
                                    <label htmlFor="OfficeName" className="block text-lg font-medium text-gray-800 mb-1">
                                        Office Name
                                    </label>
                                    <input
                                        type="text"
                                        id="OfficeName"
                                        name="OfficeName"
                                        value={formData?.OfficeName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-center gap-4">
                                    
                                    {
                                    isLoading? (<CLoader />):
                                    (<button
                                        type="submit"
                                        onClick={handleUpdate}
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
            )}
        </>
    );
}

export default UpdateCourseGroup;
