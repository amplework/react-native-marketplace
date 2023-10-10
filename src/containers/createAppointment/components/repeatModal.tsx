import { formatRepeatDate } from 'components/tasks/helpers/dates';
import { validateRepeatOptions } from 'components/tasks/helpers/validation';
import { useFormik } from 'formik';
import I18n from 'locales';
import React, { useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { BottomSheet, BottomSheetHeader } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Datepicker, DaysPicker } from 'shared/datepicker';
import { Paragraph } from 'shared/paragraph';
import { Radio } from 'shared/radio';
import { RepeatInitialValues, RepeatValues } from 'types/tasks';
import COLORS from 'utils/colors';
import { DAYS, MONTH_DAYS, MONTHS, WEEKDAYS, COUNT } from 'utils/constants';
import { getDay, getDaysInMonth, getMonth, getWeekday } from 'utils/dates';

import { PILL_BUTTON_MARGIN, PILL_BUTTON_WIDTH } from '../style';
import styles from '../style';
import { DateLabel } from 'components/tasks/provider/addEditTask/components/dateLabel';
import { PillButton } from 'components/tasks/provider/addEditTask/components/pillButton';
import { Separator } from 'shared/separator';
import moment from 'moment';

const LEAP_YEAR = 2020;

interface Props {
  initialValues: RepeatInitialValues;
  onSubmit: (values: RepeatValues) => void;
  onClose: () => void;
}

