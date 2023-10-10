import { User } from 'types/users';

export type UserState = {
  user: UserInitialState;
};

export type UserInitialState = {
  user?: User;
  loading: boolean;
  tab: number;
  utcOffset: number;
  utctimezone:string;
  isWebUser: any;
  webUserData: any;
  deviceInfo: any;
  countryCodeModal: boolean;
};
