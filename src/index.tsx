import 'moment-timezone/moment-timezone-utils';
import * as RNLocalize from "react-native-localize";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClientChats } from 'components/chats/client';
import { ClientAddChat } from 'components/chats/client/addChat';
import { Chat } from 'components/chats/common/chat';
import AddPayments from 'containers/createPayments';
import Permissions from 'react-native-permissions';
import { ProviderChats } from 'components/chats/provider';
import { ProviderAddChat } from 'components/chats/provider/addChat';
import { ClientInvoiceDetails } from 'components/invoices/client/invoiceDetails';
import { PaymentsList } from 'components/invoices/shared/paymentsList';
import { Notifications } from 'components/notifications';
import { ProviderDetails } from 'components/providers/client/providerDetails';
import { SearchLocation } from 'components/providers/client/searchLocation';
import { SearchProviders } from 'components/providers/client/searchProviders';
import { RenewSubscription } from 'components/renewSubscription';
import PickSubscription from 'components/pickSubscription';
import { ClientSaleDetails } from 'components/sales/client/salesDetails';
import { ClientSalesSpecialDetails } from 'components/salesSpecialDetails/client/salesSpecialDetails';
import { SaleDetails } from 'components/sales/provider/salesDetails';
import { Subscription } from 'components/settings/provider/subscription';
import { SignUpProvider } from 'components/signupFlow/provider';
import ClientAppointmentDetails from 'containers/appointmentDetails/client';
import ProviderAppointmentDetails from 'containers/appointmentDetails/provider';
import ChooseRole from 'containers/chooseRole';
import SignUpClient from 'containers/client/signUpFlow';
import ClientAddAppointment from 'containers/createAppointment/client';
import ProviderAddAppointment from 'containers/createAppointment/provider';
import AddSale from 'containers/createSale';
import ForgotPassword from 'containers/forgotPassword';
import Login from 'containers/login';
import WebEmailVerification from 'containers/webEmailVerification';
import OnBoardingClient from 'containers/onBoarding/client';
import OnBoardingProvider from 'containers/onBoarding/provider';
import WelcomeOnBoarding from 'containers/onBoarding/welcome';
import { PaymentDetails } from 'containers/paymentDetails/client';
import ClientPickTimeSlot from 'containers/pickTimeslot/client';
import ProviderPickTimeSlot from 'containers/pickTimeslot/provider';
import { translations } from 'locales';
import moment from 'moment-timezone';
import {
  CashJournalsStack,
  ClientsStack,
  EstimatesStack,
  InvoicesStack,
  SalesStack,
} from 'navigation/bottomBarConfigured';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogBox, StatusBar } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { toast } from 'shared/toast';
import { updateClientAddress } from 'store/actions/client';
import { getProviderProfile } from 'store/actions/provider';
import { getUser, userSelectors } from 'store/entities/user';
import { CashJournal } from 'types/cashJournals';
import { DetailedExpense } from 'types/expenses';
import { DetailedInvoice } from 'types/invoices';
import { PaymentDynamicLinkData, PaymentPreview } from 'types/payments';
import { ISubClient } from 'types/subClients';
import { Task } from 'types/tasks';
import { isClient, isProvider, ProviderPreview } from 'types/users';
import { VendorValues } from 'types/vendors';
import { DYNAMIC_LINK, UTC_OFFSET_KEY, UTC_TIMEZONE } from 'utils/constants';
import { LargeDateRange, SmallDateRange } from 'utils/dates';
var tzlookup = require("tz-lookup");

import BottomTabNavigator, {
  CalendarStack,
  LoyaltyStackNavigator,
  MoreStackNavigator,
} from './navigation/bottomBar';
import BottomTabClientNavigator from './navigation/bottomBarClient';
import { PERMISSIONS } from 'react-native-permissions';
import { useAppStateEvent } from 'hooks';
import { UpgradeSubscription } from 'components/upgradeSubscription';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Storage } from 'service/localStorage/localStorage';
import { getDynamicLinkNavigationParams } from 'utils/onlinePaymentOptions';
import { getUserSubscriptionDetails } from 'store/entities/subscription';
import { ClientEstimateDetails } from 'components/invoiceEstimates/client/estimateDetails';
import { getProducts } from 'store/entities/products';
import { DetailedEstimate } from 'types/estimates';

