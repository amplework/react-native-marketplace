import { StackScreenProps } from '@react-navigation/stack';
import { PaymentsApi } from 'api/payments';
import { getSaleChip } from 'components/sales/components/utils';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { alert } from 'shared/alert';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { PdfPreview } from 'shared/pdfPreview';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import { getProviderProfile } from 'store/actions/provider';
import { getInvoice, invoicesSelectors } from 'store/entities/invoices';
import {
  deletePayment,
  getPaymentDetails,
  refundDeclineOnPayment,
  refundAcceptOnPayment,
  paymentsSelectors,
} from 'store/entities/payments';
import { getSaleDetails, salesSelectors } from 'store/entities/sales';
import {
  getSubClient,
  subClientsSelectors,
} from 'store/entities/subClients';
import { userSelectors } from 'store/entities/user';
import { IProviderUser } from 'types/users';
import COLORS from 'utils/colors';
import { dateFormatWithoutTz, dateWithoutTz, formatFileDate } from 'utils/dates';

import styles from './style';

type State = {
  provider: { provider: IProviderUser; loading: boolean };
};

type Props = StackScreenProps<RootStackParamList, 'PaymentDetails'>;

const PaymentDetails: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const payment = useSelector(paymentsSelectors.payment);
  const sale: any = useSelector(salesSelectors.sale);
  const invoice = useSelector(invoicesSelectors.invoice);
  const declineRefundLoading = useSelector(paymentsSelectors.declineRefundLoading);
  const acceptRefundLoading = useSelector(paymentsSelectors.acceptRefundLoading);
  const loading = useSelector(paymentsSelectors.loading);
  const subClient = useSelector(subClientsSelectors.subClient);
  const provider = useSelector((state: State) => state.provider.provider);
  const providerLoading = useSelector((state: State) => state.provider.loading);
  const user = useSelector(userSelectors.user);
  const providerOffset = user?.utcOffset;

  const [showPDF, setShowPDF] = useState(false);
  const headerButton = (action: any, image: any, style?: any) => {
    return (
      <TouchableOpacity onPress={action}>
        <Image style={[styles.imagePerfomance, style]} source={image} />
      </TouchableOpacity>
    );
  };
  const chip = useCallback(() => {
    return getSaleChip(sale)
  }, [payment, sale]);

  let paymentStatus = chip()

  const onPressShare = () => setShowPDF(true);

  const onPressDelete = () => {
    dispatch(
      deletePayment({
        //@ts-ignore
        id: route?.params?.id,
        onSuccess: route.params.onDelete,
      }));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <View style={styles.row}>
          {headerButton(
            onPressShare,
            require('assets/global/share.png'),
          )}
          {headerButton(
            () =>
              alert.deletion({
                entity: I18n.t('common.entities.payment'),
                onDelete: onPressDelete,
              }),
            require('assets/global/deleteGray.png'),
            styles.imageSearch,
          )}
        </View>
      ),
      headerLeft: () =>
        headerButton(
          () => {
            navigation.goBack();
            // dispatch(resetPaymentDetail());
          },
          require('assets/global/back.png'),
          styles.back,
        ),
    });
  }, [navigation, payment]);

  useEffect(() => {
    //@ts-ignore
    dispatch(getPaymentDetails(route?.params?.id));
    //@ts-ignore
    dispatch(getSubClient(payment?.clientSubprofile?.id))
    dispatch(getProviderProfile());
    //@ts-ignore
  }, [route?.params?.id]);

  useEffect(() => {
    if (payment?.saleId) {
      dispatch(getSaleDetails(payment?.saleId))
    }
    if (payment?.invoiceId) {
      dispatch(getInvoice(payment?.invoiceId))
    }
  }, [payment]);

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

  const sharePDF = async (email: string) => {
    try {
      // @ts-ignore
      await PaymentsApi.sharePaymentEmailReceipt(payment.id, { email });
      toast.info('Email was sent!');
    } catch (error: any) {
      toast.info(error?.message);
    }
  };

  const onPressRefundDecline = () => {
    alert.confirmation({
      message: `Are you sure you want to reject this refund request?`,
      onConfirm: () => {
        dispatch(refundDeclineOnPayment(payment?.id))
      },
    });
  }

  const onPressRefundAccept = () => {
    alert.confirmation({
      message: `You will be charged from the payment method ${payment?.paymentMethod?.shortName}`,
      onConfirm: () => {
        dispatch(refundAcceptOnPayment(payment?.chargeId))
      },
    });
  }

  let paymentDate = dateWithoutTz(payment?.date, providerOffset ? providerOffset : 0);

  return (
    <MainPageTemplate loading={loading || providerLoading || declineRefundLoading || acceptRefundLoading} bc={COLORS.white}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.extraBottom}
      >
        <View style={styles.clientContainer}>
          <View style={styles.row}>
            <Image
              source={
                // @ts-ignore
                payment?.clientSubprofile?.photo
                  ? {
                    // @ts-ignore
                    uri: payment?.clientSubprofile?.photo,
                  }
                  : require('assets/global/defaultAvatar.jpg')
              }
              style={styles.avatar}
            />
            <View>
              <View style={styles.row}>
                <Text style={styles.userName}>{`${payment?.clientSubprofile?.firstName + ' ' + (payment?.clientSubprofile?.lastName || '')
                  }`}</Text>
                {payment?.clientSubprofile?.isConnected && (
                  <Image
                    source={require('assets/onBoarding/alpha.png')}
                    style={styles.imageConnected}
                  />
                )}
              </View>
              <Text style={styles.userTotal}>
                Payment total
                <Text style={styles.userTotalBold}>{' $ ' + payment?.total}</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => onCall(payment?.clientSubprofile?.phoneNumber)}>
            <Image
              source={require('assets/global/callGrey.png')}
              style={styles.callImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleContainer}>Payment Details</Text>
        <View style={styles.infoContainer}>
          {renderItem('Payment no.', '#' + payment?.number, true)}
          {payment?.invoice && renderItem('Invoice no.', payment?.invoice?.number ? '#' + payment?.invoice?.number : '', true)}
          {payment?.estimate && renderItem('Estimate no.', payment?.estimate?.number ? '#' + payment?.estimate?.number : '', true)}
          {payment?.sale && renderItem('Sale no.', payment?.sale?.number ? '#' + payment?.sale?.number : '', true)}
          {renderItem(
            'Payment Methods',
            payment?.paymentMethod?.shortName || '',
            true,
          )}
          {renderItem('Receipt Date', dateFormatWithoutTz(paymentDate), true)}
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
      <View style={styles.bottomBlock}>
        {(payment?.isRefundRequest) && (
          <Box row pb={20} jc={'space-between'}>
            <Button
              onPress={onPressRefundDecline}
              text={'Reject Refund'}
              buttonStyle={styles.btnCancel}
              textStyle={styles.textCancel}
            />
            <Button
              onPress={onPressRefundAccept}
              text={'Approve Refund'}
              buttonStyle={[styles.btnCancel, styles.btnConfirm]}
              textStyle={styles.textConfirm}
            />
          </Box>
        )}
        <Button
          onPress={() => {
            if (payment?.saleId) {
              return toast.info(
                'Unfortunately you cannot change details of this payment record as it’s associated with an existing Sale.',
              );
            }

            if (payment?.estimateId) {
              return toast.info(
                'Unfortunately you cannot change details of this payment record as it’s associated with an existing Estimate.',
              );
            }

            if (payment?.invoiceId) {
              return toast.info(
                'Unfortunately you cannot change details of this payment record as it’s associated with an existing Invoice.',
              );
            }
            // @ts-ignore
            navigation.navigate('AddPayments', { paymentId: payment?.id });
          }}
          text={'Edit Payment Details'}
          image={require('assets/global/pencilFill.png')}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
        />
      </View>
      {payment && provider && (
        <PdfPreview
          visible={showPDF}
          pdfUrl={payment?.pdf ? payment?.pdf : ''}
          title="Receipt preview"
          onClose={() => setShowPDF(false)}
          shareable
          pdfName={I18n.t('common.files.pdf.receipt', {
            number: payment?.number,
            date: formatFileDate(
              payment?.date,
            ),
            firstName: provider.firstName,
            lastName: provider.lastName,
          })}
          email={payment?.emailRecipient || payment?.clientSubprofile?.email || null}
          onEmail={sharePDF}
        />
      )}
    </MainPageTemplate>
  );
};

export default PaymentDetails;
