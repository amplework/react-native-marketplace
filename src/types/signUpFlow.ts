import { ImageOrVideo } from 'react-native-image-crop-picker';
import { IAddress } from './address';
import { SignUpProduct } from './products';
import { Service } from './service';
import { Avatar, Credentials } from './users';

export type SignUpProviderValues = Credentials & {
  firstName: string;
  lastName: string;
  countryCode: any;
  phoneNumber: string;
  businessName: string;
  expectedEarning: string;
  secureCode: string;
  isHouseCallAllowed: boolean;
  addressDetailsLine: string;
  address: IAddress | null;
  utctimezone: string;
  industryId: number | null;
  serviceId: number | null;
  avatar: Avatar | string | null;
  logo: Avatar | string | null;
  services?: Service[];
  social?: boolean;
};

export type PersonalInfoValues = {
  firstName: string;
  lastName: string;
  countryCode: any;
  dialCode: any;
  phoneNumber: string;
  utctimezone: string;
  utcOffset: number;
  address: IAddress | null;
  addressDetailsLine: string;
  avatar: Avatar | string | null;
};

export type LinkTypes = {
  id: number;
  value: string;
}

export type BusinessDetailsValues = {
  industryId: number | null;
  serviceId: number | null;
  businessName: string;
  expectedEarning: string;
  isHouseCallAllowed: boolean;
  logo: Avatar | ImageOrVideo | string | null;
  description: string;
  links: LinkTypes[];
};

export type SignUpProviderRequest = {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: any;
  phoneNumber: string;
  businessName: string;
  expectedEarning: number;
  industryId: number;
  serviceId: number;
  password?: string;
  secureCode?: string;
  isHouseCallAllowed?: boolean;
  address?: string;
  utctimezone?: string;
  photo?: string;
  photoUrl?: string;
  providerImage?: string;
  facebookAccessToken?: string;
  googleIdToken?: string;
  appleId?: string;
  products?: SignUpProduct[];
};

export type WebSignUpProviderValues = Credentials & {
  services?: Service[];
};
