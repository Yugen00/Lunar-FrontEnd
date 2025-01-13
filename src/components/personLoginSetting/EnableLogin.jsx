import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { verifyTokenizedID } from '../../utils/encryption';
import { showToast } from '../../utils/ReactToast';
import CLoader from '../../utils/CLoader';
import handleCatchError from '../../utils/handleCatchError';
import customAxios from '../../utils/http';

function EnableLogin() {
    const { personId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [decryptedId, setDecryptedId] = useState('');

    const workWithToken = async () => {
        try {
            const decodedId = verifyTokenizedID(personId)

            if (!decodedId) {
                throw new Error();
            } else {
                setDecryptedId(decodedId);
                setFormData({"PersonId":decodedId});
                
            }

        } catch (error) {
            showToast("Invalid request. Please try again later!", "error");
            navigate("/error");
        }
    }
    useEffect(() => {
        workWithToken();
    }, [personId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await customAxios.put('/person/EnableLogin', formData);
            if (response.status == 200) {
                showToast("Login Enabled Successfully!", "success");
                setIsLoading(false);
                navigate('/person');
            }
        } catch (error) {
            handleCatchError(error, navigate);
        }
        finally {
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
                            Enable login
                        </h1>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                            <div className="md:col-span-2">
                                <label htmlFor="UserName" className="block text-lg font-medium text-gray-800 mb-1">
                                    UserName
                                </label>
                                <input
                                    type="text"
                                    id="UserName"
                                    name="UserName"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="Password" className="block text-lg font-medium text-gray-800 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="RetypePassword" className="block text-lg font-medium text-gray-800 mb-1">
                                    Retype Password
                                </label>
                                <input
                                    type="password"
                                    id="RetypePassword"
                                    name="RetypePassword"
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
                                        Create Login Id
                                    </button>
                                )}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnableLogin
