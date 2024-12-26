import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import Loader from '../../utils/Loader';
import CLoader from '../../utils/CLoader';
import { verifyTokenizedID } from '../../utils/encryption';

function UpdateOffice() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [decryptedId, setDecryptedId] = useState('');

    const workWithToken = async () => {
        try {
            const decodedId = verifyTokenizedID(id)

            if (!decodedId) {
                throw new Error();
            } else {
                setDecryptedId(decodedId);
                fetchOffice(decodedId);
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
    const fetchOffice = async (decodedId) => {

        try {
            setIsLoading(true);
            const response = await customAxios.get(`/office/getItem/${decodedId}`);
            const dt = await response.data;
            setFormData(dt);
            console.log(dt)
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
            console.log(formData)
            const response = await customAxios.put('/office/update', formData);
            if (response.status == 200) {
                showToast("Office Updated Successfully", "success");
                navigate('/office');
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
                                onClick={() => navigate('/Office')}
                            >
                                X
                            </button>
                        </div>
                        <div className="mt-4">
                            {/* Heading */}
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Update Document Group
                            </h1>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Office Name */}
                                <div>
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

                                {/* Office Short Name */}
                                <div>
                                    <label htmlFor="OfficeShortName" className="block text-lg font-medium text-gray-800 mb-1">
                                        Office Short Name
                                    </label>
                                    <input
                                        type="text"
                                        id="OfficeShortName"
                                        name="OfficeShortName"
                                        value={formData?.OfficeShortName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Office Address */}
                                <div className="md:col-span-2">
                                    <label htmlFor="OfficeAddress" className="block text-lg font-medium text-gray-800 mb-1">
                                        Office Address
                                    </label>
                                    <input
                                        type="text"
                                        id="OfficeAddress"
                                        name="OfficeAddress"
                                        value={formData?.OfficeAddress}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Office Email */}
                                <div>
                                    <label htmlFor="OfficeEmail" className="block text-lg font-medium text-gray-800 mb-1">
                                        Office Email
                                    </label>
                                    <input
                                        type="text"
                                        id="OfficeEmail"
                                        name="OfficeEmail"
                                        value={formData?.OfficeEmail}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Email Password */}
                                <div>
                                    <label htmlFor="EmailPassword" className="block text-lg font-medium text-gray-800 mb-1">
                                        Email Password
                                    </label>
                                    <input
                                        type="password"
                                        id="EmailPassword"
                                        name="EmailPassword"
                                        value={formData?.EmailPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Establish Date */}
                                <div>
                                    <label htmlFor="EstdDate" className="block text-lg font-medium text-gray-800 mb-1">
                                        Establish Date
                                    </label>
                                    <input
                                        type="text"
                                        id="EstdDate"
                                        name="EstdDate"
                                        value={formData?.EstdDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Pan No. */}
                                <div>
                                    <label htmlFor="Pan" className="block text-lg font-medium text-gray-800 mb-1">
                                        Pan Number
                                    </label>
                                    <input
                                        type="number"
                                        id="Pan"
                                        name="Pan"
                                        value={formData?.Pan}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Phone Primary */}
                                <div>
                                    <label htmlFor="OfficePhonePrimary" className="block text-lg font-medium text-gray-800 mb-1">
                                        Primary Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        id="OfficePhonePrimary"
                                        name="OfficePhonePrimary"
                                        value={formData?.OfficePhonePrimary}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Phone Secondary. */}
                                <div>
                                    <label htmlFor="OfficePhoneSecondary" className="block text-lg font-medium text-gray-800 mb-1">
                                        Secondary Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        id="OfficePhoneSecondary"
                                        name="OfficePhoneSecondary"
                                        value={formData?.OfficePhoneSecondary}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>


                                {/* Registration No. */}
                                <div className="md:col-span-2">
                                    <label htmlFor="RegistrationNo" className="block text-lg font-medium text-gray-800 mb-1">
                                        Registration Number
                                    </label>
                                    <input
                                        type="number"
                                        id="RegistrationNo"
                                        name="RegistrationNo"
                                        value={formData?.RegistrationNo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>


                                {/* Motto */}
                                <div className="md:col-span-2">
                                    <label htmlFor="Motto" className="block text-lg font-medium text-gray-800 mb-1">
                                        Motto
                                    </label>
                                    <input
                                        type="text"
                                        id="Motto"
                                        name="Motto"
                                        value={formData?.Motto}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* WebSite */}
                                <div className='md:col-span-2'>
                                    <label htmlFor="WebSite" className="block text-lg font-medium text-gray-800 mb-1">
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        id="WebSite"
                                        name="WebSite"
                                        value={formData?.WebSite}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* DevelopedBy */}
                                <div>
                                    <label htmlFor="DevelopedBy" className="block text-lg font-medium text-gray-800 mb-1">
                                        Developed By
                                    </label>
                                    <input
                                        type="text"
                                        id="DevelopedBy"
                                        name="DevelopedBy"
                                        value={formData?.DevelopedBy}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* DeveloperSite */}
                                <div>
                                    <label htmlFor="DeveloperSite" className="block text-lg font-medium text-gray-800 mb-1">
                                        Developer Site
                                    </label>
                                    <input
                                        type="text"
                                        id="DeveloperSite"
                                        name="DeveloperSite"
                                        value={formData?.DeveloperSite}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">

                                    {isLoading ? (<CLoader />) : (
                                        <button
                                            type="submit"
                                            onClick={handleUpdate}
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
            )}
        </>
    );
}

export default UpdateOffice;
