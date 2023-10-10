export type ClientConnectState = {
  clientConnect: ClientConnect;
};

export type ClientConnect = {
  fbShare: boolean;
  instaShare: boolean;
  shareWithOther: boolean;
  shareWithClients: boolean;
  clientConnect: any;
  clientBlast: any;
  clientSocialMediaPost: any;
  loading: boolean;
  isModalOpened: boolean;
  clientChecked: any;
  blastLoading: boolean;
};
