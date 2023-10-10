import I18n from 'locales';
import React from 'react';
import { useSelector } from 'react-redux';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { expensesSelectors } from 'store/entities/expenses';
import { formatNumber } from 'utils/numbers';

const StatisticSection: React.FC = () => {
  const total = useSelector(expensesSelectors.total);
  const totalSum = useSelector(expensesSelectors.totalSum);

  return (
    <TwinCounter mv={20}>
      <TwinCounterBar
        label={I18n.t('expenses.totalExpenseValue')}
        adornment={<Sign>$</Sign>}
      >
        {formatNumber(totalSum, 2)}
      </TwinCounterBar>
      <TwinCounterBar label={I18n.t('expenses.noOfExpenses')}>
        {total}
      </TwinCounterBar>
    </TwinCounter>
  );
};

export { StatisticSection };
