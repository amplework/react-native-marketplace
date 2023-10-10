import { BottomMenu } from 'types/settings';

export type BottomMenuState = {
  bottomMenu: BottomMenuSlice;
};

export type BottomMenuSlice = {
  settings: BottomMenu;
  loading: boolean;
};
