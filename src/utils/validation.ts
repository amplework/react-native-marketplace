import { t, translations } from 'locales';

import { FIELD_MAX_LENGTH, FIELD_MIN_LENGTH } from './constants';

export const validationMessages = {
  required: (field: string) =>
    t(translations.common.errors.required, { field: t(field) }),
  maxLength: (field: string, length = FIELD_MAX_LENGTH) =>
    t(translations.common.errors.maxLength, { field: t(field), length }),
  minLength: (field: string, length = FIELD_MIN_LENGTH) =>
    t(translations.common.errors.minLength, { field: t(field), length }),
  zero: (field: string) =>
    t(translations.common.errors.zero, { field: t(field) }),
  wrongFormat: (field: string) =>
    t(translations.common.errors.wrongFormat, { field: t(field) }),
  passwordFormat: t(translations.common.errors.passwordFormat),
};
