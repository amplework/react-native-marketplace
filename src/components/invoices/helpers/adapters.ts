import moment from 'moment';
import {
  DetailedInvoice,
  InvoicePayment,
  InvoicePaymentValues,
  InvoiceProductValues,
  InvoiceValues,
} from 'types/invoices';
import { IProduct, ProductSnapshot } from 'types/products';
import { ITax } from 'types/taxes';
import { findById } from 'utils/array';
import { parseDate } from 'utils/dates';

export const adaptInvoice =
  (taxes: ITax[]) =>
  (invoice: DetailedInvoice): InvoiceValues => ({
    isNewClient: false,
    subClient: invoice.clientSubprofile,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    date: invoice.date,
    dueDate: invoice.dueDate,
    expectedPaymentMethodId: invoice.expectedPaymentMethod
      ? invoice.expectedPaymentMethod.id
      : null,
    products: invoice.products,
    selectedTaxes: taxes.filter((tax) =>
      invoice.taxes?.some((selectedTax) => tax.id === selectedTax.id),
    ),
    comments: invoice.comments || '',
    notes: invoice.notes || '',
    imageFiles: invoice.images,
    isEmailReceipt: !!invoice.emailRecipient,
    email: invoice.emailRecipient || '',
    payment: {
      isFullPayment: false,
      paymentMethodId: -1,
      total: invoice.payments.reduce((sum, payment) => sum + payment.total, 0),
    },
  });

export const adaptInvoiceProduct =
  (products: IProduct[]) =>
  (product: ProductSnapshot): InvoiceProductValues => {
    const selectedProduct = findById(product.id)(products)!;    
    return {
      type: selectedProduct.type,
      selectedProduct,
      price: `${product.price}`,
      quantity: `${product.quantity}`,
      description: `${product.description}`
    };
  };

export const adaptPayment = (
  payment: InvoicePayment,
): InvoicePaymentValues => ({
  isFullPayment: payment.isFullPayment,
  paymentMethodId: payment.paymentMethodId,
  total: payment.total.toString(),
});
