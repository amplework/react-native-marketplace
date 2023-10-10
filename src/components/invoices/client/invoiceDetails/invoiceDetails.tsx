import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { EmptyState } from 'shared/emptyState';
import { Error } from 'shared/error';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { PdfPreview } from 'shared/pdfPreview';
import {
  getInvoice,
  invoicesSelectors,
  shareInvoice,
} from 'store/entities/invoices';
import {
  createPaymentIntent,
  createPayment,
  cardSelectors,
} from 'store/entities/card';
import {
  getProvider,
  providersSelectors,
} from 'store/entities/providers';
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
import { ImagesList } from '../../components/imagesList';
import { ProductsList } from '../../components/productsList';
import { UserSection } from '../../components/userSection';
import { QRCodeImage } from '../../components/qrCodeImage';
import { invoiceDetailsStyle as S } from '../../style';
import { alert } from 'shared/alert';
import { toast } from 'shared/toast';

type Props = StackScreenProps<RootStackParamList, 'InvoiceDetails'>;

const InvoiceDetails: React.FC<Props> = ({ route, navigation }) => {
  const paymentLoading = useSelector(cardSelectors.paymentLoading);
  const paymentData = useSelector(cardSelectors.paymentData);

  const paymentIntentLoading = useSelector(cardSelectors.paymentIntentLoading);
  const paymentIntentData = useSelector(cardSelectors.paymentIntentData);

  const provider = useSelector(providersSelectors.provider);
  const providerLoading = useSelector(providersSelectors.providerLoading);

  const invoice = useSelector(invoicesSelectors.invoice);
  const loading = useSelector(invoicesSelectors.invoiceLoading);
  const error = useSelector(invoicesSelectors.error);
  const updateInvoicePaymentStatusLoading = useSelector(invoicesSelectors.updateInvoicePaymentStatusLoading);

  const [pdfVisible, setPdfVisible] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const openPdf = useCallback(() => setPdfVisible(true), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () =>
        invoice && (
          <Icon
            src={require('assets/global/share.png')}
            onPress={openPdf}
            disabled={loading}
            size={20}
            mr={24}
          />
        ),
    });
  }, [navigation, loading, openPdf]);

  useEffect(() => {
    dispatch(getInvoice(route.params.id));

    if (route.params?.providerId) {
      dispatch(getProvider(route.params?.providerId));
    }
  }, []);

  useEffect(() => {
    if (route.params?.paymentUsingDynamicLinkData && (route.params?.paymentUsingDynamicLinkData?.invoiceId == invoice?.id) && provider && invoice && !(loading && providerLoading)) {
      if (shouldShowPayOption()) {
        initializePayment()
      } else {
        toast.info('You already have paid for this invoice')
      }
    }
  }, [loading, providerLoading, provider, invoice]);

  const fetchInvoice = () => dispatch(getInvoice(route.params.id));

  const closePdf = () => setPdfVisible(false);

  const handleShareInvoice = (email: string) =>
    dispatch(shareInvoice({ id: invoice!.id, email }));

  const shouldShowPayOption = () => {
    let shouldShow = true;

    if (invoice?.isPaymentSuccess || invoice?.status?.toLowerCase() == 'paid') {
      shouldShow = false
    }
    if (invoice?.expectedPaymentMethod?.isActive) {
      if (!isOnlinePaymentOption(invoice?.expectedPaymentMethod?.description) && !isOnlinePaymentOption(invoice?.expectedPaymentMethod?.shortName)) {
        shouldShow = false
      }
    } else {
      shouldShow = false
    }

    return shouldShow
  }

  const initializePayment = () => {
    alert.confirmation({
      message: `You will be charged $${getPaymentAmount(invoice?.balance!)}. Please confirm transaction and choose your payment method`,
      onConfirm: () => {
        if (provider?.id && invoice?.balance) {
          dispatch(createPaymentIntent({
            paymentIntent: {
              amount: getPaymentAmount(invoice?.balance),
              currency: PAYMENT_OPTIONS.currency,
              providerId: provider?.id,
              paymentMethodTypes: PAYMENT_OPTIONS.paymentMethodTypes,
              invoiceId: invoice?.id,
            },
            onSuccess: initializePaymentSheet
          }))
        }
      },
    });
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
      handleInvoicePaymentSuccess(paymentIntentKeys)
    }
  };

  const handleInvoicePaymentSuccess = (paymentIntentKeys: any) => {
    dispatch(createPayment({
      providerId: provider?.id,
      chargeId: paymentIntentKeys?.chargeId,
      amount: getPaymentAmount(invoice?.balance!),
      paymentMethodId: invoice?.expectedPaymentMethod?.id,
      clientSubprofileId: invoice?.clientSubprofile?.id,
      invoiceId: invoice?.id,
    }));
  }

  if (error && error.message !== 'Invoice not found') {
    return <Error onRetry={fetchInvoice} />;
  }

  return (
    <SafeContainer containerStyle={S.container}>
      {(loading) ? (
        <Loader loading />
      ) : !invoice ? (
        <EmptyState
          type="deleted"
          entities={t(translations.common.entities.invoice)}
        />
      ) : (
        <>
          <Loader loading={paymentLoading || updateInvoicePaymentStatusLoading} />
          <PdfPreview
            visible={pdfVisible}
            pdfUrl={invoice!.pdf}
            title={t(translations.invoices.preview)}
            shareable={false}
            pdfName={t(translations.common.files.pdf.invoice, {
              number: invoice!.number,
              date: formatFileDate(invoice!.date),
              firstName: provider?.firstName,
              lastName: provider?.lastName,
            })}
            onClose={closePdf}
            onEmail={handleShareInvoice}
          />
          <ScrollView style={[
            S.inactive,
            (shouldShowPayOption()) && S.scrollView
          ]} contentContainerStyle={S.content}>
            <UserSection provider={provider} />
            <DetailsSection />
            <QRCodeImage />
            <ImagesList />
            <ProductsList />
          </ScrollView>
          {(shouldShowPayOption()) && (
            <View style={S.paymentButton}>
              <Button
                text={t(translations.invoices.pay)}
                onPress={initializePayment}
                loading={paymentIntentLoading}
              />
            </View>
          )}
        </>
      )}
    </SafeContainer>
  );
};

export { InvoiceDetails };
