import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import MyCalendar from 'components/providerCalendar/myCalendar';
import { RootStackParamList } from 'index';
import moment from 'moment-timezone';
import Modal from 'react-native-modal';
import RNlocalize from 'react-native-localize';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { homeSelectors, selectHomeDate, setManagedSlots } from 'store/entities/home';
import {
  appointmentsSelector,
  getAppointments,
  getScheduledAppointments,
  getCalendarOverview,
  clearAppointments,
} from 'store/entities/appointments';
import { formatApiDate } from 'utils/dates';
import CalendarContainer from 'shared/calendar';
import { liteSchedule, busySchedule, normalSchedule } from 'utils/array';
import { getUserSubscriptionDetails } from 'store/entities/subscription';
import { Separator } from 'shared/separator';
import { SettingsProviderApi } from 'api/settings';
import { getSlots } from 'containers/pickTimeslot/helpers/utils';
import { toast } from 'shared/toast';
import { MainPageTemplate } from 'shared/templates';
import { Icon } from 'shared/icon';
import styles from '../style';
import COLORS from 'utils/colors';
import RnCalendar from '../rnCalendar';

type NavigationProps = StackScreenProps<RootStackParamList, 'Calendar'>;
interface Props {
  weekView?: boolean;
}

const Calendar: React.FC<NavigationProps | any> = ({ navigation, route }) => {

  const flatlistRef = useRef(null);

  let timezone = RNlocalize.getTimeZone();
  let localDate: any = moment.tz(timezone).format();

  const [selectedStartDay, setSelectedStartDay] = useState(route?.params?.date ? moment(route?.params?.date).format() : localDate);
  const [selectedEndDay, setSelectedEndDay] = useState(localDate);
  const [isExpanded, setIsExpanded] = useState(false);

  const appointments = useSelector(appointmentsSelector.appointments);
  const overview = useSelector(appointmentsSelector.overview);
  const managedSlots = useSelector(homeSelectors.managedSlots);
  const provider: any = useSelector((state: any) => state.provider.provider);
  const scheduledAppointments = useSelector(appointmentsSelector.scheduledAppointments);

  const loading = useSelector(appointmentsSelector.loading);

  const onResetCalendar = () => {
    dispatch(selectHomeDate(localDate));
    setSelectedStartDay(localDate);
  };

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <View style={styles.row}>
          {moment(selectedStartDay).format('DD-MM-YYYY') !== moment().format('DD-MM-YYYY') && <Icon
            src={require('assets/global/calendar.png')}
            size={22}
            mt={3}
            mr={17}
            onPress={onResetCalendar}
            color={COLORS.black}
          />}
          <Icon
            src={overview.pendingAppointmentsCount > 0 ? require('assets/global/user2.png') : require('assets/global/user-alpha.png')}
            size={24}
            mt={3}
            mr={17}
            // @ts-ignore
            onPress={() => navigation.navigate('AppointmentRequests')}
            color={overview.pendingAppointmentsCount > 0 ? COLORS.orange : COLORS.black80}
          />
          <Icon
            src={require('assets/global/performance.png')}
            // @ts-ignore
            onPress={() => navigation.navigate('CalendarReview')}
            size={20}
            mr={20}
          />
          <Icon
            src={require('assets/global/searcn.png')}
            // @ts-ignore
            onPress={() => navigation.navigate('CalendarSearch')}
            size={20}
            mr={24}
          />
        </View>
      ),
      headerLeft: () => <Text style={styles.titleLeftStyle}>My Calendar</Text>,
    });
  }, [navigation, overview]);

  const init = async () => {
    try {
      const { data } = await SettingsProviderApi.getCalendarSettings();
      const currentDate = moment(selectedStartDay).format('YYYY-MM-DD');
      const start = `${currentDate} ${'00:00:00'}`;

      const end = `${currentDate} ${'24:00:00'}`;
      const slots = getSlots({
        start,
        end,
        duration: 30,
        interval: data.timeBetweenAppointments,
      });

      dispatch(setManagedSlots(slots));
    } catch (error: any) {
      toast.info(error.message);
    }
  };

  useEffect(() => {
    dispatch(getUserSubscriptionDetails());
  }, []);

  useEffect(() => {
    if (route?.params?.date) {
      setSelectedStartDay(moment(route.params?.date).format());
    } else {
      setSelectedStartDay(localDate);
    }
  }, [route.params]);

  useFocusEffect(
    useCallback(() => {
      init()
      dispatch(
        getAppointments({
          limit: 50,
          order: 'ASC',
          fromDate: moment(selectedStartDay).format('YYYY-MM-DD'), //new Date(), 
          // isUpcoming: isToday(selectedDate),
          status: ['scheduled', 'blocked'],
        }),
      );
    }, [dispatch, selectedStartDay]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getScheduledAppointments({
          limit: 50,
          order: 'ASC',
          fromDate: moment().format('YYYY-MM-DD'), //new Date(), 
          // isUpcoming: isToday(selectedDate),
          status: 'scheduled',
        }),
      );
    }, [dispatch, selectedStartDay]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getCalendarOverview(formatApiDate(selectedStartDay)));
    }, [dispatch, selectedStartDay]),
  );

  const matchAppointmentsWithTimeSlots = () => {
    const matchedData: any[] = [];

    managedSlots.forEach((slot: any) => {
      const appointmentsInSlot = appointments.filter((appointment: any) => {
        const appointmentStart = new Date(appointment.startDate);
        // const appointmentEnd = new Date(appointment.endDate);
        const slotStart = new Date(slot.startTime);
        const slotEnd = new Date(slot.endTime);

        return (appointmentStart >= slotStart && appointmentStart < slotEnd);
      });

      matchedData.push({
        ...slot,
        data: appointmentsInSlot,
      });
    });

    return matchedData;
  };

  let filteredArray = scheduledAppointments;

  let scheduledArray = filteredArray.map((e: any) => (
    {
      ...e,
      dots: (e.precent < 30) ? liteSchedule : (e.precent < 70) ? normalSchedule : busySchedule
    }
  )
  )

  const onDateSelected = (date: moment.Moment | any) => {
    dispatch(clearAppointments());
    setSelectedStartDay(date);
  }

  return (
    <MainPageTemplate loading={loading}>
      <CalendarContainer
        selectedDate={selectedStartDay}
        onPress={onDateSelected}
        markedDated={scheduledArray}
      />
      <View style={styles.arrowKnob} >
        <Icon
          src={require('assets/global/glyphDown.png')}
          color={COLORS.warmGrey}
          size={25}
          onPress={() => setIsExpanded(true)}
        />
      </View>
      <Separator />
      <MyCalendar
        showStatus
        details
        listRef={flatlistRef}
        date={selectedStartDay}
        busySchedule={overview.busyScheduleToday}
        loading={false}
        detailedCounter
        managedAppointments={matchAppointmentsWithTimeSlots()}
        appointments={appointments}
        onResetCalendar={onResetCalendar}
        onPress={() =>
          // @ts-ignore
          navigation.navigate('AddAppointment', {
            selectedDayStart: selectedStartDay,
            selectedDayEnd: selectedEndDay,
          })
        }
      />
      <Modal
        useNativeDriver
        // coverScreen
        animationIn={"slideInDown"}
        animationOut={"slideOutUp"}
        animationOutTiming={500}
        animationInTiming={500}
        // onBackdropPress={() => setIsExpanded(false)}
        isVisible={isExpanded}
        backdropColor={"transparent"}
        statusBarTranslucent={true}
        style={{ margin: 0 }}
      >
        <View style={[styles.modal]}>
          <View style={[styles.modalContainer, { paddingTop: 30 }]}>
            <RnCalendar
              selectedDate={selectedStartDay}
              onChangeDate={onDateSelected}
              markedDates={scheduledArray}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => setIsExpanded(false)} style={styles.knob} />
          </View>
        </View>
      </Modal>
    </MainPageTemplate>
  );
};

export default Calendar;