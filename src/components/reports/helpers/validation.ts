import { translations } from 'locales';
import { validationMessages } from 'utils/validation';
import * as Yup from 'yup';

export const reportSchema = Yup.object({
  fromDate: Yup.date().when('period', {
    is: 'date',
    then: Yup.date().required(
      validationMessages.required(translations.reports.startDate),
    ),
    otherwise: Yup.date().nullable().notRequired(),
  }),
  toDate: Yup.date().when('period', {
    is: 'date',
    then: Yup.date().required(
      validationMessages.required(translations.reports.endDate),
    ),
    otherwise: Yup.date().nullable().notRequired(),
  }),
  email: Yup.string().when('sendOption', {
    is: 'send',
    then: Yup.string()
      .nullable()
      .required(validationMessages.required(translations.form.email))
      .email(validationMessages.wrongFormat(translations.form.email)),
    otherwise: Yup.string().nullable().notRequired(),
  }),
});
