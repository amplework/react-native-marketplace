import { FormikErrors } from 'formik';
import I18n from 'locales';
import { SHORT_FIELD_MAX_LENGTH } from 'utils/constants';
import { toFloat, digitsAfterDecimal } from 'utils/numbers';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';
import REGEX from 'utils/regex';

import { EstimateProductValues, EstimateValues } from 'types/estimates';
import { calculateEstimateTotal } from './utils';

export const validateEstimate =
  (methodList: any) => (values: EstimateValues) => {
  const FIRST_NAME = I18n.t('estimates.fields.firstName');
  const LAST_NAME = I18n.t('estimates.fields.lastName');
  const PHONE_NUMBER = I18n.t('estimates.fields.phoneNumber');
  const EMAIL = I18n.t('estimates.fields.email');

  let paymentMethod = methodList?.find((e: any) => e?.id == values?.expectedPaymentMethodId)

  const errors = {} as FormikErrors<EstimateValues>;

  if (!values.isNewClient) {
    if (!values.subClient) {
      errors.subClient = I18n.t('estimates.errors.clientRequired');
    }
  }

  if (values.isNewClient) {
    if (!REGEX.fname.test(values.firstName)) {
      errors.firstName = 'First name is not valid'
    }

    if (!values.firstName.trim()) {
      errors.firstName = I18n.t('common.errors.required', {
        field: FIRST_NAME,
      });
    }

    if (values.firstName.trim().length > SHORT_FIELD_MAX_LENGTH) {
      errors.firstName = I18n.t('common.errors.maxLength', {
        field: FIRST_NAME,
        length: SHORT_FIELD_MAX_LENGTH,
      });
    }

    if (!REGEX.lname.test(values.lastName)) {
      errors.lastName = 'Last name is not valid'
    }

    if (!values.lastName.trim()) {
      errors.lastName = I18n.t('common.errors.required', {
        field: LAST_NAME,
      });
    }

    if (values.lastName.trim().length > SHORT_FIELD_MAX_LENGTH) {
      errors.lastName = I18n.t('common.errors.maxLength', {
        field: LAST_NAME,
        length: SHORT_FIELD_MAX_LENGTH,
      });
    }

    // if (!REGEX.phone.test(values.phoneNumber)) {
    //   errors.phoneNumber = I18n.t('common.errors.wrongFormat', {
    //     field: PHONE_NUMBER,
    //   });
    // }

    // if (!values.phoneNumber.trim()) {
    //   errors.phoneNumber = I18n.t('common.errors.required', {
    //     field: PHONE_NUMBER,
    //   });
    // }
    if(!values.expectedPaymentMethodId){
      errors.expectedPaymentMethodId = I18n.t('estimates.errors.paymentMethodRequired');
    }
    if (isOnlinePaymentOption(paymentMethod?.description) || isOnlinePaymentOption(paymentMethod?.shortName)) {
      errors.expectedPaymentMethodId = I18n.t('estimates.errors.notConnectedClient');
    }
  }

  if (
    values.isEmailReceipt &&
    (!values.subClient?.isConnected || values.isNewClient)
  ) {
    if (!REGEX.email.test(String(values.email).trim().toLowerCase())) {
      errors.email = I18n.t('common.errors.wrongFormat', { field: EMAIL });
    }

    if (!values.email.trim()) {
      errors.email = I18n.t('common.errors.required', {
        field: EMAIL,
      });
    }
  }

  if (!values.products.length) {
    errors.products = I18n.t('estimates.errors.productRequired');
  }

  if (values.payment) {
    if (calculateEstimateTotal(values) - values.payment.total < 0) {
      errors.payment = I18n.t('estimates.errors.negativeBalance');
    }
  }

  if(!values.expectedPaymentMethodId){
    errors.expectedPaymentMethodId = I18n.t('estimates.errors.paymentMethodRequired');
  }

  if (isOnlinePaymentOption(paymentMethod?.description) || isOnlinePaymentOption(paymentMethod?.shortName)) {
    if (values.subClient?.isDisconnect || (!values.subClient?.isConnected)) {
      errors.expectedPaymentMethodId = I18n.t('estimates.errors.notConnectedClient');
    } else if (!values.subClient?.isPaymentEnabled) {
      errors.expectedPaymentMethodId = I18n.t('estimates.errors.noOnlinePaymentEnabledClient');
    }
  }

  return errors;
};

export const validateEstimateProduct = (values: EstimateProductValues) => {
  const PRICE = I18n.t('estimates.fields.price');
  const QUANTITY = I18n.t('estimates.fields.quantity');

  const errors = {} as FormikErrors<EstimateProductValues>;

  if (!values.selectedProduct) {
    errors.selectedProduct = I18n.t('estimates.errors.productRequired');
  }

  if (values.selectedProduct && !values.price) {
    errors.price = I18n.t('common.errors.required', { field: PRICE });
  }

  if (values.selectedProduct && (isNaN(toFloat(values.price)) || digitsAfterDecimal(values?.price) > 0)) {
    errors.price = I18n.t('common.errors.wrongFormat', { field: PRICE });
  }

  if (!values.quantity) {
    errors.quantity = I18n.t('common.errors.required', { field: QUANTITY });
  }

  if (isNaN(+values.quantity)) {
    errors.quantity = I18n.t('common.errors.wrongFormat', { field: QUANTITY });
  }

  return errors;
};

// export const validateEstimatePayment =
//   (estimateTotal: number) => (values: EstimateProductValues) => {
//     const TOTAL = I18n.t('estimates.fields.total');

//     const errors = {} as FormikErrors<EstimateProductValues>;

//     if (!values.paymentMethodId) {
//       errors.paymentMethodId = I18n.t('estimates.errors.paymentMethodRequired');
//     }

//     if (!values.isFullPayment) {
//       if (!values.total) {
//         errors.total = I18n.t('common.errors.required', { field: TOTAL });
//       }

//       if (isNaN(toFloat(values.total))) {
//         errors.total = I18n.t('common.errors.wrongFormat', { field: TOTAL });
//       }

//       if (estimateTotal - toFloat(values.total) < 0) {
//         errors.total = I18n.t('estimates.errors.negativeBalance');
//       }
//     }

//     return errors;
//   };
