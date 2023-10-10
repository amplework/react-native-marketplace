import moment from 'moment-timezone';

export const formalizQuickPromotion = (salesSpecial: any) => {
  const data = new FormData();

  data.append('title', salesSpecial.sale.trim());
  data.append('discount', Number(salesSpecial.discount));
  data.append('saleToday', salesSpecial.todayOnly);
  data.append('isAllService', salesSpecial.isAllService);
  if(!salesSpecial.isAllService) {
    data.append('serviceId', salesSpecial.service?.['id']);
  }
  data.append('isQuickPromotion', salesSpecial.isQuickPromotion);
  data.append('isTimeRestrication', salesSpecial.timeRestriction);
  if (salesSpecial.timeRestriction) {
    data.append('restricationStartTime', moment.utc(salesSpecial.timeRestrictionStart).format('HH:mm'));
    data.append('restricationEndTime', moment.utc(salesSpecial.timeRestrictionEnd).format('HH:mm'));
  } else {
    data.append('restricationStartTime', '');
    data.append('restricationEndTime', '');
  }
  data.append('isDateRestrication', salesSpecial.dateRestriction);
  if (salesSpecial.dateRestriction) {
    data.append('restricationStartDate', moment(salesSpecial.dateRestrictionStartVal).startOf('day').toISOString());
    data.append('restricationEndDate', moment(salesSpecial.dateRestrictionEndVal).startOf('day').toISOString());
  } else {
    data.append('restricationStartDate', '');
    data.append('restricationEndDate', '');
  }
  data.append('isDayRestrication', salesSpecial.dayRestriction);
  if (salesSpecial.dayRestriction) {
    salesSpecial.dayRestrictionVal?.forEach((element: any, index: number) => {
      data.append(`restricationDay[${index}]`, element);
    });
  } else {
    data.append('restricationDay', '');
  }
  data.append('active', salesSpecial.active);  
  
  return data;
};

export const formalizeEditQuickPromotion = (salesSpecial: any) => {
  const data = new FormData();

  data.append('title', salesSpecial.sale.trim());
  data.append('discount', Number(salesSpecial.discount));
  data.append('saleToday', salesSpecial.todayOnly);
  data.append('isAllService', salesSpecial.isAllService);
  if(!salesSpecial.isAllService) {
    data.append('serviceId', salesSpecial.service?.['id']);
  } else {
    data.append('serviceId', '');
  }
  data.append('isQuickPromotion', salesSpecial.isQuickPromotion);
  data.append('isTimeRestrication', salesSpecial.timeRestriction);
  if (salesSpecial.timeRestriction) {
    data.append('restricationStartTime', moment.utc(salesSpecial.timeRestrictionStart).format('HH:mm'));
    data.append('restricationEndTime', moment.utc(salesSpecial.timeRestrictionEnd).format('HH:mm'));
  } else {
    data.append('restricationStartTime', '');
    data.append('restricationEndTime', '');
  }
  data.append('isDateRestrication', salesSpecial.dateRestriction);
  if (salesSpecial.dateRestriction) {
    data.append('restricationStartDate', moment(salesSpecial.dateRestrictionStartVal).startOf('day').toISOString());
    data.append('restricationEndDate', moment(salesSpecial.dateRestrictionEndVal).startOf('day').toISOString());
  } else {
    data.append('restricationStartDate', '');
    data.append('restricationEndDate', '');
  }
  data.append('isDayRestrication', salesSpecial.dayRestriction);
  if (salesSpecial.dayRestriction) {
    salesSpecial.dayRestrictionVal?.forEach((element: any, index: number) => {
      data.append(`restricationDay[${index}]`, element);
    });
  } else {
    data.append('restricationDay', '');
  }
  data.append('active', salesSpecial.active);

  return data;
};