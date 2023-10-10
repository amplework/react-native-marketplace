import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FilterPayments from 'components/providerPayments/filterPayments';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import { getPayments, paymentsSelectors } from 'store/entities/payments';
import {
  formatApiDate,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  months,
  parseDate,
  weeks,
} from 'utils/dates';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const PaymentsReviewFilter: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollRef = useRef<FlatList<any>>();
  const payments = useSelector(paymentsSelectors.payments);
  const loading = useSelector(paymentsSelectors.loading);
  const meta = useSelector(paymentsSelectors.meta);
  const totalSum = useSelector(paymentsSelectors.totalSum);
  const [onEnd, setOnEnd] = useState(true);
  const filter = route?.params?.range || 'week';
  const [startDate, setStartDate] = useState(parseDate);
  const [endDate, setEndDate] = useState(parseDate);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={'My Payments'} />,
    });
  }, [navigation]);  

  const getWeek = () => {
    setStartDate(getStartOfWeek);
    setEndDate(getEndOfWeek);
  };
  const getMonth = () => {
    setStartDate(getStartOfMonth);
    setEndDate(getEndOfMonth);
  };
  const getWeekPlus = () => {
    setStartDate(weeks.increment(startDate));
    setEndDate(weeks.increment(endDate));
  };
  const getMonthPlus = () => {
    setStartDate(months.increment(startDate));
    setEndDate(months.increment(endDate));
  };
  const getWeekMinus = () => {
    setStartDate(weeks.decrement(startDate));
    setEndDate(weeks.decrement(endDate));
  };
  const getMonthMinus = () => {
    setStartDate(months.decrement(startDate));
    setEndDate(months.decrement(endDate));
  };
  useEffect(() => {
    filter === 'week' ? getWeek() : getMonth();
  }, []);
  useEffect(() => {
    payments?.length &&
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });      
    // new Date(startDate).getDate() !== new Date(endDate).getDate() &&
      dispatch(
        getPayments({
          limit: 30,
          fromDate: formatApiDate(startDate),
          toDate: formatApiDate(endDate),
          offset: 0,
        }),
      );
  }, [startDate, isFocused]);
  const fetchMorePayments = () => {
    dispatch(
      getPayments({
        limit: 10,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
        offset: meta?.offset + 10,
      }),
    );
  };
  return (
    <MainPageTemplate loading={loading}>
      <FilterPayments
        scrollRef={scrollRef}
        startDate={startDate}
        endDate={endDate}
        meta={meta}
        totalSum={totalSum || 0}
        onMinus={filter === 'week' ? getWeekMinus : getMonthMinus}
        onPlus={filter === 'week' ? getWeekPlus : getMonthPlus}
        payments={payments}
        onEnd={onEnd}
        onMore={fetchMorePayments}
        setEnd={(value: boolean) => setOnEnd(value)}
        range={filter}
      />
    </MainPageTemplate>
  );
};

export default PaymentsReviewFilter;
