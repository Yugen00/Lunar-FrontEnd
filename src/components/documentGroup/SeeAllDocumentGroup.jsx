import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DocumentGroupCard from './DocumentGroupCard';
import handleCatchError from '../../utils/handleCatchError';
import customAxios from '../../utils/http';
import Loader from '../../utils/Loader';

function SeeAllDocumentGroup() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSeeAll,setIsSeeAll] = useState(true);

    //for fectching the data at first
    const fetchDocumentGroup = async () => {
        try {
            setIsLoading(true);
            const response = await customAxios.get(`/documentGroup/getItem/${id}`);
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

    useEffect(() => {
        fetchDocumentGroup();
    }, [])
  return (
    <>
        { isLoading? (<Loader/>):(
            <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-2xl">Detail of Document Group</p>
                    <DocumentGroupCard data={formData} isSeeAll={isSeeAll}/>
            </div>
        )}
    </>
  )
}

export default SeeAllDocumentGroup
