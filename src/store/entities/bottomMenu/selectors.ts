import { BottomMenuState } from './types';

const all = (state: BottomMenuState) => state.bottomMenu;

const settings = (state: BottomMenuState) => all(state).settings;

const loading = (state: BottomMenuState) => all(state).loading;

export const bottomMenuSelectors = {
  settings,
  loading,
};
