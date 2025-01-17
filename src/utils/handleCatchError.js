import { showToast } from './ReactToast';

const handleCatchError = (error,navigate) => {
    if (error.code === 'ECONNABORTED') {
        showToast("The request timed out. Please try again later.","error")
        navigate("/login");
    } 
    else if (error.code === 'ERR_NETWORK') {
        console.log("Error: ",error);
        showToast("Network Error. Please try again later.","error")
        navigate("/login");
    }
    else if (error.response?.status === 401) {
        showToast("Session Expired, Please login !!", 'warn');
        navigate("/login");
    }
    else if(error.code === 'ERR_BAD_REQUEST'){
        console.log(error.response)
        return showToast("Error: Task Incomplete",'error');
    }
    else {
        showToast("Something went wrong!", 'error');
        navigate("/login");
    }
    
}

export default handleCatchError;
