import { FormikErrors } from 'formik';
import I18n from 'locales';
import { VendorValues } from 'types/vendors';
import { SHORT_FIELD_MAX_LENGTH } from 'utils/constants';
import REGEX from 'utils/regex';

export const validateVendor = (values: VendorValues) => {
  const errors = {} as FormikErrors<VendorValues>;

  if (!REGEX.strictName.test(values.name)) {
    errors.name = 'Name is not valid'
  }

  if (!values.name.trim()) {
    errors.name = I18n.t('common.errors.required', {
      field: I18n.t('form.name'),
    });
  }

  if (values.name.trim().length > SHORT_FIELD_MAX_LENGTH) {
    errors.name = I18n.t('common.errors.maxLength', {
      field: I18n.t('form.name'),
      length: SHORT_FIELD_MAX_LENGTH,
    });
  }

  if (values.notes && values.notes.trim().length < 3) {
    errors.notes = I18n.t('common.errors.minLength', {
      field: 'notes',
      length: 3,
    });
  }

  if (REGEX.onlyNumbers.test(values.notes) || REGEX.specialCharacters.test(values.notes)) {
    errors.notes = 'Notes field can not accept only numeric or special characters';
  }

  if (values.phoneNumber && !REGEX.onlyNumbers.test(values.phoneNumber)) {
    errors.phoneNumber = "Phone number is not valid";
  }

  if (values.email && !REGEX.email.test(String(values.email).trim().toLowerCase())) {
    errors.email = I18n.t('common.errors.wrongFormat', {
      field: I18n.t('form.email'),
    });
  }

  return errors;
};
