import AsyncStorage from '@react-native-async-storage/async-storage';
import { IResponseTokens } from 'types/auth';

export type PayloadHandlers = {
  onSuccess?: () => void;
  onFailure?: () => void;
};

export const saveUserTokens = async ({
  accessToken,
  refreshToken,
}: IResponseTokens): Promise<void> => {
  await AsyncStorage.setItem('userToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
};
