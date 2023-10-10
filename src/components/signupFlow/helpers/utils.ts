import { isNull } from 'lodash';
import { SignUpProduct } from 'types/products';
import { countryCodes } from 'utils/countryCodes';
import { isString } from 'utils/strings';
import { BusinessDetailsValues, PersonalInfoValues, SignUpProviderRequest, SignUpProviderValues } from 'types/signUpFlow';

import {
  signUpBasicInfoSchema,
  signUpEmailSchema,
  signUpPersonalInfoSchema,
} from './validation';

type InitialSignUpData = {
  values: SignUpProviderValues;
  facebookAccessToken: string | null;
  googleIdToken: string | null;
  appleId: string | null;
};

export interface CustomSubscription {
  id: string,
  object: string,
  active: boolean,
  attributes: any[],
  created: number,
  default_price: string,
  description: string | null,
  images: any[],
  livemode: boolean,
  metadata: any,
  name: string,
  package_dimensions: any,
  shippable: any,
  statement_descriptor: any,
  tax_code: number | null,
  type: string,
  unit_label: any,
  updated: number | null,
  url: string | null,
  amount: Number
}

export const adaptBusinessDetails = (
  providerDetails: any,
): BusinessDetailsValues => {
  const linksArray = providerDetails?.links || ["null"]
  let myArray = linksArray.map((str: string, index: number) => ({ value: str, id: index + 1 }));
  return ({
    industryId: providerDetails?.industryId,
    isHouseCallAllowed: providerDetails?.isHouseCallAllowed,
    businessName: providerDetails?.businessName || '',
    expectedEarning: isNull(providerDetails?.expectedEarning) ? '' : String(providerDetails?.expectedEarning),
    serviceId: providerDetails?.serviceId,
    logo: providerDetails?.providerImage || '',
    description: providerDetails?.profileDescription || '',
    links: myArray || [{ value: '', id: 1 }],
  })
};

export const adaptPerosonalInfo = (
  providerDetails: any,
): PersonalInfoValues => {
  const numberWithoutCode = providerDetails?.phoneNumber ?
    providerDetails?.phoneNumber
      .substring(providerDetails?.phoneNumber
        .indexOf('-') + 1) : '';
  const filterCountry = countryCodes.filter((e: any) =>
    e.sortname == (providerDetails?.countryCode))[0];
  return ({
    firstName: providerDetails?.firstName || '',
    lastName: providerDetails?.lastName || '',
    avatar: providerDetails?.photo || '',
    phoneNumber: numberWithoutCode || '',
    address: providerDetails?.address ? (providerDetails?.address?.formattedAddress == 'null' ? null : providerDetails?.address) : null,
    utctimezone: providerDetails?.address?.utctimezone || '',
    utcOffset: providerDetails?.utcOffset || 0,
    countryCode: providerDetails?.countryCode || '',
    dialCode: filterCountry?.phonecode || '',
    addressDetailsLine: providerDetails?.address?.addressLine2 || ''
  })
};

export const formalizeSocialSignupData = (socialData: any) => {
  const formData = new FormData();
  Object.keys(socialData).forEach(key => {
    if (socialData[key] !== null) {
      formData.append(key, socialData[key]);
    }
  });
  return formData;
}

export const formatSignUpData = ({
  values,
  facebookAccessToken,
  googleIdToken,
  appleId,
}: InitialSignUpData) => {
  const userInfo: SignUpProviderRequest = {
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    countryCode: values.countryCode,
    phoneNumber: values.phoneNumber,
    industryId: values.industryId!,
    isHouseCallAllowed: values.isHouseCallAllowed,
    businessName: values.businessName,
    expectedEarning: +values.expectedEarning,
    serviceId: values.serviceId!,
  };

  if (!values.social) {
    userInfo.password = values.password;
    userInfo.secureCode = values.secureCode;
  }

  if (values.social && facebookAccessToken) {
    userInfo.facebookAccessToken = facebookAccessToken;
  }
  if (values.social && googleIdToken) {
    userInfo.googleIdToken = googleIdToken;
  }

  if (values.social && appleId) {
    userInfo.appleId = appleId;
  }

  if (typeof values?.avatar !== 'string' && values?.avatar?.path) {
    userInfo.photo = JSON.stringify({
      uri: values.avatar.path,
      name: values.avatar.filename || 'name.jpg',
      type: values.avatar.mime,
    });
  }

  if (typeof values?.avatar === 'string') {
    userInfo.photoUrl = values.avatar;
  }

  if (values.logo) {
    userInfo.providerImage = isString(values.logo)
      ? values.logo
      : JSON.stringify({
        uri: values.logo.path,
        name: values.logo.filename || 'providerImage.jpg',
        type: values.logo.mime,
      });
  }

  if (values.address) {
    userInfo.address = JSON.stringify({
      ...values.address,
      addressLine2: values.addressDetailsLine,
    });
  }

  const products: SignUpProduct[] = [];

  if (values.services) {
    for (let i = 0; i < values.services.length; i++) {
      products.push({
        name: values.services[i]?.serviceName,
        description: values.services[i]?.serviceDescription,
        type: values.services[i]?.physicalItem ? 'item' : 'service',
        price: +values.services[i]?.servicePrice,
        isQuickSale: values.services[i]?.quickSale,
        isActive: values.services[i]?.activeService,
        time: +values.services[i]?.estimationTime,
        imageFiles: values.services[i]?.servicePictures?.map(
          (item: any, index: number) => ({
            uri: item?.path,
            type: item?.mime,
            name: item?.filename || `filename${index}.jpg`,
          }),
        ),
      });
    }
  }

  if (products?.length) {
    userInfo.products = products;
  }

  return userInfo;
};

export const getValidationSchema = (step: number) => {
  switch (step) {
    case 0:
      return signUpEmailSchema;
    case 2:
      return signUpBasicInfoSchema;
    case 3:
      return signUpPersonalInfoSchema;
    default:
      return null;
  }
};
