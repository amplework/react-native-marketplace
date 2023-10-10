import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import I18n, { translations } from 'locales';
import { useTranslation } from 'react-i18next';
import { EmptyState } from 'shared/emptyState';
import { styles } from '../style';
import {
  getSalesSpecialsByProvider,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  providersSelectors,
} from 'store/entities/providers';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { DealsItem } from './dealsItem';

const DealsTab: React.FC = () => {
  const provider = useSelector(providersSelectors.provider)!;
  const loading = useSelector(salesSpecialSelectors.salesSpecialsLoading);
  const salesSpecialsByProvider = useSelector(salesSpecialSelectors.salesSpecialsByProvider);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(getSalesSpecialsByProvider({ id: provider.id }));
    }, [dispatch, provider.id]),
  );

  const refresh = () => dispatch(getSalesSpecialsByProvider({ id: provider.id }));

  const handlePress = (deals: any) => () =>
    Navigator.navigate('SalesSpecialDetails', { id: deals.id });

  return (
    <FlatList
      data={salesSpecialsByProvider}
      keyExtractor={(item) => `${item?.id}`}
      renderItem={({ item: deals }) => (
        <DealsItem
          deals={deals}
          onPress={handlePress(deals)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.deals)}
          ph={24}
        />
      )}
    />
  );
}

export { DealsTab };
