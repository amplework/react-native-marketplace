import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsProviderApi } from 'api/settings';
import { LABELS } from 'containers/pickTimeslot/labels';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AlertComponent } from 'shared/alert/alertComponent';
import { Box } from 'shared/box';
import Button from 'shared/button';
import Calendar from 'shared/calendar';
import { Datepicker } from 'shared/datepicker';
import ScrollContainer from 'shared/scrollContainer';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  appointmentsSelector,
  getAppointments,
} from 'store/entities/appointments';
import { closedDaysSelectors, getClosedDays } from 'store/entities/closedDays';
import COLORS from 'utils/colors';
import { parseDate } from 'utils/dates';

import { getFormattedClosedDays, getSlots } from '../helpers/utils';
import { pickTimeSlotStyles as S } from '../style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const PickTimeSlot: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const closedDaysList = useSelector(closedDaysSelectors.closedDaysList);
  const closedDaysLoading = useSelector(closedDaysSelectors.isLoading);
  const appointments = useSelector(appointmentsSelector.appointments);
  const loading = useSelector(appointmentsSelector.loading);

  const isEdit = route?.params?.isEdit;

  const getDates = (hours: number, minutes: number) =>
    new Date(
      moment().year(),
      moment().month(),
      moment().date(),
      hours,
      minutes,
    );

  const getDate = (hours: number, minutes: number) =>
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      hours,
      minutes,
    );
  const [selectedStartDay, setSelectedStartDay] = useState(
    route?.params?.selectedDayStart || getDate(0, 0),
  );

  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [timeSlotsModal, setTimeSlotsModal] = useState(false);
  const [startTime, setStartTime] = useState(moment().format(''));
  const [endTime, setEndTime] = useState<any>(moment().format(''));
  const [lunchStart, setLunchStart] = useState<any>(new Date());
  const [lunchEnd, setLunchEnd] = useState<any>(new Date());
  const [standartTimeSlots, setStandartTimeSlots] = useState<any>([]);
  const [infoItem, setInfoItem] = useState<any>(undefined);
  const [selectedDate, setSelectedDate] = useState(
    route?.params?.selectedDayStart || new Date(),
  );
  const [selectedStartHour, setSelectedStartHour] = useState<any>('');
  const [selectedEndHour, setSelectedEndHour] = useState<any>('');
  const [isSlotAdded, setIsSlotAdded] = useState(false);
  const [selectedTimeStart, setSelectedTimeStart] = useState<any>(
    route?.params?.isEditStartTime || '',
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = useState<any>(
    route?.params?.isEditEndTime || '',
  );
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
    dispatch(getClosedDays());
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await SettingsProviderApi.getCalendarSettings();
        const workingWeekDays = data?.weekdayTimes;
        const toDay = moment(selectedDate).format('dddd').toLowerCase();
        const matchedDay = workingWeekDays?.filter((day: any) => day.weekDay === toDay);

        if (matchedDay?.length) {
          const currentDate = moment(selectedDate).format('YYYY-MM-DD');
          const start = `${currentDate} ${matchedDay[0].startTime}`;

          const end = `${currentDate} ${matchedDay[0].endTime}`;
          const slots = getSlots({
            start,
            end,
            duration: route?.params?.defaultDuration,
            interval: data.timeBetweenAppointments,
          });

          setLunchEnd(moment(data.lunchEnd, 'HH:mm'));
          setLunchStart(moment(data.lunchStart, 'HH:mm'));
          setStandartTimeSlots(slots);
        } else {
          const currentDate = moment(selectedDate).format('YYYY-MM-DD');
          const start = `${currentDate} ${data.dayStart}`;

          const end = `${currentDate} ${data.dayEnd}`;
          const slots = getSlots({
            start,
            end,
            duration: route?.params?.defaultDuration,
            interval: data.timeBetweenAppointments,
          });

          setLunchEnd(moment(data.lunchEnd, 'HH:mm'));
          setLunchStart(moment(data.lunchStart, 'HH:mm'));
          setStandartTimeSlots(slots);
        }
      } catch (error: any) {
        toast.info(error.message);
      }
    };
    init();
  }, [selectedDate]);
  useEffect(() => {
    dispatch(
      getAppointments({
        limit: 10,
        fromDate: moment(selectedStartDay).format('YYYY-MM-DD'),
        status: ['scheduled', 'blocked'],
        // toDate: moment.utc(selectedEndDay).endOf('day').toISOString(),
      }),
    );
  }, [selectedStartDay]);
  const getSlotSelected = (hours: number, minutes: number, date: any) =>
    new Date(
      moment(date).year(),
      moment(date).month(),
      moment(date).date(),
      hours,
      minutes,
    );
  // const getDateSelected = (hours: number, minutes: number, date: any) =>
  //   new Date(
  //     new Date(date).getFullYear(),
  //     new Date(date).getMonth(),
  //     new Date(date).getDate(),
  //     hours,
  //     minutes,
  //   );

  const onDateSelected = (date: moment.Moment) => {
    setSelectedStartDay(date);
    // setSelectedEndDay(getDateSelected(23, 59, date));
    setSelectedDate(date);
  };

  const renderAppointment = (item: any) => {
    return (
      <TouchableOpacity
        style={[S.timeslotContainer, S.timeslotDisabledProvider]}
        onPress={() => {
          setShowInfoModal(true);
          setInfoItem(item);
        }}
      >
        <View style={S.rowSpace}>
          <Text style={S.timeSlotTextOfContainer}>
            {moment(item.startDate).format('LT') + ' - ' + moment(item.endDate).format('LT')}
          </Text>
          {item.clientSubprofile && (
            <Text style={S.timeSlotTextOfContainer}>
              {' - ' + LABELS.client + item.clientSubprofile.firstName}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const saveTimeSlot = () => {
    navigation.goBack();
    if (isSlotAdded) {
      selectedStartHour &&
        route.params.handleSave(
          selectedStartHour,
          selectedEndHour,
        );
    } else {
      selectedTimeStart &&
        route.params.handleSave(
          selectedTimeStart,
          selectedTimeEnd,
        );
    }
  };
  const getTime = (date: any) => moment(date).local().format('LT');
  const appointmentsFilter = isEdit
    ? appointments.filter(
      (slot: any) => slot?.startDate !== route?.params?.isEditStartTime,
    )
    : appointments;
  const renderModal = (
    value: boolean,
    onPress: any,
    title: string,
    content: any,
    modalStyle?: any,
  ) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={value}
        onRequestClose={onPress}
      >
        <View style={S.centeredView}>
          <View style={[S.modalView, modalStyle]}>
            <View style={S.posHeader}>
              <View style={S.titleNewCenter}>
                <Text style={S.titleNewService}>{title}</Text>
              </View>
              <TouchableOpacity onPress={onPress}>
                <Image
                  source={require('assets/global/close.png')}
                  style={S.closeImage}
                />
              </TouchableOpacity>
            </View>
            {content}
          </View>
        </View>
      </Modal>
    );
  };
  const isDatesIntersect = (
    start: moment.Moment | any,
    end: moment.Moment | any,
    skipLaunch?: boolean,
  ) => {
    for (let i = 0; i < appointmentsFilter?.length; i++) {
      const startT = appointmentsFilter[i].startDate;
      const endT = appointmentsFilter[i].endDate;
      if (
        moment(start).isBetween(startT, endT, undefined, '[)') ||
        moment(end).isBetween(startT, endT, undefined, '(]')
      ) {
        return true;
      }
    }
    if (skipLaunch) {
      return false;
    }
    if (
      moment(start).isBetween(lunchStart, lunchEnd, undefined, '[)') ||
      moment(end).isBetween(lunchStart, lunchEnd, undefined, '(]')
    ) {
      return true;
    }
  };

  return (
    <MainPageTemplate loading={loading || closedDaysLoading} bc={COLORS.white}>
      <Calendar
        selectedDate={selectedDate}
        customDatesStyles={getFormattedClosedDays(closedDaysList)}
        onPress={onDateSelected}
      />
      <View style={S.legendContainer}>
        <View style={[S.circle, S.blockCircle]} />
        <Text style={S.legendTitle}>{LABELS.unavailable}</Text>
        <View style={[S.circle, S.pickedCircle]} />
        <Text style={S.legendTitle}>{LABELS.picked}</Text>
      </View>
      <ScrollContainer styleKeyboard={S.contentContainer}>
        <View style={S.positionButtons}>
          <Button
            onPress={() => {
              // setStartTime(new Date());
              // setEndTime(
              //   // moment().add(moment.duration(route?.params?.defaultDuration, 'minutes'))
              //   getDate(
              //     new Date().getHours(),
              //     new Date().getMinutes() + route?.params?.defaultDuration,
              //   ),
              // );
              setShowModal(true);
            }}
            text={LABELS.addTimeslot}
            buttonStyle={S.addButton}
            textStyle={S.textTrial}
          />
          <Button
            onPress={() => setTimeSlotsModal(true)}
            text={LABELS.sTimeslot}
            buttonStyle={[S.addButton, S.btnTimeSlotRight]}
            textStyle={S.textTrial}
          />
        </View>
        {appointmentsFilter?.map((item: any) => renderAppointment(item))}
        {isSlotAdded ? (
          (selectedStartHour && selectedEndHour) ? (
            <TouchableOpacity
              style={S.timeslotContainer}
              onPress={() => {
                setStartTime(startTime);
                setEndTime(endTime);
                setShowModal(true);
              }}
            >
              <Text style={S.timeSlotTextPicked}>
                {moment(selectedStartHour).format('LT') + ' - ' + moment(selectedEndHour).format('LT')}
              </Text>
            </TouchableOpacity>
          ) : null
        ) : (selectedTimeStart && selectedTimeEnd) ? (
          <TouchableOpacity
            style={S.timeslotContainer}
            onPress={() => {
              setStartTime(startTime);
              setEndTime(endTime);
              setShowModal(true);
            }}
          >
            <Text style={S.timeSlotTextPicked}>
              {moment(selectedTimeStart).format('LT') + ' - ' + moment(selectedTimeEnd).format('LT')}
            </Text>
          </TouchableOpacity>
        ) : null
        }
      </ScrollContainer>
      {renderModal(
        showInfoModal,
        () => setShowInfoModal(false),
        LABELS.info,
        <View style={S.infoContent}>
          <Text style={S.infoText}>
            {LABELS.client +
              (infoItem?.clientSubprofile?.firstName || LABELS.na)}
          </Text>
          <Text style={S.infoText}>
            {LABELS.service + (infoItem?.product?.name || LABELS.na)}
          </Text>
        </View>,
      )}
      {renderModal(
        timeSlotsModal,
        () => setTimeSlotsModal(false),
        LABELS.sTemplate,
        <FlatList
          contentContainerStyle={S.scrollContent}
          data={standartTimeSlots}
          renderItem={({ item }) =>
            item.endTime && (
              <TouchableOpacity
                style={[
                  S.slotsContainer,
                  S.slotsContainerLarge,
                  isDatesIntersect(item.startTime, item.endTime) &&
                  S.grayContainer,
                ]}
                onPress={() => {
                  setSelectedTimeStart(item.startTime);
                  setSelectedTimeEnd(item.endTime);
                  setIsSlotAdded(false);
                  setTimeSlotsModal(false);
                  isDatesIntersect(item.startTime, item.endTime, true) &&
                    toast.info(
                      'Please note, you already have appointments for the selected timeslot',
                    );
                }}
              >
                <Text style={S.timeSlotTextOfContainer}>
                  {moment(item.startTime).format('LT') +
                    ' - ' +
                    moment(item.endTime).format('LT')}
                </Text>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item) => item.startTime.toString()}
        />,
        S.bigModal,
      )}
      {renderModal(
        showModal,
        () => setShowModal(false),
        LABELS.addTimeslot,
        <Box pv={24} ph={24}>
          <Box row jc="space-between" mb={24}>
            <Datepicker
              flex
              title={getTime(startTime)}
              label={LABELS.timeStart}
              required
              mode="time"
              date={parseDate(startTime)}
              onConfirm={(value: any) => {
                setStartTime(value);
                setEndTime(
                  new Date(
                    value.getFullYear(),
                    value.getMonth(),
                    value.getDate(),
                    value.getHours(),
                    value.getMinutes() + route?.params?.defaultDuration,
                  ),
                );
              }}
              icon={require('assets/global/reminders.png')}
              mr={15}
            />
            <Datepicker
              flex
              title={getTime(endTime)}
              label={LABELS.timeEnd}
              required
              mode="time"
              date={parseDate(endTime)}
              onConfirm={(value: any) => {
                setEndTime(value);
              }}
              icon={require('assets/global/reminders.png')}
            />
          </Box>
          <Box jc="center" ai="center">
            <Button
              onPress={() => {
                if (
                  new Date(endTime).getTime() < new Date(startTime).getTime()
                ) {
                  toast.info(LABELS.lessEndNote);
                } else {
                  const currentDate = moment(selectedDate).date();
                  const currentMonth = moment(selectedDate).month();
                  const currentYear = moment(selectedDate).year();
                  const currentHourStart = moment(startTime).hours();
                  const currentMinutesStart = moment(startTime).minutes();
                  const currentHourEnd = moment(endTime).hours();
                  const currentMinutesEnd = moment(endTime).minutes();
                  let newCurrentHourStart = currentHourStart < 10 ? `0${currentHourStart}` : currentHourStart;
                  let newCurrentMinutesStart = currentMinutesStart < 10 ? `0${currentMinutesStart}` : currentMinutesStart;
                  let newCurrentHourEnd = currentHourEnd < 10 ? `0${currentHourEnd}` : currentHourEnd;
                  let newCurrentMinutesEnd = currentMinutesEnd < 10 ? `0${currentMinutesEnd}` : currentMinutesEnd;
                  const dateSelected = moment(selectedDate).format('YYYY-MM-DD');
                  const start = `${dateSelected} ${newCurrentHourStart}:${newCurrentMinutesStart}`;
                  const end = `${dateSelected} ${newCurrentHourEnd}:${newCurrentMinutesEnd}`;

                  const startHours = moment(start).format('')
                  const endHours = moment(end).format('')

                  setSelectedStartHour(startHours);
                  setSelectedEndHour(endHours);
                  setIsSlotAdded(true);
                  setShowModal(false);
                  isDatesIntersect(
                    new Date(
                      currentYear,
                      currentMonth,
                      currentDate,
                      currentHourStart,
                      currentMinutesStart,
                    ),
                    new Date(
                      currentYear,
                      currentMonth,
                      currentDate,
                      currentHourEnd,
                      currentMinutesEnd,
                    ),
                    true,
                  ) &&
                    toast.info(
                      'Please note, you already have appointments for the selected timeslot',
                    );
                }
              }}
              text={LABELS.confirm}
              buttonStyle={S.btnConfirm}
              textStyle={S.textTrial}
            />
          </Box>
        </Box>,
        S.addTimeslotModal,
      )}
      <View style={S.bottomBlock}>
        <Button
          onPress={() => {
            if (
              (isSlotAdded ? getSlotSelected(
                moment(selectedStartHour).hours(),
                moment(selectedStartHour).minutes(),
                selectedDate,
              ) : getSlotSelected(
                moment(selectedTimeStart).hours(),
                moment(selectedTimeStart).minutes(),
                selectedDate,
              )) < getDates(moment().hours(), moment().minutes())
            ) {
              AlertComponent(
                LABELS.warning,
                LABELS.pastNote,
                saveTimeSlot,
                () => { },
                LABELS.cancel,
                LABELS.confirm,
              );
            } else {
              saveTimeSlot();
            }
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