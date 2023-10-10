import { DaysSchedule } from 'utils/constants';
import { Weekday } from 'utils/dates';

import { IAddress, ILocation } from './address';
import { IIndustry } from './industries';
import { IService } from './service';
import { BottomMenu, IClosedDays } from './settings';

export interface IProviderUser {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  phoneNumber: string;
  countryCode: any;
  deviceType: string;
  twiOauthToken: string;
  twiOauthTokenSecret: string;
  twiUsername: string;
  alternatePhoneNumber: string | null;
  birthday: string | null;
  notificationChannel: string;
  businessName: string;
  expectedEarning: number;
  isHouseCallAllowed: boolean;
  industryId: number;
  serviceId: number;
  address: IAddress | null;
  role: 'provider';
  isPasswordSet: boolean;
  invoiceNotes: string | null;
  utcOffset: number;
  utctimezone: string;
}

export interface IProviderCalendarSettings {
  dayStart: string;
  dayEnd: string;
  workingDays: Weekday[];
  weekdayTimes: DaysSchedule[];
  lunchStart: string;
  lunchEnd: string;
  utcOffset: number;
  utctimezone: string;
}

export type GetProvidersRequest = {
  query?: string;
  offset?: number;
};

export type GetBlockedProvidersRequest = {
  query?: string;
};

export type BlockProviderPayload =
  | {
      id: number;
      onSuccess?: () => void;
    }
  | any;

export type ProviderSettings = {
  bottomMenu: string;
};

export interface IProvider {
  id: number;
  firstName: string;
  lastName: string;
  photo: string | null;
  phoneNumber: string;
  businessName: string | null;
  service: Service | null;
  address: IAddress | null;
  closedDays: IClosedDays[];
  calendarSettings: IProviderCalendarSettings;
  settings: BottomMenu;
  isShortlisted: boolean;
  isHouseCallAllowed: boolean;
  isConnected: boolean;
  offer?: any;
  isLoyaltyReward?: boolean;
}

type Service = {
  id: number;
  name: string;
};

export interface ISearchProvidersRequest {
  query: string;
  offset: number;
  location?: ILocation;
  serviceIds: number[];
}

export interface IProviderPublicProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  phoneNumber: string;
  alternatePhoneNumber: string | null;
  businessName: string;
  address: IAddress | null;
  closedDays: IClosedDays[];
  calendarSettings: IProviderCalendarSettings;
  isShortlisted: boolean;
  isConnected: boolean;
  isHouseCallAllowed: boolean;
  lastAppointmentDate: string;
  upcomingAppointmentDate: string;
  industry: IIndustry;
  rewards?: any;
}

export interface IUpdatePasswordRequest {
  password: string;
  currentPassword?: string;
}

export interface IClientUser {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  phoneNumber: string;
  alternatePhoneNumber: string;
  birthday: string | null;
  notificationChannel: string;
  address: IAddress | null;
  services: IService[];
  role: 'client';
  isPasswordSet: boolean;
  utcOffset: number;
  utctimezone: string;
}

export type User = IProviderUser | IClientUser;

export const isProvider = (user?: User): user is IProviderUser =>
  user?.role === 'provider';

export const isClient = (user?: User): user is IClientUser =>
  user?.role === 'client';

export type Credentials = {
  email: string;
  password: string;
};

export type GeneralUserData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type Avatar = {
  path: string;
  mime: string;
  filename: string;
};

export type ProviderPreview = {
  id: number;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  phoneNumber: string | null;
};
