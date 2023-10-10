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
  getEstimate,
  estimatesSelectors,
  shareEstimate,
  updateEstimateStatus,
} from 'store/entities/estimates';
import {
  getProvider,
  providersSelectors,
} from 'store/entities/providers';
import { formatFileDate } from 'utils/dates';

import { DetailsSection } from '../../components/detailsSection';
import { ImagesList } from '../../components/imagesList';
import { ProductsList } from '../../components/productsList';
import { UserSection } from '../../components/userSection';
import { QRCodeImage } from '../../components/qrCodeImage';
import { invoiceDetailsStyle as S } from '../../style';
import { getEstimateApprovalStatus } from 'components/invoiceEstimates/helpers/utils';

type Props = StackScreenProps<RootStackParamList, 'EstimateDetails'>;

const EstimateDetails: React.FC<Props> = ({ route, navigation }) => {

  const provider = useSelector(providersSelectors.provider);

  const estimate = useSelector(estimatesSelectors.estimate);
  const loading = useSelector(estimatesSelectors.estimateLoading);
  const error = useSelector(estimatesSelectors.error);
  const approval = getEstimateApprovalStatus(estimate);

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
        estimate && (
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
    dispatch(getEstimate(route.params.id));

    if (route.params?.providerId) {
      dispatch(getProvider(route.params?.providerId));
    }
  }, []);

  const fetchEstimate = () => dispatch(getEstimate(route.params.id));

  const closePdf = () => setPdfVisible(false);

  const handleShareEstimate = (email: string) =>
    dispatch(shareEstimate({ id: estimate!.id, email }));

  const handlePressApprove = () => dispatch(updateEstimateStatus({
    id: estimate?.id,
    approveStatus: 'approved'
  }));

  const handlePressReject = () => dispatch(updateEstimateStatus({
    id: estimate?.id,
    approveStatus: 'rejected'
  }))

  if (error && error.message !== 'Estimate not found') {
    return <Error onRetry={fetchEstimate} />;
  }

  return (
    <SafeContainer containerStyle={S.container}>
      {(loading) ? (
        <Loader loading />
      ) : !estimate ? (
        <EmptyState
          type="deleted"
          entities={t(translations.common.entities.estimate)}
        />
      ) : (
        <>
          <PdfPreview
            visible={pdfVisible}
            pdfUrl={estimate!.pdf}
            title={t(translations.estimates.preview)}
            shareable={false}
            pdfName={t(translations.common.files.pdf.estimate, {
              number: estimate!.number,
              date: formatFileDate(estimate!.date),
              firstName: provider?.firstName,
              lastName: provider?.lastName,
            })}
            onClose={closePdf}
            onEmail={handleShareEstimate}
          />
          <ScrollView style={S.scrollView} contentContainerStyle={S.content}>
            <UserSection provider={provider} />
            <DetailsSection />
            <QRCodeImage />
            <ImagesList />
            <ProductsList />
          </ScrollView>
          <View style={S.permissionButton}>
            {estimate?.approveStatus ? (
              <Button
                onPress={handlePressApprove}
                text={approval}
                disabled={true}
                buttonStyle={S.disabledBtn}
              />
            ) : (
              <>
                <Button
                  onPress={handlePressApprove}
                  text={t(translations.estimates.approve)}
                  disabled={estimate?.approveStatus ? true : false}
                  buttonStyle={[S.approveBtn, estimate?.approveStatus && S.disabledBtn]}
                />
                <Button
                  onPress={handlePressReject}
                  text={t(translations.estimates.reject)}
                  disabled={estimate?.approveStatus ? true : false}
                  buttonStyle={[S.rejectBtn, estimate?.approveStatus && S.disabledBtn]}
                />
              </>
            )}
          </View>
        </>
      )}
    </SafeContainer>
  );
};

export { EstimateDetails };
