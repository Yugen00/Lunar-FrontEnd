import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import handleCatchError from '../../utils/handleCatchError';
import customAxios from '../../utils/http';
import Loader from '../../utils/Loader';
import PersonCard from './PersonCard';
import { showToast } from '../../utils/ReactToast';
import { verifyTokenizedID } from '../../utils/encryption';

function SeeAllPerson() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSeeAll] = useState(true);
    const [decryptedId, setDecryptedId] = useState('');

    const workWithToken = async () => {
        try {
            const decodedId = verifyTokenizedID(id)

            if (!decodedId) {
                throw new Error();
            } else {
                setDecryptedId(decodedId);
                fetchPerson(decodedId);
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
    const fetchPerson = async (decodedId) => {
        try {
            setIsLoading(true);
            const response = await customAxios.get(`/Person/getItem/${decodedId}`);
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

    return (
        <>
            {isLoading ? (<Loader />) : (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl">Detail of Person <b>{formData?.FirstName}</b></p>
                    <PersonCard data={formData} isSeeAll={isSeeAll} />
                </div>
            )}
        </>
    )
}

export default SeeAllPerson
