import I18n from "locales";
import { MONTHS } from "utils/constants";
import { formatRepeatDate } from "./dates";


export const getRepeatDetails = (values: any) => {
  if (values.repeatOption === 0) {
    return I18n.t('appAppointments.repeat.everyday');
  }

  if (values.repeatOption === 1) {
    return I18n.t('appAppointments.repeat.everyWeekday', { day: values.repeatWeekday });
  }

  if (values.repeatOption === 2) {
    const date = formatRepeatDate(values.repeatMonthDay!);

    return I18n.t('appAppointments.repeat.everyMonth', { date });
  }

  if (values.repeatOption === 3) {
    const month = MONTHS.find((m) => m.value === values.repeatMonth);
    const date = formatRepeatDate(values.repeatMonthDay!);

    return I18n.t('appAppointments.repeat.everyYear', { month: month?.name, date });
  }

  if (values.repeatOption === 4) {
    const days = values.repeatWeekday?.join(', ');

    return I18n.t('appAppointments.repeat.everyWeek', { days });
  }
};