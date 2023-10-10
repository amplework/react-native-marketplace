import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { AddButton } from 'shared/button/add';
import { DateRangeSlider } from 'shared/dateRangeSlider';
import { Icon } from 'shared/icon';
import { MainPageTemplate } from 'shared/templates';
import {
  expensesSelectors,
  getExpenses,
  loadMoreExpenses,
} from 'store/entities/expenses';

import {
  nextMonth,
  previousMonth,
  resetQueryParameters,
} from 'store/entities/expenses';

import {
  getEndOfWeek,
  getStartOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  weeks,
  months
} from 'utils/dates';

import { ExpensesList } from './components/expensesList';
import moment from 'moment';
import { LIMIT } from 'api';

type Props = StackScreenProps<RootStackParamList, 'Expenses'>;

const Expenses: React.FC<Props> = ({ navigation, route }) => {
  const { params } = route;

  const [startDate, setStartDate] = useState(getStartOfWeek);
  const [endDate, setEndDate] = useState(getEndOfWeek);


  

  const [startDateMonth, setStartDateMonth] = useState(getStartOfMonth);
  const [endDateMonth, setEndDateMonth] = useState(getEndOfMonth);


  const expenses = useSelector(expensesSelectors.expenses);
  const loading = useSelector(expensesSelectors.loading);
  const loadingMore = useSelector(expensesSelectors.loadingMore);
  const total = useSelector(expensesSelectors.total);
  const offset = useSelector(expensesSelectors.offset);

  const dispatch = useDispatch();

  const navigateToReviews = useCallback(
    () => Navigator.navigate('ExpensesReview'),
    [],
  );

  const navigateToSearch = useCallback(
    () => Navigator.navigate('SearchExpenses'),
    [],
  );

  const navigateToAddEdit = () => Navigator.navigate('AddEditExpense');

  const onBackPress = useCallback(() => {
    dispatch(resetQueryParameters());
    navigation.goBack();
  }, [dispatch, navigation]);

  const nextRange = () => {
    if (params?.isMonthReview) {
      dispatch(nextMonth());
    } else {
      dispatch(nextWeek());
    }
  };

  const previousRange = () => {
    if (params?.isMonthReview) {
      dispatch(previousMonth());
    } else {
      dispatch(previousWeek());
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () =>
        !params?.isMonthReview &&
        !params?.isWeekReview && (
          <Box row ai="center">
            <Icon
              src={require('assets/global/performance.png')}
              size={20}
              mr={20}
              onPress={navigateToReviews}
            />
            <Icon
              src={require('assets/global/searcn.png')}
              size={20}
              mr={24}
              onPress={navigateToSearch}
            />
          </Box>
        ),
      headerLeft: () => <BackButton title="Expenses" onPress={onBackPress} />,
    });
  }, [navigation, navigateToSearch, navigateToReviews, onBackPress, params]);

  useEffect(() => {    
    if(params && params?.isMonthReview) {
      getExpensesData(getStartOfMonth(startDateMonth),getEndOfMonth(endDateMonth));
    } else if(params && params?.isWeekReview) {
      getExpensesData(getStartOfWeek(startDate),getEndOfWeek(endDate));
    } else {
      getExpensesData(getStartOfWeek(startDate),getEndOfWeek(endDate));
    }
  }, [params,startDate,endDate,startDateMonth,endDateMonth,dispatch])


  const getExpensesData = (sDate:any,eDate:any) => {
    dispatch(
      getExpenses({
        fromDate: moment(sDate).format(''),
        toDate: moment(eDate).format(''),
        offset: 0
      }),
      )
  }

  const refresh = () => {
    dispatch(
      getExpenses({
        fromDate: moment(params === undefined ? startDate : params && params?.isMonthReview ? startDateMonth : startDate).format(''),
        toDate: moment(params === undefined ? endDate : params && params?.isMonthReview ? endDateMonth : endDate).format(''),
        offset: 0
      }),
    );
  };

  const loadMore = () => {
    if (expenses.length < total) {
      dispatch(
        loadMoreExpenses({
          fromDate: moment(params === undefined ? startDate : params && params?.isMonthReview ? startDateMonth : startDate).format(''),
          toDate: moment(params === undefined ? endDate : params && params?.isMonthReview ? endDateMonth : endDate).format(''),
        offset: offset + LIMIT
      }),
      )
    }
  };

  const nextWeek = () => {
    setStartDate(weeks.increment(startDate));
    setEndDate(weeks.increment(endDate));
  };

  const nextMonth = () => {
    setStartDateMonth(months.increment(startDateMonth));
    setEndDateMonth(months.increment(endDateMonth));
  };

  const previousWeek = () => {
    setStartDate(weeks.decrement(startDate));
    setEndDate(weeks.decrement(endDate));
  };

  const previousMonth = () => {
    setStartDateMonth(months.decrement(startDateMonth));
    setEndDateMonth(months.decrement(endDateMonth));
  };  
  
  return (
    <MainPageTemplate>
      <DateRangeSlider
        fromDate={params === undefined ? startDate : params?.isMonthReview ? startDateMonth : startDate}
        toDate={params === undefined ? endDate : params?.isWeekReview ? endDate : endDateMonth}
        nextRange={ params === undefined ? nextWeek : params?.isMonthReview ? nextMonth : nextWeek }
        previousRange={ params === undefined ? previousWeek : params?.isMonthReview ? previousMonth : previousWeek }
      />
      {!params?.isMonthReview && !params?.isWeekReview ? (
        <AddButton title={I18n.t('expenses.add')} onPress={navigateToAddEdit} />
      ) : null}
      <ExpensesList
        expensesList={expenses}
        loading={loading}
        onRefresh={refresh}
        onEndReached={loadMore}
        loadingMore={loadingMore}
        range={params?.isMonthReview ? 'month' : 'week'}
        isStatisticShow={params?.isMonthReview || params?.isWeekReview}
      />
    </MainPageTemplate>
  );
};

export { Expenses };
