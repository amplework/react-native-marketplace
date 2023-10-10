import { StackNavigationProp } from '@react-navigation/stack';
import { ProvidersProviderApi } from 'api/providers';
import RNlocalize from 'react-native-localize';
import { LABELS } from 'containers/pickTimeslot/labels';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'shared/button';
import Calendar from 'shared/calendar';
import ScrollContainer from 'shared/scrollContainer';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import { userSelectors } from 'store/entities/user';
import { appointmentsSelector, getSlots, checkClosedDay } from 'store/entities/appointments';
import COLORS from 'utils/colors';
import { isClient } from 'types/users';
import { constructDate, parseDate, Weekday } from 'utils/dates';

import { getFormattedClosedDays } from '../helpers/utils';
import { pickTimeSlotStyles as S } from '../style';
import { providersSelectors } from 'store/entities/providers';
import { DaysSchedule } from 'utils/constants';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const PickTimeSlot: React.FC<Props> = ({ navigation, route }) => {
  let localDate = moment.tz(RNlocalize.getTimeZone()).format();
  const slots = useSelector(appointmentsSelector.slots);
  const user = useSelector(userSelectors?.user);
  const provider = useSelector(providersSelectors.provider);
  const isClosedDay = useSelector(appointmentsSelector.isClosedDay);
  const loading = useSelector(appointmentsSelector.slotsLoading);
  const client = isClient(user) && useSelector((state: any) => state.client.client);

  const [selectedDate, setSelectedDate] = useState(localDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(
    route?.params?.isEditStartTime
      ? { startDate: parseDate(route.params.isEditStartTime).toISOString() }
      : '',
  );
  const [workingDays, setWorkingDays] = useState<DaysSchedule[]>([]);
  const [closedDaysList, setClosedDaysList] = useState<any>([]);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity style={S.row} onPress={() => navigation.goBack()}>
          <Image
            style={S.imageBack}
            source={require('assets/global/back.png')}
          />
          <Text style={S.titleLeftStyle}>{LABELS.backTitle}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(
      checkClosedDay({
        //@ts-ignore
        date: moment.tz(selectedDate, provider?.address?.utctimezone).startOf('day').hour(12)
          .minute(0)
          .toISOString(),
        providerId: route?.params?.providerId || 0,
        duration: route?.params?.defaultDuration || 30,
      }),
    );
  }, [selectedDate]);

  useEffect(() => {
    dispatch(
      getSlots({
        date: moment(selectedDate).format('YYYY-MM-DD'),
        providerId: route?.params?.providerId || 0,
        duration: route?.params?.defaultDuration || 30,
      }),
    );
  }, [selectedDate]);

  useEffect(() => {
    const init = async () => {
      try {
        const [closedDaysData, provider] = await Promise.all([
          ProvidersProviderApi.getProviderClosedDays(
            route?.params?.providerId || 0,
          ).then(({ data }) => data),
          ProvidersProviderApi.getProvider(route?.params?.providerId || 0).then(
            ({ data }) => data,
          ),
        ]);

        setClosedDaysList(closedDaysData || []);
        setWorkingDays(provider?.calendarSettings?.weekdayTimes || []);
      } catch (error: any) {
        toast.info(error?.message);
      }
    };

    init();
  }, []);

  const onDateSelected = (date: any) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
  };

  const renderAppointment = (item: any) => {
    const selectedSlot = selectedTimeSlot?.startDate;
    const selected = selectedSlot === item.startDate;

    return (
      <TouchableOpacity
        style={[S.slotsContainer, selected && S.slotsContainerSelected]}
        onPress={() => setSelectedTimeSlot(item)}
      >
        <Text
          style={[S.timeSlotTextOfContainer, selected && S.timeSlotTextPicked]}
        >
          {moment(item?.startDate).format('LT') + ' - ' + moment(item?.endDate).format('LT')}
          {/* {moment.tz(item.startDate, RNlocalize.getTimeZone()).format('LT') + ' - ' + moment.tz(item.endDate, RNlocalize.getTimeZone()).format('LT')} */}
        </Text>
      </TouchableOpacity>
    );
  };

  const isDayOff = useMemo(
    () =>
      selectedDate &&
      workingDays.every(
        //@ts-ignore
        (day: DaysSchedule) => day?.weekDay !== moment.tz(selectedDate, provider?.address?.utctimezone).format('dddd').toLowerCase(),
      ),
    [selectedDate, workingDays],
  );

  return (
    <MainPageTemplate bc={COLORS.white}>
      <Calendar
        markedDated={[]}
        selectedDate={selectedDate}
        onPress={onDateSelected}
        customDatesStyles={getFormattedClosedDays(closedDaysList)}
      />
      <View style={S.legendContainer}>
        <View style={[S.circle, S.availableCircle]} />
        <Text style={[S.legendTitle, S.legendSpace]}>{LABELS.available}</Text>
        <View style={[S.circle, S.blockCircle]} />
        <Text style={S.legendTitle}>{LABELS.unavailable}</Text>
        <View style={[S.circle, S.pickedCircle]} />
        <Text style={S.legendTitle}>{LABELS.picked}</Text>
      </View>
      {loading && (
        <View style={S.positionLoader}>
          <ActivityIndicator size="large" color={COLORS.clearBlue} />
        </View>
      )}
      {!loading && isClosedDay && (
        <View style={S.centralScreen}>
          <Text style={S.placeholder}>{LABELS.placeholder}</Text>
        </View>
      )}
      {!loading && isDayOff && !isClosedDay && (
        <View style={S.centralScreen}>
          <Text style={S.placeholder}>{LABELS.dayOff}</Text>
        </View>
      )}
      {!slots?.length && !loading && !isClosedDay && !isDayOff && (
        <View style={S.centralScreen}>
          <Text style={S.placeholder}>{LABELS.noTimeslots}</Text>
        </View>
      )}
      {!isClosedDay && !isDayOff && (
        <ScrollContainer styleKeyboard={S.contentContainer}>
          <View style={S.wrapSlots}>
            {slots?.map((item: any) => renderAppointment(item))}
          </View>
        </ScrollContainer>
      )}
      <View style={S.bottomBlock}>
        <Button
          onPress={() => {
            if (!selectedTimeSlot) {
              toast.info(LABELS.selectTimeslot);
              return;
            }

            navigation.goBack();
            selectedTimeSlot &&
              route.params.handleSave(
                selectedTimeSlot.startDate,
              );
          }}
          text={LABELS.saveTimeslot}
          buttonStyle={S.btnTrial}
          textStyle={S.textTrial}
        />
      </View>
    </MainPageTemplate>
  );
};

export default PickTimeSlot;