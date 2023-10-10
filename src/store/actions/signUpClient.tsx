import * as type from 'store/types';

export function changeStep(action: number) {
  return {
    type: type.CHANGE_STEP_CLIENT,
    action,
  };
}

export function signUpGoogle(token: any, navigation: any) {
  return {
    type: type.SIGN_UP_CLIENT_GOOGLE,
    action: {
      token,
      navigation,
    },
  };
}

export function signUpFacebook(token: any, navigation: any) {
  return {
    type: type.SIGN_UP_CLIENT_FACEBOOK,
    action: {
      token,
      navigation,
    },
  };
}

export function signUpApple(token: any, navigation: any) {
  return {
    type: type.SIGN_UP_CLIENT_APPLE,
    action: {
      token,
      navigation,
    },
  };
}
