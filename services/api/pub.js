// services/api/pubs.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install this package

import vars from '../../env';

export const fetchPubs = async (searchQuery) => {
     try {
         // Construct the URL with a conditional query parameter
         console.log("Search Query: ", searchQuery);
         const url = `${vars.apiUrl}/api/pubs${searchQuery ? `?city=${encodeURIComponent(searchQuery)}` : ''}`;
         
         const response = await axios.get(url);
         console.log(response.data)
         return response.data; // Return the data directly for the caller to handle
     } catch (error) {
         console.error("Failed to fetch pubs:", error);
         throw error; // Rethrow to let the caller handle the exception
     }
 };

 export const fetchMenu = async (pubId) => {
     try {
         const token = await AsyncStorage.getItem('userToken');
         const url = `${vars.apiUrl}/api/pubs/${pubId.pubId}/drinks`;
         console.log("get Menu url ", url)
         const response = await axios.get(url, {
          headers: {
               'Authorization': `Bearer ${token}`
          }
         });
         console.log(response.data)
         return response.data;
     } catch (error) {
         console.error("Failed to fetch pubs:", error);
         throw error;
     }
 };


 export const handleFavoriteApi = async (pubId) => {
     try {
       const token = await AsyncStorage.getItem('userToken');
       // Include the pubId in the URL path
       const url = `${vars.apiUrl}/api/pubs/${pubId}/favorite`;
   
       const response = await axios.put(url, {}, { // Empty body if toggling, or include relevant data
         headers: {
           'Authorization': `Bearer ${token}`
         }
       });
   
       console.log("Response in API: ", response.data);
       return response.data;
     } catch (error) {
       console.error("Failed to update follow status:", error);
       throw error;
     }
   };
 

   export const updateCheckInStatus = async (pubId, checkIn) => {
     try {
       const token = await AsyncStorage.getItem('userToken');
       // Include the pubId in the URL path
       const url = `${vars.apiUrl}/api/pubs/${pubId}/checkin`;
       
       const response = await axios.put(url, {
         checkIn // Assuming backend expects this, adjust according to actual backend needs
       }, {
         headers: {
           'Authorization': `Bearer ${token}`
         }
       });
       
       console.log(response.data);
       return response.data;
     } catch (error) {
       console.error("Failed to update check-in status:", error);
       throw error;
     }
   };
 
   