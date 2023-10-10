import * as type from 'store/types';

export function getClientProfile() {
  return {
    type: type.GET_CLIENT,
  };
}

export function updateClientProfile(action: any, fromOnlinePayment?: boolean) {
  return {
    type: type.UPDATE_CLIENT,
    action,
    fromOnlinePayment
  };
}

export function updateClientPassword(data: any, navigation: any) {
  return {
    type: type.UPDATE_CLIENT_PASSWORD,
    action: {
      data,
      navigation,
    },
  };
}

export const updateClientAddress = (payload: any) => ({
  type: type.UPDATE_CLIENT_ADDRESS,
  payload,
});
