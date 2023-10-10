import { translations } from 'locales';
import REGEX from 'utils/regex';
import { validationMessages } from 'utils/validation';
import * as Yup from 'yup';

export const signUpEmailSchema = Yup.object({
  email: Yup.string()
    .required(validationMessages.required(translations.form.email))
    .email(validationMessages.wrongFormat(translations.form.email)),
});

export const signUpBasicInfoSchema = Yup.object({
  password: Yup.string().when('social', {
    is: false,
    then: Yup.string()
      .required(validationMessages.required(translations.form.password))
      .matches(REGEX.password, validationMessages.passwordFormat),
    otherwise: Yup.string().notRequired(),
  }),
});

export const BusinessDetailSchema = Yup.object({
  industryId: Yup.number()
    .nullable()
    .required(
      validationMessages.required(translations.basicInfo.industryField),
    ),
  serviceId: Yup.number()
    .nullable()
    .required(validationMessages.required(translations.basicInfo.titleField)),
  businessName: Yup.string()
    .required(
      validationMessages.required(translations.personalInfo.fields.shopName),
    )
    .matches(
      REGEX.shopName,
      validationMessages.wrongFormat(translations.personalInfo.fields.shopName),
    ),
  expectedEarning: Yup.string()
    .required(
      validationMessages.required(
        translations.personalInfo.fields.expectedPrice,
      ),
    )
    .test(
      'expectedEarning',
      validationMessages.wrongFormat(
        translations.personalInfo.fields.expectedPrice,
      ),
      function (value) {
        return Number(value) > 0;
      },
    ),
});

export const signUpPersonalInfoSchema = Yup.object({
  firstName: Yup.string()
    .required(
      validationMessages.required(translations.personalInfo.fields.firstName),
    )
    .matches(
      REGEX.fname,
      validationMessages.wrongFormat(
        translations.personalInfo.fields.firstName,
      ),
    ),
  lastName: Yup.string()
    .required(
      validationMessages.required(translations.personalInfo.fields.lastName),
    )
    .matches(
      REGEX.lname,
      validationMessages.wrongFormat(translations.personalInfo.fields.lastName),
    ),
  phoneNumber: Yup.string()
    .required(
      validationMessages.required(translations.personalInfo.fields.telephone),
    )
    .matches(REGEX.onlyNumbers,
      validationMessages.wrongFormat(translations.personalInfo.fields.telephone)
    ),
  address: Yup.object()
    .nullable()
    .required(
      validationMessages.required(translations.personalInfo.fields.address),
    ),
});
