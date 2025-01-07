import React, { useEffect } from 'react'
import customAxios from '../utils/http'

function Setting() {
    async function fetchRole(){
        const response = await customAxios.get('/person/getroles/1');
        const dt=  await response.data;
        console.log(dt)
    }

    useEffect(()=>{
        fetchRole();
    },[])
    return (
        <div>
        This is setting
        </div>
    )
}

export default Setting
