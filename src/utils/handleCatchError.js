import { showToast } from './ReactToast';

const handleCatchError = (error,navigate) => {
    console.log(error)
    if (error.code === 'ECONNABORTED') {
        showToast("The request timed out. Please try again later.","error")
        navigate("/login");
    } 
    else if (error.code === 'ERR_NETWORK') {
        console.log("Error: ",error);
        showToast("Network Error. Please try again later.","error")
        navigate("/login");
    }
    else if (error.response.status === 401) {
        showToast("Session Expired, Please login !!", 'warn');
        navigate("/login");
    }
    else if(error.code === 'ERR_BAD_REQUEST'){
        showToast("Error: Task incomplete", 'error');
    }
    else {
        showToast("Something went wrong!", 'error');
        navigate("/login");
    }
    
}

export default handleCatchError;
