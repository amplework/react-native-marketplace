import { LoginManager } from 'react-native-fbsdk-next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactUs } from 'components/contactUs/provider';
import { Expenses } from 'components/expenses/provider';
import { AddEditExpense } from 'components/expenses/provider/addEditExpense';
import { ExpenseDetails } from 'components/expenses/provider/expenseDetails';
import { ExpensesReview } from 'components/expenses/provider/expensesReview/expensesReview';
import { SearchExpenses } from 'components/expenses/provider/searchExpenses';
import { Home } from 'components/home/provider';
import ProviderAppointmentDetails from 'containers/appointmentDetails/provider';
import { PerformanceReview } from 'components/home/provider/performanceReview';
import { Reports } from 'components/reports/provider';
import { TransactionReport } from 'components/reports/provider/transactionReport';
import { NotificationSettings } from 'components/settings/common/notificationSettings';
import { Settings } from 'components/settings/provider';
import { BottomMenu } from 'components/settings/provider/bottomMenu';
import { CalendarSetup } from 'components/settings/provider/calendarSetup';
import { ClosedDays } from 'components/settings/provider/closedDays';
import { ExpenseTypes } from 'components/settings/provider/expenseTypes';
import { InvoiceNotes } from 'components/settings/provider/invoiceNotes';
import { LoyaltyOptions } from 'components/settings/provider/loyaltyOptions';
import { ClientBirthdayReward } from 'components/settings/provider/clientBirthdayReward';
import { ClientLoyaltyReward } from 'components/settings/provider/clientLoyaltyReward';
import { BlackList } from 'components/settings/provider/blackList';
import { PaymentMethods } from 'components/settings/provider/paymentMethods';
import { OnlinePaymentMethodSetup } from 'components/settings/provider/addOnlinePaymentMethod';
import { Products } from 'components/settings/provider/products';
import { SalesSpecial } from 'components/settings/provider/salesSpecial';
import { Reminders } from 'components/settings/provider/reminders';
import { Taxes } from 'components/settings/provider/taxes';
import { Tasks } from 'components/tasks/provider';
import { AddEditTask } from 'components/tasks/provider/addEditTask';
import { SearchTasks } from 'components/tasks/provider/searchTasks';
import { TaskDetails } from 'components/tasks/provider/taskDetails';
import { TasksReview } from 'components/tasks/provider/tasksReview';
import { TasksReviewList } from 'components/tasks/provider/tasksReviewList';
import { Vendors } from 'components/vendors/provider';
import { HowDoI } from 'components/howDoI/provider';
import { AddEditVendor } from 'components/vendors/provider/addEditVendor';
import { SearchVendors } from 'components/vendors/provider/searchVendors';
import { VendorsDetails } from 'components/vendors/provider/vendorsDetails';
import { VendorsReview } from 'components/vendors/provider/vendorsReview';
import { AddEditInvoice } from 'components/invoices/provider/addEditInvoice';
import AppointmentRequestDetails from 'containers/appointmentRequestDetails';
import AppointmentRequests from 'containers/appointmentRequests';
import Calendar from 'containers/calendar/provider';
import CalendarReview from 'containers/calendarReview';
import CalendarReviewFilter from 'containers/calendarReviewFilter';
import { CalendarSearch } from 'containers/calendarSearch';
import AddPayments from 'containers/createPayments';
import PaymentDetails from 'containers/paymentDetails';
import Payments from 'containers/payments';
import { PaymentsReview } from 'containers/paymentsReview';
import PaymentsReviewFilter from 'containers/paymentsReviewFilter';
import PaymentsSearch from 'containers/paymentsSearch';
import MyProfileProvider from 'containers/provider/profile';
import ResetPasswordProvider from 'containers/resetPassword';
import { t, translations } from 'locales';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import AbilityModal from 'shared/abilityModal';
import { Empty } from 'shared/empty';
import MoreModal from 'shared/moreModal';
import { bottomMenuSelectors } from 'store/entities/bottomMenu';
import { changeTab, logout, userSelectors } from 'store/entities/user';
import COLORS from 'utils/colors';
import {
  CashJournalsStack,
  ClientsStack,
  configuredNavigations,
  EstimatesStack,
  InvoicesStack,
  SalesStack,
} from './bottomBarConfigured';
import styles from './style';
import { Storage } from 'service/localStorage/localStorage';
import { DrawerMenu, DrawerMenuItems, DrawerMenuItemsLite, FIRST_LOGIN } from 'utils/constants';
import SubClientDetails from 'containers/provider/subClientDetails';
import { SocialMedia } from 'components/settings/provider/socialMedia';
import AddClient from 'containers/provider/addClient';
import { subscriptionSelectors } from 'store/entities/subscription';
import { DeleteAccount } from 'components/settings/provider/deleteAccount';
import { TrainingVideos } from 'components/trainingVideos';
import InviteToAlpha from 'containers/inviteToAlpha';
import Help from 'containers/help';
import { PersonalInfo } from 'components/signupFlow/provider/personalInfo';
import { BusinessDetails } from 'components/signupFlow/provider/businessDetails';
import Services from 'components/signupFlow/provider/services';
import { SocialSetup } from 'components/signupFlow/provider/socialSetup';
import { PaymentSetup } from 'components/signupFlow/provider/paymentSetup';
import PickSubscription from 'components/signupFlow/provider/pickSubscription';
import ClientConnect from 'containers/clientConnect';
import ClientBlastOptions from 'containers/clientBlastOptions';
import ClientGroups from 'containers/clientGroups';
import { QuickPromotion } from 'components/settings/provider/quickPromotion';
import { Estimates } from 'components/invoiceEstimates/provider/estimates';
import { AppointmentPackages } from 'components/settings/provider/appointmentPackages';
import { handleFacebookLogout } from 'utils/socialBlades';
import CompleteBlastDetails from 'containers/completeBlastDetails';
import SaleCheckout from 'containers/saleCheckout';
import SocialMediaPost from 'containers/socialMediaPost';
import { Navigator } from 'service/navigator';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const SettingsStack = createStackNavigator();
const ReportsStack = createStackNavigator();
const LoyaltyStack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    initialRouteName="Home"
  >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
    <Stack.Screen name="BusinessDetails" component={BusinessDetails} />
    <Stack.Screen name="Services" component={Services} />
    <Stack.Screen name="PaymentSetup" component={PaymentSetup} />
    <Stack.Screen name="SocialSetup" component={SocialSetup} />
    <Stack.Screen name="PickSubscription" component={PickSubscription} />
    <Stack.Screen name="PerformanceReview" component={PerformanceReview} />
    <Stack.Screen
      name="MyProfileProvider"
      component={MyProfileProvider}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        headerRight: () => (
          <TouchableOpacity
            style={styles.rightHeader}
            onPress={() => navigation.navigate('ResetPasswordProvider')}
          >
            <Text style={styles.resetStyle}>Reset Password</Text>
            <Image
              style={styles.imageLock}
              source={require('assets/global/lock.png')}
            />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name="ResetPasswordProvider"
      component={ResetPasswordProvider}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity
            style={styles.leftHeader}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.imageLock}
              source={require('assets/global/back.png')}
            />
            <Text style={styles.titleLeftStyle}>My Profile</Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="Settings" component={SettingsStackNavigator} />
    <Stack.Screen name="LoyaltyStack" component={LoyaltyStackNavigator} />
    <Stack.Screen name="Reports" component={ReportsStackNavigator} />
    <Stack.Screen name="ContactUs" component={ContactUs} />
    <Stack.Screen name="HowDoI" component={HowDoI} />
    <Stack.Screen name="TrainingVideos" component={TrainingVideos} />
    <Stack.Screen name="InviteToAlpha" component={InviteToAlpha} />
    <Stack.Screen name="Help" component={Help} />
  </Stack.Navigator>
);

