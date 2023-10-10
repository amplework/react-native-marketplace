import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { IProduct, ProductValues } from 'types/products';
import { CalendarSettingsValues, ICalendarSettings } from 'types/settings';
import { ITax, TaxValues } from 'types/taxes';
import { parseApiTime } from 'utils/dates';

export const adaptProduct = (product: IProduct): ProductValues => ({
  name: product.name,
  description: product?.description || '',
  type: product.type,
  price: product.price.toString(),
  isQuickSale: !!product.isQuickSale,
  time: product.time?.toString() || '',
  isActive: product.isActive,
});

export const adaptTax = (tax: ITax): TaxValues => ({
  shortName: tax.shortName,
  description: tax.description,
  rate: tax.rate.toString(),
  effectiveDate: tax.effectiveDate,
  shouldApplyToTransactions: tax.shouldApplyToTransactions,
});

export const adaptCalendarSettings = (
  settings: ICalendarSettings,
): CalendarSettingsValues => {
  const selectedWeekDaysList = settings.weekdayTimes;
  const formattedList = selectedWeekDaysList.map((day: any) => ({
    ...day,
    startTime: parseApiTime(day?.startTime),
    endTime: parseApiTime(day?.endTime),
  }));

  return {
    timeBetweenAppointments: settings.timeBetweenAppointments,
    shouldClientConfirm: settings.shouldClientConfirm,
    dayStart: parseApiTime(settings.dayStart),
    dayEnd: parseApiTime(settings.dayEnd),
    workingDays: settings.workingDays,
    weekdayTimes: formattedList,
    lunchStart: parseApiTime(settings.lunchStart),
    lunchEnd: parseApiTime(settings.lunchEnd),
    isDoubleBookingAllowed: settings.isDoubleBookingAllowed,
    remindClient: settings.remindClient,
  };
};

export const adaptSaleSpecial = (
  saleSpecial: any,
  providerOffset: any,
): any => ({
  bannerImage: saleSpecial.banner,
  photo: saleSpecial.presetBanner,
  sale: saleSpecial.title,
  service:
    saleSpecial?.service?.isActive == true
      ? { ...saleSpecial.service, images: [] }
      : null,
  salePrice: saleSpecial.salePrice.toString(),
  price: saleSpecial.actualPrice.toString(),
  backgroundColor: saleSpecial.bgColor
    ? saleSpecial.bgColor
    : 'rgba(0, 0, 0, 0.8)',
  saleDescription: saleSpecial.saleDescription,
  todayOnly: saleSpecial.saleToday,
  timeRestriction: saleSpecial.isTimeRestrication,
  timeRestrictionStart:
    saleSpecial.isTimeRestrication && saleSpecial.restricationStartTime
      ? moment
          .utc(saleSpecial.restricationStartTime, ['HH:mm'])
          .utcOffset(Number(providerOffset))
          .toDate()
      : moment().toDate(),
  timeRestrictionEnd:
    saleSpecial.isTimeRestrication && saleSpecial.restricationEndTime
      ? moment
          .utc(saleSpecial.restricationEndTime, ['HH:mm'])
          .utcOffset(Number(providerOffset))
          .toDate()
      : moment().add(1, 'hours').toDate(),
  dateRestriction: saleSpecial.isDateRestrication,
  dateRestrictionStartVal:
    saleSpecial.isDateRestrication && saleSpecial.restricationStartDate
      ? moment(saleSpecial.restricationStartDate).toDate()
      : moment().startOf('day').toDate(),
  dateRestrictionEndVal:
    saleSpecial.isDateRestrication && saleSpecial.restricationEndDate
      ? moment(saleSpecial.restricationEndDate).toDate()
      : moment().startOf('day').add(1, 'days').toDate(),
  dayRestriction: saleSpecial.isDayRestrication,
  dayRestrictionVal:
    saleSpecial.isDayRestrication && saleSpecial.restricationDay
      ? saleSpecial.restricationDay
      : [],
  existingClientsOnly: saleSpecial.isExistingClient,
  noCombination: saleSpecial.isCombination,
  sendOfferToClientApp: saleSpecial.saleShareWithClientApp,
  sendOfferToSocialMediaPages: saleSpecial.isSocial,
  active: saleSpecial.active,
});

