import { LIMIT } from 'api';
import { CashJournalsItem } from 'components/cashJournals/components/cashJournalsItem';
import { translations } from 'locales';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import {
  cashJournalsSelectors,
  getCashJournalsReview,
  getReviewCashJournals,
  loadMoreReviewCashJournals,
} from 'store/entities/cashJournals';
import { theme } from 'theme';
import { CashJournal } from 'types/cashJournals';
import COLORS from 'utils/colors';
import { LargeDateRange } from 'utils/dates';

type Props = {
  fromDate: string;
  toDate: string;
  range: LargeDateRange;
};

const CashJournalsReviewDetailsList: React.FC<Props> = ({
  fromDate,
  toDate,
  range,
}) => {
  const cashJournals = useSelector(cashJournalsSelectors.reviewCashJournals);

  const loading = useSelector(cashJournalsSelectors.loading);
  const loadingMore = useSelector(cashJournalsSelectors.loadingMore);

  const offset = useSelector(cashJournalsSelectors.reviewOffset);
  const total = useSelector(cashJournalsSelectors.reviewTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchCashJournals = useCallback(() => {
    dispatch(getReviewCashJournals({ offset: 0, fromDate, toDate }));
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    fetchCashJournals();
  }, [fetchCashJournals]);

  const loadMore = () => {
    if (cashJournals.length < total) {
      dispatch(
        loadMoreReviewCashJournals({
          offset: offset + LIMIT,
          fromDate,
          toDate,
        }),
      );
    }
  };

  const updateReview = () => {
    fetchCashJournals();
    dispatch(getCashJournalsReview());
  };

  const navigateToCashJournal = (journal: CashJournal) => () =>
    Navigator.navigate('CashJournalDetails', {
      journal,
      onEdit: updateReview,
      onDelete: updateReview,
    });

  return (
    <FlatList
      data={cashJournals}
      keyExtractor={(journal) => `${journal.id}`}
      renderItem={({ item: journal }) => (
        <CashJournalsItem
          journal={journal}
          onPress={navigateToCashJournal(journal)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchCashJournals} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      contentContainerStyle={theme.styles.grow}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.cashJournals)}
          type={range}
          ph={24}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={theme.styles.listLoader}
        />
      )}
    />
  );
};

export { CashJournalsReviewDetailsList };
