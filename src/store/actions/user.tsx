import * as type from 'store/types';

type verifyEmailData = {
  email: string;
};

export function signUpClient(action: any, navigation?: any) {
  return {
    type: type.SIGN_UP_CLIENT,
    action: {
      userData: action,
      navigation,
    },
  };
}

export function verifySecureCodeClient(action: {
  code: string;
  email: string;
}) {
  return {
    type: type.VERIFICATION_SECURE_CODE_CLIENT,
    action,
  };
}

export function verifyEmailClient(action: verifyEmailData) {
  return {
    type: type.VERIFICATION_EMAIL_CLIENT,
    action,
  };
}
