import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { env } from 'config';
import { toast } from 'shared/toast';
import { IResponseTokens } from 'types/auth';

export const Api = axios.create({
  baseURL: env.API_HOST,
  timeout: 15000,
});

export const LIMIT = 20;

Api.interceptors.request.use(
  async (request) => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      request.headers.authorization = `Bearer ${userToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorData = { ...error.response };
    if (error?.response?.status !== 401) {
      if (errorData?.status == 409) {
        return Promise.reject({
          message: errorData?.message || errorData?.data?.message,
          status: errorData?.status || errorData?.data?.status,
        });
      }
      if (error?.message === 'Network Error') {
        toast.info('Please check your internet connection!');
        return Promise.reject(error?.message);
      }
      return Promise.reject(error?.response?.data);
    }
    const request = await refreshUserToken(error);

    return request;
  },
);

const refreshUserToken = async (error: any) => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  if (!refreshToken) {
    return;
  }

  const { data } = await Api.post<IResponseTokens>('/auth/refresh', {
    refreshToken,
  });

  await AsyncStorage.setItem('userToken', data?.accessToken);
  await AsyncStorage.setItem('refreshToken', data?.refreshToken);

  error.config.headers.authorization = `Bearer ${data?.accessToken}`;

  return axios.request(error?.response?.config);
};
