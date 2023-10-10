import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { EstimateItem } from 'components/invoiceEstimates/components/estimateItem';
import { translations } from 'locales';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import {
  providersSelectors,
  refreshEstimates,
  getEstimates
} from 'store/entities/providers';
import COLORS from 'utils/colors';

import { styles } from '../style';
import { Estimate } from 'types/estimates';

const ProviderEstimatesTab: React.FC = () => {
  const provider = useSelector(providersSelectors.provider)!;
  const estimates = useSelector(providersSelectors.estimates);
  const loading = useSelector(providersSelectors.estimatesLoading);
  const refreshing = useSelector(providersSelectors.estimatesRefreshing);
  const offset = useSelector(providersSelectors.estimatesOffset);
  const total = useSelector(providersSelectors.estimatesTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(refreshEstimates(provider.id));
    }, [dispatch, provider.id]),
  );

  const refresh = () => dispatch(refreshEstimates(provider.id));

  const loadMore = () => {
    if (estimates.length < total) {
      dispatch(getEstimates({ id: provider.id, offset: offset + LIMIT }));
    }
  };

  const handlePress = (estimate: Estimate) => () =>
    Navigator.navigate('EstimateDetails', { id: estimate.id });

  return (
    <FlatList
      data={estimates}
      // keyExtractor={(item) => `${item.id}`}
      renderItem={({ item: estimate }) => (
        <EstimateItem
          //@ts-ignore
          estimate={estimate}
          provider={provider}
          onPress={handlePress(estimate)}
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
          entities={t(translations.common.entities.estimates)}
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

export { ProviderEstimatesTab };
