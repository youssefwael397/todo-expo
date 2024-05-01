import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const AxiosJwt: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000, // optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token in outgoing requests
AxiosJwt.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    // Get the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');

    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  async (error: any) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or invalidation
AxiosJwt.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    if (error.status === 401) {
      // Handle token expiration or invalidation
      // For example, redirect to login page or refresh token
      console.log('Token expired or invalid. Redirecting to login page...');
      // Clear token from AsyncStorage
      await AsyncStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default AxiosJwt;
