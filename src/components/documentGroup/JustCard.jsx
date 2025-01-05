import React, { useEffect, useState } from 'react'
import DeleteItem from '../DeleteItem'
import { Link, useNavigate } from 'react-router-dom';
import { createTokenizedID } from '../../utils/encryption';
import customAxios from '../../utils/http';
import handleCatchError from '../../utils/handleCatchError';
import { showToast } from '../../utils/ReactToast';

function JustCard({ data, handleDataChange, toggleChildren, index, childIndex, level,isSeeAll }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenizedId, setTokenizedId] = useState('');
  const [tokenizedName, setTokenizedName] = useState('');

  useEffect(() => {
    const tknId = data?.GroupId ? createTokenizedID(data.GroupId.toString()) : '';
    const tknName = data?.GroupName ? createTokenizedID(data.GroupName.toString()) : '';
    setTokenizedId(tknId);
    setTokenizedName(tknName);
  }, [])

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteHandle = async () => {
    try {
      const response = await customAxios.delete(`/documentGroup/Block/${data.GroupId}`);
      if (response.status == 200) {
        setIsModalOpen(false);
        showToast("Data Blocked Successfully", "success");
        handleDataChange();
      }
    } catch (error) {
      handleCatchError(error, navigate);
    }
  };

  // Recursive index generation for each row
  const getHierarchicalIndex = (index, childIndex) => {
    let indexString = `${index + 1}`; // Main index
    childIndex.forEach((childIdx) => {
      indexString += `.${childIdx + 1}`; // Add child index at the current level
    });
    return indexString;
  };
  
  
  // Get the background color based on the level
  const getBackgroundColor = (level) => {
    // List of colors for each level
    const levelColors = ['bg-white','bg-cyan-100', 'bg-yellow-100', 'bg-green-100'];
    return levelColors[level % levelColors.length]; // Loop through the list if there are more levels than colors
  };

  // Determine the background color depending on whether the row is a child or not
  const backgroundColor = childIndex ? getBackgroundColor(level) : '';

  return (
    <>
      {/* Document Group Card */}
      <div 
        className={`p-6 m-4 ${isSeeAll ? ('sm:max-w-[50%]') : ('')} ${backgroundColor} border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 `}
        style={{ marginLeft: `${level * 10}px` }}
      >
        <h3 className="text-2xl font-semibold text-gray-800">
          {isSeeAll ? (data.GroupName) : (`${getHierarchicalIndex(index, childIndex)}   ${data.GroupName}`)}
        </h3>
        {isSeeAll && <div>
          <p className="text-gray-600 mt-2 break-words"><b>Description:</b> {data?.GroupDescription}</p>
          <p className="text-gray-600 mt-2 break-words"><b>Office:</b> {data?.OfficeName}</p>
        </div>
        }
        {!isSeeAll && <div>
          <p
            className=" text-gray-600 mt-2 text-ellipsis cursor-pointer"
            onClick={() => navigate(`/documentGroup/seeDetail/${encodeURIComponent(tokenizedId)}`)}
            title="Click to see full details">
            <b>Description:</b> {data?.GroupDescription?.length > 15 ? (`${data.GroupDescription.slice(0, 15)} ...`) : (data.GroupDescription)}
          </p>
          <p
            className=" text-gray-600 mt-2 text-ellipsis cursor-pointer"
            onClick={() => navigate(`/documentGroup/seeDetail/${encodeURIComponent(tokenizedId)}`)}
            title="Click to see full details">
            <b>Office:</b> {data?.OfficeName?.length > 15 ? (`${data.OfficeName.slice(0, 15)} ...`) : (data.OfficeName)}
          </p>
        </div>
        }
        <p className="text-gray-600 mt-2"><b>Parent Name:</b> {data.ParentName || "Self"}</p>
        {/* For only viewAll */}
        {isSeeAll && (<div>
          <p className="text-gray-600 mt-2"><b>Max Count:</b> {data.MaxCount}</p>
          <p className="text-gray-600 mt-2"><b>Allow Multiple Files Upload:</b> {data.AllowMultipleFilesUpload ? "True" : "False"}</p>

        </div>)}

        <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${data.IsActive ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {data.IsActive ? "Active" : "Blocked"}
          </span>
        </div>

        {/* Action Buttons */}
        {!isSeeAll && <div className="mt-6 flex justify-start gap-4">
          {data.IsActive && (<Link to={`/documentGroup/update/${data.GroupId}`}>
            <button className="px-4 py-2 text-white bg-blue-600 text-sm rounded-md hover:bg-blue-500 transition duration-300">
              Edit
            </button>
          </Link>)}

          {/* Block Button */}
          {data.IsActive && data?.children?.length === 0 && (
            <button
              onClick={handleModal}
              className="px-4 py-2 text-white bg-red-600 rounded-md text-[12px] hover:bg-red-500 transition duration-300"
            >
              Block
            </button>
          )}
          {
            data.IsActive && (
              <Link to={`/documentGroup/insert?id=${encodeURIComponent(tokenizedId)}&name=${encodeURIComponent(tokenizedName)}`}>
                <button className="px-4 py-2 z-10 text-white text-[12px] bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                  <i className='bx bx-plus-medical mr-1'></i> Sub-Doc
                </button>
              </Link>
            )
          }
          {
            data?.children?.length > 0 && (
              <i className='ml-1 bx bxs-down-arrow cursor-pointer text-[12px] text-blue-800' onClick={toggleChildren}></i>
            )
          }
        </div>}


        {/* For back in details page */}
        {isSeeAll && <div className="mt-6 flex justify-start gap-4">
          <Link to={`/documentGroup`}>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300">
              Go Back
            </button>
          </Link>
        </div>
        }
      </div>

      {/* Handaling delete modal */}
      {isModalOpen &&
        <DeleteItem handleModal={handleModal} deleteHandle={deleteHandle} name={data?.GroupName} />
      }
    </>
  )
}

export default JustCard
