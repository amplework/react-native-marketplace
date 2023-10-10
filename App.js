import * as Sentry from '@sentry/react-native';
import { env } from 'config';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import { InAppPurchaseProvider } from 'service/inAppPurchase';
import { PushNotificationsManager } from 'service/notifications';
import store from 'store/store';
import AppRoute from './src';
import SplashScreen from 'react-native-splash-screen';
Sentry.init({ dsn: env.SENTRY_DSN });

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <InAppPurchaseProvider>
        <AppRoute />
        <PushNotificationsManager />
      </InAppPurchaseProvider>
    </Provider>
  );
};

export default Sentry.wrap(App);