export const adaptQuickPromotion = (
  saleSpecial: any,
  providerOffset: any,
): any => ({
  sale: saleSpecial.title,
  service:
    saleSpecial?.service?.isActive == true
      ? { ...saleSpecial.service, images: [] }
      : null,
  isQuickPromotion: saleSpecial?.isQuickPromotion,
  isAllService: saleSpecial?.isAllService,
  discount: String(saleSpecial?.discount),
  todayOnly: saleSpecial.saleToday,
  timeRestriction: saleSpecial.isTimeRestrication,
  timeRestrictionStart:
    saleSpecial.isTimeRestrication && saleSpecial.restricationStartTime
      ? moment
          .utc(saleSpecial.restricationStartTime, ['HH:mm'])
          .utcOffset(Number(providerOffset))
          .toDate()
      : moment().toDate(),
  timeRestrictionEnd:
    saleSpecial.isTimeRestrication && saleSpecial.restricationEndTime
      ? moment
          .utc(saleSpecial.restricationEndTime, ['HH:mm'])
          .utcOffset(Number(providerOffset))
          .toDate()
      : moment().add(1, 'hours').toDate(),
  dateRestriction: saleSpecial.isDateRestrication,
  dateRestrictionStartVal:
    saleSpecial.isDateRestrication && saleSpecial.restricationStartDate
      ? moment(saleSpecial.restricationStartDate).toDate()
      : moment().startOf('day').toDate(),
  dateRestrictionEndVal:
    saleSpecial.isDateRestrication && saleSpecial.restricationEndDate
      ? moment(saleSpecial.restricationEndDate).toDate()
      : moment().startOf('day').add(1, 'days').toDate(),
  dayRestriction: saleSpecial.isDayRestrication,
  dayRestrictionVal:
    saleSpecial.isDayRestrication && saleSpecial.restricationDay
      ? saleSpecial.restricationDay
      : [],
  active: saleSpecial.active,
});

export const adaptClientBirthdayReward = (apiClientReward: any): any => {
  const clReward: any = {
    active: apiClientReward.active,
    description: apiClientReward.description,
    moreDescription: apiClientReward.about,
    onlyOnBirthday: apiClientReward.isAvailableBirthday,
    noCombination: apiClientReward.isCombination,
  };
  if (apiClientReward.rewardType == 'discount amount') {
    clReward.rewardType = { id: 1, name: apiClientReward.rewardType };
    clReward.discountAmount = apiClientReward.discount?.toString();
  } else if (apiClientReward.rewardType == 'discount percent') {
    clReward.rewardType = { id: 2, name: apiClientReward.rewardType };
    clReward.discountRate = apiClientReward.discountRate?.toString();
  }
  if (apiClientReward.rewardFor == 'services') {
    clReward.rewardFor = { id: 1, name: apiClientReward.rewardFor };
    clReward.services = [...apiClientReward.services];
  } else if (apiClientReward.rewardFor == 'items') {
    clReward.rewardFor = { id: 2, name: apiClientReward.rewardFor };
    clReward.sItems = [...apiClientReward.items];
  }
  return clReward;
};

export const formatClientBirthdayRewardParameters = (
  clientReward: any,
): any => {
  const clReward: any = {
    active: clientReward.active,
    description: clientReward.description,
    rewardType: clientReward.rewardType?.name,
    rewardFor: clientReward.rewardFor?.name,
    about: clientReward.moreDescription,
    isAvailableBirthday: clientReward.onlyOnBirthday,
    isCombination: clientReward.noCombination,
    type: clientReward.type,
  };
  if (clientReward.rewardType?.id == '1') {
    clReward.discount = Number(clientReward.discountAmount);
    clReward.discountRate = null;
  } else if (clientReward.rewardType?.id == '2') {
    clReward.discountRate = Number(clientReward.discountRate);
    clReward.discount = null;
  }
  if (clientReward.rewardFor?.id == '1') {
    clReward.serviceIds = clientReward.services?.map((e: any) => e?.id);
    clReward.itemIds = [];
  } else if (clientReward.rewardFor?.id == '2') {
    clReward.itemIds = clientReward.sItems?.map((e: any) => e?.id);
    clReward.serviceIds = [];
  }
  if (clientReward.id) {
    clReward.id = clientReward.id;
  }
  return clReward;
};

