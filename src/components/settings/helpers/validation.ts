import { FormikErrors } from 'formik';
import I18n from 'locales';
import _ from 'lodash';
import { toast } from 'shared/toast';
import { IProduct, ProductValues } from 'types/products';
import {
  ExpenseTypeValues,
  IExpenseType,
  IPaymentMethod,
  PaymentMethodValues,
} from 'types/settings';
import { ITax, TaxValues } from 'types/taxes';
import { FIELD_MAX_LENGTH, FIELD_MIN_LENGTH } from 'utils/constants';
import { digitsAfterDecimal, isDecimalNumber } from 'utils/numbers';
import REGEX from 'utils/regex';

export const validateProduct =
  (product: IProduct | null, products: IProduct[]) =>
  (values: ProductValues) => {
    const errors = {} as FormikErrors<ProductValues>;

    if (!values.name) {
      errors.name = I18n.t('common.errors.required', {
        field: I18n.t('products.fields.name'),
      });
    }

    if (
      REGEX.onlyNumbers.test(values.name) ||
      REGEX.specialCharacters.test(values.name)
    ) {
      errors.name = I18n.t('Service name is not correct');
    }

    if (
      REGEX.onlyNumbers.test(values.description) ||
      REGEX.specialCharacters.test(values.description)
    ) {
      errors.description = I18n.t('Please enter a valid description');
    }

    if (!values.price) {
      errors.price = I18n.t('common.errors.required', {
        field: I18n.t('products.fields.price'),
      });
    }

    if (values.price && Number(values.price) <= 0) {
      errors.price = I18n.t('common.errors.zero', {
        field: I18n.t('products.fields.price'),
      });
    }

    if (isNaN(+values.price) || digitsAfterDecimal(values?.price) > 0) {
      errors.price = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('products.fields.price'),
      });
    }

    if (values.price && Number(values.time) <= 0) {
      errors.time = I18n.t('common.errors.zero', {
        field: I18n.t('products.fields.time'),
      });
    }

    if (isNaN(+values.time)) {
      errors.time = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('products.fields.time'),
      });
    }

    return errors;
  };

export const validatePaymentMethod =
  (method: IPaymentMethod | null, methods: IPaymentMethod[]) =>
  (values: PaymentMethodValues) => {
    const errors = {} as FormikErrors<PaymentMethodValues>;

    if (REGEX.onlyNumbers.test(values.shortName)) {
      errors.shortName = 'Short name shall not contain only numbers.';
    }

    if (REGEX.specialCharacters.test(values.shortName)) {
      errors.shortName =
        'Short name shall not contain only special characters.';
    }

    if (!values.shortName.trim()) {
      errors.shortName = I18n.t('common.errors.required', {
        field: I18n.t('paymentMethods.fields.shortName'),
      });
    }

    if (values.shortName.trim().length > FIELD_MAX_LENGTH) {
      errors.shortName = I18n.t('common.errors.maxLength', {
        field: I18n.t('paymentMethods.fields.shortName'),
        length: FIELD_MAX_LENGTH,
      });
    }

    const otherMethods = methods.filter(({ id }) => id !== method?.id);

    // if (!REGEX.fname.test(values.description)) {
    //   errors.description = I18n.t('common.errors.forbiddenSymbols', {
    //     field: I18n.t('paymentMethods.fields.description'),
    //   });
    // }
    if (REGEX.onlyNumbers.test(values.description)) {
      errors.description = 'Description shall not contain only numbers.';
    }

    if (REGEX.specialCharacters.test(values.description)) {
      errors.description =
        'Description shall not contain only special characters.';
    }

    if (otherMethods.some(({ shortName }) => shortName === values.shortName)) {
      errors.shortName = I18n.t('paymentMethods.errors.uniq', {
        shortName: values.shortName,
      });
    }

    if (!values.description.trim()) {
      errors.description = I18n.t('common.errors.required', {
        field: I18n.t('paymentMethods.fields.description'),
      });
    }

    if (values.description.trim().length > FIELD_MAX_LENGTH) {
      errors.description = I18n.t('common.errors.maxLength', {
        field: I18n.t('paymentMethods.fields.description'),
        length: FIELD_MAX_LENGTH,
      });
    }

    return errors;
  };

