import { t, translations } from 'locales';
import moment from 'moment';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Box } from 'shared/box';
import CheckBox from 'shared/checkbox';
// import { DAYS, DAYS_SCHEDULE } from 'utils/constants';
import { formatApiTime, formatTime, minutes, parseApiTime, Weekday } from 'utils/dates';
import { Datepicker } from './datepicker';

import { styles } from './styles';
import { capitalize } from 'utils/strings';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSetupSelectors, setDayScheduleList, setSelectedDays } from 'store/entities/calendarSetup';
import { toast } from 'shared/toast';

interface Props {
  days: any[];
  onChange: (days: any[]) => void;
  styleDaysContainer?: any;
  onChangeStartTime?: () => void;
  onChangeEndTime?: () => void;
}

const DaysPickerWithTime: React.FC<Props> = ({ days, onChange, styleDaysContainer }) => {

  const dispatch = useDispatch();
  // const [selectedDays, setSelectedDays] = useState(days);
  const dayScheduleList = useSelector(calendarSetupSelectors.dayScheduleList);
  const selectedDays = useSelector(calendarSetupSelectors.selectedDaysList);

  const selectDay = (day: any) =>
    dispatch(setSelectedDays([...selectedDays, day]));

  const deselectDay = (pickedDay: any) =>
    dispatch(setSelectedDays(selectedDays.filter((day: any) => day?.weekDay !== pickedDay?.weekDay)));

  const toggleWorkingDay = (value: any) => (checked: boolean) =>
    checked ? selectDay(value) : deselectDay(value);

  const handleChangeStartTime = (item: any, value: any) => {
    const updatedData = dayScheduleList.map((day: any) => {
      if (day.weekDay === item.weekDay) {
        if (moment(value).isBefore(day?.endTime)) {
          return {
            ...day,
            ['startTime']: value,
          };
        } else {
          toast.info('Start time should be less than end time.')
          return day;
        }
      }
      return day;
    });
    dispatch(setDayScheduleList(updatedData));
  }

  const handleChangeEndTime = (item: any, value: any) => {
    const updatedData = dayScheduleList.map((day: any) => {
      if (day.weekDay === item.weekDay) {
        if (moment(value).isAfter(day?.startTime)) {
          return {
            ...day,
            ['endTime']: value,
          };
        } else {
          toast.info('End time should be greater than start time.')
          return day;
        }
      }
      return day;
    });
    dispatch(setDayScheduleList(updatedData));
  }

  return (
    <View style={[styles.daysSection, styleDaysContainer, { flexDirection: 'column' }]}>
      {dayScheduleList.map((item, index) => {
        const isExist = selectedDays?.find((e: any) => e?.weekDay === item?.weekDay);

        return (
          <Box h={40} w={'100%'} row mt={index == 0 ? 0 : 10} key={index}>
            <Box jc='center' w={'35%'}>
              <CheckBox
                key={index}
                //@ts-ignore
                checked={isExist}
                onChange={toggleWorkingDay(item)}
                label={capitalize(item?.weekDay)}
                styleContainer={[styles.dayCheckbox, { marginBottom: 0 }]}
                styleLabel={styles.textBook2}
              />
            </Box>
            {isExist ? (
              <Box row jc='space-between' w={'65%'}>
                <Datepicker
                  flex
                  editable
                  title={formatTime(item.startTime, { utc: true })}
                  required
                  mode="time"
                  date={item.startTime}
                  minimumDate={minutes.increment(moment())}
                  onConfirm={(value) => handleChangeStartTime(item, value)}
                  icon={require('assets/global/reminders.png')}
                />
                <Datepicker
                  flex
                  editable
                  title={formatTime(item.endTime, { utc: true })}
                  required
                  mode="time"
                  ml={10}
                  date={item.endTime}
                  minimumDate={minutes.increment(moment())}
                  onConfirm={(value) => handleChangeEndTime(item, value)}
                  icon={require('assets/global/reminders.png')}
                />
              </Box>
            ) : null}
          </Box>
        )
      })}
    </View>
  );
};

export { DaysPickerWithTime };