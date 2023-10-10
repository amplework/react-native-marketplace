import { StackScreenProps } from '@react-navigation/stack';
import { QRCodeImage } from 'components/invoices/components/qrCodeImage';
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
import {
  convertEstimateToInvoice,
  deleteEstimate,
  estimatesSelectors,
  getEstimate,
  getEstimates,
  shareEstimate
} from 'store/entities/estimates';
import { getQueryParams } from 'components/invoiceEstimates/helpers/utils';

type State = {
  provider: {
    provider: IProviderUser;
    loading: boolean;
  };
};

type Props = StackScreenProps<RootStackParamList, 'InvoiceDetails'>;

const EstimateDetails: React.FC<Props> = ({ route, navigation }) => {
  const tab = useSelector(estimatesSelectors.tab);
  const estimate: any = useSelector(estimatesSelectors.estimate);

  const provider = useSelector((state: State) => state.provider.provider);

  const loading = useSelector(estimatesSelectors.estimateLoading);
  const deleteLoading = useSelector(estimatesSelectors.deleteLoading);
  const providerLoading = useSelector((state: State) => state.provider.loading);

  const error = useSelector(estimatesSelectors.error);

  const [pdfVisible, setPdfVisible] = useState(false);

  const isResendPaymentRequestApplicable = (estimate?.expectedPaymentMethod?.shortName == "Online" && estimate?.isPaymentSuccess == false)

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const confirmDelete = useCallback(() => {
    if (estimate?.payments && estimate?.payments?.length > 0) {
      toast.info('This estimate can not be deleted as this is already associated with an existing payment');
      return;
    }

    if (estimate?.approveStatus === 'approved') {
      toast.info('This estimate can not be deleted as this is already associated with an invoice.');
      return;
    }
    return alert.deletion({
      entity: t(translations.common.entities.estimate),
      onDelete: () =>
        dispatch(
          deleteEstimate({
            id: route.params.id,
            onSuccess: route.params.onDelete,
          }),
        ),
    });
  }, [dispatch, route.params.id, route.params.onDelete, t, estimate]);

  const handleSendPaymentRequest = () => {
    let payload: SendPaymentRequest = {
      id: estimate?.id,
      type: 'estimate',
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
        estimate && (
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
    dispatch(getEstimate(route.params.id));
    dispatch(getProviderProfile());
  }, [dispatch, route.params.id]);

  const fetchEstimate = () => dispatch(getEstimate(route.params.id));

  const fetchEstimates = () => dispatch(getEstimates(getQueryParams(tab)));

  const navigateToAddPayment = () => {
    if (estimate?.expectedPaymentMethod?.isActive && (isOnlinePaymentOption(estimate?.expectedPaymentMethod?.shortName) || isOnlinePaymentOption(estimate?.expectedPaymentMethod?.description))) {
      toast.info('You cannot create payments manually for the Estimate with the online payment option enabled')
    } else {
      Navigator.navigate('AddPayments', {
        clientId: estimate?.clientSubprofile,
        total: estimate?.balance.toString(),
        estimateId: estimate?.id,
        email: estimate?.clientSubprofile.email,
        onSuccess: () => {
          fetchEstimate();
          fetchEstimates();

          if (route.params.onPay) {
            route.params.onPay();
          }
        },
      });
    }
  }

  const navigateToEditEstimate = () => {
    if (estimate?.payments && estimate?.payments?.length > 0) {
      toast.info('This estimate can not be edited as this is already assosiated with an existing payment')
    } else {
      Navigator.navigate('AddEditEstimate', {
        estimate,
        onEdit: route.params.onEdit,
      });
    }
  }

  const handleConvertEstimateToInvoice = () => alert.confirmation({
    message: 'This action will create a new invoice with this estimate reference. Do you want to proceed ?',
    onConfirm: () => dispatch(convertEstimateToInvoice(estimate?.id))
  })

  const closePdf = () => setPdfVisible(false);

  const handleShareEstimate = (email: string) =>
    dispatch(shareEstimate({ id: estimate!.id, email }));

  const convertable = estimate?.approveStatus !== 'approved';

  const payable = estimate?.status !== 'paid';

  if (error) {
    return <Error onRetry={fetchEstimate} />;
  }

  return (
    <SafeContainer containerStyle={S.container}>
      {loading || providerLoading ? (
        <Loader loading />
      ) : !estimate ? (
        <EmptyState
          type="deleted"
          entities={t(translations.common.entities.estimate)}
        />
      ) : (
        <>
          <Loader loading={deleteLoading} />
          <PdfPreview
            visible={pdfVisible}
            pdfUrl={estimate!.pdf}
            title="Estimate preview"
            onClose={closePdf}
            shareable
            pdfName={I18n.t('common.files.pdf.estimate', {
              number: estimate!.number,
              date: formatFileDate(estimate!.date),
              firstName: provider.firstName,
              lastName: provider.lastName,
            })}
            email={estimate?.clientSubprofile.email}
            onEmail={handleShareEstimate}
          />
          <ScrollView style={[S.scrollView, !convertable && { marginBottom: 0 }]} contentContainerStyle={S.content}>
            <UserSection />
            <DetailsSection />
            <ImagesList />
            <ProductsList />
            {payable && (
              <Button
                text={I18n.t('estimates.addPayment')}
                onPress={navigateToAddPayment}
                buttonStyle={S.addButton}
                textStyle={S.buttonText}
              />
            )}
            {convertable && (
              <Button
                text={I18n.t('estimates.convert')}
                onPress={handleConvertEstimateToInvoice}
                buttonStyle={S.addButton}
                textStyle={S.buttonText}
              />
            )}
            <QRCodeImage />
          </ScrollView>
          {convertable && (
            <View style={S.editButton}>
              <Button
                text={I18n.t('estimates.edit')}
                onPress={navigateToEditEstimate}
                image={require('assets/global/pencilFill.png')}
              />
            </View>
          )}
        </>
      )}
    </SafeContainer>
  );
};

export { EstimateDetails };
