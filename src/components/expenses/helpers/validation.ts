import { FormikErrors } from 'formik';
import { t, translations } from 'locales';
import { ExpenseValues, ExpenseValuesLite } from 'types/expenses';
import { FIELD_MAX_LENGTH, FIELD_MIN_LENGTH } from 'utils/constants';
import REGEX from 'utils/regex';
import { capitalize } from 'utils/strings';

export const validateExpense = (values: ExpenseValues | ExpenseValuesLite) => {
  const errors = {} as FormikErrors<ExpenseValues | ExpenseValuesLite>;

  // if (!REGEX.title.test(values.description)) {
  //   errors.description = t(translations.common.errors.forbiddenSymbols, {
  //     field: t(translations.form.name),
  //   });
  // }

  if (!values.description.trim()) {
    errors.description = t(translations.common.errors.required, {
      field: t(translations.form.description),
    });
  }

  if (
    REGEX.onlyNumbers.test(values.description) ||
    REGEX.specialCharacters.test(values.description)
  ) {
    errors.description =
      'Description field shall not contain only special character or number.';
  }

  if (values.description.trim().length > FIELD_MAX_LENGTH) {
    errors.description = t(translations.common.errors.maxLength, {
      field: t(translations.form.description),
      length: FIELD_MAX_LENGTH,
    });
  }

  if (values.description.trim().length < FIELD_MIN_LENGTH) {
    errors.description = t(translations.common.errors.minLength, {
      field: t(translations.form.description),
      length: FIELD_MIN_LENGTH,
    });
  }

  if (!values.date) {
    errors.date = t(translations.common.errors.required, {
      field: t(translations.form.date),
    });
  }

  if (Number(values.total) <= 0) {
    errors.total = t(translations.expenses.errors.lengthError);
  }

  if (values.total && REGEX.onlyNumbers.test(values.total) == false) {
    errors.total = 'Total field should contain only numeric characters';
  }

  if (!values.total) {
    errors.total = t(translations.common.errors.required, {
      field: capitalize(t(translations.expenses.total)),
    });
  }

  if (
    values.invoiceNumber &&
    REGEX.onlyNumbers.test(values.invoiceNumber) == false
  ) {
    errors.invoiceNumber =
      'Invoice number should contain only numeric characters';
  }

  if (!values.expenseTypeId) {
    errors.expenseTypeId = t(translations.common.errors.required, {
      field: capitalize(t(translations.common.entities.expenseType)),
    });
  }

  if (!values.paymentMethodId) {
    errors.paymentMethodId = t(translations.common.errors.required, {
      field: capitalize(t(translations.common.entities.paymentMethod)),
    });
  }

  return errors;
};
