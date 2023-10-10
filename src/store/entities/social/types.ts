import { ISocial } from 'types/social';

export interface ISocialsState {
  socialItem: ISocials;
}

export interface ISocials {
  socialList: ISocial[];
  loading: boolean;
  oOathToken: any;
  isVisible: boolean;
  isTwitterEnabled: boolean;
  isFacebookEnabled: boolean;
  isInstagramEnabled: boolean;
  isFacebookModalVisible: boolean;
  twitterAccessToken: string | null;
  twitterAccessTokenSecret: string | null;
  twitterUserId: string | null;
  fbPageDetails: any;
}