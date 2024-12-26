import CryptoJS from 'crypto-js';

//in vite=> process.env == import.meta.env
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; 

// Function to create a tokenized ID
export const createTokenizedID = (id) => {
  return CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString();
};

//Function to decrypt the tokenized ID
export const verifyTokenizedID = (tokenizedId) => {
    try {
      const bytes = CryptoJS.AES.decrypt(tokenizedId, SECRET_KEY);
      const originalID = bytes.toString(CryptoJS.enc.Utf8);
      if (!originalID){
          return false;
      } 
      return originalID;

    } catch (error) {
      return null; // Return null if verification fails
    }
};