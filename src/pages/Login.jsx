import React, { useEffect, useState } from "react";
import customAxios from "../utils/http";
import { useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../utils/ReactToast";
import handleCatchError from "../utils/handleCatchError";
import CLoader from "../utils/CLoader";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    try {
      setIsLoading(true);
      const response = await customAxios.post("/auth/login", formData);
      if (response.status == 200) {
        const token = await response.data.Token;
        localStorage.setItem('authToken', token);
        showToast("Login Successfully !!", "success");
        setIsLoading(false);
        navigate('/');
      }
    }
    catch (error) {
      handleCatchError(error, navigate);
    }
    finally { setIsLoading(false) };
  };


  useEffect(()=>{
    document.title ="Login | Lunar"
  },[]);
  
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="UserName" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="UserName"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              placeholder="username"
              className="w-full border px-3 py-2 rounded p-4"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="Password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="password"
              className="w-full border px-3 py-2 rounded p-4"
              required
            />
          </div>

          {/* Submit Button */}
          {isLoading ? (<CLoader />) :
            (<button
              type="submit"
              className="w-full bg-blue-500 border text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300">            Login
            </button>)
          }
        </form>
      </div>
    </>
  );
};

export default Login;