export const validateTax =
  (tax: ITax | null, taxes: ITax[]) => (values: TaxValues) => {
    const errors: FormikErrors<TaxValues> = {};

    if (!values.shortName) {
      errors.shortName = I18n.t('common.errors.required', {
        field: I18n.t('taxes.fields.name'),
      });
    }

    if (
      REGEX.onlyNumbers.test(values.shortName) ||
      REGEX.specialCharacters.test(values.shortName)
    ) {
      errors.shortName = I18n.t('Short name is not correct');
    }

    if (
      REGEX.onlyNumbers.test(values.description) ||
      REGEX.specialCharacters.test(values.description)
    ) {
      errors.description = I18n.t('Please enter valid description');
    }

    const otherTaxes = taxes.filter(({ id }) => id !== tax?.id);

    if (otherTaxes.some(({ shortName }) => shortName === values.shortName)) {
      errors.shortName = I18n.t('products.errors.uniqItem');
    }

    if (!values.rate) {
      errors.rate = I18n.t('common.errors.required', {
        field: I18n.t('taxes.fields.rate'),
      });
    }

    if (!REGEX.onlyNumbers.test(String(values.rate))) {
      errors.rate = I18n.t('Tax rate field can only contain numbers');
    }

    const moveToNum = Number(
      values.rate.toString().replace(/[,-]/g, '.').split(' ').join(''),
    );
    if (values.rate && (moveToNum < 0.01 || moveToNum > 99.99)) {
      errors.rate = I18n.t('taxes.fields.rateRange');
    }

    return errors;
  };

export const validateSalesSpecial =
  (salesSpecial: any, salesSpecials: any) => (values: any) => {
    const errors: FormikErrors<any> = {};
    if (!values.sale.trim()) {
      errors.sale = I18n.t('common.errors.required', {
        field: I18n.t('salesSpecial.fields.sale'),
      });
    } else if (!REGEX.title.test(values.sale.trim())) {
      errors.sale = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('salesSpecial.fields.sale'),
      });
    }

    if (!values.service) {
      errors.service = I18n.t('common.errors.required', {
        field: I18n.t('salesSpecial.fields.service'),
      });
    }

    if (values.dayRestriction && values.dayRestrictionVal?.length <= 0) {
      errors.dayRestriction = I18n.t('common.errors.unselected', {
        field: I18n.t('salesSpecial.fields.days'),
      });
    }

    if (!values.saleDescription.trim()) {
      errors.saleDescription = I18n.t('common.errors.required', {
        field: I18n.t('salesSpecial.fields.saleDescription'),
      });
    } else if (!REGEX.description.test(values.saleDescription.trim())) {
      errors.saleDescription = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('salesSpecial.fields.saleDescription'),
      });
    }
    if (values.saleDescription.trim().length > FIELD_MAX_LENGTH) {
      errors.saleDescription = I18n.t('common.errors.maxLength', {
        field: I18n.t('salesSpecial.fields.saleDescription'),
        length: FIELD_MAX_LENGTH,
      });
    }

    if (values.saleDescription.trim().length < FIELD_MIN_LENGTH) {
      errors.saleDescription = I18n.t('common.errors.minLength', {
        field: I18n.t('salesSpecial.fields.saleDescription'),
        length: FIELD_MIN_LENGTH,
      });
    }

    if (!values.salePrice?.trim()) {
      errors.salePrice = I18n.t('common.errors.required', {
        field: I18n.t('salesSpecial.fields.salePrice'),
      });
    }

    const priceNum = Number(values.price);
    const salePriceNum = Number(values.salePrice);

    if (
      values.salePrice &&
      (isNaN(salePriceNum) || digitsAfterDecimal(salePriceNum) > 0)
    ) {
      errors.salePrice = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('salesSpecial.fields.salePrice'),
      });
    }

    if (values.salePrice && (salePriceNum <= 0 || priceNum <= salePriceNum)) {
      errors.salePrice = I18n.t('salesSpecial.fields.salePriceRange');
    }

    return errors;
  };