const ReportsStackNavigator = () => (
  <ReportsStack.Navigator initialRouteName="Reports">
    <ReportsStack.Screen name="Reports" component={Reports} />
    <ReportsStack.Screen
      name="TransactionSummary"
      component={(props) => (
        <TransactionReport
          title={translations.reports.transactionSummary}
          pdfTitle={translations.common.files.pdf.transactionSummary}
          isSummary
          {...props}
        />
      )}
    />
    <ReportsStack.Screen
      name="TransactionListing"
      component={(props) => (
        <TransactionReport
          title={translations.reports.transactionListing}
          pdfTitle={translations.common.files.pdf.transactionListing}
          {...props}
        />
      )}
    />
  </ReportsStack.Navigator>
);

const SettingsStackNavigator = () => (
  <SettingsStack.Navigator
    initialRouteName="Settings"
    screenOptions={{ headerShown: false }}
  >
    <SettingsStack.Screen name="Settings" component={Settings} />
    <SettingsStack.Screen name="CalendarSetup" component={CalendarSetup} />
    <SettingsStack.Screen name="BottomMenu" component={BottomMenu} />
    <SettingsStack.Screen name="Reminders" component={Reminders} />
    <SettingsStack.Screen name="ClosedDays" component={ClosedDays} />
    <SettingsStack.Screen name="Products" component={Products} />
    <SettingsStack.Screen name="AppointmentPackages" component={AppointmentPackages} />
    <SettingsStack.Screen name="PaymentMethods" component={PaymentMethods} />
    <SettingsStack.Screen name="OnlinePaymentMethods" component={OnlinePaymentMethodSetup} />
    <SettingsStack.Screen name="Taxes" component={Taxes} />
    <SettingsStack.Screen name="ExpenseTypes" component={ExpenseTypes} />
    <SettingsStack.Screen name="Vendors" component={Vendors} />
    <SettingsStack.Screen name="VendorsDetails" component={VendorsDetails} />
    <SettingsStack.Screen name="VendorsReview" component={VendorsReview} />
    <SettingsStack.Screen name="AddEditVendor" component={AddEditVendor} />
    <SettingsStack.Screen name="SearchVendors" component={SearchVendors} />
    <SettingsStack.Screen
      name="NotificationSettings"
      component={NotificationSettings}
    />
    <SettingsStack.Screen name="InvoiceNotes" component={InvoiceNotes} />
    <SettingsStack.Screen name="SalesSpecial" component={SalesSpecial} />
    <SettingsStack.Screen name="QuickPromotion" component={QuickPromotion} />
    <SettingsStack.Screen name="LoyaltyOptions" component={LoyaltyOptions} />
    <SettingsStack.Screen name="ClientBirthdayReward" component={ClientBirthdayReward} />
    <SettingsStack.Screen name="ClientLoyaltyReward" component={ClientLoyaltyReward} />
    <SettingsStack.Screen name="AddClient" component={AddClient} />
    <SettingsStack.Screen name="BlackList" component={BlackList} />
    <SettingsStack.Screen name="SocialMedia" component={SocialMedia} />
    <SettingsStack.Screen name="DeleteAccount" component={DeleteAccount} />
    <SettingsStack.Screen name="SubClientDetails" component={SubClientDetails} />
  </SettingsStack.Navigator>
);

