import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Button from 'shared/button';
import COLORS from 'utils/colors';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import { BackButton } from 'shared/backButton';
import { Card, CardBody, CardTitle } from 'shared/card';
import { Toggle } from 'shared/toggle';
import { Icon } from 'shared/icon';
import WebView from 'react-native-webview';
import { Loader } from 'shared/loader';
import { toast } from 'shared/toast';
import { Navigator } from 'service/navigator';
import { env } from 'config';
import { getProviderProfile, updateProviderDetails } from 'store/actions/provider';
import { cardSelectors, deleteConnectAccount, getConnectAccountDetails } from 'store/entities/card';
import { alert } from 'shared/alert';
import { ConnectAccountDetailContainer } from 'components/settings/provider/addOnlinePaymentMethod/ConnectAccountDetailContainer';

type Props = {
  navigation: any;
};

const PaymentSetup: React.FC<Props> = ({ navigation }) => {
  const loading = useSelector((state: any) => state.provider.loading);
  const provider = useSelector((state: any) => state.provider.provider);
  const loadingDetails = useSelector(cardSelectors.loading);
  const loadingConnectAccountDeletion = useSelector(cardSelectors.loadingConnectAccountDeletion);
  const connectAccountDetails = useSelector(cardSelectors.connectAccountDetails);

  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: null,
      headerLeft: () => <BackButton />,
    });
  }, [navigation, t]);

  useEffect(() => {
    if (provider?.connectAccountId && provider?.connectAccountId != '') {
      dispatch(getConnectAccountDetails());
    }
  }, [dispatch, provider])

  const handleToggleState = () => setShowModal(!showModal);

  const onNavigationStateChange = (navState: any, successUrl: string) => {
    if ((!navState?.url?.includes('https://connect.stripe.com/')) && (!navState?.loading) && navState?.url?.includes(successUrl)) {
      toast.info('Your stripe connect account has been created successfully');
      setTimeout(function () {
        dispatch(getProviderProfile());
        Navigator.goBack();
      }, 3000);
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

  const handleSkip = () => dispatch(updateProviderDetails({ isPayments: true }, true))

  return (
    <MainPageTemplate
      containerStyle={connectAccountDetails || showModal ? null : styles.container}
      bc={COLORS.white}
      loading={loading || loadingDetails || loadingConnectAccountDeletion}
    >
      {showModal ? (
        <WebView
          startInLoadingState
          renderLoading={() => <Loader loading />}
          onNavigationStateChange={(navState: any) => onNavigationStateChange(navState, `/card/createConnectAccount`)}
          source={{ uri: `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${env?.API_HOST}/card/createConnectAccount&client_id=${env?.STRIPE_CLIENT_ID}&state=${provider?.id}&stripe_user[email]=${provider?.email}#/` }} />
      ) : (
        (connectAccountDetails) ? (
          <>
            <ConnectAccountDetailContainer
              connectAccountDetails={connectAccountDetails}
              provider={provider}
              onPressDelete={handleDeleteConnectAccount}
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>{t(translations.onlinePaymentSetup.title)}</Text>
            <Text style={styles.description}>
              {t(translations.onlinePaymentSetup.description)}
            </Text>
            <View style={styles.list} >
              <Card isClickable={false} onPress={() => { }}>
                <CardBody row jc="space-between" ai="center">
                  <Toggle checked={showModal} onChange={handleToggleState} />
                  <CardTitle>{'Enable Online Payment'}</CardTitle>
                  <Icon src={require('assets/global/arrowRight.png')} />
                </CardBody>
              </Card>
            </View>
            <View style={styles.rowButtons}>
              <Button
                onPress={handleSkip}
                text={t(translations.social.skip)}
                buttonStyle={styles.btnSkip}
                textStyle={styles.textContinue}
              />
            </View>
          </>
        )
      )}
    </MainPageTemplate>
  );
};

export { PaymentSetup };
