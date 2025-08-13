import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/v4',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('fakeToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token attached to request headers.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
