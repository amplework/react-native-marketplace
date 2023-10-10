import I18n from 'locales';
import { ChipType } from 'shared/chip';
import { Estimate, EstimateOrder, EstimateStatus, EstimateTab, EstimateValues, SearchEstimatesValues } from 'types/estimates';
import { ProductSnapshot } from 'types/products';
import { formatApiDate, getEndOfMonth, getStartOfMonth } from 'utils/dates';

export const calculateProductPrice = (product: ProductSnapshot) =>
  product.price * product.quantity;

export const calculateEstimateSubtotal = (products: ProductSnapshot[]) =>
  products.reduce((sum, product) => sum + calculateProductPrice(product), 0);

export const calculateEstimateTotal = (estimate: EstimateValues) =>
  calculateEstimateSubtotal(estimate.products) + calculateTaxTotal(estimate);

const calculateTaxTotal = (estimate: EstimateValues) =>
  estimate.selectedTaxes.reduce(
    (sum, tax) =>
      sum + calculateEstimateSubtotal(estimate.products) * (tax.rate / 100),
    0,
  );

export const calculateEstimateIncludedPayment = (estimate: EstimateValues) => {
  const { payment } = estimate;

  if (payment) {
    const { isFullPayment, total } = payment;

    return isFullPayment ? calculateEstimateTotal(estimate) : +total;
  }

  return 0;
};

export const calculateEstimateBalance = (estimate: EstimateValues) =>
  calculateEstimateTotal(estimate) - calculateEstimateIncludedPayment(estimate);

export const getQueryParams = (tab: EstimateTab) => {
  switch (tab) {
    case 'open':
      return {
        status: 'open' as EstimateStatus,
      };
    case 'expired':
      return {
        status: 'expired' as EstimateStatus,
      };
    case 'month':
      return {
        fromDate: formatApiDate(getStartOfMonth()),
        toDate: formatApiDate(getEndOfMonth()),
      };
  }
};

export const getSearchQueryParams = (estimate: SearchEstimatesValues) => ({
  orderBy: 'date' as EstimateOrder,
  query: estimate.query,
  paymentMethodId: estimate.paymentMethodId,
  status: estimate.status,
  clientSubprofileId: estimate.subClient?.id,
  fromDate: estimate.fromDate.toISOString(),
  toDate: estimate.toDate.toISOString(),
});

type EstimateChip = {
  text: string;
  type: ChipType;
};

export const getEstimateChip = (estimate: Estimate): EstimateChip => {  
  if(estimate?.status == 'open' && estimate?.emailRecipient) {
    return {
      text: I18n.t('estimates.chips.sent'),
      type: 'secondary',
    };
  }

  if(estimate?.status == 'paid') {
    return {
      text: I18n.t('estimates.chips.paid'),
      type: 'success',
    };
  }

  if (estimate.balance < estimate.total && estimate.balance > 0) {
    return {
      text: I18n.t('invoices.chips.partiallyPaid'),
      type: 'default',
    };
  }

  if(estimate?.status == 'expired') {
    return {
      text: I18n.t('estimates.chips.expired'),
      type: 'danger',
    };
  }

  return {
    text: I18n.t('estimates.chips.open'),
      type: 'primary',
  }
};

export const getEstimateApprovalStatus = (estimate: Estimate | any): any => {  
  if(estimate?.approveStatus == 'approved') {
    return I18n.t('estimates.chips.approved');
  }

  if(estimate?.approveStatus == 'rejected') {
    return I18n.t('estimates.chips.rejected');
  }

  return I18n.t('estimates.chips.pending');
};

