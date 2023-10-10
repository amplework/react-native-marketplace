import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { DateRangeSlider } from 'shared/dateRangeSlider';
import { MainPageTemplate } from 'shared/templates';
import { cashJournalsSelectors } from 'store/entities/cashJournals';
import {
  formatApiDate,
  getEndOfMonth,
  getEndOfWeek,
  getEndOfYear,
  getStartOfMonth,
  getStartOfWeek,
  getStartOfYear,
  months,
  weeks,
  years,
} from 'utils/dates';
import { formatNumber } from 'utils/numbers';

import { CashJournalsReviewDetailsList } from './components/cashJournalReviewDetailsList';

const reviewRanges = {
  week: {
    start: getStartOfWeek(),
    end: getEndOfWeek(),
    increment: weeks.increment,
    decrement: weeks.decrement,
  },
  month: {
    start: getStartOfMonth(),
    end: getEndOfMonth(),
    increment: months.increment,
    decrement: months.decrement,
  },
  year: {
    start: getStartOfYear(),
    end: getEndOfYear(),
    increment: years.increment,
    decrement: years.decrement,
  },
};

type Props = StackScreenProps<RootStackParamList, 'CashJournalsReviewDetails'>;

const CashJournalsReviewDetails: React.FC<Props> = ({ navigation, route }) => {
  const { range } = route.params;
  const daterange = reviewRanges[range];

  const [fromDate, setFromDate] = useState(daterange.start);
  const [toDate, setToDate] = useState(daterange.end);

  const cashJournals = useSelector(cashJournalsSelectors.reviewCashJournals);
  const total = useSelector(cashJournalsSelectors.reviewTotal);
  const totalSum = useSelector(cashJournalsSelectors.reviewTotalSum);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.cashJournals.back)} />
      ),
    });
  }, [navigation, t]);

  const nextRange = () => {
    setFromDate(daterange.increment(fromDate));
    setToDate(daterange.increment(toDate));
  };

  const previousRange = () => {
    setFromDate(daterange.decrement(fromDate));
    setToDate(daterange.decrement(toDate));
  };

  return (
    <MainPageTemplate>
      <DateRangeSlider
        fromDate={fromDate}
        toDate={toDate}
        nextRange={nextRange}
        previousRange={previousRange}
      />
      <TwinCounter mv={20} mh={24}>
        <TwinCounterBar
          label={t(translations.cashJournals.review.totalCash)}
          adornment={<Sign>$</Sign>}
        >
          {formatNumber(totalSum, 2)}
        </TwinCounterBar>
        <TwinCounterBar label={t(translations.cashJournals.review.number)}>
          {cashJournals.length ? total : 0}
        </TwinCounterBar>
      </TwinCounter>
      <CashJournalsReviewDetailsList
        fromDate={formatApiDate(fromDate)}
        toDate={formatApiDate(toDate)}
        range={range}
      />
    </MainPageTemplate>
  );
};

export { CashJournalsReviewDetails };
