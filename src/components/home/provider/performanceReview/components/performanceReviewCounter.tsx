import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { homeSelectors } from 'store/entities/home';

const PerformanceReviewCounter: React.FC = () => {
  const review = useSelector(homeSelectors.performanceReview);

  const { t } = useTranslation();

  return (
    <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
      <TwinCounter mt={-32}>
        <TwinCounterBar
          label={t(translations.home.review.details.netIncome)}
          adornment={<Sign>$</Sign>}
        >
          {review.netIncome}
        </TwinCounterBar>
        <TwinCounterBar
          label={t(translations.home.review.details.totalIncome)}
          adornment={<Sign>$</Sign>}
        >
          {review.totalIncome}
        </TwinCounterBar>
      </TwinCounter>
    </View>
  );
};

export { PerformanceReviewCounter };
