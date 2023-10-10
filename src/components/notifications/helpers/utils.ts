import { t, translations } from 'locales';
import moment from 'moment';
import { FormattedNotification, Notification } from 'types/notifications';
import { PUSH_NOTIFICATIONS } from 'utils/constants';
import { currency } from 'utils/currency';
import {
  closedDayRange,
  DATE_FORMATS,
  formatApiTime,
  formatDate,
  isCurrentMonth,
  isCurrentWeek,
  isToday,
} from 'utils/dates';
import {
  capitalize,
  getFullName,
  getRewardOffer,
  getRewardServices,
} from 'utils/strings';

export const isAppointment = (type: string) =>
  type === PUSH_NOTIFICATIONS.appointmentCancellation ||
  type === PUSH_NOTIFICATIONS.appointmentChangeRequests ||
  type === PUSH_NOTIFICATIONS.appointmentNewRequests ||
  type === PUSH_NOTIFICATIONS.appointmentChange ||
  type === PUSH_NOTIFICATIONS.appointmentConfirmation ||
  type === PUSH_NOTIFICATIONS.appointmentInvitation ||
  type === PUSH_NOTIFICATIONS.appointmentReminder ||
  type === PUSH_NOTIFICATIONS.pendingAppointmentReminder ||
  type === PUSH_NOTIFICATIONS.requestExpiredReminder ||
  type === PUSH_NOTIFICATIONS.clientCheckedIn;

export const isAppointmentChange = (type: string) =>
  type === PUSH_NOTIFICATIONS.appointmentChangeRequests ||
  type === PUSH_NOTIFICATIONS.appointmentChange;

export const isAppointmentClickable = (type: string) =>
  type !== PUSH_NOTIFICATIONS.appointmentCancellation &&
  type !== PUSH_NOTIFICATIONS.requestExpiredReminder &&
  type !== PUSH_NOTIFICATIONS.pendingAppointmentReminder;

export const isClosedDaysChanged = (title: string) => title.includes('changes');

export const isReminders = (type: string) =>
  type === PUSH_NOTIFICATIONS.reminders ||
  type === PUSH_NOTIFICATIONS.inactivityReminder;

export const getNotificationsSections = (notifications: Notification[]) => {
  const todayNotifications = notifications.filter((notification) =>
    isToday(notification.createdAt),
  );
  const thisWeekNotifications = notifications.filter(
    (notification) =>
      !isToday(notification.createdAt) && isCurrentWeek(notification.createdAt),
  );
  const thisMonthNotifications = notifications.filter(
    (notification) =>
      !isToday(notification.createdAt) &&
      !isCurrentWeek(notification.createdAt) &&
      isCurrentMonth(notification.createdAt),
  );
  const earlierNotifications = notifications.filter(
    (notification) =>
      !isToday(notification.createdAt) &&
      !isCurrentWeek(notification.createdAt) &&
      !isCurrentMonth(notification.createdAt),
  );

  return [
    {
      title: translations.common.today,
      data: todayNotifications,
    },
    {
      title: translations.common.thisWeek,
      data: thisWeekNotifications,
    },
    {
      title: translations.common.thisMonth,
      data: thisMonthNotifications,
    },
    {
      title: translations.common.earlier,
      data: earlierNotifications,
    },
  ];
};

const getAppointmentNotificationData = (
  { payload, ...rest }: Notification,
  isProvider: boolean,
) => {
  const formattedNotification = {
    ...rest,
    isClickable: isAppointmentClickable(rest.type),
    navigationParams: { id: payload?.appointment?.id },
    fields: [
      {
        label: translations.notifications.labels.service,
        value: payload.appointment?.product?.name,
      },
      {
        label: translations.notifications.labels.date,
        value: moment(payload.appointment?.startDate).format(DATE_FORMATS.date),
      },
      {
        label: translations.notifications.labels.time,
        value: `${formatApiTime(payload.appointment?.startDate, {
          format: 'hh:mm A',
          utc: false,
        })} - ${formatApiTime(payload.appointment?.endDate, {
          format: 'hh:mm A',
          utc: false,
        })}`,
      },
    ],
  };

  return isProvider
    ? {
        ...formattedNotification,
        user: payload.client
          ? {
              id: payload.client.id,
              name: getFullName(payload.client),
              avatar: payload.client?.photoFile?.url || null,
              isConnected: payload.isConnected,
            }
          : null,
      }
    : {
        ...formattedNotification,
        user: payload.provider
          ? {
              id: payload.provider.id,
              name: getFullName(payload.provider),
              avatar: payload.provider?.photoFile?.url || null,
            }
          : null,
      };
};

