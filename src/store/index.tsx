import { Action, CombinedState, combineReducers } from 'redux';
import client from 'store/reducers/client';
import forgotPassword from 'store/reducers/forgotPassword';
import provider from 'store/reducers/provider';
import signUpClient from 'store/reducers/signUpClient';

import { appointmentsReducer } from './entities/appointments';
import { bottomMenuReducer } from './entities/bottomMenu';
import { calendarSetupReducer } from './entities/calendarSetup';
import { cashJournalsReducer } from './entities/cashJournals';
import { chatsReducer } from './entities/chats';
import { closedDaysReducer } from './entities/closedDays';
import { expensesReducer } from './entities/expenses';
import { expenseTypesReducer } from './entities/expenseTypes';
import { homeReducer } from './entities/home';
import { industriesReducer } from './entities/industries';
import { invoiceNotesReducer } from './entities/invoiceNotes';
import { invoicesReducer } from './entities/invoices';
import { modalReducer } from './entities/modal';
import { notificationsReducer } from './entities/notifications';
import { notificationSettingsReducer } from './entities/notificationSettings';
import { paymentMethodsReducer } from './entities/paymentMethods';
import { paymentsReducer } from './entities/payments';
import { productsReducer } from './entities/products';
import { providersReducer } from './entities/providers';
import { remindersReducer } from './entities/reminders';
import { reportReducer } from './entities/report';
import { salesReducer } from './entities/sales';
import { signUpProviderReducer } from './entities/signUpProvider';
import { subClientsReducer } from './entities/subClients';
import { subscriptionReducer } from './entities/subscription';
import { tasksReducer } from './entities/tasks';
import { clientRewardReducer } from './entities/clientReward';
import { taxesReducer } from './entities/taxes';
import { userReducer } from './entities/user';
import { vendorsReducer } from './entities/vendors';
import { cardReducer } from './entities/card';
import { salesSpecialReducer } from './entities/salesSpecial';
import { socialReducer } from './entities/social';
import { quickPromotionReducer } from './entities/quickPromotion';
import { clientConnectdReducer } from './entities/clientConnect';
import { estimatesReducer } from './entities/estimates';

const appReducer = combineReducers({
  user: userReducer,
  provider,
  subClients: subClientsReducer,
  client,
  industries: industriesReducer,
  appointments: appointmentsReducer,
  signUpProvider: signUpProviderReducer,
  signUpClient,
  forgotPassword,
  closedDays: closedDaysReducer,
  providers: providersReducer,
  products: productsReducer,
  social: socialReducer,
  taxes: taxesReducer,
  salesSpecials: salesSpecialReducer,
  quickPromotions: quickPromotionReducer,
  paymentMethods: paymentMethodsReducer,
  tasks: tasksReducer,
  clientReward: clientRewardReducer,
  sales: salesReducer,
  payments: paymentsReducer,
  calendarSetup: calendarSetupReducer,
  invoices: invoicesReducer,
  estimates: estimatesReducer,
  invoiceNotes: invoiceNotesReducer,
  vendors: vendorsReducer,
  expenseTypes: expenseTypesReducer,
  expenses: expensesReducer,
  chats: chatsReducer,
  cashJournals: cashJournalsReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  reminders: remindersReducer,
  subscription: subscriptionReducer,
  home: homeReducer,
  report: reportReducer,
  modal: modalReducer,
  bottomMenu: bottomMenuReducer,
  cards: cardReducer,
  clientConnect: clientConnectdReducer,
});

export const rootReducer = (state: CombinedState<any>, action: Action) => {
  if (action.type === 'user/logoutSuccess') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