export const validateQuickPromotion =
  (salesSpecial: any, salesSpecials: any) => (values: any) => {
    const errors: FormikErrors<any> = {};
    if (!values.sale.trim()) {
      errors.sale = I18n.t('common.errors.required', {
        field: I18n.t('salesSpecial.fields.sale'),
      });
    } else if (!REGEX.title.test(values.sale.trim())) {
      errors.sale = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('salesSpecial.fields.sale'),
      });
    }

    if (values?.discount && isDecimalNumber(values?.discount)) {
      errors.discount = 'Please enter a round figured value.';
    }

    if (values?.discount && REGEX.onlyNumbers.test(values?.discount) == false) {
      errors.discount = 'Discount value must be a number.';
    }

    if (values?.discount && values?.discount == 0) {
      errors.discount = 'Discount can not be 0.';
    }

    if (values?.discount && values?.discount > 100) {
      errors.discount = 'Discount can not be more than 100%.';
    }

    if (!values.isAllService && !values.service) {
      errors.service = I18n.t('common.errors.required', {
        field: I18n.t('salesSpecial.fields.discount'),
      });
    }

    if (values.dayRestriction && values.dayRestrictionVal?.length <= 0) {
      errors.dayRestriction = I18n.t('common.errors.unselected', {
        field: I18n.t('salesSpecial.fields.days'),
      });
    }

    return errors;
  };

export const validateExpenseType =
  (expenseType: IExpenseType | null, expenseTypes: IExpenseType[]) =>
  (values: ExpenseTypeValues) => {
    const errors = {} as FormikErrors<ExpenseTypeValues>;

    if (!REGEX.title.test(values.shortName)) {
      errors.shortName = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('expenseTypes.fields.shortName'),
      });
    }

    if (!values.shortName.trim()) {
      errors.shortName = I18n.t('common.errors.required', {
        field: I18n.t('expenseTypes.fields.shortName'),
      });
    }

    if (values.shortName.trim().length > FIELD_MAX_LENGTH) {
      errors.shortName = I18n.t('common.errors.maxLength', {
        field: I18n.t('expenseTypes.fields.shortName'),
        length: FIELD_MAX_LENGTH,
      });
    }

    const otherMethods = expenseTypes.filter(
      ({ id }) => id !== expenseType?.id,
    );

    if (otherMethods.some(({ shortName }) => shortName === values.shortName)) {
      errors.shortName = I18n.t('expenseTypes.errors.uniq', {
        shortName: values.shortName,
      });
    }

    if (!values.description.trim()) {
      errors.description = I18n.t('common.errors.required', {
        field: I18n.t('expenseTypes.fields.description'),
      });
    }

    if (values.description.trim().length > FIELD_MAX_LENGTH) {
      errors.description = I18n.t('common.errors.maxLength', {
        field: I18n.t('expenseTypes.fields.description'),
        length: FIELD_MAX_LENGTH,
      });

      if (!REGEX.title.test(values.description)) {
        errors.description = I18n.t('common.errors.forbiddenSymbols', {
          field: I18n.t('expenseTypes.fields.description'),
        });
      }
    }

    return errors;
  };

