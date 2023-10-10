import { useFocusEffect } from '@react-navigation/core';
import { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import {
  ProgressTile,
  ProgressTileSubtitle,
  ProgressTileTitle,
} from 'shared/progress';
import { getPerformancePreview, homeSelectors } from 'store/entities/home';
import { formatApiDate } from 'utils/dates';

const WeeklyStatistics: React.FC = () => {
  const selectedDate = useSelector(homeSelectors.selectedDate);
  const performancePreview = useSelector(homeSelectors.performancePreview);
  const loading = useSelector(homeSelectors.performancePreviewLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      if (!selectedDate) {
        return;
      }

      dispatch(
        getPerformancePreview({
          date: formatApiDate(selectedDate),
          period: 'week',
        }),
      );
    }, [selectedDate, dispatch]),
  );

  const navigateToPerformanceReview = () =>
    Navigator.navigate('PerformanceReview');

  const thisWeek = moment(selectedDate).isBetween(
    moment().startOf('week'),
    moment().endOf('week'),
    'days',
    '[]',
  );

  const incomeProgress =
    (performancePreview.totalIncome / performancePreview.wantedToEarn) * 100;
    
  return (
    <ProgressTile
      progress={(isNaN(incomeProgress) || !isFinite(incomeProgress)) ? 0 : incomeProgress}
      onPress={navigateToPerformanceReview}
      loading={loading}
    >
      <ProgressTileTitle
        label={
          thisWeek
            ? t(translations.home.statistics.earned.thisWeek)
            : t(translations.home.statistics.earned.otherWeek)
        }
        value={`$${performancePreview.totalIncome}`}
      />
      <ProgressTileSubtitle
        label={t(translations.home.statistics.goal)}
        value={`$${performancePreview.wantedToEarn}`}
      />
    </ProgressTile>
  );
};

export { WeeklyStatistics };
