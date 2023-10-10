import { t, translations } from 'locales';
import moment from 'moment-timezone';
import { ImageSourcePropType, Linking } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import { alert } from 'shared/alert';

import { parseApiTime, Weekday } from './dates';
import { isIOS } from './device';

export const SHORT_FIELD_MAX_LENGTH = 100;

export const FIELD_MAX_LENGTH = 255;

export const FIELD_MIN_LENGTH = 3;

export const PREVIOUS_PLACES_KEY = 'previousPlaces';

export const INVOICE_NOTES_KEY = 'hints/notes';

export const UTC_OFFSET_KEY = 'utcOffset';

export const UTC_TIMEZONE = 'utcTimezone';

export const FIRST_LOGIN = 'firstLogin';

export const USER_TOKEN = 'userToken';

export const REFRESH_TOKEN = 'refreshToken';

export const LONGTAIL_USER = 'Longtail-User';

export const DYNAMIC_LINK = 'alphaDynamicLink';

export const LOCATION_PERMISSION = isIOS
  ? PERMISSIONS.IOS.LOCATION_ALWAYS
  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

type Day = {
  name: string;
  short: string;
  value: Weekday;
  index: number;
};

type DayWithTime = {
  name: string;
  short: string;
  value: Weekday;
  index: number;
  startTime: string | Date | moment.Moment;
  endTime: string | Date | moment.Moment;
};

export type DaysSchedule = {
  weekDay: string;
  startTime: string | Date | moment.Moment;
  endTime: string | Date | moment.Moment;
};

export const PRIVACY_POLICY_URL = 'https://goalphapro.com/privacy-policy';

export const TERMS_OF_URL = 'https://goalphapro.com/terms-condition';

export const openUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    alert.info(`Don't know how to open this URL: ${url}`);
  }
};