const getClientBirthdayRewardNotificationData = ({
  payload,
  ...rest
}: Notification) => {
  const formattedNotification = {
    ...rest,
    isClickable: false,
    // navigationParams: {
    //   isLoyaltyReward: payload.loyalty?.type == 'loyalty',
    // },
    fields: [
      {
        label: translations.notifications.labels.rewardType,
        value: capitalize(payload.loyalty?.rewardType),
      },
      {
        label: translations.notifications.labels.rewardServices,
        value: getRewardServices(payload.loyalty?.services),
      },
      {
        label: translations.notifications.labels.offer,
        value: getRewardOffer(payload.loyalty),
      },
    ],
  };

  return {
    ...formattedNotification,
    user: payload.provider
      ? {
          id: payload.provider?.id,
          name: getFullName(payload.provider),
          avatar: payload.provider?.photoFile?.url || null,
        }
      : null,
  };
};

const getRewardNotificationData = (
  { payload, ...rest }: Notification,
  isProvider: boolean,
) => {
  const formattedNotification = {
    ...rest,
    isClickable: isProvider,
    navigationParams: {
      isLoyaltyReward: payload.loyalty?.type == 'loyalty',
    },
    fields:
      payload.loyalty?.type == 'loyalty'
        ? [
            {
              label: translations.notifications.labels.rewardType,
              value: capitalize(payload.loyalty?.rewardType),
            },
            {
              label: translations.notifications.labels.rewardReason,
              value: capitalize(
                payload.loyalty?.type == 'birthday'
                  ? 'birthday discount'
                  : payload.loyalty?.rewardReason,
              ),
            },
            {
              label: translations.notifications.labels.rewardServices,
              value: getRewardServices(payload.loyalty?.services),
            },
            {
              label: translations.notifications.labels.offer,
              value: getRewardOffer(payload.loyalty),
            },
          ]
        : [
            {
              label: translations.notifications.labels.birthDate,
              value: moment(payload.client?.birthday).format('ll'),
            },
            {
              label: translations.notifications.labels.rewardType,
              value: capitalize(payload.loyalty?.rewardType),
            },
            {
              label: translations.notifications.labels.rewardReason,
              value: capitalize(
                payload.loyalty?.type == 'birthday'
                  ? 'birthday discount'
                  : payload.loyalty?.rewardReason,
              ),
            },
            {
              label: translations.notifications.labels.rewardServices,
              value: getRewardServices(payload.loyalty?.services),
            },
            {
              label: translations.notifications.labels.offer,
              value: getRewardOffer(payload.loyalty),
            },
          ],
  };

  return isProvider
    ? {
        ...formattedNotification,
        user: payload.client
          ? {
              id: payload.client?.id,
              name: getFullName(payload.client),
              avatar: payload.client?.photoFile?.url || null,
              isConnected: payload.isConnected,
            }
          : null,
      }
    : {
        ...formattedNotification,
        user: payload.provider
          ? {
              id: payload.provider?.id,
              name: getFullName(payload.provider),
              avatar: payload.provider?.photoFile?.url || null,
            }
          : null,
      };
};

