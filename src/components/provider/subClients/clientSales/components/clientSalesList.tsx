import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { SalesItem } from 'components/sales/components/salesItem';
import { translations } from 'locales';
import React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { getSales, salesSelectors } from 'store/entities/sales';
import { theme } from 'theme';
import { Sale } from 'types/sales';
import { ISubClient } from 'types/subClients';

type Props = {
  client?: ISubClient;
};

const ClientSalesList: React.FC<Props> = ({ client }) => {
  const sales = useSelector(salesSelectors.sales);

  const meta = useSelector(salesSelectors.meta);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getSales({
          limit: LIMIT,
          offset: 0,
          clientSubprofileId: client?.id,
        }),
      );
    }, [dispatch, client?.id]),
  );

  const loadMore = () => {
    if (sales.length < meta.totalCount) {
      dispatch(
        getSales({
          offset: meta.offset + LIMIT,
          limit: LIMIT,
          clientSubprofileId: client?.id,
        }),
      );
    }
  };

  const navigateToDetails =
    ({ id }: Sale) =>
    () =>
      Navigator.navigate('SaleDetails', { id });

  return (
    <FlatList
      data={sales}
      keyExtractor={(sale) => `${sale.id}`}
      renderItem={({ item: sale }) => (
        <SalesItem sale={sale} onPress={navigateToDetails(sale)} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      contentContainerStyle={[theme.styles.grow, theme.spacing.ph(24)]}
      ListEmptyComponent={() => (
        <EmptyState entities={t(translations.common.entities.sales)} ph={24} />
      )}
    />
  );
};

export { ClientSalesList };
