import { StackScreenProps } from '@react-navigation/stack';
import { getQueryParams } from 'components/invoices/helpers/utils';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { EmptyState } from 'shared/emptyState';
import {
  getInvoice,
  getInvoices,
  invoicesSelectors,
} from 'store/entities/invoices';
import { providersSelectors } from 'store/entities/providers';
import { userSelectors } from 'store/entities/user';
import { Payment } from 'types/payments';
import { isClient } from 'types/users';

import { PaymentsItem } from '../../components/paymentsItem';
import { styles } from './style';

type Props = StackScreenProps<RootStackParamList>;

const PaymentsList: React.FC<Props> = ({ navigation }) => {
  const tab = useSelector(invoicesSelectors.tab);
  const user = useSelector(userSelectors.user)
  const provider = useSelector(providersSelectors.provider);

  const isUserClient = isClient(user);

  const invoice = useSelector(invoicesSelectors.invoice)!;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={I18n.t('invoices.paymentsList')} />,
    });
  }, [navigation]);

  const updateInvoices = () => {
    dispatch(getInvoice(invoice.id));

    if (!provider) {
      dispatch(getInvoices(getQueryParams(tab)));
    }
  };

  const navigateToPaymentDetails = (payment: Payment) => () => {
    isUserClient ? Navigator.navigate('PaymentDetails', { payment, provider }) : 
    Navigator.navigate('MoreStackNavigator', {
      screen: 'PaymentDetails',
      params: {
        id: payment.id,
        onDelete: updateInvoices,
        payment,
        provider,
      }
    })
  }
    

  const totalPayments = invoice.total - invoice.balance;

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <TwinCounter mv={24} mh={24}>
        <TwinCounterBar
          label={I18n.t('invoices.invoice')}
          adornment={<Sign>#</Sign>}
        >
          {invoice.number}
        </TwinCounterBar>
        <TwinCounterBar
          label={I18n.t('invoices.totalPayments')}
          adornment={<Sign>$</Sign>}
        >
          {totalPayments.toFixed(2)}
        </TwinCounterBar>
      </TwinCounter>
      <FlatList
        data={invoice.payments}
        keyExtractor={(payment) => payment.id.toString()}
        renderItem={({ item: payment }) => (
          <PaymentsItem
            payment={payment}
            invoice={invoice}
            onPress={navigateToPaymentDetails(payment)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={() => (
          <EmptyState entities={I18n.t('common.entities.invoicePayments')} />
        )}
      />
    </SafeContainer>
  );
};

export { PaymentsList };
