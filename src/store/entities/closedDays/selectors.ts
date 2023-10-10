import { IClosedDaysState } from './types';

const all = (state: IClosedDaysState) => state.closedDays;

const closedDaysList = (state: IClosedDaysState) => all(state).closedDaysList;

const isLoading = (state: IClosedDaysState) => all(state).isLoading;

const isModalOpened = (state: IClosedDaysState) => all(state).isModalOpened;

const isModalVisible = (state: IClosedDaysState) => all(state).isModalVisible;

const closedDays = (state: IClosedDaysState) => all(state).closedDays;

export const closedDaysSelectors = {
  closedDaysList,
  isLoading,
  isModalOpened,
  isModalVisible,
  closedDays,
};
