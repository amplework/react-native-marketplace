import { Api } from 'api';
import axios from 'axios';
import { ApiResponse } from 'types/api';

const checkUser = (email: string): ApiResponse<void> =>
  Api.head(`/user/email/${email}`)

const verifyEmail = (email: string): ApiResponse<void> =>
  Api.post(`/user/verification/${email}`).then((res) => {
    console.log("response verifyEmail api ==== >>>> ", res);
    return res;
  }).catch((err) => {
    console.log("error verifyEmail api ==== >>>> ", err);
    return err;
  });

const verifyWebUser = (
  email: object, 
  ): ApiResponse<void> => Api.post('/auth/verifySecureCode', email);

const verifyCode = (
  code: string,
  email: string,
  type?: string,
): ApiResponse<void> =>
  Api.post('/user/verify-code', {
    code,
    type: type || 'email verification',
    identity: email,
  });

const getUser = (): ApiResponse<any> => Api.get('/user/profile');

const getDeviceInfo = async (): ApiResponse<any> => axios.get('https://ipapi.co/json/').then((res: any) => {
  return res;
}).then((err: any) => {
  return err;
})

const deleteAccount = (): ApiResponse<void> =>
  Api.patch(`/user/deleteAccount`).then((res: any) => {
    console.log("deleteAccount res ===>>>> ", res);
    return res;
  }).catch((err : any) => {
    console.log("deleteAccount err ===>>>> ", err);
    return err;
  });

export const UserApi = {
  checkUser,
  verifyEmail,
  verifyCode,
  getUser,
  verifyWebUser,
  getDeviceInfo,
  deleteAccount
};
