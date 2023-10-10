import I18n from 'locales';
import { ChipType } from 'shared/chip';
import {
  Invoice,
  InvoiceOrder,
  InvoiceStatus,
  InvoiceTab,
  InvoiceValues,
  SearchInvoicesValues,
} from 'types/invoices';
import { ProductSnapshot } from 'types/products';
import { formatApiDate, getEndOfMonth, getStartOfMonth } from 'utils/dates';

export const calculateProductPrice = (product: ProductSnapshot) =>
  product.price * product.quantity;

export const calculateInvoiceSubtotal = (products: ProductSnapshot[]) =>
  products.reduce((sum, product) => sum + calculateProductPrice(product), 0);

export const calculateInvoiceTotal = (invoice: InvoiceValues) =>
  calculateInvoiceSubtotal(invoice.products) + calculateTaxTotal(invoice);

const calculateTaxTotal = (invoice: InvoiceValues) =>
  invoice.selectedTaxes.reduce(
    (sum, tax) =>
      sum + calculateInvoiceSubtotal(invoice.products) * (tax.rate / 100),
    0,
  );

export const calculateInvoiceIncludedPayment = (invoice: InvoiceValues) => {
  const { payment } = invoice;

  if (payment) {
    const { isFullPayment, total } = payment;

    return isFullPayment ? calculateInvoiceTotal(invoice) : +total;
  }

  return 0;
};

export const calculateInvoiceBalance = (invoice: InvoiceValues) =>
  calculateInvoiceTotal(invoice) - calculateInvoiceIncludedPayment(invoice);

export const getQueryParams = (tab: InvoiceTab) => {
  switch (tab) {
    case 'open':
      return {
        status: 'open' as InvoiceStatus,
      };
    case 'overdue':
      return {
        status: 'overdue' as InvoiceStatus,
      };
    case 'month':
      return {
        fromDate: formatApiDate(getStartOfMonth()),
        toDate: formatApiDate(getEndOfMonth()),
      };
  }
};

export const getSearchQueryParams = (invoice: SearchInvoicesValues) => ({
  orderBy: 'date' as InvoiceOrder,
  query: invoice.query,
  paymentMethodId: invoice.paymentMethodId,
  status: invoice.status,
  clientSubprofileId: invoice.subClient?.id,
  fromDate: invoice.fromDate.toISOString(),
  toDate: invoice.toDate.toISOString(),
});

type InvoiceChip = {
  text: string;
  type: ChipType;
};

export const getInvoiceChip = (invoice: Invoice): InvoiceChip => {
  if (invoice?.isPaymentSuccess == true && invoice?.payments?.[0]?.chargeId != null && invoice?.payments?.[0]?.isRefundRequest == null) {
    return {
      text: I18n.t('invoices.chips.refunded'),
      type: 'secondary',
    };
  }

  if (invoice.status === 'paid') {
    return {
      text: I18n.t('invoices.chips.paid'),
      type: 'success',
    };
  }

  if (invoice.balance < invoice.total && invoice.balance > 0) {
    return {
      text: I18n.t('invoices.chips.partiallyPaid'),
      type: 'default',
    };
  }

  if (invoice.emailRecipient) {
    return {
      text: I18n.t('invoices.chips.sent'),
      type: 'tetriary',
    };
  }

  if (invoice.status === 'overdue') {
    return {
      text: I18n.t('invoices.chips.overdue'),
      type: 'danger',
    };
  }

  return {
    text: I18n.t('invoices.chips.open'),
    type: 'primary',
  };
};
