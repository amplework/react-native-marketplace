import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CashJournals } from 'components/cashJournals/provider';
import { AddEditCashJournal } from 'components/cashJournals/provider/addEditCashJournal';
import { CashJournalDetails } from 'components/cashJournals/provider/cashJournalDetails';
import { CashJournalsReview } from 'components/cashJournals/provider/cashJournalsReview';
import { CashJournalsReviewDetails } from 'components/cashJournals/provider/cashJournalsReviewDetails';
import { SearchCashJournals } from 'components/cashJournals/provider/searchCashJournals';
import { Invoices } from 'components/invoices/provider';
import { AddEditInvoice } from 'components/invoices/provider/addEditInvoice';
import { InvoiceDetails } from 'components/invoices/provider/invoiceDetails';
import { InvoicesReview } from 'components/invoices/provider/invoicesReview';
import { EstimatesReview } from 'components/invoiceEstimates/provider/estimatesReview';
import { SearchInvoices } from 'components/invoices/provider/searchInvoices';
import { PaymentsList } from 'components/invoices/shared/paymentsList';
import { PaymentsList as EstimatePaymentsList } from 'components/invoices/shared/paymentsList';
import AddClient from 'containers/provider/addClient';
import Clients from 'containers/provider/clients';
import { Box } from 'shared/box';
import SubClientDetails from 'containers/provider/subClientDetails';
import SaleReview from 'containers/saleReview';
import Sales from 'containers/sales';
import SalesReviewFilter from 'containers/salesReviewFilter';
import SalesSearch from 'containers/salesSearch';
import SubClientsFilter from 'containers/subClientsFilter';
import SubClientsReview from 'containers/subClientsReview';
import SubClientsSearch from 'containers/subClientsSearch';
import { RootStackParamList } from 'index';
import { Icon } from 'shared/icon';
import { translations } from 'locales';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native-svg';
import { BackButton } from 'shared/backButton';
import { Heading } from 'shared/heading';
import {
  CashJournalsIcon,
  ClientsIcon,
  InvoicesIcon,
  SalesIcon,
  SaleCheckoutInactive
} from 'shared/icon/icons';

import styles from './style';
import { Estimates } from 'components/invoiceEstimates/provider/estimates';
import { AddEditEstimate } from 'components/invoiceEstimates/provider/addEditEstimate';
import { EstimateDetails } from 'components/invoiceEstimates/provider/estimateDetails';
import { SearchEstimates } from 'components/invoiceEstimates/provider/searchEstimates';
import { HomeStack } from './bottomBar';
import SaleCheckout from 'containers/saleCheckout';
import EstimatesFilter from 'components/invoiceEstimates/provider/estimatesFilter';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'MoreStack'>;

export const SalesStack: React.FC<Props> = ({ route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Sales"
    >
      <Stack.Screen
        name="Sales"
        component={Sales}
        initialParams={route?.params}
      />
      <Stack.Screen name="SalesSearch" component={SalesSearch} />
      <Stack.Screen name="SaleReview" component={SaleReview} />
      <Stack.Screen name="SalesReviewFilter" component={SalesReviewFilter} />
    </Stack.Navigator>
  );
};

export const CashJournalsStack: React.FC<Props> = ({ route }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="CashJournals"
  >
    <Stack.Screen
      name="CashJournals"
      component={CashJournals}
      initialParams={route?.params}
    />
    <Stack.Screen name="AddEditCashJournal" component={AddEditCashJournal} />
    <Stack.Screen name="CashJournalDetails" component={CashJournalDetails} />
    <Stack.Screen name="SearchCashJournals" component={SearchCashJournals} />
    <Stack.Screen name="CashJournalsReview" component={CashJournalsReview} />
    <Stack.Screen
      name="CashJournalsReviewDetails"
      component={CashJournalsReviewDetails}
    />
  </Stack.Navigator>
);

export const InvoicesStack: React.FC<Props> = ({ route }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Invoices"
  >
    <Stack.Screen
      name="Invoices"
      component={Invoices}
      initialParams={route?.params}
    />
    {/* <Stack.Screen
      name="Estimates"
      component={Estimates}
      initialParams={route?.params}
    /> */}
    <Stack.Screen name="AddEditInvoice" component={AddEditInvoice} />
    <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
    <Stack.Screen name="PaymentsList" component={PaymentsList} />
    <Stack.Screen name="InvoicesReview" component={InvoicesReview} />
    <Stack.Screen name="SearchInvoices" component={SearchInvoices} />
  </Stack.Navigator>
);

