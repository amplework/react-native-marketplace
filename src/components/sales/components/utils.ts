import I18n from "locales";
import { Sale } from "types/sales";

export const getSaleChip = (sale: Sale): any => {
  if (sale?.isPaymentReceived == false) {
    return {
      text: I18n.t('sales.status.open'),
      type: 'primary',
    };
  }

  if (sale?.isPaymentReceived == true && (sale?.payment?.chargeId == null || sale?.payment?.isRefundRequest != null)) {
    return {
      text: I18n.t('sales.status.paid'),
      type: 'success',
    };
  }

  return {
    text: I18n.t('sales.status.refunded'),
    type: 'secondary',
  };
};