LogBox.ignoreLogs([
  "Accessing the 'state' property of the 'route' object is not supported",
  'Cannot update a component from inside the function body of a different component.',
]);

export type RootStackParamList = {
  Calendar: CalendarParams;
  ProviderDetails: ProviderDetailsParams;
  TaskDetails: TaskDetailsParams;
  AddEditTask: AddEditTaskParams;
  TasksReviewList: TasksReviewListParams;
  VendorsDetails: VendorsDetailsParams;
  Vendors: VendorsParams;
  HowDoI: HowDoIParams;
  VendorsReview: VendorsReviewParams;
  AddEditVendor: AddEditVendorParams;
  SearchVendor: SearchVendorParams;
  AddEditInvoice: AddEditInvoiceParams;
  AddEditEstimate: AddEditEstimateParams;
  InvoiceDetails: InvoiceDetailsParams;
  EstimateDetails: EstimateDetailsParams;
  AddPayments: AddPaymentsParams;
  PaymentDetails: PaymentDetailsParams;
  ExpenseTypes: ExpenseTypesParams;
  AddEditExpense: AddEditExpenseParams;
  ExpenseDetails: ExpenseDetailsParams;
  Expenses: ExpensesParams;
  MoreStack: MoreStackParams;
  AddEditCashJournal: AddEditCashJournalParams;
  CashJournalDetails: CashJournalDetailsParams;
  CashJournalsReviewDetails: CashJournalsReviewDetailsParams;
  Chat: ChatParams;
  AddChat: AddChatParams;
  AppointmentDetails: AppointmentDetailsParams;
  SaleDetails: SaleDetailsParams;
  CodeScan: any;
  ClientSalesSpecialDetails: ClientSalesSpecialDetailsParams;
  SearchProviders: SearchProvidersParams;
  Sales: MoreStackParams;
};

type MoreStackParams = {
  showBackButton?: boolean;
};

type CalendarParams = {
  date?: string;
  openDrawer?: boolean;
};

type SaleDetailsParams = {
  id: number;
  providerId?: number;
  paymentUsingDynamicLinkData?: PaymentDynamicLinkData;
};

type ClientSalesSpecialDetailsParams = {
  id: number;
};

type ProviderDetailsParams = {
  id: number;
};

