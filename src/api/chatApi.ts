import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { env } from 'config';
import { IResponseTokens } from 'types/auth';

export const ChatApi = axios.create({
  baseURL: env.CHAT_API_HOST,
  timeout: 10000,
  // baseURL: 'http://prodapi.goalphapro.com:4020',
});

ChatApi.interceptors.request.use(
  async (request) => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken) {
      request.headers.authorization = `Bearer ${userToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

ChatApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status !== 401) {
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

  const { data } = await ChatApi.post<IResponseTokens>('/auth/refresh', {
    refreshToken,
  });

  await AsyncStorage.setItem('userToken', data?.accessToken);
  await AsyncStorage.setItem('refreshToken', data?.refreshToken);

  error.config.headers.authorization = `Bearer ${data?.accessToken}`;

  return axios.request(error?.response?.config);
};