export const adaptClientLoyaltyReward = (apiClientReward: any): any => {
  const clReward: any = {
    active: apiClientReward.active,
    description: apiClientReward.description,
    cannotUseWithOtherSpecial: apiClientReward.cannotUseWithOtherSpecial,
    dayRestriction: apiClientReward.isDayRestrication,
  };
  if (apiClientReward.rewardType == 'discount amount') {
    clReward.rewardType = { id: 1, name: apiClientReward.rewardType };
    clReward.discountAmount = apiClientReward.discount?.toString();
  } else if (apiClientReward.rewardType == 'discount percent') {
    clReward.rewardType = { id: 2, name: apiClientReward.rewardType };
    clReward.discountRate = apiClientReward.discountRate?.toString();
  }
  if (apiClientReward.rewardFor == 'services') {
    clReward.rewardFor = { id: 1, name: apiClientReward.rewardFor };
    clReward.services = [...apiClientReward.services];
  } else if (apiClientReward.rewardFor == 'items') {
    clReward.rewardFor = { id: 2, name: apiClientReward.rewardFor };
    clReward.sItems = [...apiClientReward.items];
  }
  if (apiClientReward.rewardReason == 'total money spent') {
    clReward.rewardReason = { id: 1, name: apiClientReward.rewardReason };
    clReward.rewardAfterSpending = apiClientReward.rewardSpending?.toString();
  } else if (
    apiClientReward.rewardReason == 'number of appointments completed'
  ) {
    clReward.rewardReason = { id: 2, name: apiClientReward.rewardReason };
    clReward.rewardAfterCompleting =
      apiClientReward.rewardAfterCompleting?.toString();
  }
  if (apiClientReward.isDayRestrication) {
    clReward.restrictedDays = apiClientReward.restricationDay;
  }
  return clReward;
};

export const formatClientLoyaltyRewardParameters = (clientReward: any): any => {
  const clReward: any = {
    active: clientReward.active,
    description: clientReward.description,
    about: clientReward.moreDescription,
    rewardType: clientReward.rewardType?.name,
    rewardFor: clientReward.rewardFor?.name,
    rewardReason: clientReward.rewardReason?.name,
    isDayRestrication: clientReward.dayRestriction,
    cannotUseWithOtherSpecial: clientReward.cannotUseWithOtherSpecial,
    type: clientReward.type,
  };
  if (clientReward.rewardType?.id == '1') {
    clReward.discount = Number(clientReward.discountAmount);
    clReward.discountRate = null;
  } else if (clientReward.rewardType?.id == '2') {
    clReward.discountRate = Number(clientReward.discountRate);
    clReward.discount = null;
  }
  if (clientReward.rewardFor?.id == '1') {
    clReward.serviceIds = clientReward.services?.map((e: any) => e?.id);
    clReward.itemIds = [];
  } else if (clientReward.rewardFor?.id == '2') {
    clReward.itemIds = clientReward.sItems?.map((e: any) => e?.id);
    clReward.serviceIds = [];
  }
  if (clientReward.rewardReason?.id == '1') {
    clReward.rewardSpending = Number(clientReward.rewardAfterSpending);
    clReward.rewardAfterCompleting = null;
  } else if (clientReward.rewardReason?.id == '2') {
    clReward.rewardAfterCompleting = Number(clientReward.rewardAfterCompleting);
    clReward.rewardSpending = null;
  }
  if (clientReward.dayRestriction) {
    clReward.restricationDay = clientReward.restrictedDays;
  } else {
    clReward.restricationDay = [];
  }
  if (clientReward.id) {
    clReward.id = clientReward.id;
  }
  return clReward;
};
