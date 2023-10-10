import I18n from 'locales';

export const LABELS = {
  addAppointment: I18n.t('paymentsSearch.addAppointment'),
  blocked: I18n.t('paymentsSearch.blocked'),
  noData: I18n.t('paymentsSearch.noData'),
  noClient: I18n.t('paymentsSearch.noClient'),
  date: I18n.t('paymentsSearch.date'),
  confirmed: I18n.t('paymentsSearch.confirmed'),
  selectStart: I18n.t('paymentsSearch.selectStart'),
  selectEnd: I18n.t('paymentsSearch.selectEnd'),
  clientName: I18n.t('paymentsSearch.clientName'),
  service: I18n.t('paymentsSearch.service'),
  serviceT: I18n.t('paymentsSearch.serviceT'),
  methodT: I18n.t('paymentsSearch.methodT'),
  receiptT: I18n.t('paymentsSearch.receiptT'),
  search: I18n.t('paymentsSearch.search'),
  customer: I18n.t('paymentsSearch.customer'),
  keyword: I18n.t('paymentsSearch.keyword'),
  refine: I18n.t('paymentsSearch.refine'),
  paymentMethod: I18n.t('paymentsSearch.paymentMethod'),
  receiptNo: I18n.t('paymentsSearch.receiptNo'),
};

export const titleList = (amount: number) =>
  I18n.t('salesSearch.appointmentsTitle', { amount });

export const titleFound = (amount: number) =>
  I18n.t('salesSearch.appointmentsTitleFound', { amount });

export const titleListFilter = (amount: number, filter: string) =>
  I18n.t('salesSearch.appointmentsTitleFilter', { amount, filter });
