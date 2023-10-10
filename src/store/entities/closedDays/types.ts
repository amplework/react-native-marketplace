import { IClosedDays as IClosedDaysItem } from 'types/settings';

export interface IClosedDaysState {
  closedDays: IClosedDays;
}

export interface IClosedDays {
  closedDaysList: IClosedDaysItem[];
  isModalOpened: boolean;
  closedDays: IClosedDaysItem | null;
  isLoading: boolean;
  isModalVisible: boolean;
}
