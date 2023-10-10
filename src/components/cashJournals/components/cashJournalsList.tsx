import { LIMIT } from 'api';
import { translations } from 'locales';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { CashJournalsPlaceholder } from 'shared/icon/icons';
import {
  cashJournalsSelectors,
  getCashJournals,
  loadMoreCashJournals,
} from 'store/entities/cashJournals';
import { theme } from 'theme';
import { CashJournal } from 'types/cashJournals';
import COLORS from 'utils/colors';

import { CashJournalsItem } from './cashJournalsItem';

export type Props = {
  cashJournals: any;
  onEndReached: () => void;
  onRefresh: () => void;
  loading: boolean;
  loadingMore: boolean;
};

const CashJournalsList: React.FC<Props> = ({
  cashJournals,
  onEndReached,
  onRefresh,
  loading,
  loadingMore
}) => {

  const { t } = useTranslation();

  const navigateToCashJournal = (journal: CashJournal) => () =>
    Navigator.navigate('CashJournalDetails', { journal });

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
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      contentContainerStyle={theme.styles.grow}
      ListEmptyComponent={() => (
        <EmptyState
          type="image"
          image={<CashJournalsPlaceholder />}
          header={t(translations.cashJournals.placeholder.header)}
          description={t(translations.cashJournals.placeholder.description)}
          ph={35}
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

export { CashJournalsList };
