import * as type from 'store/types';

export function changeStep(action: number) {
  return {
    type: type.CHANGE_STEP_FORGOT_PASSWORD,
    action,
  };
}

export function forgotPasswordEmail(email: string) {
  return {
    type: type.FORGOT_PASSWORD_EMAIL,
    email,
  };
}

export function forgotVerifySecureCode(email: string, code: string) {
  return {
    type: type.FORGOT_VERIFY_SECURE_CODE,
    action: {
      email,
      code,
    },
  };
}

export function resetPassword(action: {
  email: string;
  secureCode: string;
  password: string;
}) {
  return {
    type: type.RESET_PASSWORD,
    action,
  };
}
