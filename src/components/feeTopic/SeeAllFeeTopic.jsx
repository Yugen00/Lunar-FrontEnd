import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import handleCatchError from '../../utils/handleCatchError';
import customAxios from '../../utils/http';
import Loader from '../../utils/Loader';
import FeeTopicCard from './FeeTopicCard';
import { showToast } from '../../utils/ReactToast';
import { verifyTokenizedID } from '../../utils/encryption';

function SeeAllFeeTopic() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSeeAll] = useState(true);
    const [decryptedId,setDecryptedId]= useState('');
        
    const workWithToken = async() =>{
        try {
            const decodedId = verifyTokenizedID(id)

            if (!decodedId) {
                throw new Error();
            } else {
                setDecryptedId(decodedId);
                fetchrole(decodedId);
            }
            
        } catch (error) {
            console.log(error)
            showToast("Invalid request. Please try again later!", "error");
            navigate("/error");
        }
    }
    useEffect(() => {
        workWithToken();
    }, [id]);

    //for fectching the data at first
    const fetchrole = async (decodedId) => {
        try {
            setIsLoading(true);
            const response = await customAxios.get(`/feeTopic/getItem/${decodedId}`);
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
        { isLoading? (<Loader/>):(
            <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl">Detail of Fee Topic </p>
                    <FeeTopicCard data={formData} isSeeAll={isSeeAll}/>
            </div>
        )}
    </>
  )
}

export default SeeAllFeeTopic