export const DAYS_SCHEDULE: DaysSchedule[] = [
  {
    weekDay: 'monday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
  {
    weekDay: 'tuesday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
  {
    weekDay: 'wednesday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
  {
    weekDay: 'thursday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
  {
    weekDay: 'friday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
  {
    weekDay: 'saturday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
  {
    weekDay: 'sunday',
    startTime: parseApiTime('09:00:00'),
    endTime: parseApiTime('19:00:00'),
  },
];

export const DAYS: Day[] = [
  {
    name: t(translations.common.days.saturday),
    short: t(translations.common.days.sat),
    value: 'saturday',
    index: 0,
  },
  {
    name: t(translations.common.days.sunday),
    short: t(translations.common.days.sun),
    value: 'sunday',
    index: 1,
  },
  {
    name: t(translations.common.days.monday),
    short: t(translations.common.days.mon),
    value: 'monday',
    index: 2,
  },
  {
    name: t(translations.common.days.tuesday),
    short: t(translations.common.days.tue),
    value: 'tuesday',
    index: 3,
  },
  {
    name: t(translations.common.days.wednesday),
    short: t(translations.common.days.wed),
    value: 'wednesday',
    index: 4,
  },
  {
    name: t(translations.common.days.thursday),
    short: t(translations.common.days.thu),
    value: 'thursday',
    index: 5,
  },
  {
    name: t(translations.common.days.friday),
    short: t(translations.common.days.fri),
    value: 'friday',
    index: 6,
  },
];

export type Month = {
  name: string;
  short: string;
  value: number;
};

export const MONTHS: Month[] = [
  {
    name: t(translations.common.months.january),
    short: t(translations.common.months.jan),
    value: 1,
  },
  {
    name: t(translations.common.months.february),
    short: t(translations.common.months.feb),
    value: 2,
  },
  {
    name: t(translations.common.months.march),
    short: t(translations.common.months.mar),
    value: 3,
  },
  {
    name: t(translations.common.months.april),
    short: t(translations.common.months.apr),
    value: 4,
  },
  {
    name: t(translations.common.months.may),
    short: t(translations.common.months.may),
    value: 5,
  },
  {
    name: t(translations.common.months.june),
    short: t(translations.common.months.jun),
    value: 6,
  },
  {
    name: t(translations.common.months.july),
    short: t(translations.common.months.jul),
    value: 7,
  },
  {
    name: t(translations.common.months.august),
    short: t(translations.common.months.aug),
    value: 8,
  },
  {
    name: t(translations.common.months.september),
    short: t(translations.common.months.sep),
    value: 9,
  },
  {
    name: t(translations.common.months.october),
    short: t(translations.common.months.oct),
    value: 10,
  },
  {
    name: t(translations.common.months.november),
    short: t(translations.common.months.nov),
    value: 11,
  },
  {
    name: t(translations.common.months.december),
    short: t(translations.common.months.dec),
    value: 12,
  },
];

export const MONTH_DAYS = [
  ...Array.from({ length: 31 }).map((_, index) => ({
    label: `${index + 1}`,
    index,
    value: index + 1,
  })),
  {
    label: 'Last',
    index: 31,
    value: -1,
  },
];

export const COUNT = [
  ...Array.from({ length: 20 }).map((_, index) => ({
    label: `${index + 1}`,
    index,
    value: index + 1,
  })),
];

export const WEEKDAYS: Weekday[] = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

export const timezoneList = moment.tz.names();

export const TIMEZONES = timezoneList.map((e) => ({ name: e }));

export const DEFAULT_NOTIFICATION_SERVICES: any = {
  settings: {
    sms: [],
    push: [
      'appointment new requests',
      'appointment change requests',
      'appointment cancellation',
      'appointment reminder',
      'client checked in',
      'special expired',
      'task reminder',
      'inactivity reminder',
      'request expired reminder',
      'sale special expiration',
      'client birthday notification',
      'payment refund request notification',
      'payment received request notification',
      'chat messages',
    ],
    email: [
      'appointment new requests',
      'appointment change requests',
      'appointment cancellation',
      'appointment reminder',
      'client checked in',
      'special expired',
      'task reminder',
      'inactivity reminder',
      'request expired reminder',
      'sale special expiration',
      'client birthday notification',
      'payment refund request notification',
      'payment received request notification',
    ],
  },
  reminderTime: null,
  isFromSignup: true,
};

export const PUSH_NOTIFICATIONS = {
  chatMessages: 'chat messages', // only push
  appointmentNewRequests: 'appointment new requests',
  appointmentChangeRequests: 'appointment change requests',
  appointmentCancellation: 'appointment cancellation',
  clientCheckedIn: 'client checked in',
  appointmentInvitation: 'appointment invitation',
  appointmentConfirmation: 'appointment confirmation',
  appointmentChange: 'appointment change',
  newInvoice: 'new invoice',
  newEstimate: 'new estimate',
  newReceipt: 'new receipt',
  closedDaysNotification: 'closed days notification',
  // reminders
  reminders: 'reminders', // without user avatar
  inactivityReminder: 'inactivity reminder',
  taskReminder: 'task reminder',
  appointmentReminder: 'appointment reminder',
  pendingAppointmentReminder: 'pending appointment reminder',
  closedDaysReminder: 'closed days reminder',
  requestExpiredReminder: 'request expired reminder',
  newSpecial: 'new special', // v2
  specialExpired: 'sale special expiration', // without user avatar v2
  birthdayRewardNotification: 'client birthday notification',
  rewardNotification: 'reward notification',
  saleSpecialNotification: 'sale special notification',
  loyaltyBirthdayNotification: 'loyalty birthday notification',
  rewardLoyaltyNotification: 'loyalty reward notification',
  paymentSuccessRequestNotification: 'payment success request notification',
  paymentReceivedRequestNotification: 'payment received request notification',
  paymentRefundRequestNotification: 'payment refund request notification',
  paymentAcceptRequestNotification: 'payment accept request notification',
  paymentRejectedRequestNotification: 'payment rejected request notification',
  onlinePaymentRequestNotification: 'online payment request notification',
} as const;

export type DrawerMenu = {
  tab: number;
  image: ImageSourcePropType;
  activeImage: ImageSourcePropType;
  title: string;
  active?: boolean;
  route: string;
  params?: any;
};

export const DrawerMenuItems: DrawerMenu[] = [
  {
    tab: 0,
    image: require('assets/sideMenu/home.png'),
    activeImage: require('assets/sideMenu/homeActive.png'),
    title: 'Home',
    route: 'Home',
  },
  {
    tab: 1,
    image: require('assets/sideMenu/profile.png'),
    activeImage: require('assets/sideMenu/profileActive.png'),
    title: 'My Profile',
    route: 'MyProfileProvider',
    params: { addressNull: false },
  },
  {
    tab: 2,
    image: require('assets/sideMenu/reports.png'),
    activeImage: require('assets/sideMenu/reportsActive.png'),
    title: t(translations.reports.title),
    route: 'Reports',
  },
  {
    tab: 3,
    image: require('assets/sideMenu/setting.png'),
    activeImage: require('assets/sideMenu/settingActive.png'),
    title: 'Settings',
    route: 'Settings',
  },
  {
    tab: 4,
    image: require('assets/sideMenu/contact.png'),
    activeImage: require('assets/sideMenu/contactActive.png'),
    title: 'Contact Us',
    route: 'ContactUs',
  },
  {
    tab: 5,
    image: require('assets/sideMenu/trainingVideo.png'),
    activeImage: require('assets/sideMenu/trainingVideoActive.png'),
    title: 'Training Videos',
    route: 'TrainingVideos',
  },
  {
    tab: 6,
    image: require('assets/global/alpha.png'),
    activeImage: require('assets/global/alpha.png'),
    title: 'Help',
    route: 'Help',
  },
  {
    tab: 7,
    image: require('assets/sideMenu/contact.png'),
    activeImage: require('assets/sideMenu/contactActive.png'),
    title: 'Contact Us',
    route: 'ContactUs',
  },
];

export const DrawerMenuItemsLite: DrawerMenu[] = [
  {
    tab: 0,
    image: require('assets/sideMenu/home.png'),
    activeImage: require('assets/sideMenu/homeActive.png'),
    title: 'Home',
    route: 'Home',
  },
  {
    tab: 1,
    image: require('assets/sideMenu/profile.png'),
    activeImage: require('assets/sideMenu/profileActive.png'),
    title: 'My Profile',
    route: 'MyProfileProvider',
    params: { addressNull: false },
  },
  {
    tab: 2,
    image: require('assets/sideMenu/reports.png'),
    activeImage: require('assets/sideMenu/reportsActive.png'),
    title: t(translations.reports.title),
    route: 'Reports',
  },
  {
    tab: 3,
    image: require('assets/sideMenu/setting.png'),
    activeImage: require('assets/sideMenu/settingActive.png'),
    title: 'Settings',
    route: 'Settings',
  },
  {
    tab: 4,
    image: require('assets/global/alpha.png'),
    activeImage: require('assets/global/alpha.png'),
    title: 'How Do I ?',
    route: 'HowDoI',
  },
  {
    tab: 5,
    image: require('assets/sideMenu/contact.png'),
    activeImage: require('assets/sideMenu/contactActive.png'),
    title: 'Contact Us',
    route: 'ContactUs',
  },
  {
    tab: 6,
    image: require('assets/sideMenu/trainingVideo.png'),
    activeImage: require('assets/sideMenu/trainingVideoActive.png'),
    title: 'Training Videos',
    route: 'TrainingVideos',
  },
  {
    tab: 7,
    image: require('assets/global/alpha.png'),
    activeImage: require('assets/global/alpha.png'),
    title: 'Help',
    route: 'Help',
  },
];
