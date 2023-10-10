export interface IRequestToken {
  accessToken: string;
}

export interface IRequestSocialSignup {
  accessToken: string;
  formData: any;
}

export interface IRequestAppleSignup {
  email: string;
  appleId: string;
  formData?: any;
}

export interface IRequestTokenApple {
  email: any;
  appleId: string;
}

export interface IResponseTokens {
  accessToken: string;
  refreshToken: string;
}

export type ResetPasswordRequest = {
  email: string;
  secureCode: string;
  password: string;
};

export type SecureCodePayload = {
  code: string;
  email: string;
  onSuccess: () => void;
};

export type SecureCodeWebPayload = {
  code: string;
  email: string;
};
