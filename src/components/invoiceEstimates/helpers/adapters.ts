import moment from 'moment';
import { DetailedEstimate, EstimatePayment, EstimatePaymentValues, EstimateProductValues, EstimateValues } from 'types/estimates';
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

export const adaptEstimate =
  (taxes: ITax[]) =>
  (estimate: DetailedEstimate): EstimateValues => ({
    isNewClient: false,
    //@ts-ignore
    subClient: estimate.clientSubprofile,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    date: estimate.date,
    expDate: estimate.expDate,
    expectedPaymentMethodId: estimate.expectedPaymentMethod
      ? estimate.expectedPaymentMethod.id
      : null,
    products: estimate.products,
    selectedTaxes: taxes.filter((tax) =>
    estimate.taxes?.some((selectedTax) => tax.id === selectedTax.id),
    ),
    comments: estimate.comments || '',
    notes: estimate.notes || '',
    imageFiles: estimate.images,
    isEmailReceipt: !!estimate.emailRecipient,
    email: estimate.emailRecipient || '',
    payment: {
      isFullPayment: false,
      paymentMethodId: -1,
      total: estimate.payments.reduce((sum, payment) => sum + payment.total, 0),
    },
  });

export const adaptEstimateProduct =
  (products: IProduct[]) =>
  (product: ProductSnapshot): EstimateProductValues => {
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
  payment: EstimatePayment,
): EstimatePaymentValues => ({
  isFullPayment: payment.isFullPayment,
  paymentMethodId: payment.paymentMethodId,
  total: payment.total.toString(),
});
