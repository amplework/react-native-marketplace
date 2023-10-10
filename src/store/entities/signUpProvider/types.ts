export type SignUpProviderState = {
  signUpProvider: SignUpProviderInitialState;
};

export type SignUpProviderInitialState = {
  step: number;
  loading: boolean;
  social: boolean;
  accessTokenFacebook: string | null;
  accessTokenGoogle: string | null;
  accessTokenApple: string | null;
};
