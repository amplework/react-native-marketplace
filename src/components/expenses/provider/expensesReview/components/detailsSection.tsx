import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Description } from 'shared/description';
import { TouchableRow } from 'shared/review';
import { Separator } from 'shared/separator';
import { expensesSelectors } from 'store/entities/expenses';
import { currency } from 'utils/currency';

import { expensesReviewStyles as S } from '../style';

type Props = {
  navigateToExpensesThisWeek: () => void;
  navigateToExpensesThisMonth: () => void;
};

const DetailsSection: React.FC<Props> = ({
  navigateToExpensesThisWeek,
  navigateToExpensesThisMonth,
}) => {
  const review = useSelector(expensesSelectors.expensesReview);
  const { currentMonthCount, currentWeekCount, currentWeekTotal } = review;

  const { t } = useTranslation();

  return (
    <View style={S.section}>
      <TouchableRow
        label={t(translations.expenses.noOfExpensesThisWeek)}
        onPress={navigateToExpensesThisWeek}
      >
        {currentWeekCount}
      </TouchableRow>
      <Separator />
      <TouchableRow
        label={t(translations.expenses.noOfExpensesThisMonth)}
        onPress={navigateToExpensesThisMonth}
      >
        {currentMonthCount}
      </TouchableRow>
      <Separator />
      <Description
        label={t(translations.expenses.totalExpensesThisWeek)}
        size="s"
        split
        pv={12}
        pr={16}
      >
        {currency.format(currentWeekTotal)}
      </Description>
    </View>
  );
};

export { DetailsSection };
