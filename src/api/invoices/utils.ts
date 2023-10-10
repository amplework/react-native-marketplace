import { ImageOrVideo } from 'react-native-image-crop-picker';
import { InvoiceImage, InvoiceValues } from 'types/invoices';
import moment from 'moment-timezone';

export const formalizeInvoice = (invoice: InvoiceValues) => {
  const data = new FormData();
  const taxIds = invoice.selectedTaxes.map((tax) => tax.id);

  const newNotes = invoice.notes.trim().split('\n').join('<br>');
  
  data.append('date', moment(invoice.date).startOf('day').format(''));
  data.append('dueDate', moment(invoice.dueDate).endOf('day').format(''));
  data.append('products', JSON.stringify(invoice.products));
  data.append('taxIds', JSON.stringify(taxIds));
  data.append('comments', invoice.comments);
  data.append('notes', newNotes);

  if (invoice.expectedPaymentMethodId) {
    data.append('expectedPaymentMethodId', invoice.expectedPaymentMethodId);
  }

  if (invoice.isEmailReceipt) {
    data.append('emailRecipient', invoice.email);
  }

  return data;
};

export const formalizeEditInvoice = (invoice: InvoiceValues) => {
  const data = new FormData();
  const taxIds = invoice.selectedTaxes.map((tax) => tax.id);
  const date = typeof invoice?.date == 'string' ? invoice.date : moment(invoice.date, 'YYYY-MM-DD').toISOString();
  const dueDate = typeof invoice?.dueDate == 'string' ? invoice.dueDate : moment(invoice.dueDate, 'YYYY-MM-DD').toISOString();  

  data.append('date', date);
  data.append('dueDate', dueDate);
  data.append('products', JSON.stringify(invoice.products));
  data.append('taxIds', JSON.stringify(taxIds));
  data.append('comments', invoice.comments);
  data.append('notes', invoice.notes);

  if (invoice.expectedPaymentMethodId) {
    data.append('expectedPaymentMethodId', invoice.expectedPaymentMethodId);
  }

  if (invoice.isEmailReceipt) {
    data.append('emailRecipient', invoice.email);
  }  
  return data;
};

export const formatToBinaryImages = (images: InvoiceImage[]) =>
  images.map((image, index) => {
    const { path, filename, mime } = image as ImageOrVideo;

    return {
      uri: path,
      name: filename || `filename${index}.jpg`,
      type: mime,
    };
  });
