import I18n from 'locales';

export const LABELS = {
  addAppointment: I18n.t('calendar.addAppointment'),
  blocked: I18n.t('calendar.blocked'),
  noData: I18n.t('calendar.noData'),
  noClient: I18n.t('calendar.noClient'),
  date: I18n.t('calendar.date'),
  confirmed: I18n.t('calendar.confirmed'),
  checkedIn: I18n.t('calendar.checkedIn'),
  selectStart: I18n.t('calendar.selectStart'),
  selectEnd: I18n.t('calendar.selectEnd'),
  clientName: I18n.t('calendar.clientName'),
  service: I18n.t('calendar.service'),
  serviceT: I18n.t('calendar.serviceT'),
  search: I18n.t('calendar.search'),
  customer: I18n.t('calendar.customer'),
  keyword: I18n.t('calendar.keyword'),
  refine: I18n.t('calendar.refine'),
};

export const titleList = (amount: number) =>
  I18n.t('calendar.appointmentsTitle', { amount });

export const titleFound = (amount: number) =>
  I18n.t('calendar.appointmentsTitleFound', { amount });

export const titleListFilter = (amount: number, filter: string) =>
  I18n.t('calendar.appointmentsTitleFilter', { amount, filter });
