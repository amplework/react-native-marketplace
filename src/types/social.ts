import { AnyObject } from "immer/dist/internal";

export interface ISocial {
  id: number;
  label: string;
  value: string | null;
  icon: string;
  isActive: boolean;
  isLinked: boolean;
}

export interface FacebookPageParams {
  name: string | null;
  picture: any | null;
  access_token: string | null;
  id: string | null;
}

export type TwitterUsernameParams = {
  userId: string;
  accessToken: string;
};

export type TwitterAuthParams = {
  oauthVerifier: string;
  oauthToken: string;
};

export type TwitterAuthSuccessParams = {
  accessToken: string;
  accessTokenSecret: string;
  userId: string;
};

export type PostTweetParams = {
  data: any;
  userToken: string;
  userTokenSecret: string;
  isSocial?: boolean;
  id?: number;
};

export type RequestFbTokenParam = {
  accessToken: string;
  userId: string;
};

export type RequestPageTokenParams = {
  pageAccessToken: string;
  pageId: string;
};

export type FacebookPostParams = {
  pageId: string;
  message: string;
  url?: string;
  pageAccessToken: string;
  isSocial?: boolean;
  id?: number;
};

export type InstagramContainerParams = {
  pageId: string;
  url?: string;
  caption: string;
  pageAccessToken: string;
};

export type InstagramPostParams = {
  pageId: string;
  creationId: string;
  pageAccessToken: string;
  isSocial?: boolean;
  id?: number;
};

export type PostOnAllPlatformPayload = {
  twitterDetails?: PostTweetParams;
  fbDetails: FacebookPostParams;
  instaDetails?: InstagramContainerParams;
  isSocial?: boolean;
  id?: number;
}
