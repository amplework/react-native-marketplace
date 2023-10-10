import moment from 'moment-timezone';

export const formalizeSalesSpecial = (salesSpecial: any) => {
  const data = new FormData();

  data.append('title', salesSpecial.sale.trim());
  data.append('serviceId', salesSpecial.service?.['id']);
  data.append('salePrice', Number(salesSpecial.salePrice));
  if (salesSpecial.bannerImage?.path) {
    data.append('banner',
      salesSpecial.bannerImage?.['path']
        ? {
          uri: salesSpecial.bannerImage?.['path'],
          name: salesSpecial.bannerImage?.['filename'] || 'salesSpecialBanner.jpg',
          type: salesSpecial.bannerImage?.['mime'],
        }
        : salesSpecial.bannerImage
    );
    data.append('photo',
      salesSpecial.bannerImage?.['path']
        ? {
          uri: salesSpecial.photo,
          name: 'salesSpecialBanner.jpg',
          type: 'image/jpeg',
        }
        : salesSpecial.bannerImage
    );
  }
  data.append('bgColor', salesSpecial.backgroundColor);
  data.append('actualPrice', parseInt(salesSpecial.price));
  data.append('saleDescription', salesSpecial.saleDescription.trim());
  data.append('saleToday', salesSpecial.todayOnly);
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
  data.append('isExistingClient', salesSpecial.existingClientsOnly);
  data.append('isCombination', salesSpecial.noCombination);
  data.append('saleShareWithClientApp', salesSpecial.sendOfferToClientApp);
  data.append('isSocial', salesSpecial.sendOfferToSocialMediaPages);
  data.append('active', salesSpecial.active);  
  
  return data;
};

export const formalizQuickPromotion = (salesSpecial: any) => {
  const data = new FormData();

  data.append('title', salesSpecial.sale.trim());
  data.append('discount', Number(salesSpecial.discount));
  data.append('saleToday', salesSpecial.todayOnly);
  data.append('serviceId', salesSpecial.service?.['id']);
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

export const formalizeEditSalesSpecial = (salesSpecial: any) => {
  const data = new FormData();

  data.append('title', salesSpecial.sale.trim());
  data.append('serviceId', salesSpecial.service?.['id']);
  data.append('salePrice', Number(salesSpecial.salePrice));
  if (salesSpecial.bannerImage?.path) {
    data.append('banner',
      salesSpecial.bannerImage?.['path']
        ? {
          uri: salesSpecial.bannerImage?.['path'],
          name: salesSpecial.bannerImage?.['filename'] || 'salesSpecialBanner.jpg',
          type: salesSpecial.bannerImage?.['mime'],
        }
        : salesSpecial.bannerImage
    );
    data.append('photo',
      salesSpecial.bannerImage?.['path']
        ? {
          uri: salesSpecial.photo,
          name: 'salesSpecialBanner.jpg',
          type: 'image/jpeg',
        }
        : salesSpecial.bannerImage
    );
  }
  // if (salesSpecial.bannerImage?.path) {
  //   data.append('banner',
  //     salesSpecial.bannerImage?.['path']
  //       ? {
  //         uri: salesSpecial.bannerImage?.['path'],
  //         name: salesSpecial.bannerImage?.['filename'] || 'salesSpecialBanner.jpg',
  //         type: salesSpecial.bannerImage?.['mime'],
  //       }
  //       : salesSpecial.bannerImage
  //   );
  // }
  // if (salesSpecial.photo) {
  //   data.append('photo',
  //     !salesSpecial.photo?.uri
  //       ? {
  //         uri: salesSpecial.photo,
  //         name: 'salesSpecialBanner.jpg',
  //         type: 'image/jpeg',
  //       }
  //       : salesSpecial.photo
  //   );
  // } else {
  //   data.append('photo', salesSpecial.photo);
  //   data.append('banner', salesSpecial.bannerImage)
  // }
  data.append('bgColor', salesSpecial.backgroundColor);
  data.append('actualPrice', parseInt(salesSpecial.price));
  data.append('saleDescription', salesSpecial.saleDescription.trim());
  data.append('saleToday', salesSpecial.todayOnly);
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
  data.append('isExistingClient', salesSpecial.existingClientsOnly);
  data.append('isCombination', salesSpecial.noCombination);
  data.append('saleShareWithClientApp', salesSpecial.sendOfferToClientApp);
  data.append('isSocial', salesSpecial.sendOfferToSocialMediaPages);
  data.append('active', salesSpecial.active);

  return data;
};