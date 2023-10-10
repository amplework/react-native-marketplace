import { Api } from 'api';
import { ApiResponse } from 'types/api';

const signUp = (userData: any): ApiResponse<void> =>
  Api.post('/provider', userData).then((res) => {
    console.log("response data api ==== >>>> ", res);
    return res;
  }).catch((err) => {
    console.log("error data api ==== >>>> ", err);
    return err;
  })

export const AuthProviderApi = {
  signUp,
};
