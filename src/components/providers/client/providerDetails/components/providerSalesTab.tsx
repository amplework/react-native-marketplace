import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { SalesItem } from 'components/sales/components/salesItem';
import { translations } from 'locales';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import {
  getSales,
  providersSelectors,
  refreshSales,
} from 'store/entities/providers';
import { Sale } from 'types/sales';
import COLORS from 'utils/colors';

import { styles } from '../style';

const ProviderSalesTab: React.FC = () => {
  const provider = useSelector(providersSelectors.provider)!;
  const sales = useSelector(providersSelectors.sales);
  const loading = useSelector(providersSelectors.salesLoading);
  const refreshing = useSelector(providersSelectors.salesRefreshing);
  const offset = useSelector(providersSelectors.salesOffset);
  const total = useSelector(providersSelectors.salesTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(refreshSales(provider.id));
    }, [dispatch, provider.id]),
  );

  const refresh = () => dispatch(refreshSales(provider.id));

  const loadMore = () => {
    if (sales.length < total) {
      dispatch(getSales({ id: provider.id, offset: offset + LIMIT }));
    }
  };

  const handlePress = (sale: Sale) => () =>
    Navigator.navigate('SaleDetails', { id: sale.id });

  return (
    <FlatList
      data={sales}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item: sale }) => (
        <SalesItem
          sale={sale}
          provider={provider}
          onPress={handlePress(sale)}
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
        <EmptyState entities={t(translations.common.entities.sales)} ph={24} />
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

export { ProviderSalesTab };
