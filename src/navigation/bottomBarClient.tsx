import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from 'components/home/client';
import { Providers } from 'components/providers/client';
import { NotificationSettings } from 'components/settings/common/notificationSettings';
import Calendar from 'containers/calendar/client';
import ChooseProvider from 'containers/chooseProvider';
import ChooseNeeds from 'containers/client/chooseNeeds';
import EditProfile from 'containers/client/editProfile';
import MyProfile from 'containers/client/profile';
import ResetPassword from 'containers/resetPassword';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import COLORS from 'utils/colors';
import { HowDoI } from 'components/howDoI/provider';

import styles from './style';
import {
  BlackList,
  OnlinePaymentMethodSetup,
} from 'components/settings/client/index';
import { Storage } from 'service/localStorage/localStorage';
import { DYNAMIC_LINK } from 'utils/constants';
import { Navigator } from 'service/navigator';
import { getDynamicLinkNavigationParams } from 'utils/onlinePaymentOptions';
import { userSelectors } from 'store/entities/user';
import { useSelector } from 'react-redux';
import { ContactUs } from 'components/contactUs/provider';
import InviteToAlpha from 'containers/inviteToAlpha';
import ClientSettings from 'containers/clientSettings';
import { DeleteAccount } from 'components/settings/provider/deleteAccount';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ProvidersStack = createStackNavigator();

export const ModalStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={'Home'}
  >
    <Stack.Screen name={'Home'} component={Home} />
    <Stack.Screen name={'MyProfile'} component={MyProfile} />
    <Stack.Screen
      name={'EditProfile'}
      component={EditProfile}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        // headerRight: () => (
        //   <TouchableOpacity onPress={() => navigation.goBack()}>
        //     <Image
        //       style={styles.imageClose}
        //       source={require('assets/global/close.png')}
        //     />
        //   </TouchableOpacity>
        // ),
        headerLeft: () => (
          <Text style={styles.titleLeftStyle}>Edit Profile</Text>
        ),
      })}
    />
    <Stack.Screen
      name={'ChooseNeeds'}
      component={ChooseNeeds}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.imageClose}
              source={require('assets/global/back.png')}
            />
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen
      name={'ResetPassword'}
      component={ResetPassword}
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
    <Stack.Screen
      name="NotificationSettings"
      component={NotificationSettings}
    />
    <Stack.Screen
      name="HowDoI"
      component={HowDoI}
    />
    <Stack.Screen
      name="Blacklist"
      component={BlackList}
    />
    <Stack.Screen
      name="OnlinePaymentMethods"
      component={OnlinePaymentMethodSetup}
    />
    <Stack.Screen
      name="ContactUs"
      component={ContactUs}
    />
    <Stack.Screen
      name="ClientSettings"
      component={ClientSettings}
    />
    <Stack.Screen
      name="InviteToAlpha"
      component={InviteToAlpha}
    />
    <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
    />
  </Stack.Navigator>
);
const BottomTabClientNavigator = () => {
  const user = useSelector(userSelectors.user);

  useEffect(() => {
    const init = async () => {
      const paymentDynamicLink = await Storage.get(DYNAMIC_LINK);
      if (paymentDynamicLink) {
        let navigationOptions = getDynamicLinkNavigationParams(paymentDynamicLink, user?.id);
        if (navigationOptions) {
          Navigator.navigate(navigationOptions.route, { ...navigationOptions.params });
        }
        await Storage.deleteItem(DYNAMIC_LINK);
      }
    }
    init();
  }, [])

  const getIcon = (icon: any) => {
    return <Image source={icon} style={styles.image} />;
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: COLORS.clearBlue,
        inactiveTintColor: COLORS.brownishGrey,
        labelStyle: styles.label,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ModalStack}
        options={(props: any) => {
          const index = props.route?.state?.index || 0;
          return {
            tabBarLabel: 'HOME',
            tabBarVisible: index === 0 || index === 1,
            tabBarIcon: ({ focused }: { focused: boolean }) =>
              focused
                ? getIcon(require('assets/bottomBar/homeActive.png'))
                : getIcon(require('assets/bottomBar/home.png')),
          };
        }}
      />
      <Tab.Screen
        name="Providers"
        component={ProviderStackNavigator}
        options={{
          tabBarLabel: 'PROVIDER',
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused
              ? getIcon(require('assets/bottomBar/providerActive.png'))
              : getIcon(require('assets/bottomBar/provider.png')),
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={CalendarStackNavigator}
        options={(props: any) => {
          const index = props.route?.state?.index || 0;
          return {
            tabBarLabel: 'CALENDAR',
            tabBarVisible: index === 0,
            tabBarIcon: ({ focused }: { focused: boolean }) =>
              focused
                ? getIcon(require('assets/bottomBar/calendarActive.png'))
                : getIcon(require('assets/bottomBar/calendar.png')),
          };
        }}
      />
    </Tab.Navigator>
  );
};

const ProviderStackNavigator = () => (
  <ProvidersStack.Navigator>
    <ProvidersStack.Screen name="Providers" component={Providers} />
  </ProvidersStack.Navigator>
);

const CalendarStackNavigator = () => (
  <ProvidersStack.Navigator>
    <ProvidersStack.Screen name="Calendar" component={Calendar} />
    <ProvidersStack.Screen name="ChooseProvider" component={ChooseProvider} />
  </ProvidersStack.Navigator>
);

export default BottomTabClientNavigator;