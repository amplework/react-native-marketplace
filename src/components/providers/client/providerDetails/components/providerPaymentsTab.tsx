import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { PaymentsItem } from 'components/providers/client/providerDetails/components/paymentsItem';
import { translations } from 'locales';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import {
  getPayments,
  providersSelectors,
  refreshPayments,
} from 'store/entities/providers';
import { PaymentPreview } from 'types/payments';
import COLORS from 'utils/colors';

import { styles } from '../style';

const ProviderPaymentsTab: React.FC = () => {
  const provider = useSelector(providersSelectors.provider)!;
  const payments = useSelector(providersSelectors.payments);

  const loading = useSelector(providersSelectors.paymentsLoading);
  const refreshing = useSelector(providersSelectors.paymentsRefreshing);

  const offset = useSelector(providersSelectors.paymentsOffset);
  const total = useSelector(providersSelectors.paymentsTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(refreshPayments(provider.id));
    }, [dispatch, provider.id]),
  );

  const refresh = () => dispatch(refreshPayments(provider.id));

  const loadMore = () => {
    if (payments.length < total) {
      dispatch(getPayments({ id: provider.id, offset: offset + LIMIT }));
    }
  };

  const handlePress = (payment: PaymentPreview) => () =>
    Navigator.navigate('PaymentDetails', { payment, provider });

  return (
    <FlatList
      data={payments}
      keyExtractor={(payment) => `${payment.id}`}
      renderItem={({ item: payment }) => (
        <PaymentsItem
          payment={payment}
          provider={provider}
          onPress={handlePress(payment)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.payments)}
          ph={24}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loading ? COLORS.clearBlue : COLORS.transparent}
          style={styles.loader}
        />
      )}
    />
  );
};

export { ProviderPaymentsTab };
