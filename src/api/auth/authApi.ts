import { Api } from 'api';
import { ApiResponse } from 'types/api';
import { IRequestToken, IRequestTokenApple, IResponseTokens } from 'types/auth';
import { Credentials } from 'types/users';

const signIn = (credentials: Credentials): ApiResponse<IResponseTokens> => 
  Api.post('/auth/login', credentials);

const facebook = (token: IRequestToken): ApiResponse<IResponseTokens> =>
  Api.post('/auth/facebook/token', token);

const google = (token: IRequestToken): ApiResponse<IResponseTokens> =>
  Api.post('/auth/google/token', { idToken: token.accessToken });

const apple = (token: IRequestTokenApple): ApiResponse<IResponseTokens> =>
  Api.post('/auth/apple/token', { email: token.email, appleId: token.appleId });

export const AuthApi = {
  signIn,
  facebook,
  google,
  apple
};
