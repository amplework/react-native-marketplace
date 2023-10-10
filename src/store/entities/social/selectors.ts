import { ISocialsState } from './types';

// const all = (state: ISocialsState) => state.socialItem;

const socialList = (state: ISocialsState) => state.socialItem.socialList;

const loading = (state: ISocialsState) => state.socialItem.loading;

const twitterOathToken = (state: ISocialsState) => state.socialItem.oOathToken;

export const socialSelectors = {
  loading,
  socialList,
  twitterOathToken,
};