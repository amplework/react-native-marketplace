import { UserState } from './types';

const all = (state: UserState) => state.user;

const user = (state: UserState) => all(state).user;

const isProvider = (state: UserState) => all(state).user?.role === 'provider';

const loading = (state: UserState) => all(state).loading;

const tab = (state: UserState) => all(state).tab;

const utcOffset = (state: UserState) => all(state).utcOffset;

const utctimezone = (state: UserState) => all(state).utctimezone;

const isWebUser = (state: UserState) => all(state).isWebUser;

const deviceLocales = (state: UserState) => all(state).deviceInfo;

const countryPickerModal = (state: UserState) => all(state).countryCodeModal;

export const userSelectors = {
  user,
  isProvider,
  loading,
  tab,
  utcOffset,
  utctimezone,
  isWebUser,
  deviceLocales,
  countryPickerModal
};
