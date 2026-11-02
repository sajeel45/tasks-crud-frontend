import axios from 'axios';
import { basePath } from './constants';

const apiService = axios.create({
  baseURL: basePath,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;
