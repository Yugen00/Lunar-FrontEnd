import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CourseGroupCard from './CourseGroupCard';
import handleCatchError from '../../utils/handleCatchError';
import customAxios from '../../utils/http';
import Loader from '../../utils/Loader';
import { verifyTokenizedID } from '../../utils/encryption';
import { showToast } from '../../utils/ReactToast';

function SeeAllCourseGroup() {
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

  return (
    <>
        { isLoading? (<Loader/>):(
            <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl">Detail of Course Group</p>
                    <CourseGroupCard data={formData} isSeeAll={isSeeAll}/>
            </div>
        )}
    </>
  )
}

export default SeeAllCourseGroup
