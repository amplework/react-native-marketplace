import { StackScreenProps } from '@react-navigation/stack';
import { QRCodeImage } from 'components/invoices/components/qrCodeImage';
import { getQueryParams } from 'components/invoices/helpers/utils';
import { RootStackParamList } from 'index';
import I18n, { translations } from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { EmptyState } from 'shared/emptyState';
import { Error } from 'shared/error';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { PdfPreview } from 'shared/pdfPreview';
import { toast } from 'shared/toast';
import { getProviderProfile } from 'store/actions/provider';
import {
  deleteInvoice,
  getInvoice,
  getInvoices,
  invoicesSelectors,
  shareInvoice,
} from 'store/entities/invoices';
import { resendPaymentRequest } from 'store/entities/payments';
import { SendPaymentRequest } from 'store/entities/payments/types';
import { IProviderUser } from 'types/users';
import { formatFileDate } from 'utils/dates';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

import { DetailsSection } from '../../components/detailsSection';
import { ImagesList } from '../../components/imagesList';
import { ProductsList } from '../../components/productsList';
import { UserSection } from '../../components/userSection';
import { invoiceDetailsStyle as S } from '../../style';

type State = {
  provider: {
    provider: IProviderUser;
    loading: boolean;
  };
};

type Props = StackScreenProps<RootStackParamList, 'InvoiceDetails'>;

const InvoiceDetails: React.FC<Props> = ({ route, navigation }) => {
  const tab = useSelector(invoicesSelectors.tab);
  const invoice: any = useSelector(invoicesSelectors.invoice);

  const provider = useSelector((state: State) => state.provider.provider);

  const loading = useSelector(invoicesSelectors.invoiceLoading);
  const deleteLoading = useSelector(invoicesSelectors.deleteLoading);
  const providerLoading = useSelector((state: State) => state.provider.loading);

  const error = useSelector(invoicesSelectors.error);

  const [pdfVisible, setPdfVisible] = useState(false);

  const isResendPaymentRequestApplicable = (invoice?.expectedPaymentMethod?.shortName == "Online" && invoice?.isPaymentSuccess == false)

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const confirmDelete = useCallback(() => {
    if (invoice?.payments && invoice?.payments?.length > 0) {
      toast.info('This invoice can not be deleted as this is already assosiated with an existing payment')
    } else {
      alert.deletion({
        entity: t(translations.common.entities.invoice),
        onDelete: () =>
          dispatch(
            deleteInvoice({
              id: route.params.id,
              onSuccess: route.params.onDelete,
            }),
          ),
      });
    }
  }, [dispatch, route.params.id, route.params.onDelete, t, invoice]);

  const handleSendPaymentRequest = () => {
    let payload: SendPaymentRequest = {
      id: invoice?.id,
      type: 'invoice',
      paymentMethod: 'online'
    }
    alert.confirmation({
      message: t(translations.sales.paymentRequest),
      onConfirm: () => dispatch(resendPaymentRequest(payload))
    })
  }

  const openPdf = useCallback(() => setPdfVisible(true), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () =>
        invoice && (
          <Box row mr={24}>
            {isResendPaymentRequestApplicable && (
              <Icon
                src={require('assets/global/mail.png')}
                size={20}
                mr={20}
                onPress={handleSendPaymentRequest}
              />
            )}
            <Icon
              src={require('assets/global/share.png')}
              onPress={openPdf}
              disabled={loading}
              size={20}
              mr={20}
            />
            <Icon
              src={require('assets/global/deleteGray.png')}
              onPress={confirmDelete}
              disabled={loading}
              size={20}
            />
          </Box>
        ),
    });
  }, [navigation, loading, confirmDelete, openPdf]);

  useEffect(() => {
    dispatch(getInvoice(route.params.id));
    dispatch(getProviderProfile());
  }, [dispatch, route.params.id]);

  const fetchInvoice = () => dispatch(getInvoice(route.params.id));

  const fetchInvoices = () => dispatch(getInvoices(getQueryParams(tab)));

  const navigateToAddPayment = () => {
    if (invoice?.expectedPaymentMethod?.isActive && (isOnlinePaymentOption(invoice?.expectedPaymentMethod?.shortName) || isOnlinePaymentOption(invoice?.expectedPaymentMethod?.description))) {
      toast.info('You cannot create payments manually for the Invoice with the online payment option enabled')
    } else if (invoice?.payments && invoice?.payments?.length > 0) {
      toast.info('This invoice can not be edited as this is already assosiated with an existing payment')
    } else {
      Navigator.navigate('AddPayments', {
        clientId: invoice?.clientSubprofile,
        total: invoice?.balance.toString(),
        invoiceId: invoice?.id,
        email: invoice?.clientSubprofile.email,
        onSuccess: () => {
          fetchInvoice();
          fetchInvoices();

          if (route.params.onPay) {
            route.params.onPay();
          }
        },
      });
    }
  }

  const navigateToEditInvoice = () => {
    if (invoice?.payments && invoice?.payments?.length > 0) {
      toast.info('This invoice can not be edited as this is already assosiated with an existing payment')
    } else {
      Navigator.navigate('AddEditInvoice', {
        invoice,
        onEdit: route.params.onEdit,
      });
    }
  }

  const closePdf = () => setPdfVisible(false);

  const handleShareInvoice = (email: string) =>
    dispatch(shareInvoice({ id: invoice!.id, email }));

  const payable = invoice?.status !== 'paid';

  if (error) {
    return <Error onRetry={fetchInvoice} />;
  }

  return (
    <SafeContainer containerStyle={S.container}>
      {loading || providerLoading ? (
        <Loader loading />
      ) : !invoice ? (
        <EmptyState
          type="deleted"
          entities={t(translations.common.entities.invoice)}
        />
      ) : (
        <>
          <Loader loading={deleteLoading} />
          <PdfPreview
            visible={pdfVisible}
            pdfUrl={invoice!.pdf}
            title="Invoice preview"
            onClose={closePdf}
            shareable
            pdfName={I18n.t('common.files.pdf.invoice', {
              number: invoice!.number,
              date: formatFileDate(invoice!.date),
              firstName: provider.firstName,
              lastName: provider.lastName,
            })}
            email={invoice?.clientSubprofile.email}
            onEmail={handleShareInvoice}
          />
          <ScrollView style={S.scrollView} contentContainerStyle={S.content}>
            <UserSection />
            <DetailsSection />
            <ImagesList />
            <ProductsList />
            {payable && (
              <Button
                text={I18n.t('invoices.addPayment')}
                onPress={navigateToAddPayment}
                buttonStyle={S.addButton}
                textStyle={S.buttonText}
              />
            )}
            <QRCodeImage />
          </ScrollView>
          {payable && (
            <View style={S.editButton}>
              <Button
                text={I18n.t('invoices.editInvoice')}
                onPress={navigateToEditInvoice}
                image={require('assets/global/pencilFill.png')}
              />
            </View>
          )}
        </>
      )}
    </SafeContainer>
  );
};

export { InvoiceDetails };
