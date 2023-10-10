import { t, translations } from 'locales';
import RNIap, { ProrationModesAndroid } from 'react-native-iap';
import { alert } from 'shared/alert';

export const getPurchases = async (itemSkus: string[]) => {
  try {
    const purchases = await RNIap.getSubscriptions(itemSkus);
    return purchases;
  } catch (err) {    
    console.warn(err);
  }
};

export const requestPurchase = async (sku: string) => {
  try {
    const result = await RNIap.requestSubscription(sku);

    return result;
  } catch (err) {
    console.warn(err);
    alert.info(t(translations.common.errors.action));
  }
};

export const requestUpgrade = async (
  sku: string,
  purchaseToken: string | undefined,
  prorationModeAndroid: ProrationModesAndroid
) => {
  try {
    const result = await RNIap.requestSubscription(sku, false, purchaseToken, prorationModeAndroid);
    return result;
  } catch (err) {
    console.warn(err);
    alert.info(t(translations.common.errors.action));
  }
};
