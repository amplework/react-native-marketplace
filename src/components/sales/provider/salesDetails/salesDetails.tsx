import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import ScrollContainer from 'shared/scrollContainer';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { EmptyState } from 'shared/emptyState';
import { Icon } from 'shared/icon';
import { PdfPreview } from 'shared/pdfPreview';
import { MainPageTemplate } from 'shared/templates';
import { getProviderProfile } from 'store/actions/provider';
import {
  deleteSale,
  getSaleDetails,
  salesSelectors,
  shareSaleProvider,
} from 'store/entities/sales';
import { IProviderUser } from 'types/users';
import COLORS from 'utils/colors';
import { formatFileDate } from 'utils/dates';

import { DetailsSection } from '../../components/detailsSection';
import { UserSection } from '../../components/userSection';
import { QRCodeImage } from 'components/sales/components/qrCodeImage';
import { styles } from '../../style';
import { toast } from 'shared/toast';
import { paymentsSelectors, resendPaymentRequest } from 'store/entities/payments';
import { SendPaymentRequest } from 'store/entities/payments/types';

type State = {
  provider: { provider: IProviderUser };
};

type Props = StackScreenProps<RootStackParamList, 'SaleDetails'>;

const SaleDetails: React.FC<Props> = ({ navigation, route }) => {
  const [showPDF, setShowPDF] = useState(false);

  const sale: any = useSelector(salesSelectors.sale);
  const loading = useSelector(salesSelectors.loading);
  const resendRequestLoading = useSelector(paymentsSelectors.loading);
  const provider = useSelector((state: State) => state.provider.provider);
  const isPaymentRequestApplicable = (sale?.isPaymentReceived == false && sale?.paymentMethod?.shortName == 'Online');

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onDelete = useCallback(
    () => {
      if (sale?.payment == null) {
        alert.deletion({
          entity: t(translations.common.entities.sale),
          onDelete: () => dispatch(deleteSale(route?.params?.id)),
        })
      } else {
        toast.info('This sale can not be deleted as this is already assosiated with an existing payment');
        return;
      }
    },
    [dispatch, route?.params?.id, t, sale],
  );

  const handleSendPaymentRequest = () => {
    let payload: SendPaymentRequest = {
      id: sale?.id,
      type: 'sale',
      paymentMethod: 'online'
    }
    alert.confirmation({
      message: t(translations.sales.paymentRequest),
      onConfirm: () => dispatch(resendPaymentRequest(payload))
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () =>
      // sale && 
      (
        <Box row ai="center">
          {isPaymentRequestApplicable && (
            <Icon
              src={require('assets/global/mail.png')}
              size={20}
              mr={20}
              onPress={handleSendPaymentRequest}
            />
          )}
          <Icon
            src={require('assets/global/share.png')}
            size={20}
            mr={20}
            onPress={() => setShowPDF(true)}
          />
          <Icon
            src={require('assets/global/deleteGray.png')}
            size={20}
            mr={24}
            onPress={onDelete}
          />
        </Box>
      ),
      headerLeft: () => <BackButton />,
    });
  }, [navigation, onDelete]);

  useEffect(() => {
    dispatch(getSaleDetails(route.params?.id));
    dispatch(getProviderProfile());
  }, []);

  const editSaleDetails = () => {
    if (sale?.payment == null) {
      //@ts-ignore
      navigation.navigate('AddSale', {
        saleId: sale?.id,
      })
    } else {
      toast.info('This sale can not be edited as this is already assosiated with an existing payment');
      return;
    }
  }

  const handleShareSale = (email: string) => {
    dispatch(shareSaleProvider({ id: sale!.id, email }));
  }

  return (
    <MainPageTemplate loading={loading || resendRequestLoading} bc={COLORS.white}>
      {!sale ? (
        <EmptyState
          type="deleted"
          entities={t(translations.common.entities.sale)}
        />
      ) : (
        <>
          <ScrollContainer styleExtra={[styles.scrollContainer, styles.contentContainer]}>
            <UserSection />
            <DetailsSection />
            <QRCodeImage />
          </ScrollContainer>
          <View style={styles.bottomBlock}>
            <Button
              onPress={editSaleDetails}
              text={'Edit Sale Details'}
              image={require('assets/global/pencilFill.png')}
              buttonStyle={styles.btnAdd}
              textStyle={styles.textAdd}
            />
          </View>
          {provider && (
            <PdfPreview
              visible={showPDF}
              pdfUrl={sale.pdf || ''}
              title={t(translations.sales.receiptPreview)}
              onClose={() => setShowPDF(false)}
              shareable
              pdfName={t(translations.common.files.pdf.receipt, {
                number: sale.number,
                date: formatFileDate(sale.date),
                firstName: provider.firstName,
                lastName: provider.lastName,
              })}
              email={sale?.emailRecipient || sale?.clientSubprofile?.email}
              onEmail={handleShareSale}
            />
          )}
        </>
      )}
    </MainPageTemplate>
  );
};

export { SaleDetails };
