import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import {
  expensesSelectors,
  getExpensesReview,
  setRangeDates,
} from 'store/entities/expenses';
import COLORS from 'utils/colors';
import {
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
} from 'utils/dates';
import { formatNumber } from 'utils/numbers';

import { DetailsSection } from './components/detailsSection';
import { expensesReviewStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const ExpensesReview: React.FC<Props> = ({ navigation }) => {
  const loading = useSelector(expensesSelectors.reviewLoading);
  const review = useSelector(expensesSelectors.expensesReview);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: S.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {I18n.t('common.review')}
        </Paragraph>
      ),
      headerLeft: () => (
        <BackButton light onPress={() => navigation.navigate('Expenses', {})} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getExpensesReview());
  }, []);

  const navigateToExpensesThisWeek = () => {
    dispatch(
      setRangeDates({ fromDate: getStartOfWeek(), toDate: getEndOfWeek() }),
    );
    navigation.push('Expenses', { isWeekReview: true });
  };

  const navigateToExpensesThisMonth = () => {
    dispatch(
      setRangeDates({ fromDate: getStartOfMonth(), toDate: getEndOfMonth() }),
    );
    navigation.push('Expenses', { isMonthReview: true });
  };

  return (
    <MainPageTemplate loading={loading}>
      <View style={S.header}>
        <Image
          source={require('assets/backgrounds/reviewBackground.png')}
          style={S.headerImage}
        />
        <Paragraph size="l" type="bold" color={COLORS.white}>
          {I18n.t('expenses.detailsReview')}
        </Paragraph>
      </View>
      <View style={S.content}>
        <TwinCounter mt={-32}>
          <TwinCounterBar
            label={I18n.t('expenses.expensesThisYear')}
            adornment={<Sign>$</Sign>}
          >
            {formatNumber(review.currentYearTotal, 2)}
          </TwinCounterBar>
          <TwinCounterBar
            label={I18n.t('expenses.expensesThisMonth')}
            adornment={<Sign>$</Sign>}
          >
            {formatNumber(review.currentMonthTotal, 2)}
          </TwinCounterBar>
        </TwinCounter>
        <DetailsSection
          navigateToExpensesThisMonth={navigateToExpensesThisMonth}
          navigateToExpensesThisWeek={navigateToExpensesThisWeek}
        />
      </View>
      <Box row jc="center" ai="center" mb={50}>
        <Icon
          src={require('assets/global/logoInactive.png')}
          size={30}
          mr={8}
        />
        <Paragraph size="s" type="book" color={COLORS.warmGrey}>
          {I18n.t('common.workSmarter')}
        </Paragraph>
      </Box>
    </MainPageTemplate>
  );
};

export { ExpensesReview };
