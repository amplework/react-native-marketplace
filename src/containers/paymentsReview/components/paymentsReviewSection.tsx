import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { TouchableRow } from 'shared/review';
import { Separator } from 'shared/separator';
import { paymentsSelectors } from 'store/entities/payments';
import { theme } from 'theme';
import { LargeDateRange } from 'utils/dates';

import { paymentsReviewStyles as S } from '../style';

const PaymentsReviewSections: React.FC = () => {
  const review = useSelector(paymentsSelectors.review);

  const { t } = useTranslation();

  const navigateToReviewFilter = (range: LargeDateRange) => () =>
    Navigator.navigate('PaymentsReviewFilter', { range });

  return (
    <View style={[theme.styles.grow, theme.spacing.ph(24)]}>
      <View style={S.section}>
        <TouchableRow
          label={t(translations.paymentsReview.numberOfMonth)}
          onPress={navigateToReviewFilter('month')}
        >
          {review.payments.currentMonthCount}
        </TouchableRow>
        <Separator />
        <TouchableRow
          label={t(translations.paymentsReview.numberOfWeek)}
          onPress={navigateToReviewFilter('week')}
        >
          {review.payments.currentWeekCount}
        </TouchableRow>
        <Separator />
        <TouchableRow
          label={t(translations.paymentsReview.totalWeek)}
          onPress={navigateToReviewFilter('week')}
        >
          ${review.payments.currentWeekTotal}
        </TouchableRow>
      </View>
    </View>
  );
};

export { PaymentsReviewSections };
