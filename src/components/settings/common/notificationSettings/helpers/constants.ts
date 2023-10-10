import { t, translations } from 'locales';
import {
  ClientNotification,
  NotificationService,
  ProviderNotification,
} from 'types/settings';
import { PUSH_NOTIFICATIONS } from 'utils/constants';

export type NotificationOption = {
  label: string;
  value: NotificationService;
  notifications: NotificationSubOption[];
};

export type NotificationSubOption = {
  label: string;
  value: ProviderNotification | ClientNotification;
};

export const PROVIDER_NOTIFICATION_SERVICES: NotificationOption[] = [
  {
    label: t(translations.notificationSettings.email),
    value: 'email',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentNewRequests),
        value: PUSH_NOTIFICATIONS.appointmentNewRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentChangeRequest),
        value: PUSH_NOTIFICATIONS.appointmentChangeRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.clientCheckedIn),
        value: PUSH_NOTIFICATIONS.clientCheckedIn,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      {
        label: t(translations.notificationSettings.inactivityReminder),
        value: PUSH_NOTIFICATIONS.inactivityReminder,
      },
      {
        label: t(translations.notificationSettings.taskReminder),
        value: PUSH_NOTIFICATIONS.taskReminder,
      },
      {
        label: t(translations.notificationSettings.specialExpired),
        value: PUSH_NOTIFICATIONS.specialExpired,
      },
      {
        label: t(translations.notificationSettings.birthdayRewardNotification),
        value: PUSH_NOTIFICATIONS.birthdayRewardNotification,
      },
      {
        label: t(translations.notificationSettings.loyaltyRewardNotification),
        value: PUSH_NOTIFICATIONS.rewardNotification,
      },
      {
        label: t(translations.notificationSettings.paymentReceivedRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentReceivedRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentRefundRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentRefundRequestNotification,
      },
    ],
  },
  {
    label: t(translations.notificationSettings.push),
    value: 'push',
    notifications: [
      {
        label: t(translations.notificationSettings.chatMessages),
        value: PUSH_NOTIFICATIONS.chatMessages,
      },
      {
        label: t(translations.notificationSettings.appointmentNewRequests),
        value: PUSH_NOTIFICATIONS.appointmentNewRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentChangeRequest),
        value: PUSH_NOTIFICATIONS.appointmentChangeRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.clientCheckedIn),
        value: PUSH_NOTIFICATIONS.clientCheckedIn,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      {
        label: t(translations.notificationSettings.inactivityReminder),
        value: PUSH_NOTIFICATIONS.inactivityReminder,
      },
      {
        label: t(translations.notificationSettings.taskReminder),
        value: PUSH_NOTIFICATIONS.taskReminder,
      },
      {
        label: t(translations.notificationSettings.specialExpired),
        value: PUSH_NOTIFICATIONS.specialExpired,
      },
      {
        label: t(translations.notificationSettings.birthdayRewardNotification),
        value: PUSH_NOTIFICATIONS.birthdayRewardNotification,
      },
      {
        label: t(translations.notificationSettings.loyaltyRewardNotification),
        value: PUSH_NOTIFICATIONS.rewardNotification,
      },
      {
        label: t(translations.notificationSettings.paymentReceivedRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentReceivedRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentRefundRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentRefundRequestNotification,
      },
    ],
  },
  {
    label: t(translations.notificationSettings.sms),
    value: 'sms',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentNewRequests),
        value: PUSH_NOTIFICATIONS.appointmentNewRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentChangeRequest),
        value: PUSH_NOTIFICATIONS.appointmentChangeRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.clientCheckedIn),
        value: PUSH_NOTIFICATIONS.clientCheckedIn,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      {
        label: t(translations.notificationSettings.inactivityReminder),
        value: PUSH_NOTIFICATIONS.inactivityReminder,
      },
      {
        label: t(translations.notificationSettings.taskReminder),
        value: PUSH_NOTIFICATIONS.taskReminder,
      },
      {
        label: t(translations.notificationSettings.specialExpired),
        value: PUSH_NOTIFICATIONS.specialExpired,
      },
      {
        label: t(translations.notificationSettings.birthdayRewardNotification),
        value: PUSH_NOTIFICATIONS.birthdayRewardNotification,
      },
      {
        label: t(translations.notificationSettings.loyaltyRewardNotification),
        value: PUSH_NOTIFICATIONS.rewardNotification,
      },
      {
        label: t(translations.notificationSettings.paymentReceivedRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentReceivedRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentRefundRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentRefundRequestNotification,
      },
    ],
  },
];