export const SaleCheckoutStack: React.FC<Props> = ({ route }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="SaleCheckout"
  >
    <Stack.Screen
      name="SaleCheckout"
      component={SaleCheckout}
      initialParams={route?.params}
    />
  </Stack.Navigator>
);

export const EstimatesStack: React.FC<Props> = ({ route }) => (

  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Estimates"
  >
    <Stack.Screen
      name="Estimates"
      component={Estimates}
      initialParams={route?.params}
    />
    <Stack.Screen name="AddEditEstimate" component={AddEditEstimate} />
    <Stack.Screen name="EstimateDetails" component={EstimateDetails} />
    <Stack.Screen name="EstimatePaymentsList" component={EstimatePaymentsList} />
    <Stack.Screen name="EstimatesReview" component={EstimatesReview} />
    <Stack.Screen
      name="EstimatesFilter"
      component={EstimatesFilter}
      options={({ navigation, route }) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => <BackButton title="Estimates" />,
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Image
              //@ts-ignore
              style={styles.imageSearch}
              source={require('assets/global/searcn.png')}
            />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="SearchEstimates" component={SearchEstimates} />
  </Stack.Navigator>

);

export const ClientsStack: React.FC<Props> = ({ route }) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Clients"
  >

    <Stack.Screen
      name="Clients"
      component={Clients}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        headerRight: () => (
          <Box row mr={24}>
            <Icon
              src={require('assets/global/performance.png')}
              onPress={() => navigation.push('SubClientsReview')}
              size={20}
              mr={20}
            />
            <Icon
              src={require('assets/global/search.png')}
              onPress={() => navigation.push('SubClientsSearch')}
              size={20}
            />
          </Box>
        ),
        headerLeft: () => (
          <Heading title="My Clients" back={route?.params?.showBackButton} />
        ),
      })}
      initialParams={route?.params}
    />
    <Stack.Screen name="AddClient" component={AddClient} />
    <Stack.Screen name="SubClientDetails" component={SubClientDetails} />
    <Stack.Screen
      name="SubClientsReview"
      component={SubClientsReview}
      options={() => ({
        headerShown: true,
        headerTitle: 'Review',
        headerTitleStyle: styles.titleReview,
        headerStyle: styles.headerReview,
        headerLeft: () => <BackButton light />,
      })}
    />
    <Stack.Screen
      name="SubClientsFilter"
      component={SubClientsFilter}
      options={({ navigation, route }) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => <BackButton title="My Clients" />,
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.push('SubClientsSearch', {
                //@ts-ignore
                filter: route?.params?.filter,
              })
            }
          >
            <Image
              //@ts-ignore
              style={styles.imageSearch}
              source={require('assets/global/searcn.png')}
            />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="SubClientsSearch" component={SubClientsSearch} />
  </Stack.Navigator>
);

type ConfiguredNavigations = {
  [key: string]: {
    name: string;
    label: string;
    Component: React.FC<Props>;
    Icon: any;
  };
};

export const configuredNavigations: ConfiguredNavigations = {
  sales: {
    name: 'Sales',
    label: translations.common.entities.sales,
    Component: SalesStack,
    Icon: SalesIcon,
  },
  invoices: {
    name: 'Invoices',
    label: translations.common.entities.invoices,
    Component: InvoicesStack,
    Icon: InvoicesIcon,
  },
  clients: {
    name: 'Clients',
    label: translations.common.entities.clients,
    Component: ClientsStack,
    Icon: ClientsIcon,
  },
  cashJournals: {
    name: 'CashJournals',
    label: translations.common.labels.cash,
    Component: CashJournalsStack,
    Icon: CashJournalsIcon,
  },
  saleCheckout: {
    name: 'SaleCheckout',
    label: translations.common.entities.saleCheckout,
    Component: SaleCheckoutStack,
    Icon: SaleCheckoutInactive,
  },
};

