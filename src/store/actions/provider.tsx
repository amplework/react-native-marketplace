import * as type from 'store/types';

export function getProviderProfile() {
  return {
    type: type.GET_PROVIDER,
  };
}

export function updateProviderProfile(action: any, goBack?: boolean) {
  return {
    type: type.UPDATE_PROVIDER,
    action,
    goBack
  };
}

export function closeProfileCompleteModal() {
  return {
    type: type.CLOSE_PROFILE_COMPLETE_MODAL,
  };
}

export function updateProviderDetails(action: any, goBack?: boolean) {
  return {
    type: type.UPDATE_PROVIDER_DETAILS,
    action,
    goBack
  };
}

export function updateProviderTwitterDetails(action: any) {
  return {
    type: type.UPDATE_PROVIDER_TWITTER,
    action,
  };
}

export function updateProviderFacebookDetails(action: any) {
  return {
    type: type.UPDATE_PROVIDER_FACEBOOK,
    action,
  };
}

export function updateProviderInstagramDetails(action: any) {
  return {
    type: type.UPDATE_PROVIDER_INSTAGRAM,
    action,
  };
}

export function isMoreDetails(data: any) {
  return {
    type: type.MORE_DETAILS,
    action: {
      data
    },
  };
}

export function updateProviderPassword(data: any, navigation: any) {
  return {
    type: type.UPDATE_PROVIDER_PASSWORD,
    action: {
      data,
      navigation,
    },
  };
}

export function updateProviderProfileStatus(action: any) {
  return {
    type: type.UPDATE_PROVIDER_PROFILE_STATUS,
    action,
  };
}

export function updateProfileCompleteStatus(action: any) {
  return {
    type: type.UPDATE_PROFILE_COMPLETE_STATUS,
    action,
  };
}

