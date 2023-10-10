
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { ExpensesPlaceholder } from 'shared/icon/icons';
import { ExpenseData } from 'types/expenses';
import COLORS from 'utils/colors';
import { SmallDateRange } from 'utils/dates';

import { expensesStyles as S } from '../style';
import { ExpensesItem } from './expensesItem';
import { StatisticSection } from './statisticSection';

type Props = {
  range: SmallDateRange;
  isStatisticShow?: boolean;
  expensesList: any;
  onRefresh: () => void;
  onEndReached: () => void;
  loading: boolean;
  loadingMore: boolean;
};

const ExpensesList: React.FC<Props> = ({ 
  range, 
  isStatisticShow,
  onRefresh,
  onEndReached, 
  expensesList,
  loading,
  loadingMore,
}) => {

  const { t } = useTranslation();

  const navigateToExpenses = () => Navigator.navigate('Expenses');

  const navigateToDetails = (expense: ExpenseData) => () =>
    Navigator.navigate('ExpenseDetails', {
      id: expense.id,
      onEdit: navigateToExpenses,
    });

  return (
    <FlatList
      data={expensesList}
      keyExtractor={(expense) => `${expense.id}`}
      renderItem={({ item: expense }) => (
        <ExpensesItem data={expense} onPress={navigateToDetails} />
      )}
      contentContainerStyle={S.containerListStyle}
      ListEmptyComponent={() =>
        isStatisticShow ? (
          <EmptyState
            entities={t(translations.common.entities.expenses)}
            type={range}
          />
        ) : (
          <EmptyState
            type="image"
            image={<ExpensesPlaceholder />}
            header={t(translations.expenses.placeholder.header)}
            description={t(translations.expenses.placeholder.description)}
            ph={11}
          />
        )
      }
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      ListHeaderComponent={isStatisticShow ? StatisticSection : null}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={S.loader}
        />
      )}
    />
  );
};

export { ExpensesList };
