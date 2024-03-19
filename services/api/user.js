// services/api/user.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install this package

import vars from '../../env';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${vars.apiUrl}/api/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (firstName, email, password) => {
     console.log("REgister", firstName, email, password);
     console.log(`${vars.apiUrl}/api/users/register`)
     try {
       const response = await axios.post(`${vars.apiUrl}/api/users/register`, {
         firstName,
         email,
         password,
       });
       // Assuming your backend returns a token in the response upon successful registration
       const { token } = response.data;
       console.log(response)
       if (token) {
         // Save the token in AsyncStorage for future use
         await AsyncStorage.setItem('userToken', token);

         // Optionally, save other user data as needed
         await AsyncStorage.setItem('userData', JSON.stringify({
           _id: response.data._id,
           username: response.data.username,
           email: response.data.email,
         }));
       }

       return response.data;
     } catch (error) {
          console.log(error)
       throw error.response.data;
     }
   };

// Similar function for registerUser
