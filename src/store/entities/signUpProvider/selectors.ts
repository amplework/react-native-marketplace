import { SignUpProviderState } from './types';

const all = (state: SignUpProviderState) => state.signUpProvider;

const social = (state: SignUpProviderState) => all(state).social;

const loading = (state: SignUpProviderState) => all(state).loading;

const step = (state: SignUpProviderState) => all(state).step;

const accessTokenFacebook = (state: SignUpProviderState) =>
  all(state).accessTokenFacebook;

const accessTokenGoogle = (state: SignUpProviderState) =>
  all(state).accessTokenGoogle;

const accessTokenApple = (state: SignUpProviderState) =>
  all(state).accessTokenApple;

export const signUpProviderSelectors = {
  social,
  loading,
  step,
  accessTokenFacebook,
  accessTokenGoogle,
  accessTokenApple,
};