const getSalesdNotificationData = (
  { payload, ...rest }: Notification,
  isProvider: boolean,
) => {
  const dealPrice = payload?.SaleSpecial?.salePrice;
  const actualPrice = payload?.SaleSpecial?.service?.price;
  const difference = Number(actualPrice) - Number(dealPrice);
  const percentOff = (difference / Number(actualPrice)) * 100;
  const isQuickPromotion = payload?.SaleSpecial?.isQuickPromotion;
  const isAllService = payload?.SaleSpecial?.isAllService;
  const formattedNotification = {
    ...rest,
    isClickable: true,
    navigationParams: { id: payload?.SaleSpecial?.id },
    fields: [
      {
        label: translations.notifications.labels.saleSpecialName,
        value: capitalize(payload?.SaleSpecial?.title),
      },
      {
        label: translations.notifications.labels.service,
        value: isAllService
          ? 'All Services'
          : payload?.SaleSpecial?.service?.name
          ? capitalize(payload?.SaleSpecial?.service?.name)
          : '',
      },
      {
        label: translations.notifications.labels.offer,
        value: `${
          isQuickPromotion
            ? payload?.SaleSpecial?.discount
            : (Math.round(percentOff * 100) / 100).toFixed(0)
        }% off`,
      },
    ],
  };

  return {
    ...formattedNotification,
    user: {
      id: payload.provider?.id,
      name: getFullName(payload.provider),
      avatar: payload.provider?.photoFile?.url || null,
    },
  };
};

const getPaymentSuccessRequestNotification = ({
  payload,
  ...rest
}: Notification) => ({
  ...rest,
  navigationParams: {
    id: payload.payment.id,
    payment: payload.payment,
    provider: payload.provider,
  },
  isClickable: true,
  fields: [
    {
      label: translations.notifications.labels.paymentAmount,
      value: currency.format(payload.payment.total),
    },
    {
      label: translations.notifications.labels.paymentNumber,
      value: `#${payload.payment.number}`,
    },
    {
      label: translations.notifications.labels.paymentDate,
      value: formatDate(payload.payment.date),
    },
  ],
  user: {
    id: payload.provider?.id,
    name: getFullName(payload.provider),
    avatar: payload.provider?.photoFile?.url || null,
  },
});

const getPaymentReceivedRequestNotification = ({
  payload,
  ...rest
}: Notification) => ({
  ...rest,
  navigationParams: {
    id: payload.payment.id,
  },
  isClickable: true,
  fields: [
    {
      label: translations.notifications.labels.paymentAmount,
      value: currency.format(payload.payment.total),
    },
    {
      label: translations.notifications.labels.paymentNumber,
      value: `#${payload.payment.number}`,
    },
    {
      label: translations.notifications.labels.paymentDate,
      value: formatDate(payload.payment.date),
    },
  ],
  user: {
    id: payload.client?.id,
    name: getFullName(payload.client),
    avatar: payload.client?.photoFile?.url || null,
    isConnected: payload.isConnected,
  },
});

const getPaymentRefundRequestNotification = ({
  payload,
  ...rest
}: Notification) => ({
  ...rest,
  navigationParams: {
    id: payload.payment.id,
  },
  isClickable: true,
  fields: [
    {
      label: translations.notifications.labels.refundAmount,
      value: currency.format(payload.payment.total),
    },
    {
      label: translations.notifications.labels.paymetDate,
      value: formatDate(payload.payment.date),
    },
    {
      label: translations.notifications.labels.paymentNumber,
      value: `#${payload.payment.number}`,
    },
  ],
  user: {
    id: payload.client?.id,
    name: getFullName(payload.client),
    avatar: payload.client?.photoFile?.url || null,
    isConnected: payload.isConnected,
  },
});

const getPaymentAcceptRequestNotification = ({
  payload,
  ...rest
}: Notification) => ({
  ...rest,
  navigationParams: {
    id: payload.payment.id,
    payment: payload.payment,
    provider: payload.provider,
  },
  isClickable: true,
  fields: [
    {
      label: translations.notifications.labels.rejectedRefundAmount,
      value: currency.format(payload.payment.total),
    },
    {
      label: translations.notifications.labels.paymentNumber,
      value: `#${payload.payment.number}`,
    },
    {
      label: translations.notifications.labels.paymentDate,
      value: formatDate(payload.payment.date),
    },
  ],
  user: {
    id: payload.provider?.id,
    name: getFullName(payload.provider),
    avatar: payload.provider?.photoFile?.url || null,
  },
});

