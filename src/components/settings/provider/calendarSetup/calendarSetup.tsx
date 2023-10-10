import { StackScreenProps } from '@react-navigation/stack';
import { adaptCalendarSettings } from 'components/settings/helpers/adapters';
import {
  REMIND_CLIENT_INTERVALS,
  TIME_BETWEEN_APPOINTMENTS,
} from 'components/settings/helpers/options';
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import SafeContainer from 'shared/container';
import { Datepicker, DaysPicker, DaysPickerWithTime } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import {
  calendarSetupSelectors,
  getCalendarSettings,
  updateCalendarSettings,
} from 'store/entities/calendarSetup';
import { theme } from 'theme';
import { CalendarSettingsValues } from 'types/settings';
import { formatApiTime, formatTime, minutes, parseApiTime } from 'utils/dates';

import { calendarSetupStyles as S } from './style';
import moment from 'moment';
import { toast } from 'shared/toast';

type Props = StackScreenProps<RootStackParamList>;

const CalendarSetup: React.FC<Props> = ({ navigation }) => {
  const settings = useSelector(calendarSetupSelectors.settings);
  const loading = useSelector(calendarSetupSelectors.loading);
  const dayScheduleList = useSelector(calendarSetupSelectors.dayScheduleList);
  const selectedDays = useSelector(calendarSetupSelectors.selectedDaysList);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { values, setValues, setFieldValue, handleSubmit } = useFormik({
    initialValues: adaptCalendarSettings(settings),
    onSubmit: (calendarSettingsValues) => {
      const timeMismatchError = moment(calendarSettingsValues?.lunchStart).isAfter(moment(calendarSettingsValues?.dayStart).format(), 'minute') == false
        || moment(calendarSettingsValues?.lunchStart).isAfter(moment(calendarSettingsValues?.dayEnd).format(), 'minute')
        || moment(calendarSettingsValues?.lunchEnd).isAfter(moment(calendarSettingsValues?.lunchStart).format(), 'minute') == false
        || moment(calendarSettingsValues?.lunchEnd).isAfter(moment(calendarSettingsValues?.dayEnd).format(), 'minute');

      if (timeMismatchError) {
        toast.info('Lunch time should be between day start and day end time.');
        return;
      }
      const formattedList = dayScheduleList.map((day: any) => ({
        ...day,
        startTime: formatApiTime(day?.startTime, { utc: true }),
        endTime: formatApiTime(day?.endTime, { utc: true }),
      }));
      const weekDaysList = selectedDays.map((day: any) => {
        const matchingDatabaseDay = formattedList.find(
          (dbDay: any) => dbDay.weekDay === day.weekDay,
        );
        if (matchingDatabaseDay) {
          return Object.assign({}, day, matchingDatabaseDay);
        }
        return day;
      });

      const newData = {
        timeBetweenAppointments: calendarSettingsValues.timeBetweenAppointments,
        shouldClientConfirm: calendarSettingsValues.shouldClientConfirm,
        dayStart: calendarSettingsValues.dayStart,
        dayEnd: calendarSettingsValues.dayEnd,
        workingDays: calendarSettingsValues.workingDays,
        weekdayTimes: weekDaysList,
        lunchStart: calendarSettingsValues.lunchStart,
        lunchEnd: calendarSettingsValues.lunchEnd,
        isDoubleBookingAllowed: calendarSettingsValues.isDoubleBookingAllowed,
        remindClient: calendarSettingsValues.remindClient,
      }

      alert.editing({
        entity: t(translations.common.entities.calendarSettings),
        onEdit: () => dispatch(updateCalendarSettings(newData)),
      });
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.settings.links.calendarSetup)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    dispatch(getCalendarSettings());
  }, [dispatch]);

  useEffect(() => {
    setValues(adaptCalendarSettings(settings));
  }, [settings, setValues]);

  useEffect(() => {
    if (minutes.isSameOrAfter(values.dayStart, values.dayEnd)) {
      setFieldValue('dayEnd', minutes.increment(values.dayStart));
    }
  }, [values.dayStart, values.dayEnd, setFieldValue]);

  useEffect(() => {
    if (minutes.isSameOrAfter(values.lunchStart, values.lunchEnd)) {
      setFieldValue('lunchEnd', minutes.increment(values.lunchStart));
    }
  }, [values.lunchStart, values.lunchEnd, setFieldValue]);

  const handleFieldChange =
    <F extends keyof CalendarSettingsValues>(field: F) =>
      (value: CalendarSettingsValues[F]) =>
        setFieldValue(field, value);

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={S.content} style={S.scrollView}>
        <Box pr={22} pl={22}>
          <DropMenu
            value={values.timeBetweenAppointments}
            onChange={handleFieldChange('timeBetweenAppointments')}
            items={TIME_BETWEEN_APPOINTMENTS}
          />
          <Box row jc="space-between" mv={20}>
            <Datepicker
              flex
              editable
              title={formatTime(values.dayStart, { utc: true })}
              label={t(translations.calendarSetup.dayStart)}
              required
              mode="time"
              date={values.dayStart}
              onConfirm={handleFieldChange('dayStart')}
              icon={require('assets/global/reminders.png')}
              mr={15}
            />
            <Datepicker
              flex
              editable
              title={formatTime(values.dayEnd, { utc: true })}
              label={t(translations.calendarSetup.dayEnd)}
              required
              mode="time"
              date={values.dayEnd}
              minimumDate={minutes.increment(values.dayStart)}
              onConfirm={handleFieldChange('dayEnd')}
              icon={require('assets/global/reminders.png')}
            />
          </Box>
        </Box>
        <Paragraph type="book" mh={22} mb={12}>
          {t(translations.calendarSetup.daysOpenWeekly)}
        </Paragraph>
        <DaysPickerWithTime
          days={values.weekdayTimes}
          onChange={(value) => {
            console.log("🚀 ~ onchange value in screen~ value:", value)
            setFieldValue('workingDays', value);
          }}
        />
        {/* <DaysPicker
          days={values.workingDays}
          onChange={handleFieldChange('workingDays')}
        /> */}
        <Box pr={22} pl={22}>
          <Box row jc="space-between" mb={16}>
            <Datepicker
              flex
              editable
              title={formatTime(values.lunchStart, { utc: true })}
              label={t(translations.calendarSetup.lunchStart)}
              required
              mode="time"
              date={values.lunchStart}
              onConfirm={handleFieldChange('lunchStart')}
              icon={require('assets/global/reminders.png')}
              mr={15}
            />
            <Datepicker
              flex
              editable
              title={formatTime(values.lunchEnd, { utc: true })}
              label={t(translations.calendarSetup.lunchEnd)}
              required
              mode="time"
              date={values.lunchEnd}
              minimumDate={minutes.increment(values.lunchStart)}
              onConfirm={handleFieldChange('lunchEnd')}
              icon={require('assets/global/reminders.png')}
            />
          </Box>
          <CheckBox
            checked={values.isDoubleBookingAllowed}
            onChange={handleFieldChange('isDoubleBookingAllowed')}
            label={t(translations.calendarSetup.allowDoubleBooking)}
            styleContainer={theme.spacing.ph(2)}
            styleLabel={S.textPrimary}
          />
          <DropMenu
            value={values.remindClient}
            onChange={handleFieldChange('remindClient')}
            items={REMIND_CLIENT_INTERVALS}
          />
        </Box>
      </ScrollView>
      <View style={S.saveButtonContainer}>
        <Button
          text={t(translations.common.saveChanges)}
          onPress={handleSubmit}
        />
      </View>
    </SafeContainer>
  );
};

export { CalendarSetup };
