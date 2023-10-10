import { ImageOrVideo } from 'react-native-image-crop-picker';
import { EstimateImage, EstimateValues } from 'types/estimates';
import moment from 'moment-timezone';

export const formalizeEstimate = (estimate: EstimateValues) => {
  const data = new FormData();
  const taxIds = estimate.selectedTaxes.map((tax: any) => tax.id);

  const newNotes = estimate.notes.trim().split('\n').join('<br>');
  
  data.append('date', moment(estimate.date).startOf('day').format(''));
  data.append('expDate', moment(estimate.expDate).endOf('day').format(''));
  data.append('products', JSON.stringify(estimate.products));
  data.append('taxIds', JSON.stringify(taxIds));
  data.append('comments', estimate.comments);
  data.append('notes', newNotes);

  if (estimate.expectedPaymentMethodId) {
    data.append('expectedPaymentMethodId', estimate.expectedPaymentMethodId);
  }

  if (estimate.isEmailReceipt) {
    data.append('emailRecipient', estimate.email);
  }

  return data;
};

export const formalizeEditEstimate = (estimate: EstimateValues) => {
  const data = new FormData();
  const taxIds = estimate.selectedTaxes.map((tax) => tax.id);
  const date = typeof estimate?.date == 'string' ? estimate.date : moment(estimate.date, 'YYYY-MM-DD').toISOString();
  const expDate = typeof estimate?.expDate == 'string' ? estimate.expDate : moment(estimate.expDate, 'YYYY-MM-DD').toISOString();  

  data.append('date', date);
  data.append('expDate', expDate);
  data.append('products', JSON.stringify(estimate.products));
  data.append('taxIds', JSON.stringify(taxIds));
  data.append('comments', estimate.comments);
  data.append('notes', estimate.notes);

  if (estimate.expectedPaymentMethodId) {
    data.append('expectedPaymentMethodId', estimate.expectedPaymentMethodId);
  }

  if (estimate.isEmailReceipt) {
    data.append('emailRecipient', estimate.email);
  }  
  return data;
};

export const formatToBinaryImages = (images: EstimateImage[]) =>
  images.map((image, index) => {
    const { path, filename, mime } = image as ImageOrVideo;

    return {
      uri: path,
      name: filename || `filename${index}.jpg`,
      type: mime,
    };
  });