export const PROVIDER_NOTIFICATION_SERVICES_LITE: NotificationOption[] = [
  {
    label: t(translations.notificationSettings.email),
    value: 'email',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentNewRequests),
        value: PUSH_NOTIFICATIONS.appointmentNewRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentChangeRequest),
        value: PUSH_NOTIFICATIONS.appointmentChangeRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.clientCheckedIn),
        value: PUSH_NOTIFICATIONS.clientCheckedIn,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      // {
      //   label: t(translations.notificationSettings.inactivityReminder),
      //   value: PUSH_NOTIFICATIONS.inactivityReminder,
      // },
    ],
  },
  {
    label: t(translations.notificationSettings.push),
    value: 'push',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentNewRequests),
        value: PUSH_NOTIFICATIONS.appointmentNewRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentChangeRequest),
        value: PUSH_NOTIFICATIONS.appointmentChangeRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.clientCheckedIn),
        value: PUSH_NOTIFICATIONS.clientCheckedIn,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      // {
      //   label: t(translations.notificationSettings.inactivityReminder),
      //   value: PUSH_NOTIFICATIONS.inactivityReminder,
      // },
      // v2
      // {
      //   label: t(translations.notificationSettings.specialExpired),
      //   value: PUSH_NOTIFICATIONS.specialExpired,
      // },
      // {
      //   label: t(translations.notificationSettings.rewardNotification),
      //   value: PUSH_NOTIFICATIONS.rewardNotification,
      // },
    ],
  },
  {
    label: t(translations.notificationSettings.sms),
    value: 'sms',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentNewRequests),
        value: PUSH_NOTIFICATIONS.appointmentNewRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentChangeRequest),
        value: PUSH_NOTIFICATIONS.appointmentChangeRequests,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.clientCheckedIn),
        value: PUSH_NOTIFICATIONS.clientCheckedIn,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      // {
      //   label: t(translations.notificationSettings.inactivityReminder),
      //   value: PUSH_NOTIFICATIONS.inactivityReminder,
      // },
      // v2
      // {
      //   label: t(translations.notificationSettings.specialExpired),
      //   value: PUSH_NOTIFICATIONS.specialExpired,
      // },
      // {
      //   label: t(translations.notificationSettings.rewardNotification),
      //   value: PUSH_NOTIFICATIONS.rewardNotification,
      // },
    ],
  },
];

