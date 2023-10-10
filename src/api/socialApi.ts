import axios from 'axios';

export const SocialApi = axios.create({
  baseURL: 'https://api.twitter.com',
  timeout: 10000,
});

export const SocialFbApi = axios.create({
  baseURL: 'https://graph.facebook.com',
  timeout: 10000,
});

export const LIMIT = 20;

SocialApi.interceptors.request.use(
  async (request) => {   
    return request;
  },
  (error) => Promise.reject(error),
);

SocialApi.interceptors.response.use(
  (response) => {  
    return response;
  },
  async (error) => { 
    return error;
  },
);

SocialFbApi.interceptors.request.use(
  async (request) => {   
    return request;
  },
  (error) => Promise.reject(error),
);

SocialFbApi.interceptors.response.use(
  (response) => {  
    return response;
  },
  async (error) => { 
    return error;
  },
);