const getPaymentRejectedRequestNotification = ({
  payload,
  ...rest
}: Notification) => ({
  ...rest,
  navigationParams: {
    id: payload.payment.id,
    payment: payload.payment,
    provider: payload.provider,
  },
  isClickable: true,
  fields: [
    {
      label: translations.notifications.labels.rejectedRefundAmount,
      value: currency.format(payload.payment.total),
    },
    {
      label: translations.notifications.labels.paymentNumber,
      value: `#${payload.payment.number}`,
    },
    {
      label: translations.notifications.labels.paymentDate,
      value: formatDate(payload.payment.date),
    },
  ],
  user: {
    id: payload.provider?.id,
    name: getFullName(payload.provider),
    avatar: payload.provider?.photoFile?.url || null,
  },
});

const getOnlinePaymentRequestNotification = ({
  payload,
  ...rest
}: Notification) => {
  const formattedNotification = {
    ...rest,
    navigationParams: {
      id: payload.invoice.id,
      providerId: payload.provider.id,
      isSale: payload.invoice.isPaymentReceived !== undefined,
    },
    isClickable: true,
    user: {
      id: payload.provider?.id,
      name: getFullName(payload.provider),
      avatar: payload.provider?.photoFile?.url || null,
    },
  };

  return payload.invoice.isPaymentReceived !== undefined
    ? {
        ...formattedNotification,
        fields: [
          {
            label: translations.notifications.labels.saleTotal,
            value: currency.format(payload.invoice.total),
          },
          {
            label: translations.notifications.labels.saleNumber,
            value: `#${payload.invoice.number}`,
          },
          {
            label: translations.notifications.labels.saleDate,
            value: formatDate(payload.invoice.date),
          },
        ],
      }
    : {
        ...formattedNotification,
        fields: [
          {
            label: translations.notifications.labels.invoiceTotal,
            value: currency.format(payload.invoice.total),
          },
          {
            label: translations.notifications.labels.invoiceNumber,
            value: `#${payload.invoice.number}`,
          },
          {
            label: translations.notifications.labels.invoiceDate,
            value: formatDate(payload.invoice.date),
          },
          {
            label: translations.notifications.labels.invoiceDueDate,
            value: formatDate(payload.invoice.dueDate),
          },
        ],
      };
};

const getNewInvoiceNotificationData = ({ payload, ...rest }: Notification) => {
  return {
    ...rest,
    navigationParams: {
      id: payload.invoice?.id || payload.estimate?.id,
      providerId: payload.provider?.id,
      isEstimate: payload.invoice ? false : true,
    },
    isClickable: true,
    fields: [
      {
        label: payload?.invoice
          ? translations.notifications.labels.invoiceTotal
          : translations.notifications.labels.estimateTotal,
        value: currency.format(
          payload.invoice?.total || payload.estimate?.total,
        ),
      },
      {
        label: payload?.invoice
          ? translations.notifications.labels.invoiceNumber
          : translations.notifications.labels.estimateNumber,
        value: `#${payload.invoice?.number || payload.estimate?.number}`,
      },
      {
        label: payload?.invoice
          ? translations.notifications.labels.invoiceDueDate
          : translations.notifications.labels.estimateDueDate,
        value: formatDate(payload.invoice?.dueDate || payload.invoice?.expDate),
      },
    ],
    user: {
      id: payload.provider?.id,
      name: getFullName(payload.provider),
      avatar: payload.provider?.photoFile?.url || null,
    },
  };
};

const getNewEstimateNotificationData = ({ payload, ...rest }: Notification) => {
  return {
    ...rest,
    navigationParams: {
      id: payload.estimate?.id,
      providerId: payload.provider?.id,
    },
    isClickable: true,
    fields: [
      {
        label: translations.notifications.labels.estimateTotal,
        value: currency.format(payload.estimate?.total),
      },
      {
        label: translations.notifications.labels.estimateNumber,
        value: `#${payload.estimate?.number}`,
      },
      {
        label: translations.notifications.labels.estimateDueDate,
        value: formatDate(payload.estimate?.expDate),
      },
    ],
    user: {
      id: payload.provider?.id,
      name: getFullName(payload.provider),
      avatar: payload.provider?.photoFile?.url || null,
    },
  };
};

