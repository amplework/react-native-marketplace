import { LinkTypes } from "types/signUpFlow";

export interface States {
tab: number;
avatar: string;
logo: string | any;
firstName: string;
lastName: string;
dialCode: any;
countryCode: any; 
phone: string;
gender: string;
shopName: string;
expectedPrice: string;
firstNameError: string;
lastNameError: string;
industryError: string;
titleError: string;
shopError: string;
expectedError: string;
phoneError: string;
industry: string;
title: string;
address: any;
timeZone: any;
birthday: string;
birthdayData: string;
otherNumber: string;
otherNumberError: string;
addressDetails: string;
checkbox: boolean;
moreDetails: boolean;
show: boolean;
showModal: boolean;
webUserFirstLogin: boolean;
maxLength: number;
countryPicker: boolean;
links: LinkTypes[];
addressDetailsError: string;
}