export const LoyaltyStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="LoyaltyOptions"
  >
    <LoyaltyStack.Screen name="LoyaltyOptions" component={LoyaltyOptions} />
    <LoyaltyStack.Screen name="ClientBirthdayReward" component={ClientBirthdayReward} />
    <LoyaltyStack.Screen name="ClientLoyaltyReward" component={ClientLoyaltyReward} />
  </Stack.Navigator>
);

export const CalendarStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Calendar"
  >
    <Stack.Screen name="Calendar" component={Calendar} />
    <Stack.Screen name="AppointmentRequests" component={AppointmentRequests} />
    <Stack.Screen
      name="AppointmentRequestDetails"
      component={AppointmentRequestDetails}
    />
    <Stack.Screen
      name="AppointmentDetails"
      component={ProviderAppointmentDetails}
    />
    <Stack.Screen name="CalendarReview" component={CalendarReview} />
    <Stack.Screen
      name="CalendarReviewFilter"
      component={CalendarReviewFilter}
    />
    <Stack.Screen name="CalendarSearch" component={CalendarSearch} />
  </Stack.Navigator>
);

export const MoreStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AddEditInvoice"
        component={AddEditInvoice}
        initialParams={{ showBackButton: true }}
      />
      <Stack.Screen
        name="Sales"
        component={SalesStack}
        initialParams={{ showBackButton: true }}
      />
      <Stack.Screen
        name="Clients"
        component={ClientsStack}
        initialParams={{ showBackButton: true }}
      />
      <Stack.Screen
        name="Invoices"
        component={InvoicesStack}
        initialParams={{ showBackButton: true }}
      />
      <Stack.Screen
        name="Estimates"
        component={EstimatesStack}
        initialParams={{ showBackButton: true }}
      />
      <Stack.Screen
        name="CashJournals"
        component={CashJournalsStack}
        initialParams={{ showBackButton: true }}
      />

      <Stack.Screen
        name="ClientConnect"
        component={ClientConnect}
        initialParams={{ showBackButton: true }}
      />

      <Stack.Screen
        name="ClientBlastOptions"
        component={ClientBlastOptions}
        initialParams={{ showBackButton: true }}
      />

      <Stack.Screen
        name="ClientGroups"
        component={ClientGroups}
        initialParams={{ showBackButton: true }}
      />
      <Stack.Screen
        name="CompleteBlastDetails"
        component={CompleteBlastDetails}
      />
      <Stack.Screen
        name="SaleCheckout"
        component={SaleCheckout}
      />
      <Stack.Screen
        name="SocialMediaPost"
        component={SocialMediaPost}
      />

      <Stack.Screen name="HowDoI" component={HowDoI} />

      <Stack.Screen name="Vendors" component={Vendors} />
      <Stack.Screen name="VendorsDetails" component={VendorsDetails} />
      <Stack.Screen name="VendorsReview" component={VendorsReview} />
      <Stack.Screen name="AddEditVendor" component={AddEditVendor} />
      <Stack.Screen name="SearchVendors" component={SearchVendors} />

      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="AddEditExpense" component={AddEditExpense} />
      <Stack.Screen name="SearchExpenses" component={SearchExpenses} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
      <Stack.Screen name="ExpensesReview" component={ExpensesReview} />

      <Stack.Screen name="SocialMedia" component={SocialMedia} />
      <Stack.Screen name="InviteToAlpha" component={InviteToAlpha} />
      <Stack.Screen name="SalesSpecial" component={SalesSpecial} />
      <Stack.Screen name="QuickPromotion" component={QuickPromotion} />
      <Stack.Screen name="LoyaltyOptions" component={LoyaltyOptions} />
      <Stack.Screen name="ClientLoyaltyReward" component={ClientLoyaltyReward} />
      <Stack.Screen name="ClientBirthdayReward" component={ClientBirthdayReward} />

      <Stack.Screen name="Tasks" component={Tasks} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
      <Stack.Screen name="AddEditTask" component={AddEditTask} />
      <Stack.Screen name="TasksReview" component={TasksReview} />
      <Stack.Screen name="TasksReviewList" component={TasksReviewList} />
      <Stack.Screen name="SearchTasks" component={SearchTasks} />


      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen
        name="AddPayments"
        component={AddPayments}
        initialParams={{
          total: '',
          invoiceId: null,
          email: '',
        }}
      />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen name="PaymentsSearch" component={PaymentsSearch} />
      <Stack.Screen name="PaymentsReview" component={PaymentsReview} />
      <Stack.Screen
        name="PaymentsReviewFilter"
        component={PaymentsReviewFilter}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const [modalShow, setModalShow] = useState(false);

  const user = useSelector(userSelectors.user);
  const tab = useSelector(userSelectors.tab);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const { provider } = useSelector((state: any) => state.provider);
  const settings = useSelector(bottomMenuSelectors.settings);
  const DrawerItems: DrawerMenu[] = liteSubcription ? DrawerMenuItemsLite : DrawerMenuItems

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const AbilityScreenComponent = () => {
    return null;
  };

  const getIcon = (icon: ImageSourcePropType) => {
    return <Image source={icon} style={styles.image} />;
  };

  const handleLogout = async () => {
    const firstLogin = Storage.get(FIRST_LOGIN || '[]');
    firstLogin.then((res) => {
      if (res == null) {
        let userArray = [{ id: user?.id }];
        Storage.save(FIRST_LOGIN, JSON.stringify(userArray));
      } else {
        let parsedArray = JSON.parse(res)
        let newId = { id: user?.id }
        const found = parsedArray.some((el: any) => el.id === user?.id);
        if (found) {
          return;
        } else {
          parsedArray.push(newId)
          Storage.save(FIRST_LOGIN, JSON.stringify(parsedArray));
        }
      }
    });
    handleFacebookLogout();
    dispatch(changeTab(0));
    dispatch(logout());
  };

  const renderItemMenu = (
    image: ImageSourcePropType,
    activeImage: ImageSourcePropType,
    title: string,
    active: boolean,
    onPress?: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={[styles.rowItems, active && styles.rowItemsActive]}
        onPress={onPress}
      >
        <Image source={active ? activeImage : image} style={styles.imageItem} />
        <Text style={[styles.titleItem, !active && styles.titleItemDisabled]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handlePressDrawerItem = (item: DrawerMenu) => {
    dispatch(changeTab(item.tab));
    if (item.tab == 0) {
      Navigator.drawer.close();
      Navigator.reset('Home');
    } else {
      Navigator.navigate(item.route, item?.params)
    }
  }

  const RenderDrawerItem = ({ item }: any) => {
    const active = item?.tab == tab
    return (
      <TouchableOpacity
        style={[styles.rowItems, active && styles.rowItemsActive]}
        onPress={() => handlePressDrawerItem(item)}
      >
        <Image source={active ? item?.activeImage : item.image} style={styles.imageItem} />
        <Text style={[styles.titleItem, !active && styles.titleItemDisabled]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    )
  }

  const cutEmail = (email: string = '') => {
    return email?.length > 20 ? email?.substring(0, 20) + '...' : email;
  };

  const DrawerContent = ({ navigation }: any) => {
    const firstName: string = provider?.firstName || user?.firstName || 'Hi'
    const lastName: string = provider?.lastName || user?.lastName || '...'
    return (
      <View style={styles.menuItems}>
        <View>
          <View style={styles.nameContainer}>
            <Image
              source={
                provider?.photo || user?.photo
                  ? { uri: provider?.photo || user?.photo }
                  : require('assets/global/emptyImage.png')
              }
              style={styles.avatarImage}
            />
            <View style={styles.paddingEmail}>
              <Text numberOfLines={1} style={styles.nameUser}>
                {firstName + ' ' + lastName}
              </Text>
              <Text numberOfLines={1} style={styles.emailUser}>
                {cutEmail(user?.email)}
              </Text>
            </View>
          </View>
          <View style={styles.separatorTop} />
        </View>
        <View style={styles.drawerMenuContainer}>
          {DrawerItems.map((item: DrawerMenu) => {
            return <RenderDrawerItem item={item} />
          })}
        </View>
        <View>
          <View style={styles.separatorBottom} />
          {renderItemMenu(
            require('assets/sideMenu/logOut.png'),
            require('assets/sideMenu/logOut.png'),
            'Logout',
            false,
            handleLogout,
          )}
        </View>
      </View>
    );
  };

  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  const renderCustomButton = (
    props: any,
    title: string,
    image: any,
    active: boolean,
    disabled?: boolean
  ) => {
    return (
      <TouchableOpacity disabled={disabled} {...props} style={styles.positionTabIcon}>
        <Image source={image} style={styles.imageMore} />
        <Text style={[styles.labelMore, active && styles.labelMoreActive]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const configuredNavigationItem =
    configuredNavigations[settings.bottomMenuSettings];

  return (
    <>
      <MoreModal
        modalVisible={modalShow}
        onPress={() => setModalShow(!modalShow)}
      />
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        // @ts-ignore
        contentContainerStyle={styles.container}
        sceneContainerStyle={{ backgroundColor: COLORS.twilightBlue }}
        drawerContent={(props: any) => {
          setProgress(props.progress);
          return DrawerContent(props);
        }}
      >
        <Drawer.Screen name="Home" options={{ swipeEnabled: false }}>
          {() => (
            <Animated.View
              style={StyleSheet.flatten([
                {
                  flex: 1,
                  overflow: 'hidden',
                },
                animatedStyle,
              ])}
            >
              <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                  activeTintColor: modalShow
                    ? COLORS.brownishGrey
                    : COLORS.clearBlue,
                  inactiveTintColor: COLORS.brownishGrey,
                  labelStyle: styles.label,
                }}
              >
                <Tab.Screen
                  name="Home"
                  component={HomeStack}
                  options={({ route }) => {
                    //@ts-ignore
                    const index = route?.state?.index || 0;
                    return {
                      tabBarLabel: 'HOME',
                      tabBarVisible: index === 0,
                      tabBarIcon: ({ focused }: { focused: boolean }) =>
                        focused
                          ? getIcon(
                            modalShow
                              ? require('assets/bottomBar/home.png')
                              : require('assets/bottomBar/homeActive.png'),
                          )
                          : getIcon(require('assets/bottomBar/home.png')),
                    };
                  }}
                />
                <Tab.Screen
                  name="Calendar"
                  component={CalendarStack}
                  options={({ route }) => {
                    //@ts-ignore
                    const index = route?.state?.index || 0;
                    return {
                      tabBarLabel: 'CALENDAR',
                      tabBarVisible: index === 0,
                      tabBarIcon: ({ focused }: { focused: boolean }) =>
                        focused
                          ? getIcon(
                            modalShow
                              ? require('assets/bottomBar/calendar.png')
                              : require('assets/bottomBar/calendarActive.png'),
                          )
                          : getIcon(require('assets/bottomBar/calendar.png')),
                    };
                  }}
                />

                <Tab.Screen
                  name="Ability"
                  component={AbilityScreenComponent}
                  options={{
                    tabBarButton: () => <AbilityModal />,
                  }}
                />

                <Tab.Screen
                  name={configuredNavigationItem.name}
                  component={
                    configuredNavigations[settings?.bottomMenuSettings]
                      .Component
                  }
                  options={({ route }) => {
                    //@ts-ignore
                    const index = route?.state?.index || 0;
                    return {
                      tabBarLabel: t(
                        configuredNavigationItem.label,
                      ).toUpperCase(),
                      tabBarVisible: index === 0,
                      tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <configuredNavigationItem.Icon
                          height={20}
                          weight={20}
                          color={
                            !focused || modalShow
                              ? COLORS.black70
                              : COLORS.clearBlue
                          }
                        />
                      ),
                    };
                  }}
                />
                <Tab.Screen
                  name="More"
                  component={Empty}
                  listeners={() => ({
                    tabPress: (e) => {
                      e.preventDefault();
                      setModalShow(!modalShow);
                    },
                  })}
                  options={({ route }) => {
                    //const {index} = navigation.dangerouslyGetState();
                    //@ts-ignore
                    const index = route?.state?.index || 0;
                    return {
                      tabBarLabel: 'MORE',
                      tabBarVisible: index === 0 || index === 1,
                      tabBarButton: (props) => {
                        return renderCustomButton(
                          props,
                          'MORE',
                          modalShow
                            ? require('assets/bottomBar/moreActive.png')
                            : require('assets/bottomBar/more.png'),
                          modalShow,
                          subscription == null ? true : false,
                        );
                      },
                    };
                  }}
                />
              </Tab.Navigator>
            </Animated.View>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
};

export default BottomTabNavigator;