const getNewReceiptNotification = ({ payload, ...rest }: Notification) => {
  return {
    ...rest,
    navigationParams: {
      id: payload?.sale?.id ? payload?.sale?.id : payload?.payment?.id,
      providerId: payload.provider?.id,
      isSale: payload?.sale?.id ? true : false,
      payment: payload?.payment,
      provider: payload?.provider,
    },
    isClickable: true,
    fields: [
      {
        label: translations.notifications.labels.paymentTotal,
        value: currency.format(
          payload?.sale?.payment?.total
            ? payload?.sale?.payment?.total
            : payload?.payment?.total,
        ),
      },
      {
        label: translations.notifications.labels.receiptNumber,
        value: `#${
          payload?.sale?.payment?.saleId
            ? payload?.sale?.number
            : payload?.payment?.number
        }`,
      },
      {
        label: translations.notifications.labels.paymentDate,
        value: formatDate(
          payload?.sale?.payment?.date
            ? payload?.sale?.payment?.date
            : payload?.payment?.date,
        ),
      },
    ],
    user: {
      id: payload.provider?.id,
      name: getFullName(payload.provider),
      avatar: payload.provider?.photoFile?.url || null,
    },
  };
};

const getClosedDaysNotification = ({ payload, ...rest }: Notification) => ({
  ...rest,
  isClickable: false,
  fields: [
    {
      label: translations.notifications.labels.reason,
      value: capitalize(payload.closedDays.reason),
    },
    {
      label: translations.notifications.labels.date,
      value: closedDayRange(
        payload.closedDays.fromDate,
        payload.closedDays.toDate,
      ),
    },
  ],
  user: {
    id: payload.provider?.id,
    name: getFullName(payload.provider),
    avatar: payload.provider?.photoFile?.url || null,
  },
});

const getTaskNotification = ({ payload, ...rest }: Notification) => ({
  ...rest,
  isClickable: true,
  navigationParams: { id: payload.task.id, date: payload.task.dueDate },
  text: t(translations.notifications.labels.taskReminder, {
    name: payload.task.name,
    date: `${moment
      .utc(payload.task.time, 'HH:mm')
      .local()
      .format('LT')}, ${moment(
      payload?.task.date || payload?.task.dueDate,
      'YYYY-MM-DD',
    ).format('Do MMM YYYY')}`,
  }),
});

const getReminderNotification = ({ title, ...rest }: Notification) => ({
  ...rest,
  isClickable: false,
  text: title,
});

export const formatNotification = (
  notification: Notification,
  isProvider: boolean,
) => {
  if (isAppointment(notification.type)) {
    return getAppointmentNotificationData(notification, isProvider);
  }

  if (notification.type === PUSH_NOTIFICATIONS.newInvoice) {
    return getNewInvoiceNotificationData(notification);
  }

  if (notification.type === PUSH_NOTIFICATIONS.newEstimate) {
    return getNewEstimateNotificationData(notification);
  }

  if (notification.type === PUSH_NOTIFICATIONS.closedDaysNotification) {
    return getClosedDaysNotification(notification);
  }

  if (notification.type === PUSH_NOTIFICATIONS.newReceipt) {
    return getNewReceiptNotification(notification);
  }

  if (notification.type === PUSH_NOTIFICATIONS.taskReminder) {
    return getTaskNotification(notification);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.rewardNotification &&
    isProvider
  ) {
    return getRewardNotificationData(notification, isProvider);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.saleSpecialNotification &&
    !isProvider
  ) {
    return getSalesdNotificationData(notification, false);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.loyaltyBirthdayNotification &&
    !isProvider
  ) {
    return getClientBirthdayRewardNotificationData(notification);
  }

  if (notification.type === PUSH_NOTIFICATIONS.birthdayRewardNotification) {
    return getRewardNotificationData(notification, isProvider);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.rewardLoyaltyNotification &&
    !isProvider
  ) {
    return getRewardNotificationData(notification, isProvider);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.paymentSuccessRequestNotification
  ) {
    return getPaymentSuccessRequestNotification(notification);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.paymentReceivedRequestNotification
  ) {
    return getPaymentReceivedRequestNotification(notification);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.paymentRefundRequestNotification
  ) {
    return getPaymentRefundRequestNotification(notification);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.paymentAcceptRequestNotification
  ) {
    return getPaymentAcceptRequestNotification(notification);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.paymentRejectedRequestNotification
  ) {
    return getPaymentRejectedRequestNotification(notification);
  }

  if (
    notification.type === PUSH_NOTIFICATIONS.onlinePaymentRequestNotification
  ) {
    return getOnlinePaymentRequestNotification(notification);
  }

  if (isReminders(notification.type)) {
    return getReminderNotification(notification);
  }
  return notification;
};

