import React, { useEffect, useLayoutEffect } from 'react';
import styles from './style';
import I18n from 'locales';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProviderProfile,
} from 'store/actions/provider';
import {
  getConnectAccountDetails,
  deleteConnectAccount,
  cardSelectors,
} from 'store/entities/card';
import { MainPageTemplate } from 'shared/templates';
import { BackButton } from 'shared/backButton';
import { Loader } from 'shared/loader';
import { toast } from 'shared/toast';
import { Navigator } from 'service/navigator';
import COLORS from 'utils/colors';
import { env } from 'config';
import { WebView } from 'react-native-webview'
import { ConnectAccountDetailContainer } from './ConnectAccountDetailContainer';
import { alert } from 'shared/alert';

const OnlinePaymentMethodSetup: React.FC<any> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.onlinePayments')} />
      ),
    });
  }, [navigation]);

  const loading = useSelector((state: any) => state.provider.loading);
  const provider = useSelector((state: any) => state.provider.provider);
  const loadingDetails = useSelector(cardSelectors.loading);
  const loadingConnectAccountDeletion = useSelector(cardSelectors.loadingConnectAccountDeletion);
  const connectAccountDetails = useSelector(cardSelectors.connectAccountDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      if (!!connectAccountDetails) {
        return;
      }
      e.preventDefault();
      alert.confirmation({
        message: 'Are you sure that you want to leave? If you leave before completing all the steps, your progress will be lost?',
        onConfirm: () => navigation.dispatch(e.data.action)
      }
      );
    });
    return () => {
      unsubscribe();
    };
  }, [navigation, connectAccountDetails]);

  useEffect(() => {
    dispatch(getProviderProfile());
  }, [dispatch])

  useEffect(() => {
    if (provider?.connectAccountId && provider?.connectAccountId != '') {
      dispatch(getConnectAccountDetails());
    }
  }, [dispatch, provider])

  const onNavigationStateChange = (navState: any, successUrl: string) => {
    if ((!navState?.url?.includes('https://connect.stripe.com/')) && (!navState?.loading) && navState?.url?.includes(successUrl)) {
      toast.info('Your stripe connect account has been created successfully');
      setTimeout(function () {
        Navigator.goBack();
      }, 1000);
    }
  }

  const handleDeleteConnectAccount = () => {
    alert.confirmation({
      message: `Are you sure you want to delete your connect account?`,
      onConfirm: () => {
        dispatch(deleteConnectAccount());
      },
    });
  }

  return (
    <MainPageTemplate loading={loading || loadingDetails || loadingConnectAccountDeletion} bc={COLORS.white}>
      {(!loading && !loadingDetails) && (
        (connectAccountDetails) ? (
          <ConnectAccountDetailContainer
            connectAccountDetails={connectAccountDetails}
            provider={provider}
            onPressDelete={handleDeleteConnectAccount}
          />
        ) : (
          <WebView
            startInLoadingState
            renderLoading={() => <Loader loading />}
            onNavigationStateChange={(navState: any) => onNavigationStateChange(navState, `/card/createConnectAccount`)}
            source={{ uri: `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${env?.API_HOST}card/createConnectAccount&client_id=${env?.STRIPE_CLIENT_ID}&state=${provider?.id}&stripe_user[email]=${provider?.email}#/` }} />
        )
      )}
    </MainPageTemplate>
  )
};

export { OnlinePaymentMethodSetup };