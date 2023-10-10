import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { TouchableRow } from 'shared/review';
import { Separator } from 'shared/separator';
import { cashJournalsSelectors } from 'store/entities/cashJournals';
import { LargeDateRange } from 'utils/dates';

import { cashJournalsReviewStyles as S } from '../style';

const CashJournalsDetailsSections: React.FC = () => {
  const review = useSelector(cashJournalsSelectors.review);

  const { t } = useTranslation();

  const navigateToReviewDetails = (range: LargeDateRange) => () =>
    Navigator.navigate('CashJournalsReviewDetails', { range });

  return (
    <View style={S.section}>
      <TouchableRow
        label={t(translations.cashJournals.review.total.week)}
        onPress={navigateToReviewDetails('week')}
      >
        ${review.cashJournals.currentWeekTotal}
      </TouchableRow>
      <Separator />
      <TouchableRow
        label={t(translations.cashJournals.review.total.month)}
        onPress={navigateToReviewDetails('month')}
      >
        ${review.cashJournals.currentMonthTotal}
      </TouchableRow>
      <Separator />
      <TouchableRow
        label={t(translations.cashJournals.review.total.year)}
        onPress={navigateToReviewDetails('year')}
      >
        ${review.cashJournals.currentYearTotal}
      </TouchableRow>
    </View>
  );
};

export { CashJournalsDetailsSections };
