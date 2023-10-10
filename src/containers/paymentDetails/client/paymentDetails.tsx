import { StackScreenProps } from '@react-navigation/stack';
import { PaymentsApi } from 'api/payments';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import moment from 'moment-timezone';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  refundRequestOnPayment,
  providersSelectors,
  getProvider,
} from 'store/entities/providers';
import {
  getPaymentDetailsClient,
  paymentsSelectors,
} from 'store/entities/payments';
import { LinkingHelper } from 'service/linkingHelper';
import { Avatar } from 'shared/avatar';
import { alert } from 'shared/alert';
import Button from 'shared/button';
import { PdfPreview } from 'shared/pdfPreview';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import COLORS from 'utils/colors';
import { currency } from 'utils/currency';
import { formatFileDate } from 'utils/dates';
import { getFullName } from 'utils/strings';

import styles from '../style';
import { getSaleDetails, salesSelectors } from 'store/entities/sales';
import { getInvoice, invoicesSelectors } from 'store/entities/invoices';
import { getSaleChip } from 'components/sales/components/utils';

type Props = StackScreenProps<RootStackParamList, 'PaymentDetails'>;

const PaymentDetails: React.FC<Props> = ({ navigation, route }) => {
  const { payment: paymentDetail, provider: providerDetail } = route.params;

  const loading = useSelector(paymentsSelectors.loading);
  const payment: any = useSelector(paymentsSelectors.paymentDetails);
  const sale: any = useSelector(salesSelectors.sale);
  const invoice = useSelector(invoicesSelectors.invoice);
  
  const chip = useCallback(() => {
    return getSaleChip(sale)
  }, [payment, sale]);

  let paymentStatus = chip();

  const provider: any = useSelector(providersSelectors.provider);

  const refundRequestOnPaymentLoading = useSelector(providersSelectors.refundRequestOnPaymentLoading);
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerTimezone = providerDetails?.address?.utctimezone;

  const dispatch = useDispatch();

  const [showPDF, setShowPDF] = useState(false);

  const headerButton = (action: any, image: any, style?: any) => {
    return (
      <TouchableOpacity onPress={action}>
        <Image style={[styles.imagePerfomance, style]} source={image} />
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <View style={styles.row}>
          {headerButton(
            () => setShowPDF(true),
            require('assets/global/share.png'),
          )}
        </View>
      ),
      headerLeft: () =>
        headerButton(
          navigation.goBack,
          require('assets/global/back.png'),
          styles.back,
        ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getPaymentDetailsClient(paymentDetail?.id));

    if (providerDetail?.id) {
      dispatch(getProvider(providerDetail?.id));
    }
  }, [paymentDetail?.id]);

  useEffect(() => {
    if (payment?.saleId) {
      dispatch(getSaleDetails(payment?.saleId))
    }
    if (payment?.invoiceId) {
      dispatch(getInvoice(payment?.invoiceId))
    }
  }, [payment?.id])

  const renderItem = (text: string, value: string, show: boolean) => {
    return (
      <>
        <View style={[styles.rowSpace, { marginTop: 0 }]}>
          <Text style={styles.titleValue}>{text}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        {show && <View style={styles.separator} />}
      </>
    );
  };

  const onCall = (phone?: string | null) => {
    if (phone) {
      return LinkingHelper.telprompt(phone);
    }
    Alert.alert('Add mobile number and try again');
  };

  const formatTime = (time: any, format: string) => moment.tz(time, providerTimezone).format(format);

  const sharePDF = async (email: string) => {
    try {
      // @ts-ignore
      await PaymentsApi.sharePaymentEmailReceipt(payment?.id, { email });
      toast.info('Email was sent!');
    } catch (error: any) {
      toast.info(error?.message);
    }
  };

  const requestRefund = async () => {
    alert.confirmation({
      message: 'Are you sure you want to request a refund?',
      onConfirm: () => {
        dispatch(refundRequestOnPayment(payment?.id));
      },
    });
  };

  return (
    <MainPageTemplate bc={COLORS.white} loading={loading || refundRequestOnPaymentLoading}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.extraBottom}
      >
        <View style={styles.clientContainer}>
          <View style={styles.row}>
            <Avatar src={provider?.photo ? provider?.photo : provider?.photoFile?.url} size={40} mr={16} />
            <View>
              <View style={styles.row}>
                <Text style={styles.userName}>{provider ? getFullName(provider) : ''}</Text>
              </View>
              <Text style={styles.userTotal}>
                Receipt total{' '}
                <Text style={styles.userTotalBold}>
                  {currency.format(payment?.total ?? 0)}
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onCall(provider?.phoneNumber)}>
            <Image
              source={require('assets/global/callGrey.png')}
              style={styles.callImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleContainer}>Payment Details</Text>
        <View style={styles.infoContainer}>
          {renderItem('Receipt no.', '#' + payment?.number, true)}
          {renderItem(
            'Invoice no.',
            payment?.invoice?.number ? '#' + payment?.invoice?.number : '',
            true,
          )}
          {renderItem(
            'Sale no.',
            payment?.sale?.number ? '#' + payment?.sale?.number : '',
            true,
          )}
          {renderItem(
            'Payment Methods',
            payment?.paymentMethod?.shortName || '',
            true,
          )}
          {renderItem(
            'Receipt Date',
            formatTime(payment?.date, 'MMM Do YYYY'),
            true,
          )}
          {renderItem(
            'Reason for Payment',
            payment?.reason || '',
            true
          )}
          {renderItem(
            'Notes',
            payment?.notes || '',
            true
          )}
          {payment?.isRefundRequest && (
            renderItem(
              'Refund Request',
              payment?.isRefundRequest ? 'pending' : '',
              false
            )
          )}
          {(payment?.isRefundRequest == null && sale?.isPaymentReceived) && (
            renderItem(
              'Status',
              paymentStatus.text,
              false
            )
          )}
        </View>
      </ScrollView>
      {(payment?.chargeId && payment?.isRefundRequest != null) && (
        <View style={styles.paymentRefundButton}>
          <Button
            disabled={payment?.isRefundRequest}
            text={(payment?.isRefundRequest) ? 'Refund Requested' : 'Request Refund'}
            onPress={requestRefund}
            buttonStyle={(payment?.isRefundRequest) ? styles.refundRequestedButtonColor : styles.requestRefundButtonColor}
          />
        </View>
      )}
      {payment && provider && (
        <PdfPreview
          visible={showPDF}
          pdfUrl={payment?.sale ? payment?.sale.pdf : (payment?.pdf ? payment?.pdf : payment?.pdfFile?.url)}
          title="Receipt preview"
          onClose={() => setShowPDF(false)}
          shareable={false}
          pdfName={I18n.t('common.files.pdf.receipt', {
            number: payment?.sale ? payment?.sale.number : payment?.number,
            date: formatFileDate(
              payment?.sale ? payment?.sale.createdAt : payment?.date,
            ),
            firstName: provider?.firstName,
            lastName: provider?.lastName,
          })}
          email={null}
          onEmail={sharePDF}
        />
      )}
    </MainPageTemplate>
  );
};

export { PaymentDetails };
