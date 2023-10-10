import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { InvoicesItem } from 'components/invoices/components/invoicesItem';
import { translations } from 'locales';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import {
  getInvoices,
  providersSelectors,
  refreshInvoices,
} from 'store/entities/providers';
import { Invoice } from 'types/invoices';
import COLORS from 'utils/colors';

import { styles } from '../style';

const ProviderInvoicesTab: React.FC = () => {
  const provider = useSelector(providersSelectors.provider)!;
  const invoices = useSelector(providersSelectors.invoices);
  const loading = useSelector(providersSelectors.invoicesLoading);
  const refreshing = useSelector(providersSelectors.invoicesRefreshing);
  const offset = useSelector(providersSelectors.invoicesOffset);
  const total = useSelector(providersSelectors.invoicesTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(refreshInvoices(provider.id));
    }, [dispatch, provider.id]),
  );

  const refresh = () => dispatch(refreshInvoices(provider.id));

  const loadMore = () => {
    if (invoices.length < total) {
      dispatch(getInvoices({ id: provider.id, offset: offset + LIMIT }));
    }
  };

  const handlePress = (invoice: Invoice) => () =>
    Navigator.navigate('InvoiceDetails', { id: invoice.id });

  return (
    <FlatList
      data={invoices}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item: invoice }) => (
        <InvoicesItem
          invoice={invoice}
          provider={provider}
          onPress={handlePress(invoice)}
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
          entities={t(translations.common.entities.invoices)}
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

export { ProviderInvoicesTab };
