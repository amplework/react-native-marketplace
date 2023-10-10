import { all } from 'redux-saga/effects';
import { appointmentsSaga } from 'store/entities/appointments';
import { bottomMenuSaga } from 'store/entities/bottomMenu';
import { calendarSetupSaga } from 'store/entities/calendarSetup';
import { cashJournalsSaga } from 'store/entities/cashJournals';
import { chatsSaga } from 'store/entities/chats';
import { closedDaysSaga } from 'store/entities/closedDays';
import { expensesSaga } from 'store/entities/expenses';
import { expenseTypesSaga } from 'store/entities/expenseTypes/sagas';
import { homeSaga } from 'store/entities/home/sagas';
import { industriesSaga } from 'store/entities/industries';
import { invoiceNotesSaga } from 'store/entities/invoiceNotes';
import { invoicesSaga } from 'store/entities/invoices';
import { notificationsSaga } from 'store/entities/notifications';
import { notificationSettingsSaga } from 'store/entities/notificationSettings';
import { paymentMethodsSaga } from 'store/entities/paymentMethods/sagas';
import { paymentsSaga } from 'store/entities/payments';
import { productsSaga } from 'store/entities/products';
import { providersSaga } from 'store/entities/providers';
import { remindersSaga } from 'store/entities/reminders';
import { reportSaga } from 'store/entities/report';
import { salesSaga } from 'store/entities/sales';
import { clientConnectSaga } from 'store/entities/clientConnect';
import { signUpProviderSaga } from 'store/entities/signUpProvider';
import { subClientsSaga } from 'store/entities/subClients';
import { subscriptionSaga } from 'store/entities/subscription';
import { tasksSaga } from 'store/entities/tasks';
import { clientRewardSaga } from 'store/entities/clientReward';
import { taxesSaga } from 'store/entities/taxes';
import { salesSpecialSaga } from 'store/entities/salesSpecial';
import { userSaga } from 'store/entities/user';
import { vendorsSaga } from 'store/entities/vendors';
import { cardSaga } from 'store/entities/card';
import oldAppointmentsSaga from 'store/saga/appointmentsSaga';
import clientSaga from 'store/saga/clientSaga';
import clientSignUpSaga from 'store/saga/clientSignUpSaga';
import forgotPasswordSaga from 'store/saga/forgotPasswordSaga';
import providerSaga from 'store/saga/providerSaga';
import userSagaOld from 'store/saga/userSaga';
import { sociaIntegrationSaga } from 'store/entities/social'
import { quickPromotionSaga } from 'store/entities/quickPromotion';
import { estimatesSaga } from 'store/entities/estimates';

export default function* rootSaga() {
  yield all([
    userSagaOld(),
    userSaga(),
    signUpProviderSaga(),
    providerSaga(),
    subClientsSaga(),
    clientSaga(),
    productsSaga(),
    taxesSaga(),
    salesSpecialSaga(),
    quickPromotionSaga(),
    salesSaga(),
    paymentsSaga(),
    appointmentsSaga(),
    oldAppointmentsSaga(),
    industriesSaga(),
    clientSignUpSaga(),
    forgotPasswordSaga(),
    closedDaysSaga(),
    providersSaga(),
    paymentMethodsSaga(),
    tasksSaga(),
    clientRewardSaga(),
    calendarSetupSaga(),
    invoicesSaga(),
    estimatesSaga(),
    invoiceNotesSaga(),
    vendorsSaga(),
    cardSaga(),
    expenseTypesSaga(),
    expensesSaga(),
    chatsSaga(),
    cashJournalsSaga(),
    notificationsSaga(),
    notificationSettingsSaga(),
    remindersSaga(),
    subscriptionSaga(),
    homeSaga(),
    reportSaga(),
    bottomMenuSaga(),
    sociaIntegrationSaga(),
    clientConnectSaga(),
  ]);
}
