import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FilterSales from 'components/providerSales/filterSales';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import { getSales, salesSelectors } from 'store/entities/sales';
import {
  formatApiDate,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  months,
  weeks,
} from 'utils/dates';


export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const SalesReviewFilter: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollRef = useRef<FlatList<any>>();
  const sales = useSelector(salesSelectors.sales);
  const loading = useSelector(salesSelectors.loading);
  const meta = useSelector(salesSelectors.meta);
  const totalSum = useSelector(salesSelectors.totalSum);
  const [onEnd, setOnEnd] = useState(true);
  const filter = route?.params?.filter || 'week';
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={'My Sales'} />,
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
    sales?.length &&
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    // new Date(startDate).getDate() !== new Date(endDate).getDate() &&
      dispatch(
        getSales({
          limit: 10,
          fromDate: formatApiDate(startDate),
          toDate: formatApiDate(endDate),
          offset: 0,
        }),
      );
  }, [startDate, isFocused]);

  const fetchMoreSales = () => {
    dispatch(
      getSales({
        limit: 10,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
        offset: meta?.offset + 10,
      }),
    );
  };

  return (
    <MainPageTemplate loading={loading}>
      <FilterSales
        scrollRef={scrollRef}
        startDate={startDate}
        endDate={endDate}
        meta={meta}
        totalSum={totalSum}
        onMinus={filter === 'week' ? getWeekMinus : getMonthMinus}
        onPlus={filter === 'week' ? getWeekPlus : getMonthPlus}
        sales={sales}
        onEnd={onEnd}
        onMore={fetchMoreSales}
        setEnd={(value: boolean) => setOnEnd(value)}
        range={filter}
      />
    </MainPageTemplate>
  );
};

export default SalesReviewFilter;
