import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import MyCalendar from 'components/providerCalendar/myCalendar';
import { RootStackParamList } from 'index';
import moment from 'moment-timezone';
import RNlocalize from 'react-native-localize';
import React, {
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CalendarContainer from 'shared/calendar';
import { MainPageTemplate } from 'shared/templates';
import {
  appointmentsSelector,
  getClientAppointments,
  getScheduledAppointments,
  clearAppointments,
} from 'store/entities/appointments';
import styles from '../style';
import COLORS from 'utils/colors';
import { Separator } from 'shared/separator';

type Props = StackScreenProps<RootStackParamList, 'Calendar'>;

const Calendar: React.FC<Props> = ({ navigation, route }) => {
  let timezone = RNlocalize.getTimeZone();
  let localDate = moment.tz(timezone).format('');
  const [selectedStartDay, setSelectedStartDay] = useState(route?.params?.date || localDate);
  const [selectedEndDay, setSelectedEndDay] = useState(
    moment.tz(timezone).endOf('day'),
  );

  const appointments = useSelector(appointmentsSelector.clientAppointments);
  const loading = useSelector(appointmentsSelector.loading);
  const scheduledAppointments = useSelector(appointmentsSelector.scheduledAppointments);
  const markedDates = scheduledAppointments.map((e: any) => (
    {
      ...e,
      dots: [{
        color: COLORS.clearBlue
      }]
    }
  ))

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <Text style={styles.titleLeftStyle}>My Calendar</Text>,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      setSelectedStartDay(route?.params?.date ? route?.params?.date : localDate);
    }, [route.params]),
  )

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getClientAppointments({
          limit: 50,
          order: 'ASC',
          fromDate: moment(selectedStartDay).format('YYYY-MM-DD'),
          // toDate: selectedEndDay.toISOString(),
          status: ['scheduled', 'pending'],
        }),
      );
    }, [selectedStartDay, selectedEndDay, dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getScheduledAppointments({
          limit: 30,
          order: 'ASC',
          fromDate: moment().format('YYYY-MM-DD'), //new Date(), 
          // isUpcoming: isToday(selectedDate),
          status: 'scheduled',
        }),
      );
    }, [dispatch, selectedStartDay]),
  );

  const onDateSelected = (date: moment.Moment | any) => {
    dispatch(clearAppointments());
    setSelectedStartDay(date);
  }

  const onResetCalendar = () => {
    setSelectedStartDay(localDate);
  };

  return (
    <MainPageTemplate loading={loading}>
      <CalendarContainer
        markedDated={markedDates}
        selectedDate={selectedStartDay}
        onPress={onDateSelected}
      />
      <Separator />
      <MyCalendar
        appointments={appointments}
        details
        listRef={null}
        detailedCounter
        onResetCalendar={onResetCalendar}
        date={selectedStartDay}
        showStatus
        onPress={() =>
          //@ts-ignore
          navigation.navigate('ChooseProvider', {
            selectedDayStart: selectedStartDay,
            selectedDayEnd: selectedEndDay,
          })
        }
      />
    </MainPageTemplate>
  );
};

export default Calendar;
