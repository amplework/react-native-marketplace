import { ClientConnectState } from './type';

const all = (state: ClientConnectState) => state.clientConnect;

const clientConnect = (state: ClientConnectState) => all(state).clientConnect;

const isModalOpened = (state: ClientConnectState) => all(state).isModalOpened;

const fbShare = (state: ClientConnectState) => all(state).fbShare;

const instaShare = (state: ClientConnectState) => all(state).instaShare;

const shareWithOther = (state: ClientConnectState) => all(state).shareWithOther;

const shareWithClients = (state: ClientConnectState) =>
  all(state).shareWithClients;

const clientBlast = (state: ClientConnectState) => all(state).clientBlast;

const clientSocialMediaPost = (state: ClientConnectState) =>
  all(state).clientSocialMediaPost;

const loading = (state: ClientConnectState) => all(state).loading;

const blastLoading = (state: ClientConnectState) => all(state).blastLoading;

const clientChecked = (state: ClientConnectState) => all(state).clientChecked;

export const clientConnectSelectors = {
  clientConnect,
  clientBlast,
  clientSocialMediaPost,
  loading,
  blastLoading,
  isModalOpened,
  clientChecked,
  fbShare,
  instaShare,
  shareWithOther,
  shareWithClients,
};
