import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment';
import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { AddButton } from 'shared/button/add';
import { DateRangeSlider } from 'shared/dateRangeSlider';
import { Heading } from 'shared/heading';
import { Icon } from 'shared/icon';
import { MainPageTemplate } from 'shared/templates';
import {
  cashJournalsSelectors,
  getCashJournals,
  loadMoreCashJournals,
  selectEndDate,
  selectStartDate,
} from 'store/entities/cashJournals';

import {
  getEndOfWeek,
  getStartOfWeek,
  weeks,
} from 'utils/dates';

import { CashJournalsList } from '../components/cashJournalsList';

type Props = StackScreenProps<RootStackParamList, 'MoreStack'>;

const CashJournals: React.FC<Props> = ({ navigation, route }) => {
  const [startDate, setStartDate] = useState(getStartOfWeek);
  const [endDate, setEndDate] = useState(getEndOfWeek);  

  const cashJournals = useSelector(cashJournalsSelectors.cashJournals);
  const selectedStartDate = useSelector(cashJournalsSelectors.selectedStartDate);
  const selectedEndDate = useSelector(cashJournalsSelectors.selectedEndDate);
  const offset = useSelector(cashJournalsSelectors.offset);
  const total = useSelector(cashJournalsSelectors.total);
  const loading = useSelector(cashJournalsSelectors.loading);
  const loadingMore = useSelector(cashJournalsSelectors.loadingMore);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigateToReviews = useCallback(
    () => Navigator.navigate('CashJournalsReview'),
    [],
  );
  
  const navigateToSearch = useCallback(
    () => Navigator.navigate('SearchCashJournals'),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
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
      headerLeft: () => (
        <Heading
          title={t(translations.cashJournals.back)}
          back={route?.params?.showBackButton}
        />
      ),
    });
  }, [navigation, navigateToSearch, navigateToReviews, t, route]);

  const navigateToAddEdit = () => Navigator.navigate('AddEditCashJournal');

  const fetchCashJournals = useCallback(() => {
    dispatch(
      getCashJournals({
        offset: 0,
        fromDate: moment(startDate).format(''),
        toDate: moment(endDate).format(''),
      }),
    );
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    dispatch(selectStartDate(startDate))
    dispatch(selectEndDate(endDate))
  }, [fetchCashJournals, startDate, endDate]);

  useEffect(() => {    
    fetchCashJournals();
  }, [fetchCashJournals, startDate, endDate]);

  const loadMore = () => {
    if (cashJournals.length < total) {
      dispatch(
        loadMoreCashJournals({
          offset: offset + LIMIT,
          fromDate: moment(selectedStartDate).format(''),
          toDate: moment(selectedEndDate).format(''),
        }),
      );
    }
  };

  const nextWeek = () => {
    dispatch(selectStartDate(weeks.increment(startDate)))
    dispatch(selectEndDate(weeks.increment(endDate)))
    setStartDate(weeks.increment(startDate));
    setEndDate(weeks.increment(endDate));
  };

  const previousWeek = () => {
    dispatch(selectStartDate(weeks.decrement(startDate)))
    dispatch(selectEndDate(weeks.decrement(endDate)))
    setStartDate(weeks.decrement(startDate));
    setEndDate(weeks.decrement(endDate));
  };

  return (
    <MainPageTemplate>
      <DateRangeSlider
        fromDate={startDate}
        toDate={endDate}
        nextRange={nextWeek}
        previousRange={previousWeek}
      />
      <AddButton
        title={t(translations.cashJournals.add)}
        onPress={navigateToAddEdit}
      />
      <CashJournalsList
        loading={loading}
        loadingMore={loadingMore}
        cashJournals={cashJournals}
        onRefresh={fetchCashJournals} 
        onEndReached={loadMore}
      />
    </MainPageTemplate>
  );
};

export { CashJournals };
