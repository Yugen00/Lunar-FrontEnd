import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customAxios from '../../utils/http';
import { showToast } from '../../utils/ReactToast';
import handleCatchError from '../../utils/handleCatchError';
import CLoader from '../../utils/CLoader';

function InsertOffice({ setOriginalData, setInsertModalOpen }) {
  const navigate = useNavigate();
  const [isBeingProcessed, setIsBeingProcessed] = useState(false);
  const [formData, setFormData] = useState([])

  const formFields = [
    { name: "OfficeName", label: "Office Name", type: "text", colSpan: 1, required: true },
    { name: "OfficeShortName", label: "Office Short Name", type: "text", colSpan: 1, required: true },
    { name: "OfficeAddress", label: "Office Address", type: "text", colSpan: 2, required: true },
    { name: "OfficeEmail", label: "Office Email", type: "text", colSpan: 1, required: false },
    { name: "EmailPassword", label: "Email Password", type: "password", colSpan: 1, required: false },
    { name: "EstdDate", label: "Establish Date", type: "text", colSpan: 1, required: true },
    { name: "Pan", label: "Pan Number", type: "number", colSpan: 1, required: false },
    { name: "OfficePhonePrimary", label: "Primary Phone Number", type: "number", colSpan: 1, required: true },
    { name: "OfficePhoneSecondary", label: "Secondary Phone Number", type: "number", colSpan: 1, required: false },
    { name: "RegistrationNo", label: "Registration Number", type: "number", colSpan: 2, required: false },
    { name: "Motto", label: "Motto", type: "text", colSpan: 2, required: false },
    { name: "WebSite", label: "Website", type: "text", colSpan: 2, required: false },
    { name: "DevelopedBy", label: "Developed By", type: "text", colSpan: 1, required: false },
    { name: "DeveloperSite", label: "Developer Site", type: "text", colSpan: 1, required: false },
  ];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter only required fields
    const requiredFields = formFields.filter(field => field.required);

    // Find the first missing required field
    const missingField = requiredFields.find(
      field => !formData[field.name]?.trim() // Check if the value is empty or missing
    );

    if (missingField) {
      showToast(`"${missingField.label}" is required!`, 'error');
      return;
    }

    try {
      setIsBeingProcessed(true);
      const response = await customAxios.post('/office/insert', formData);
      if (response.status == 200) {
        const newData = await response.data;
        console.log(newData)
        setOriginalData((prev) => [...prev, newData]);
        setInsertModalOpen(false);
        showToast("Course Group Inserted Successfully", "success");
      }
    } catch (error) {
      handleCatchError(error, navigate);
    }
    finally {
      setIsBeingProcessed(false);
    }
  };

  return (
    <>
      <div className='fixed inset-0 z-20 bg-black bg-opacity-75 flex justify-center items-center '>
        <div className='flex mx-auto w-full justify-center mt-[64px] max-h-[100%]'>
          <div className='w-full border bg-white sm:max-w-xl m-4 p-4 sm:m-10 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
            <div className='flex justify-end'>
              <button
                className="close-btn text-2xl text-indigo-700 font-extrabold hover:text-red-300"
                onClick={() => setInsertModalOpen(false)}
              >
                X
              </button>
            </div>
            <div className="mt-4 ">
              {/* Heading */}
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Insert Office Detail
              </h1>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div key={field.name} className={`md:col-span-${field.colSpan}`}>
                    <label htmlFor={field.name} className="block text-lg font-medium text-gray-800 mb-1">
                      {field.label}
                      {field?.required && <span className="text-red-600"> *</span>}
                    </label>
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-100"
                      required
                    />
                  </div>
                ))}

                {/* Buttons */}
                <div className="md:col-span-2 flex flex-wrap justify-end gap-4">
                  <button
                    type="reset"
                    className="px-6 py-3 bg-red-700 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                  >
                    Clear
                  </button>
                  {isBeingProcessed ? (<CLoader />) : (
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-blue-900 text-white text-sm rounded-lg shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      Insert
                    </button>
                  )}
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsertOffice;
