import I18n from 'locales';

const optionMethod = (label: string, inputLabel: string, value: number) => {
  return {
    label: I18n.t(label),
    value: value,
    inputLabel: I18n.t('createSale.paymentMethod.' + inputLabel),
  };
};

export const REMIND_ME_INTERVALS = [
  optionMethod('createSale.paymentMethod', 'inputLabel.minutes', 15),
  optionMethod('createSale.paymentMethod', 'inputLabel.minutes', 30),
];