export const validateClientBirthdayReward =
  (clientBirthdayReward: any) => (values: any) => {
    const errors: FormikErrors<any> = {};

    if (_.isEmpty(values.rewardType)) {
      errors.rewardType = I18n.t('common.errors.required', {
        field: I18n.t('clientBirthdayReward.fields.rewardType'),
      });
    }

    if (_.isEmpty(values.rewardFor)) {
      errors.rewardFor = I18n.t('common.errors.required', {
        field: I18n.t('clientBirthdayReward.fields.rewardFor'),
      });
    }
    if (
      values.rewardFor?.id == '1' &&
      clientBirthdayReward.services.length == 0
    ) {
      errors.rewardFor = I18n.t('common.errors.unavailable', {
        field: I18n.t('clientBirthdayReward.fields.services'),
      });
    } else if (values.rewardFor?.id == '1' && _.isEmpty(values.services)) {
      errors.rewardFor = I18n.t('common.errors.unselected', {
        field: I18n.t('clientBirthdayReward.fields.services'),
      });
    }
    if (values.rewardFor?.id == '2' && clientBirthdayReward.items.length == 0) {
      errors.rewardFor = I18n.t('common.errors.unavailable', {
        field: I18n.t('clientBirthdayReward.fields.sItems'),
      });
    } else if (values.rewardFor?.id == '2' && _.isEmpty(values.sItems)) {
      errors.rewardFor = I18n.t('common.errors.unselected', {
        field: I18n.t('clientBirthdayReward.fields.sItems'),
      });
    }

    if (values.rewardType?.id == '1' && !values.discountAmount) {
      errors.discountAmount = I18n.t('common.errors.required', {
        field: I18n.t('clientBirthdayReward.fields.discountAmount'),
      });
    }
    const discountAmountNum = Number(values.discountAmount);
    //@ts-ignore
    const minPriceService = _.minBy(values.services, 'price')?.price;
    //@ts-ignore
    const minPriceSItem = _.minBy(values.sItems, 'price')?.price;

    if (
      values.rewardType?.id == '1' &&
      values.discountAmount &&
      (isNaN(discountAmountNum) || digitsAfterDecimal(discountAmountNum) > 0)
    ) {
      errors.discountAmount = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('clientBirthdayReward.fields.discountAmount'),
      });
    }

    if (
      values.rewardType?.id == '1' &&
      values.discountAmount &&
      (discountAmountNum < 0.01 ||
        (values.rewardFor?.id == '1' &&
          values.discountAmount >= minPriceService) ||
        (values.rewardFor?.id == '2' && values.discountAmount >= minPriceSItem))
    ) {
      errors.discountAmount = I18n.t(
        'clientBirthdayReward.fields.discountAmountRange',
        {
          minPrice:
            values.rewardFor?.id == '1'
              ? minPriceService
              : values.rewardFor?.id == '2' && minPriceSItem,
        },
      );
    }

    if (values.rewardType?.id == '2' && !values.discountRate) {
      errors.discountRate = I18n.t('common.errors.required', {
        field: I18n.t('clientBirthdayReward.fields.discountRate'),
      });
    }
    const discountRateNum = Number(
      values.discountRate?.toString().replace(/[,-]/g, '.').split(' ').join(''),
    );

    if (
      values.rewardType?.id == '2' &&
      values.discountRate &&
      (isNaN(discountRateNum) || digitsAfterDecimal(discountRateNum) > 0)
    ) {
      errors.discountRate = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('clientBirthdayReward.fields.discountRate'),
      });
    }

    if (
      values.rewardType?.id == '2' &&
      values.discountRate &&
      (discountRateNum < 0.01 ||
        discountRateNum > 99.99 ||
        isNaN(discountRateNum))
    ) {
      errors.discountRate = I18n.t(
        'clientBirthdayReward.fields.discountRateRange',
      );
    }

    if (!values.description.trim()) {
      errors.description = I18n.t('common.errors.required', {
        field: I18n.t('clientBirthdayReward.fields.description'),
      });
    } else if (values.description.trim().length < 3) {
      errors.description = I18n.t(
        'clientBirthdayReward.errors.lessDescription',
      );
    } else if (!REGEX.description.test(values.description.trim())) {
      errors.description = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('clientBirthdayReward.fields.description'),
      });
    }
    if (values.description.trim().length > FIELD_MAX_LENGTH) {
      errors.description = I18n.t('common.errors.maxLength', {
        field: I18n.t('clientBirthdayReward.fields.description'),
        length: FIELD_MAX_LENGTH,
      });
    }

    if (!values.moreDescription.trim()) {
      errors.moreDescription = I18n.t('common.errors.required', {
        field: I18n.t('clientBirthdayReward.fields.moreDescription'),
      });
    } else if (values.moreDescription.trim().length < 3) {
      errors.moreDescription = I18n.t(
        'clientBirthdayReward.errors.lessMoreDescription',
      );
    } else if (!REGEX.description.test(values.moreDescription.trim())) {
      errors.moreDescription = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('clientBirthdayReward.fields.moreDescription'),
      });
    }

    if (values.moreDescription.trim().length < FIELD_MIN_LENGTH) {
      errors.moreDescription = I18n.t('common.errors.minLength', {
        field: I18n.t('clientBirthdayReward.fields.moreDescription'),
        length: FIELD_MIN_LENGTH,
      });
    }

    if (values.moreDescription.trim().length > FIELD_MAX_LENGTH) {
      errors.moreDescription = I18n.t('common.errors.maxLength', {
        field: I18n.t('clientBirthdayReward.fields.moreDescription'),
        length: FIELD_MAX_LENGTH,
      });
    }

    return errors;
  };

