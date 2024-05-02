import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
export const AxiosGolbal: AxiosInstance = axios.create({
  baseURL: 'https://server-git-main-youssef-waels-projects.vercel.app/api',
  timeout: 10000, // optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an Axios instance
const AxiosJwt: AxiosInstance = axios.create({
  baseURL: 'https://server-git-main-youssef-waels-projects.vercel.app/api',
  timeout: 10000, // optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAccessToken = async () => {
  try {
    // Retrieve the accessToken from AsyncStorage
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      // Set the accessToken in the request headers
      AxiosJwt.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;
    } else {
      // If no accessToken found, remove Authorization header
      delete AxiosJwt.defaults.headers.common['Authorization'];
    }
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

// Add a request interceptor to include JWT token in outgoing requests
AxiosJwt.interceptors.request.use(
  async (config) => {
    await setAccessToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or invalidation
// AxiosJwt.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: any) => {
//     if (error.status === 401) {
//       // Handle token expiration or invalidation
//       // For example, redirect to login page or refresh token
//       console.log('Token expired or invalid. Redirecting to login page...');
//       // Clear token from AsyncStorage
//       await AsyncStorage.removeItem('token');
//     }

//     return Promise.reject(error);
//   }
// );

export default AxiosJwt;
