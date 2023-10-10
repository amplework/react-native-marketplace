import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n, { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import { EmptyState } from 'shared/emptyState';
import { Icon } from 'shared/icon';
import { PdfPreview } from 'shared/pdfPreview';
import { MainPageTemplate } from 'shared/templates';
import {
  getProvider,
  providersSelectors,
} from 'store/entities/providers';
import {
  getSaleDetails,
  salesSelectors,
  shareSale,
} from 'store/entities/sales';
import {
  createPaymentIntent,
  createPayment,
  cardSelectors,
} from 'store/entities/card';
import COLORS from 'utils/colors';
import { formatFileDate } from 'utils/dates';
import {
  getPaymentAmount,
  isOnlinePaymentOption,
  PAYMENT_OPTIONS,
} from 'utils/onlinePaymentOptions';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

import { DetailsSection } from '../../components/detailsSection';
import { UserSection } from '../../components/userSection';
import { QRCodeImage } from '../../components/qrCodeImage';
import { styles } from '../../style';
import { Loader } from 'shared/loader';
import { alert } from 'shared/alert';
import { toast } from 'shared/toast';

type Props = StackScreenProps<RootStackParamList, 'SaleDetails'>;

const SaleDetails: React.FC<Props> = ({ navigation, route }) => {
  const [showPDF, setShowPDF] = useState(false);
  const [tipModal, setTipModal] = useState(false);

  const paymentLoading = useSelector(cardSelectors.paymentLoading);

  const paymentIntentLoading = useSelector(cardSelectors.paymentIntentLoading);

  const sale: any = useSelector(salesSelectors.sale);
  const loading = useSelector(salesSelectors.loading);
  const updateSalePaymentStatusLoading = useSelector(salesSelectors.updateSalePaymentStatusLoading);
  const provider = useSelector(providersSelectors.provider);
  const providerLoading = useSelector(providersSelectors.providerLoading);
  const client = useSelector((state: any) => state.client.client);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <Icon
          src={require('assets/global/share.png')}
          size={20}
          mr={24}
          onPress={() => setShowPDF(true)}
        />
      ),
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getSaleDetails(route.params?.id));

    if (route.params?.providerId) {
      dispatch(getProvider(route.params?.providerId));
    }
  }, []);

  useEffect(() => {
    if (route.params?.paymentUsingDynamicLinkData && (route.params?.paymentUsingDynamicLinkData?.saleId == sale?.id) && provider && sale && !(loading && providerLoading)) {
      if (shouldShowPayOption()) {
        initializePayment()
      } else {
        toast.info('You already have paid for this sale')
      }
    }
  }, [loading, providerLoading, provider, sale]);

  const handleShareSale = (email: string) =>
    dispatch(shareSale({ id: sale!.id, email }));

  const shouldShowPayOption = () => {
    let shouldShow = true;

    if (sale?.isPaymentReceived) {
      shouldShow = false
    }
    if (sale?.paymentMethod?.isActive) {
      if (!isOnlinePaymentOption(sale?.paymentMethod?.description) && !isOnlinePaymentOption(sale?.paymentMethod?.shortName)) {
        shouldShow = false
      }
    } else {
      shouldShow = false
    }

    return shouldShow
  }

  const initializePayment = () => {

    console.log("sale?.tipAmount ==== >> >", sale?.tipAmount);

    if (sale?.tipAmount > 0) {
      Alert.alert(
        `Hi ${client?.firstName} ${client?.lastName}`,
        `Thank you for your kind acknowledgment. Your satisfaction is my priority. You can add a tip of $${sale.tipAmount}. Your gesture of appreciation is greatly valued. Do you want to add the tip amount ?`,
        [
          {
            text: 'No',
            onPress: () => {
              alert.confirmation({
                message: `You will be charged $${getPaymentAmount(sale?.total!)}. Please confirm transaction and choose your payment method`,
                onConfirm: () => {
                  if (provider?.id && sale?.total) {
                    dispatch(createPaymentIntent({
                      paymentIntent: {
                        amount: getPaymentAmount(sale?.total),
                        currency: PAYMENT_OPTIONS.currency,
                        providerId: provider?.id,
                        paymentMethodTypes: PAYMENT_OPTIONS.paymentMethodTypes,
                        saleId: sale?.id,
                      },
                      onSuccess: initializePaymentSheet
                    }))
                  }
                }
              })
            }
          },
          {
            text: 'Yes',
            onPress: () => {
              const saleTotalWithTip = sale?.total + sale?.tipAmount;
              alert.confirmation({
                message: `You will be charged $${getPaymentAmount(saleTotalWithTip!)}. Please confirm transaction and choose your payment method`,
                onConfirm: () => {
                  if (provider?.id && sale?.total) {
                    dispatch(createPaymentIntent({
                      paymentIntent: {
                        amount: getPaymentAmount(saleTotalWithTip),
                        currency: PAYMENT_OPTIONS.currency,
                        providerId: provider?.id,
                        paymentMethodTypes: PAYMENT_OPTIONS.paymentMethodTypes,
                        saleId: sale?.id,
                      },
                      onSuccess: initializePaymentSheet
                    }))
                  }
                }
              })
            },
            // style: 'destructive',
          },
        ],
      );
    } else {
      alert.confirmation({
        message: `You will be charged $${getPaymentAmount(sale?.total!)}. Please confirm transaction and choose your payment method`,
        onConfirm: () => {
          if (provider?.id && sale?.total) {
            dispatch(createPaymentIntent({
              paymentIntent: {
                amount: getPaymentAmount(sale?.total),
                currency: PAYMENT_OPTIONS.currency,
                providerId: provider?.id,
                paymentMethodTypes: PAYMENT_OPTIONS.paymentMethodTypes,
                saleId: sale?.id,
              },
              onSuccess: initializePaymentSheet
            }))
          }
        }
      })
    }
  }

  const initializePaymentSheet = async (paymentIntentKeys: any) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: PAYMENT_OPTIONS.merchantDisplayName,
      customerId: paymentIntentKeys?.customer,
      paymentIntentClientSecret: paymentIntentKeys?.client_secret,
      customerEphemeralKeySecret: paymentIntentKeys?.ephemeralKey?.secret,
      applePay: {
        merchantCountryCode: 'US'
      },
      // googlePay: {
      //   merchantCountryCode: 'US',
      //   testEnv: false,
      //   currencyCode: paymentIntentKeys?.currency,
      // },
    });
    if (!error) {
      openPaymentSheet(paymentIntentKeys)
    }
  }

  const openPaymentSheet = async (paymentIntentKeys: any) => {
    const { error } = await presentPaymentSheet();
    if (!error) {
      handleSalePaymentSuccess(paymentIntentKeys)
    }
  };

  const handleSalePaymentSuccess = (paymentIntentKeys: any) => {
    dispatch(createPayment({
      providerId: provider?.id,
      chargeId: paymentIntentKeys?.chargeId,
      amount: getPaymentAmount(sale?.total!),
      paymentMethodId: sale?.paymentMethod?.id,
      clientSubprofileId: sale?.clientSubprofile?.id,
      saleId: sale?.id,
    }));
  }

  return (
    <MainPageTemplate loading={loading || providerLoading} bc={COLORS.white}>
      {!sale ? (
        <EmptyState
          type="empty"
          entities={t(translations.common.entities.sale)}
        />
      ) : (
        <>
          <Loader loading={paymentLoading || updateSalePaymentStatusLoading} />
          <ScrollView style={[styles.scrollContainer, !shouldShowPayOption() && { marginBottom: 0 }]} contentContainerStyle={styles.contentContainer}>
            <UserSection provider={provider} />
            <DetailsSection />
            <QRCodeImage />
          </ScrollView>
          {(shouldShowPayOption()) && (
            <View style={styles.paymentButton}>
              <Button
                text={t(translations.sales.pay)}
                onPress={initializePayment}
                loading={paymentIntentLoading}
              />
            </View>
          )}
          {provider && (
            <PdfPreview
              visible={showPDF}
              pdfUrl={sale.pdf || ''}
              title={t(translations.sales.receiptPreview)}
              shareable={true}
              pdfName={t(translations.common.files.pdf.receipt, {
                number: sale.number,
                date: formatFileDate(sale.createdAt),
                firstName: provider.firstName,
                lastName: provider.lastName,
              })}
              onClose={() => setShowPDF(false)}
              onEmail={handleShareSale}
            />
          )}
        </>
      )}
    </MainPageTemplate>
  );
};

export { SaleDetails };