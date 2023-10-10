import { translations } from 'locales';
import { FIELD_MAX_LENGTH } from 'utils/constants';
import { validationMessages } from 'utils/validation';
import * as Yup from 'yup';

export const cashJournalSchema = Yup.object({
  date: Yup.date().required(
    validationMessages.required(translations.form.date),
  ),
  description: Yup.string()
    .required(validationMessages.required(translations.form.description))
    .max(
      FIELD_MAX_LENGTH,
      validationMessages.maxLength(translations.form.description),
    ),
  total: Yup.string()
    .required(validationMessages.required(translations.form.total))
    .notOneOf(['0'], validationMessages.zero(translations.form.total)),
  notes: Yup.string()
    .notRequired()
    .nullable()
    .max(
      FIELD_MAX_LENGTH,
      validationMessages.maxLength(translations.form.notes),
    ),
});