export const CLIENT_NOTIFICATION_SERVICES: NotificationOption[] = [
  {
    label: t(translations.notificationSettings.email),
    value: 'email',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentInvitation),
        value: PUSH_NOTIFICATIONS.appointmentInvitation,
      },
      {
        label: t(translations.notificationSettings.appointmentConfirmation),
        value: PUSH_NOTIFICATIONS.appointmentConfirmation,
      },
      {
        label: t(translations.notificationSettings.appointmentChange),
        value: PUSH_NOTIFICATIONS.appointmentChange,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      {
        label: t(translations.notificationSettings.newInvoice),
        value: PUSH_NOTIFICATIONS.newInvoice,
      },
      {
        label: t(translations.notificationSettings.newReceipt),
        value: PUSH_NOTIFICATIONS.newReceipt,
      },
      {
        label: t(translations.notificationSettings.closedDayNotification),
        value: PUSH_NOTIFICATIONS.closedDaysNotification,
      },
      {
        label: t(translations.notificationSettings.closedDaysReminder),
        value: PUSH_NOTIFICATIONS.closedDaysReminder,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.saleSpecialNotification),
        value: PUSH_NOTIFICATIONS.saleSpecialNotification,
      },
      {
        label: t(translations.notificationSettings.loyaltyBirthdayNotification),
        value: PUSH_NOTIFICATIONS.loyaltyBirthdayNotification,
      },
      {
        label: t(translations.notificationSettings.rewardLoyaltyNotification),
        value: PUSH_NOTIFICATIONS.rewardLoyaltyNotification,
      },
      {
        label: t(translations.notificationSettings.onlinePaymentRequestNotification),
        value: PUSH_NOTIFICATIONS.onlinePaymentRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentSuccessRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentSuccessRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentAcceptRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentAcceptRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentRejectedRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentRejectedRequestNotification,
      },
    ],
  },
  {
    label: t(translations.notificationSettings.push),
    value: 'push',
    notifications: [
      {
        label: t(translations.notificationSettings.chatMessages),
        value: PUSH_NOTIFICATIONS.chatMessages,
      },
      {
        label: t(translations.notificationSettings.appointmentInvitation),
        value: PUSH_NOTIFICATIONS.appointmentInvitation,
      },
      {
        label: t(translations.notificationSettings.appointmentConfirmation),
        value: PUSH_NOTIFICATIONS.appointmentConfirmation,
      },
      {
        label: t(translations.notificationSettings.appointmentChange),
        value: PUSH_NOTIFICATIONS.appointmentChange,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      {
        label: t(translations.notificationSettings.newInvoice),
        value: PUSH_NOTIFICATIONS.newInvoice,
      },
      {
        label: t(translations.notificationSettings.newReceipt),
        value: PUSH_NOTIFICATIONS.newReceipt,
      },
      {
        label: t(translations.notificationSettings.closedDayNotification),
        value: PUSH_NOTIFICATIONS.closedDaysNotification,
      },
      {
        label: t(translations.notificationSettings.closedDaysReminder),
        value: PUSH_NOTIFICATIONS.closedDaysReminder,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.saleSpecialNotification),
        value: PUSH_NOTIFICATIONS.saleSpecialNotification,
      },
      {
        label: t(translations.notificationSettings.loyaltyBirthdayNotification),
        value: PUSH_NOTIFICATIONS.loyaltyBirthdayNotification,
      },
      {
        label: t(translations.notificationSettings.rewardLoyaltyNotification),
        value: PUSH_NOTIFICATIONS.rewardLoyaltyNotification,
      },
      {
        label: t(translations.notificationSettings.onlinePaymentRequestNotification),
        value: PUSH_NOTIFICATIONS.onlinePaymentRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentSuccessRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentSuccessRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentAcceptRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentAcceptRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentRejectedRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentRejectedRequestNotification,
      },
    ],
  },
  {
    label: t(translations.notificationSettings.sms),
    value: 'sms',
    notifications: [
      {
        label: t(translations.notificationSettings.appointmentInvitation),
        value: PUSH_NOTIFICATIONS.appointmentInvitation,
      },
      {
        label: t(translations.notificationSettings.appointmentConfirmation),
        value: PUSH_NOTIFICATIONS.appointmentConfirmation,
      },
      {
        label: t(translations.notificationSettings.appointmentChange),
        value: PUSH_NOTIFICATIONS.appointmentChange,
      },
      {
        label: t(translations.notificationSettings.appointmentCancellation),
        value: PUSH_NOTIFICATIONS.appointmentCancellation,
      },
      {
        label: t(translations.notificationSettings.appointmentReminder),
        value: PUSH_NOTIFICATIONS.appointmentReminder,
      },
      {
        label: t(translations.notificationSettings.newInvoice),
        value: PUSH_NOTIFICATIONS.newInvoice,
      },
      {
        label: t(translations.notificationSettings.newReceipt),
        value: PUSH_NOTIFICATIONS.newReceipt,
      },
      {
        label: t(translations.notificationSettings.closedDayNotification),
        value: PUSH_NOTIFICATIONS.closedDaysNotification,
      },
      {
        label: t(translations.notificationSettings.closedDaysReminder),
        value: PUSH_NOTIFICATIONS.closedDaysReminder,
      },
      {
        label: t(translations.notificationSettings.requestExpiredReminder),
        value: PUSH_NOTIFICATIONS.requestExpiredReminder,
      },
      {
        label: t(translations.notificationSettings.saleSpecialNotification),
        value: PUSH_NOTIFICATIONS.saleSpecialNotification,
      },
      {
        label: t(translations.notificationSettings.loyaltyBirthdayNotification),
        value: PUSH_NOTIFICATIONS.loyaltyBirthdayNotification,
      },
      {
        label: t(translations.notificationSettings.rewardLoyaltyNotification),
        value: PUSH_NOTIFICATIONS.rewardLoyaltyNotification,
      },
      {
        label: t(translations.notificationSettings.onlinePaymentRequestNotification),
        value: PUSH_NOTIFICATIONS.onlinePaymentRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentSuccessRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentSuccessRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentAcceptRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentAcceptRequestNotification,
      },
      {
        label: t(translations.notificationSettings.paymentRejectedRequestNotification),
        value: PUSH_NOTIFICATIONS.paymentRejectedRequestNotification,
      },
    ],
  },
];

export const REMINDER_TIME_OPTIONS = [
  {
    name: t(translations.notificationSettings.reminderTime.label.minutes, {
      count: 15,
    }),
    value: 15,
  },
  {
    name: t(translations.notificationSettings.reminderTime.label.minutes, {
      count: 30,
    }),
    value: 30,
  },
  {
    name: t(translations.notificationSettings.reminderTime.label.hour, {
      count: 1,
    }),
    value: 60,
  },
  {
    name: t(translations.notificationSettings.reminderTime.label.hour, {
      count: 4,
    }),
    value: 4 * 60,
  },
  {
    name: t(translations.notificationSettings.reminderTime.label.day, {
      count: 1,
    }),
    value: 24 * 60,
  },
];