export const getNavigationOptions = (
  notification: FormattedNotification,
  isProvider: boolean,
) => {
  if (notification.isClickable) {
    if (
      notification.type === PUSH_NOTIFICATIONS.appointmentChangeRequests ||
      notification.type === PUSH_NOTIFICATIONS.appointmentNewRequests
    ) {
      return {
        path: 'CalendarStack',
        params: {
          screen: 'AppointmentRequestDetails',
          params: notification.navigationParams,
        },
      };
    }

    if (isAppointment(notification.type)) {
      return isProvider
        ? {
            path: 'CalendarStack',
            params: {
              screen: 'AppointmentDetails',
              params: notification.navigationParams,
            },
          }
        : {
            path: 'AppointmentDetails',
            params: notification.navigationParams,
          };
    }

    if (notification.type === PUSH_NOTIFICATIONS.newReceipt) {
      return {
        path: notification?.navigationParams?.isSale
          ? 'SaleDetails'
          : 'PaymentDetails',
        params: notification.navigationParams,
      };
    }

    if (notification.type === PUSH_NOTIFICATIONS.saleSpecialNotification) {
      return {
        path: 'SalesSpecialDetails',
        params: notification.navigationParams,
      };
    }

    if (notification.type === PUSH_NOTIFICATIONS.newInvoice) {
      const isEstimate = notification.navigationParams.isEstimate;

      return {
        path: isEstimate ? 'EstimateDetails' : 'InvoiceDetails',
        params: notification.navigationParams,
      };
    }

    if (notification.type === PUSH_NOTIFICATIONS.taskReminder) {
      return {
        path: 'MoreStackNavigator',
        params: {
          screen: 'TaskDetails',
          params: notification.navigationParams,
        },
      };
    }

    if (notification.type === PUSH_NOTIFICATIONS.birthdayRewardNotification) {
      return {
        path: 'LoyaltyStack',
        params: {
          screen: notification?.navigationParams?.isLoyaltyReward
            ? 'ClientLoyaltyReward'
            : 'ClientBirthdayReward',
        },
      };
    }

    if (notification.type === PUSH_NOTIFICATIONS.rewardNotification) {
      return {
        path: 'LoyaltyStack',
        params: {
          screen: notification?.navigationParams?.isLoyaltyReward
            ? 'ClientLoyaltyReward'
            : 'ClientBirthdayReward',
        },
      };
    }

    if (
      notification.type === PUSH_NOTIFICATIONS.paymentSuccessRequestNotification
    ) {
      return {
        path: 'PaymentDetails',
        params: notification.navigationParams,
      };
    }

    if (
      notification.type ===
      PUSH_NOTIFICATIONS.paymentReceivedRequestNotification
    ) {
      return {
        path: 'MoreStackNavigator',
        params: {
          screen: 'PaymentDetails',
          params: notification.navigationParams,
        },
      };
    }

    if (
      notification.type === PUSH_NOTIFICATIONS.paymentRefundRequestNotification
    ) {
      return {
        path: 'MoreStackNavigator',
        params: {
          screen: 'PaymentDetails',
          params: notification.navigationParams,
        },
      };
    }

    if (
      notification.type === PUSH_NOTIFICATIONS.paymentAcceptRequestNotification
    ) {
      return {
        path: 'PaymentDetails',
        params: notification.navigationParams,
      };
    }

    if (
      notification.type ===
      PUSH_NOTIFICATIONS.paymentRejectedRequestNotification
    ) {
      return {
        path: 'PaymentDetails',
        params: notification.navigationParams,
      };
    }

    if (
      notification.type === PUSH_NOTIFICATIONS.onlinePaymentRequestNotification
    ) {
      return {
        path: notification?.navigationParams?.isSale
          ? 'SaleDetails'
          : 'InvoiceDetails',
        params: notification.navigationParams,
      };
    }
  }

  return null;
};