export const validateClientLoyaltyReward =
  (clientLoyaltyReward: any) => (values: any) => {
    const errors: FormikErrors<any> = {};

    if (_.isEmpty(values.rewardReason)) {
      errors.rewardReason = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.rewardReason'),
      });
    }

    if (_.isEmpty(values.rewardType)) {
      errors.rewardType = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.rewardType'),
      });
    }

    if (_.isEmpty(values.rewardFor)) {
      errors.rewardFor = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.rewardFor'),
      });
    }
    if (
      values.rewardFor?.id == '1' &&
      clientLoyaltyReward.services.length == 0
    ) {
      errors.rewardFor = I18n.t('common.errors.unavailable', {
        field: I18n.t('clientLoyaltyReward.fields.services'),
      });
    } else if (values.rewardFor?.id == '1' && _.isEmpty(values.services)) {
      errors.rewardFor = I18n.t('common.errors.unselected', {
        field: I18n.t('clientLoyaltyReward.fields.services'),
      });
    }
    if (values.rewardFor?.id == '2' && clientLoyaltyReward.items.length == 0) {
      errors.rewardFor = I18n.t('common.errors.unavailable', {
        field: I18n.t('clientLoyaltyReward.fields.sItems'),
      });
    } else if (values.rewardFor?.id == '2' && _.isEmpty(values.sItems)) {
      errors.rewardFor = I18n.t('common.errors.unselected', {
        field: I18n.t('clientLoyaltyReward.fields.sItems'),
      });
    }

    if (values.rewardReason?.id == '1' && !values.rewardAfterSpending) {
      errors.rewardAfterSpending = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.rewardAfterSpending'),
      });
    }
    const rewardAfterSpendingNum = Number(values.rewardAfterSpending);
    if (
      values.rewardReason?.id == '1' &&
      values.rewardAfterSpending &&
      (rewardAfterSpendingNum < 0.01 || isNaN(rewardAfterSpendingNum))
    ) {
      errors.rewardAfterSpending = I18n.t(
        'clientLoyaltyReward.fields.rewardAfterSpendingRange',
      );
    }

    if (isDecimalNumber(rewardAfterSpendingNum)) {
      errors.rewardAfterSpending =
        'Rewards after spending must be a round figured value.';
    }

    if (values.rewardReason?.id == '2' && !values.rewardAfterCompleting) {
      errors.rewardAfterCompleting = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.rewardAfterCompleting'),
      });
    }
    const rewardAfterCompletingNum: any = Number(values.rewardAfterCompleting);
    //@ts-ignore
    if (
      values.rewardReason?.id == '2' &&
      values.rewardAfterCompleting &&
      (values.rewardAfterCompleting.includes('.') ||
        rewardAfterCompletingNum < 1 ||
        isNaN(rewardAfterCompletingNum) ||
        rewardAfterCompletingNum !== parseInt(rewardAfterCompletingNum, 10))
    ) {
      errors.rewardAfterCompleting = I18n.t(
        'clientLoyaltyReward.fields.rewardAfterCompletingRange',
      );
    }

    if (isDecimalNumber(rewardAfterCompletingNum)) {
      errors.rewardAfterSpending =
        'Rewards after completeting appointment field must be a round figured value.';
    }

    if (values.rewardType?.id == '1' && !values.discountAmount) {
      errors.discountAmount = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.discountAmount'),
      });
    }
    const discountAmountNum = Number(values.discountAmount);
    //@ts-ignore
    const minPriceService = _.minBy(values.services, 'price')?.price;
    //@ts-ignore
    const minPriceSItem = _.minBy(values.sItems, 'price')?.price;

    if (
      values.rewardType?.id == '1' &&
      values.discountAmount &&
      (isNaN(discountAmountNum) || digitsAfterDecimal(discountAmountNum) > 0)
    ) {
      errors.discountAmount = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('clientLoyaltyReward.fields.discountAmount'),
      });
    }

    if (
      values.rewardType?.id == '1' &&
      values.discountAmount &&
      (discountAmountNum < 0.01 ||
        (values.rewardFor?.id == '1' &&
          values.discountAmount >= minPriceService) ||
        (values.rewardFor?.id == '2' && values.discountAmount >= minPriceSItem))
    ) {
      errors.discountAmount = I18n.t(
        'clientLoyaltyReward.fields.discountAmountRange',
        {
          minPrice:
            values.rewardFor?.id == '1'
              ? minPriceService
              : values.rewardFor?.id == '2' && minPriceSItem,
        },
      );
    }

    if (values.rewardType?.id == '2' && !values.discountRate) {
      errors.discountRate = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.discountRate'),
      });
    }
    const discountRateNum = Number(
      values.discountRate?.toString().replace(/[,-]/g, '.').split(' ').join(''),
    );

    if (
      values.rewardType?.id == '2' &&
      values.discountRate &&
      digitsAfterDecimal(discountRateNum) > 0
    ) {
      errors.discountRate = I18n.t('common.errors.wrongFormat', {
        field: I18n.t('clientLoyaltyReward.fields.discountRate'),
      });
    }

    if (
      values.rewardType?.id == '2' &&
      values.discountRate &&
      (discountRateNum < 0.01 ||
        discountRateNum > 99.99 ||
        isNaN(discountRateNum))
    ) {
      errors.discountRate = I18n.t(
        'clientLoyaltyReward.fields.discountRateRange',
      );
    }

    if (!values.description.trim()) {
      errors.description = I18n.t('common.errors.required', {
        field: I18n.t('clientLoyaltyReward.fields.description'),
      });
    } else if (!REGEX.description.test(values.description.trim())) {
      errors.description = I18n.t('common.errors.forbiddenSymbols', {
        field: I18n.t('clientLoyaltyReward.fields.description'),
      });
    }

    if (values.description.trim().length < FIELD_MIN_LENGTH) {
      errors.description = I18n.t('common.errors.minLength', {
        field: I18n.t('clientLoyaltyReward.fields.description'),
        length: FIELD_MIN_LENGTH,
      });
    }

    if (values.description.trim().length > FIELD_MAX_LENGTH) {
      errors.description = I18n.t('common.errors.maxLength', {
        field: I18n.t('clientLoyaltyReward.fields.description'),
        length: FIELD_MAX_LENGTH,
      });
    }

    return errors;
  };
