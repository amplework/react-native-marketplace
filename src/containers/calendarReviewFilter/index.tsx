import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FilterAppointments } from 'components/providerCalendar/filterAppointments';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { DateRangeSlider } from 'shared/dateRangeSlider';
import { MainPageTemplate } from 'shared/templates';
import {
  appointmentsSelector,
  getAppointments,
} from 'store/entities/appointments';
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

const CalendarReviewFilter: React.FC<Props> = ({ navigation, route }) => {
  const [startDate, setStartDate] = useState(parseDate);
  const [endDate, setEndDate] = useState(parseDate);
  const [onEnd, setOnEnd] = useState(true);

  const filter = route?.params?.filter || 'week';
  const count = route?.params?.count;
  const appointments = useSelector(appointmentsSelector.appointments);
  const meta = useSelector(appointmentsSelector.meta);
  const loading = useSelector(appointmentsSelector.loading);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={'My Calendar'} />,
    });
  }, [navigation]);

  const getWeek = () => {
    const startWeek = getStartOfWeek(startDate);
    const endWeek = getEndOfWeek(startDate);

    setStartDate(startWeek);
    setEndDate(endWeek);
  };

  const getMonth = () => {
    const startMonth = getStartOfMonth(startDate);
    const endMonth = getEndOfMonth(startDate);

    setStartDate(startMonth);
    setEndDate(endMonth);
  };

  const getWeekPlus = () => {
    const firstDay = weeks.increment(startDate);
    const lastDay = weeks.increment(endDate);

    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const getMonthPlus = () => {
    const firstDay = months.increment(startDate);
    const lastDay = months.increment(endDate);

    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const getWeekMinus = () => {
    const firstDay = weeks.decrement(startDate);
    const lastDay = weeks.decrement(endDate);

    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const getMonthMinus = () => {
    const firstDay = months.decrement(startDate);
    const lastDay = months.decrement(endDate);

    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  useEffect(() => {
    filter === 'week' ? getWeek() : getMonth();
  }, []);

  useEffect(() => {
    moment(startDate).format('') !== moment(endDate).format('') &&
      dispatch(
        getAppointments({
          limit: 10,
          fromDate: formatApiDate(startDate),
          toDate: formatApiDate(endDate),
          offset: 0,
          status: 'scheduled',
        }),
      );
  }, [startDate, isFocused]);

  const fetchMoreAppointments = () => {
    dispatch(
      getAppointments({
        limit: 10,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
        offset: meta?.offset + 10,
        status: 'scheduled',
      }),
    );
  };  

  return (
    <MainPageTemplate loading={loading}>
      <DateRangeSlider
        fromDate={startDate}
        toDate={endDate}
        nextRange={filter === 'week' ? getWeekPlus : getMonthPlus}
        previousRange={filter === 'week' ? getWeekMinus : getMonthMinus}
      />
      <FilterAppointments
        startDate={startDate}
        endDate={endDate}
        filter={filter}
        meta={meta}
        onMinus={filter === 'week' ? getWeekMinus : getMonthMinus}
        onPlus={filter === 'week' ? getWeekPlus : getMonthPlus}
        appointments={appointments}
        onEnd={onEnd}
        onMore={fetchMoreAppointments}
        setEnd={(value: boolean) => setOnEnd(value)}
      />
    </MainPageTemplate>
  );
};

export default CalendarReviewFilter;