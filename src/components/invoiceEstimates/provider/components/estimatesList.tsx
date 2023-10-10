import { LIMIT } from 'api';
import { translations } from 'locales';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { EstimatePlaceholder } from 'shared/icon/icons';
import COLORS from 'utils/colors';

import { EstimateItem } from 'components/invoiceEstimates/components/estimateItem';
import { styles } from '../style';
import { estimatesSelectors, getEstimates, loadMoreEstimates } from 'store/entities/estimates';
import { getQueryParams } from 'components/invoiceEstimates/helpers/utils';
import { Estimate } from 'types/estimates';

const EstimatesList: React.FC = () => {
  const tab = useSelector(estimatesSelectors.tab);
  const estimates = useSelector(estimatesSelectors.estimates);

  const loading = useSelector(estimatesSelectors.loading);
  const loadingMore = useSelector(estimatesSelectors.loadingMore);

  const offset = useSelector(estimatesSelectors.offset);
  const total = useSelector(estimatesSelectors.total);

  const listRef = useRef<FlatList | null>(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });

    dispatch(getEstimates(getQueryParams(tab)));
  }, [dispatch, tab]);

  const refresh = () => dispatch(getEstimates(getQueryParams(tab)));

  const loadMore = () => {
    if (estimates.length < total) {
      dispatch(
        loadMoreEstimates({ offset: offset + LIMIT, ...getQueryParams(tab) }),
      );
    }
  };

  const navigateToDetails =
    ({ id }: Estimate) =>
      () =>
        Navigator.navigate('EstimateDetails', { id });

  return (
    <FlatList
      ref={listRef}
      data={estimates}
      keyExtractor={(estimate) => `${estimate.id}`}
      renderItem={({ item }) => (
        <EstimateItem estimate={item} onPress={navigateToDetails(item)} />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() => (
        <EmptyState
          type="image"
          image={<EstimatePlaceholder />}
          header={t(translations.estimates.placeholder.header)}
          description={t(translations.estimates.placeholder.description)}
          ph={11}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={styles.loader}
        />
      )}
    />
  );
};

export { EstimatesList };
