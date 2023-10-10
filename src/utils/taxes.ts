import moment from 'moment';
import { ITax } from 'types/taxes';

import { days, parseDate, utcOffset } from './dates';

export const isActiveTax = ({ effectiveDate, rateHistory }: ITax) => {
  const today = parseDate();
  const enteredIntoForce =
    !!effectiveDate && days.isSameOrBefore(parseDate(effectiveDate), today);

  return enteredIntoForce || rateHistory;
};

export const getTaxRate = (tax: ITax) => {
  const currentTime = moment.utc().utcOffset(utcOffset(), true);
  const enteredIntoForce = currentTime.isSameOrAfter(tax.effectiveDate);

  if (enteredIntoForce) {
    return tax.rate;
  }

  const record = tax.rateHistory?.find(
    ({ effectiveEndDate, effectiveStartDate }) =>
      moment
        .utc(currentTime)
        .isBetween(effectiveStartDate, effectiveEndDate, undefined, '[)'),
  );

  return record?.rate;
};