type TaskDetailsParams = {
  id: number;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

type AddEditTaskParams = {
  task?: Task;
  onEdit?: () => void;
};

type TasksReviewListParams = {
  title: string;
  fromDate: string;
  toDate: string;
  range: SmallDateRange;
};

type VendorsDetailsParams = {
  id: number;
  onDelete?: () => void;
  onEdit?: () => void;
};

type VendorsParams = {
  hasExpensesThisMonth?: boolean;
};

type VendorsReviewParams = {};

type HowDoIParams = {
  sections?: string[];
};

type AddEditVendorParams = {
  vendor?: VendorValues;
  onEdit?: () => void;
};

type SearchVendorParams = {
  onPress?: () => void;
};

type AddEditInvoiceParams = {
  invoice?: DetailedInvoice;
  subClient?: ISubClient;
  onCreate?: () => void;
  onEdit?: () => void;
} | any;

type AddEditEstimateParams = {
  invoice?: DetailedEstimate;
  subClient?: ISubClient;
  onCreate?: () => void;
  onEdit?: () => void;
} | any;

type InvoiceDetailsParams = {
  id: number;
  providerId?: number;
  paymentUsingDynamicLinkData?: PaymentDynamicLinkData;
  onEdit?: () => void;
  onDelete?: () => void;
  onPay?: () => void;
};

type EstimateDetailsParams = {
  id: number;
  providerId?: number;
  paymentUsingDynamicLinkData?: PaymentDynamicLinkData;
  onEdit?: () => void;
  onDelete?: () => void;
  onPay?: () => void;
};

type AddPaymentsParams = {
  paymentId?: number;
  clientId?: number;
  total: string;
  invoiceId: number | null;
  estimateId?: number | null;
  email: string;
  onSuccess?: () => void;
};

type PaymentDetailsParams = {
  onDelete?: () => void;
  payment: PaymentPreview;
  provider: ProviderPreview;
};

type ExpenseTypesParams = {};

type AddEditExpenseParams = {
  expense: DetailedExpense;
  onEdit?: () => void;
};

type ExpenseDetailsParams = {
  id: number;
  onEdit?: () => void;
  onDelete?: () => void;
};

type ExpensesParams = {
  isMonthReview?: boolean;
  isWeekReview?: boolean;
};

type AddEditCashJournalParams = {
  journal?: CashJournal;
  onEdit?: () => void;
};

type CashJournalDetailsParams = {
  journal: CashJournal;
  onEdit?: () => void;
  onDelete?: () => void;
};

type CashJournalsReviewDetailsParams = {
  range: LargeDateRange;
};

type ChatParams = {
  id: number;
  query: string;
  userDetails: any;
};

type AddChatParams = {
  query: string;
};

type AppointmentDetailsParams = {
  id: number;
};

type SearchProvidersParams = {
  action?: string;
  selectedDayStart: string;
  selectedDayEnd: string;
  servicesIds?: number[];
};

Geocoder.init('AIzaSyDtN8tEhH79TiHl56qlP1P5gSSLOgyIvik');

const RootStack = createStackNavigator();

const App = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const user = useSelector(userSelectors.user);
  const clientUtcOffset = useSelector(userSelectors.utcOffset);
  const clientUtcTimeZone = useSelector(userSelectors.utctimezone);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleGetUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      dispatch(getUser());
    }
  }

  useEffect(() => {
    handleGetUser();
  }, [dispatch]);

  const refresh = () => {
    if (isProvider(user)) {
      dispatch(getUserSubscriptionDetails());
    }
  };

  useAppStateEvent({
    onChange: refresh,
  })

  useEffect(() => {
    if (isProvider(user)) {
      dispatch(getProviderProfile());
      dispatch(getUserSubscriptionDetails());
      dispatch(getProducts());
    }
  }, [dispatch, user]);

  useEffect(() => {
    moment.tz.add(
      moment.tz.pack({
        name: 'AlphaProUser',
        abbrs: ['APU'],
        untils: [null],
        offsets: [-clientUtcOffset],
      }),
    );

    moment.tz.setDefault('AlphaProUser');
  }, [clientUtcOffset]);

  useEffect(() => {
    const getCurrentLocation = async () => {
      // const status = await Permissions.check(LOCATION_PERMISSION);
      if (Platform.OS === "ios") {
        const auth = await Geolocation.requestAuthorization("whenInUse");
        if (auth === "denied") {
          return alert.info(
            t(translations.dashboard.locationBlocked),
            t(translations.common.warning),
          );
        }

        if (auth === "granted") {
          let deviceTimezone = RNLocalize.getTimeZone();
          let today = moment.tz(deviceTimezone);
          let offset = today.utcOffset();
          await AsyncStorage.setItem(UTC_TIMEZONE, deviceTimezone);
          await AsyncStorage.setItem(UTC_OFFSET_KEY, offset.toString());
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              const json = await Geocoder.from({ latitude, longitude });

              const {
                place_id,
                geometry,
                formatted_address,
                address_components: [{ short_name }],
              } = json.results[0];

              const timezonestring = tzlookup(geometry.location.lat, geometry.location.lng);

              dispatch(
                updateClientAddress({
                  placeId: place_id,
                  name: short_name,
                  formattedAddress: formatted_address,
                  location: geometry.location,
                  utcOffset: offset,
                  utctimezone: timezonestring
                }),
              );
            },
            (error) => toast.info(error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }
      } else {
        const auth = await Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (auth === "denied") {
          return alert.info(
            t(translations.dashboard.locationBlocked),
            t(translations.common.warning),
          );
        }

        if (auth === "granted") {
          let deviceTimezone = RNLocalize.getTimeZone();

          let today = moment.tz(deviceTimezone);
          let offset = today.utcOffset();
          await AsyncStorage.setItem(UTC_TIMEZONE, deviceTimezone);
          await AsyncStorage.setItem(UTC_OFFSET_KEY, offset.toString());
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              const json = await Geocoder.from({ latitude, longitude });

              const {
                place_id,
                geometry,
                formatted_address,
                address_components: [{ short_name }],
              } = json.results[0];

              const timezonestring = tzlookup(geometry.location.lat, geometry.location.lng);

              dispatch(
                updateClientAddress({
                  placeId: place_id,
                  name: short_name,
                  formattedAddress: formatted_address,
                  location: geometry.location,
                  utcOffset: offset,
                  utctimezone: timezonestring
                }),
              );
            },
            (error) => toast.info(error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        }
      }
    }

    const checkActiveTimezone = async () => {
      try {
        let cureentTimezone = RNLocalize.getTimeZone();
        let lastUtcOffset = await AsyncStorage.getItem(UTC_OFFSET_KEY);
        let lastUtcTimeZone = await AsyncStorage.getItem(UTC_TIMEZONE);

        if (lastUtcOffset === null && lastUtcTimeZone === null) {
          if (clientUtcTimeZone != cureentTimezone) {
            alert.confirmation({
              message: t(translations.dashboard.timezoneChanged),
              onConfirm: getCurrentLocation,
            });
          } else {
            await AsyncStorage.setItem(UTC_OFFSET_KEY, clientUtcOffset.toString());
            await AsyncStorage.setItem(UTC_TIMEZONE, clientUtcTimeZone);
          }
        } else if (lastUtcOffset && lastUtcTimeZone) {
          if (lastUtcTimeZone != cureentTimezone) {
            alert.confirmation({
              message: t(translations.dashboard.timezoneChanged),
              onConfirm: getCurrentLocation,
            });
          } else {

          }
        }
      } catch (error) { }
    };

    const getAppLaunchLink = () => {
      dynamicLinks()
        .getInitialLink()
        .then((link: any) => {
          if (link?.url) {
            handleDynamicLink(link)
          }
        })
        .catch(() => { })
    }

    if (isClient(user)) {
      checkActiveTimezone();
      getAppLaunchLink();
    }
  }, [user, clientUtcOffset]);

  useEffect(() => {
    const unsubscribeDynamicLinks = dynamicLinks().onLink(
      (link: any) => {
        if (link?.url) {
          if (user) {
            if (isClient(user)) {
              handleDynamicLink(link)
            }
          } else {
            Storage.save(DYNAMIC_LINK, link?.url);
          }
        }
      }
    );
    return () => unsubscribeDynamicLinks();
  }, [user])

  useEffect(() => {
    // dispatch(getDeviceInfo());
    const init = async () => {
      try {
        const visit = await AsyncStorage.getItem('visited');
        setShowWelcome(visit === null);
        if (visit === null) {
          Navigator.navigate('WelcomeOnBoarding');
        }
      } catch (error) { }
    };
    init();
  }, [user]);

  const handleDynamicLink = (link: any) => {
    let navigationOptions = getDynamicLinkNavigationParams(link.url, user?.id);
    if (navigationOptions) {
      Navigator.stack.push(navigationOptions.route, { ...navigationOptions.params });
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={Navigator.navigationRef}>
        {!user ? (
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <>
              {showWelcome && (
                <RootStack.Screen
                  name="WelcomeOnBoarding"
                  component={WelcomeOnBoarding}
                />
              )}
              <RootStack.Screen name="Login" component={Login} />
              <RootStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
              />
              <RootStack.Screen name="ChooseRole" component={ChooseRole} />
              <RootStack.Screen
                name="OnBoardingProvider"
                component={OnBoardingProvider}
              />
              <RootStack.Screen
                name="OnBoardingClient"
                component={OnBoardingClient}
              />
              <RootStack.Screen
                name="SignUpProvider"
                component={SignUpProvider}
                options={{ gestureEnabled: false }}
              />
              <RootStack.Screen options={{ gestureEnabled: false }} name="SignUpClient" component={SignUpClient} />
              <RootStack.Screen name="WebEmailVerification" component={WebEmailVerification} />
              <RootStack.Screen options={{ gestureEnabled: false }} name="PickSubscription" component={PickSubscription} />
            </>
          </RootStack.Navigator>
        ) : user?.role === 'provider' ? (
          <RootStack.Navigator
            initialRouteName="BottomTabNavigator"
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
            />
            <RootStack.Screen
              name="MoreStackNavigator"
              component={MoreStackNavigator}
            />
            <RootStack.Screen name="Sales" component={SalesStack} />
            <RootStack.Screen name="Clients" component={ClientsStack} />
            <RootStack.Screen name="Invoices" component={InvoicesStack} />
            <RootStack.Screen name="Estimates" component={EstimatesStack} />
            <RootStack.Screen name="AddPayments" component={AddPayments} />
            <RootStack.Screen
              name="CashJournals"
              component={CashJournalsStack}
            />
            <RootStack.Screen name="CalendarStack" component={CalendarStack} />
            <RootStack.Screen name="LoyaltyStack" component={LoyaltyStackNavigator} />
            <RootStack.Screen name="Chats" component={ProviderChats} />
            <RootStack.Screen name="AddChat" component={ProviderAddChat} />
            <RootStack.Screen name="Chat" component={Chat} />
            <RootStack.Screen name="Notifications" component={Notifications} />
            <RootStack.Screen name="Subscription" component={Subscription} />
            <RootStack.Screen
              name="RenewSubscription"
              component={RenewSubscription}
              options={{ gestureEnabled: false }}
            />
            <RootStack.Screen
              name="UpgradeSubscription"
              component={UpgradeSubscription}
            // options={{ gestureEnabled: false }}
            />
            <RootStack.Screen
              name="AppointmentDetails"
              component={ProviderAppointmentDetails}
            />
            <RootStack.Screen
              name="AddAppointment"
              component={ProviderAddAppointment}
            />
            <RootStack.Screen
              name="PickTimeslot"
              component={ProviderPickTimeSlot}
            />
            <RootStack.Screen name="AddSale" component={AddSale} />
            <RootStack.Screen name="SaleDetails" component={SaleDetails} />
          </RootStack.Navigator>
        ) : (
          <RootStack.Navigator
            initialRouteName="BottomTabClientNavigator"
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen
              name="BottomTabClientNavigator"
              component={BottomTabClientNavigator}
            />
            <RootStack.Screen
              name="ProviderDetails"
              component={ProviderDetails}
            />
            <RootStack.Screen name="PaymentsList" component={PaymentsList} />
            <RootStack.Screen
              name="SearchProviders"
              component={SearchProviders}
            />
            <RootStack.Screen
              name="SearchLocation"
              component={SearchLocation}
            />
            <RootStack.Screen
              name="AddAppointment"
              component={ClientAddAppointment}
            />
            <RootStack.Screen
              name="PickTimeslot"
              component={ClientPickTimeSlot}
            />
            <RootStack.Screen
              name="AppointmentDetails"
              component={ClientAppointmentDetails}
            />
            <RootStack.Screen
              name="InvoiceDetails"
              component={ClientInvoiceDetails}
            />
            <RootStack.Screen
              name="EstimateDetails"
              component={ClientEstimateDetails}
            />
            <RootStack.Screen
              name="SaleDetails"
              component={ClientSaleDetails}
            />
            <RootStack.Screen
              name="SalesSpecialDetails"
              component={ClientSalesSpecialDetails}
            />
            <RootStack.Screen
              name="PaymentDetails"
              component={PaymentDetails}
            />
            <RootStack.Screen name="Chats" component={ClientChats} />
            <RootStack.Screen name="AddChat" component={ClientAddChat} />
            <RootStack.Screen name="Chat" component={Chat} />
            <RootStack.Screen name="Notifications" component={Notifications} />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
