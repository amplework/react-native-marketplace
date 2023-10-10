import I18n from 'locales';

export const LABELS = {
  addAppointment: I18n.t('salesSearch.addAppointment'),
  blocked: I18n.t('salesSearch.blocked'),
  noData: I18n.t('salesSearch.noData'),
  noClient: I18n.t('salesSearch.noClient'),
  date: I18n.t('salesSearch.date'),
  confirmed: I18n.t('salesSearch.confirmed'),
  selectStart: I18n.t('salesSearch.selectStart'),
  selectEnd: I18n.t('salesSearch.selectEnd'),
  clientName: I18n.t('salesSearch.clientName'),
  service: I18n.t('salesSearch.service'),
  serviceT: I18n.t('salesSearch.serviceT'),
  methodT: I18n.t('salesSearch.methodT'),
  search: I18n.t('salesSearch.search'),
  customer: I18n.t('salesSearch.customer'),
  keyword: I18n.t('salesSearch.keyword'),
  refine: I18n.t('salesSearch.refine'),
  paymentMethod: I18n.t('salesSearch.paymentMethod'),
};

export const titleList = (amount: number) =>
  I18n.t('salesSearch.appointmentsTitle', { amount });

export const titleFound = (amount: number) =>
  I18n.t('salesSearch.appointmentsTitleFound', { amount });

export const titleListFilter = (amount: number, filter: string) =>
  I18n.t('salesSearch.appointmentsTitleFilter', { amount, filter });