const RepeatModal: React.FC<Props> = ({ initialValues, onSubmit, onClose }) => {
  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      repeatOption: initialValues.repeatOption || 0,
      weekly: {
        day:
          initialValues.repeatWeekday?.length === 1 &&
          initialValues.repeatOption === 1
            ? initialValues.repeatWeekday[0]
            : getWeekday(),
        days:
          initialValues.repeatOption === 4
            ? initialValues.repeatWeekday || WEEKDAYS
            : WEEKDAYS,
      },
      monthly: {
        day: initialValues.repeatMonthDay || +getDay(),
      },
      yearly: {
        day: initialValues.repeatMonthDay || +getDay(),
        month: initialValues.repeatMonth || +getMonth(),
      },
      repeatEndOptions: initialValues.repeatEndOptions || 0,
      endAfterDate: initialValues.endAfterDate,
      endAfterTotalAppointment: initialValues.endAfterTotalAppointment || 0
    },
    validate: validateRepeatOptions,
    validateOnChange: false,
    onSubmit,
  });

  useEffect(() => {
    const daysInMonth = getDaysInMonth(values.yearly.month, LEAP_YEAR);

    if (values.yearly.day > daysInMonth) {
      setFieldValue('yearly.day', daysInMonth);
    }
  }, [values.yearly, setFieldValue]);

  const getItemLayout = <T extends any>(_data: T, index: number) => ({
    length: PILL_BUTTON_WIDTH + PILL_BUTTON_MARGIN,
    offset: (PILL_BUTTON_WIDTH + PILL_BUTTON_MARGIN) * index,
    index,
  });

  const selectedDay = DAYS.find((d) => d.value === values.weekly.day);
  const selectedMonthDay = MONTH_DAYS.find(
    (m) => m.value === values.monthly.day,
  );
  const selectedYearlyMonthDay = MONTH_DAYS.find(
    (m) => m.value === values.yearly.day,
  );
  const selectedYearlyMonth = MONTHS.find(
    (m) => m.value === values.yearly.month,
  );

  return (
    <BottomSheet>
      <BottomSheetHeader
        title={I18n.t('appAppointments.repeatHeader')}
        onClose={onClose}
      />
      <ScrollView
        style={styles.repeatScrollView}
        contentContainerStyle={styles.repeatContent}
      >
        <Box flex>
          <Radio
            checked={values.repeatOption === 0}
            onChange={() => setFieldValue('repeatOption', 0)}
            mh={32}
            mb={24}
          >
            <Paragraph type="book" ml={8}>
              {I18n.t('appAppointments.everyday')}
            </Paragraph>
          </Radio>
          <Radio
            checked={values.repeatOption === 1}
            onChange={() => setFieldValue('repeatOption', 1)}
            mh={32}
            mb={24}
          >
            <Paragraph type="book" ml={8}>
              {I18n.t('appAppointments.everyWeek')}
            </Paragraph>
            <DateLabel active={values.repeatOption === 1}>
              {selectedDay?.name}
            </DateLabel>
          </Radio>
          {values.repeatOption === 1 && (
            <FlatList
              data={DAYS}
              keyExtractor={(day) => day.value}
              initialScrollIndex={selectedDay?.index}
              getItemLayout={getItemLayout}
              horizontal
              renderItem={({ item: day }) => (
                <PillButton
                  text={day.short}
                  onPress={() => setFieldValue('weekly.day', day.value)}
                  active={values.weekly.day === day.value}
                />
              )}
              style={styles.repeatDatepicker}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={() => <Box w={32} />}
              ListFooterComponent={() => <Box w={32} />}
            />
          )}
          <Radio
            checked={values.repeatOption === 2}
            onChange={() => setFieldValue('repeatOption', 2)}
            mh={32}
            mb={24}
          >
            <Paragraph type="book" ml={8}>
              {I18n.t('appAppointments.everyMonth')}
            </Paragraph>
            <DateLabel active={values.repeatOption === 2}>
              {formatRepeatDate(values.monthly.day)}
            </DateLabel>
          </Radio>
          {values.repeatOption === 2 && (
            <>
              <FlatList
                data={MONTH_DAYS}
                initialScrollIndex={selectedMonthDay?.index}
                getItemLayout={getItemLayout}
                keyExtractor={(day) => day.label}
                horizontal
                renderItem={({ item: day }) => (
                  <PillButton
                    text={day.label}
                    onPress={() => setFieldValue('monthly.day', day.value)}
                    active={values.monthly.day === day.value}
                  />
                )}
                style={styles.repeatDatepicker}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <Box w={32} />}
                ListFooterComponent={() => <Box w={32} />}
              />
              {[29, 30, 31].includes(values.monthly.day) && (
                <Paragraph
                  size="s"
                  type="book"
                  color={COLORS.orangeRed}
                  ml={32}
                  mb={24}
                >
                  {I18n.t('tasks.errors.lastDates')}
                </Paragraph>
              )}
            </>
          )}
          <Radio
            checked={values.repeatOption === 3}
            onChange={() => setFieldValue('repeatOption', 3)}
            mh={32}
            mb={24}
          >
            <Paragraph type="book" ml={8}>
              {I18n.t('appAppointments.every')}
            </Paragraph>
            <DateLabel active={values.repeatOption === 3}>
              {selectedYearlyMonth?.name}
            </DateLabel>
            <Paragraph type="book">{I18n.t('tasks.on')}</Paragraph>
            <DateLabel active={values.repeatOption === 3}>
              {formatRepeatDate(values.yearly.day)}
            </DateLabel>
          </Radio>
          {values.repeatOption === 3 && (
            <>
              <FlatList
                data={MONTHS}
                keyExtractor={(month) => month.name}
                initialScrollIndex={values.yearly.month - 1}
                getItemLayout={getItemLayout}
                horizontal
                renderItem={({ item: month }) => (
                  <PillButton
                    text={month.short}
                    onPress={() => setFieldValue('yearly.month', month.value)}
                    active={values.yearly.month === month.value}
                  />
                )}
                style={styles.repeatDatepicker}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <Box w={32} />}
                ListFooterComponent={() => <Box w={32} />}
              />
              <FlatList
                data={MONTH_DAYS}
                initialScrollIndex={selectedYearlyMonthDay?.index}
                getItemLayout={getItemLayout}
                keyExtractor={(day) => `${day.value}`}
                horizontal
                renderItem={({ item: day }) => (
                  <PillButton
                    text={day.label}
                    onPress={() => setFieldValue('yearly.day', day.value)}
                    active={values.yearly.day === day.value}
                    disabled={
                      day.value > getDaysInMonth(values.yearly.month, LEAP_YEAR)
                    }
                  />
                )}
                style={styles.repeatDatepicker}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => <Box w={32} />}
                ListFooterComponent={() => <Box w={32} />}
              />
              {values.yearly.month === 2 && values.yearly.day === 29 && (
                <Paragraph
                  size="s"
                  type="book"
                  color={COLORS.orangeRed}
                  ml={32}
                  mb={24}
                >
                  {I18n.t('tasks.errors.lastFebruary')}
                </Paragraph>
              )}
            </>
          )}
          <Radio
            checked={values.repeatOption === 4}
            onChange={() => setFieldValue('repeatOption', 4)}
            mh={32}
            mb={24}
          >
            <Paragraph type="book" ml={8}>
              {I18n.t('appAppointments.weekly')}
            </Paragraph>
          </Radio>
          {values.repeatOption === 4 && (
            <>
              <DaysPicker
                days={values.weekly.days}
                onChange={(days) => setFieldValue('weekly.days', days)}
              />
              {errors.weekly && (
                <Paragraph
                  size="s"
                  type="book"
                  color={COLORS.orangeRed}
                  ml={32}
                >
                  {errors.weekly}
                </Paragraph>
              )}
            </>
          )}
          <Separator />
          <Radio
            checked={values.repeatEndOptions === 0}
            onChange={() => setFieldValue('repeatEndOptions', 0)}
            mh={32}
            mv={24}
          >
            <Paragraph type="book" ml={8} mr={10}>
              {I18n.t('appAppointments.endBy')}
            </Paragraph>
            <Box>
              <Datepicker
                flex
                title={moment().format('Do MMM YYYY')}
                label={'End date'}
                required
                mode="date"
                date={moment().toDate()}
                onConfirm={(value: any) => { }}
                icon={require('assets/global/calendar.png')}
                // mr={15}
                iconStyle={{marginLeft: 5}}
              />
            </Box>
          </Radio>
          <Radio
            checked={values.repeatEndOptions === 1}
            onChange={() => setFieldValue('repeatEndOptions', 1)}
            mh={32}
            mb={24}
          >
            <Box row jc='center' ai='center' >
              <Paragraph type="book" ml={8}>{'End after: '}</Paragraph>
              <DateLabel ml={8}>{`${values.endAfterTotalAppointment}`}</DateLabel>
              <Paragraph color={COLORS.black} ml={2}>{'Appointments'}</Paragraph>
            </Box>
          </Radio>
          {values.repeatEndOptions === 1 && (
            <FlatList
              data={COUNT}
              initialScrollIndex={0}
              getItemLayout={getItemLayout}
              keyExtractor={(day) => `${day.value}`}
              horizontal
              renderItem={({ item: day }) => (
                <PillButton
                  text={day.label}
                  onPress={() => setFieldValue('endAfterTotalAppointment', day.value)}
                  active={values.endAfterTotalAppointment === day.value}
                />
              )}
              style={styles.repeatDatepicker}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={() => <Box w={32} />}
              ListFooterComponent={() => <Box w={32} />}
            />
          )}
        </Box>
        <Button
          text={I18n.t('common.continue')}
          onPress={handleSubmit}
          buttonStyle={styles.continue}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { RepeatModal };
