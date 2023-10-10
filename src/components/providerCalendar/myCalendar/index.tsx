import { LABELS } from 'components/providerCalendar/labels';
import RenderAppointment from 'components/providerCalendar/renderAppointment';
import RenderAppointmentClient from 'components/clientCalendar/renderAppointment';
import { translations } from 'locales';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from 'shared/button';
import { EmptyState } from 'shared/emptyState';
import { useSelector } from 'react-redux';
import { userSelectors } from 'store/entities/user';
import { isClient } from 'types/users';
import { CalendarPlaceholder } from 'shared/icon/icons';
import { ScheduleBadge } from 'shared/scheduleBadge';
import { formatDate, todayOrDate } from 'utils/dates';

import { WeeklyStatistics } from '../weeklyStatistics';
import styles from './style';
import { appointmentsSelector } from 'store/entities/appointments';
import { Navigator } from 'service/navigator';
import { Separator } from 'shared/separator';
import { Paragraph } from 'shared/paragraph';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import RenderManagedAppointment from '../renderManagedAppointment';
import { calendarSetupSelectors } from 'store/entities/calendarSetup';

export interface Props {
  listRef?: any;
  date?: any;
  loading?: boolean;
  appointments: any;
  details?: boolean;
  onPress: () => void;
  timeRange?: boolean;
  showStatus?: boolean;
  statistics?: boolean;
  busySchedule?: number;
  managedAppointments?: any;
  detailedCounter?: boolean;
  onResetCalendar: () => void;
}

const MyCalendar: React.FC<Props> = ({
  listRef,
  date,
  busySchedule,
  statistics = false,
  appointments,
  onPress,
  onResetCalendar,
  details = false,
  timeRange = false,
  showStatus = false,
  managedAppointments,
}) => {
  const { t } = useTranslation();
  const user = useSelector(userSelectors.user);
  const isUserClient = isClient(user);
  const total = useSelector(appointmentsSelector.total);
  const settings = useSelector(calendarSetupSelectors.settings);
  const scheduledAppointments = appointments.filter(
    (e: any) => e.status !== 'pending',
  );

  const currentWeekDay = moment(date).format('dddd').toLowerCase();
  const weekDayTime = settings?.weekdayTimes.filter((item: any) => item?.weekDay === currentWeekDay);
  const dayStartTime = weekDayTime?.length ? weekDayTime[0].startTime : settings?.dayStart;

  const [toggle, setToggle] = useState(false);

  const getStartHour = moment(dayStartTime, 'HH:mm').get('hours');
  const getStartMinute = moment(dayStartTime, 'HH:mm').get('minutes');

  const currentSelectedDate = moment(date).hours(getStartHour).minutes(getStartMinute).toLocaleString();

  const findNearestTimeSlotIndex = () => {
    const formattedDayStartTime = new Date(currentSelectedDate);

    for (let i = 0; i < managedAppointments.length; i++) {
      const startTime = new Date(managedAppointments[i].startTime);
      const endTime = new Date(managedAppointments[i].endTime);

      if (formattedDayStartTime >= startTime && formattedDayStartTime < endTime) {
        return i;
      }
    }

    return 0;
  };

  const index = !user ? 0 : isUserClient ? 0 : findNearestTimeSlotIndex();

  const getItemLayout = (data: any, index: any) => {
    return { length: 81, offset: 81 * index, index };
  };

  useEffect(() => {
    if (!isUserClient && (managedAppointments?.length > 0) && (listRef.current !== null) && (index > 0)) {
      listRef.current.scrollToIndex({ animated: true, index: index });
    } else {
      return;
    }
  }, [toggle, date])

  let upComingAppointments = scheduledAppointments.filter(
    (e: any) => moment().toISOString() <= e.startDate,
  );

  let isSameDay = moment(date).isSame(moment().format(), 'date');

  var counterTitle = '';

  if (moment(date).isSameOrAfter(moment().format(''), 'date')) {
    if (isSameDay) {
      if (upComingAppointments?.length > 0) {
        counterTitle = t(translations.home.nextUpcomingAppointments, {
          count: upComingAppointments?.length,
          date: todayOrDate(date),
        });
      } else {
        counterTitle = t(translations.home.noMoreAppointments, {
          date: todayOrDate(date),
        });
      }
    } else {
      if (total == 0) {
        counterTitle = t(translations.home.noAppointments, {
          date: todayOrDate(date),
        });
      } else {
        counterTitle = t(translations.home.nextAppointments, {
          count: total,
          date: todayOrDate(date),
        });
      }
    }
  } else {
    counterTitle = t(translations.home.previousAppointments, {
      count: total,
      date: formatDate(date),
    });
  }

  return (
    <>
      {date && (
        <ScheduleBadge
          counter={counterTitle}
          isClient={isUserClient}
          date={date}
          value={busySchedule}
          loading={false}
          isHomeScreen={isUserClient ? true : false}
          onReset={onResetCalendar}
          manageDaySwitch={toggle}
          onPressSwitch={() => setToggle(!toggle)}
        />
      )}

      {(toggle && !isUserClient) ? (
        <View style={{ flex: 1 }}>
          <FlatList
            ref={listRef}
            keyExtractor={(item, index: number) => index.toString()}
            data={managedAppointments}
            getItemLayout={getItemLayout}
            renderItem={({ item, index }: any) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Navigator.navigate('AddAppointment', {
                      startSlotTime: item?.startTime,
                      endSlotTime: item?.endTime,
                    });
                  }}
                  style={[
                    styles.manageDayCardContainer,
                    {
                      borderBottomWidth:
                        index == managedAppointments?.length - 1 ? 1 : 0,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.timeSlotContainer,
                      item?.data?.length == 0 &&
                      styles.extraTimeSlotContainerStyle,
                    ]}
                  >
                    <Text style={styles.timeSlotText}>
                      {moment(item.startTime)
                        .format('LT')
                        .replace(' ', '\n')
                        .toLowerCase()}
                    </Text>
                  </View>
                  <View style={styles.cardContainer}>
                    {item?.data?.length ? (
                      item?.data.map((dataItem: any) => {
                        return (
                          <RenderManagedAppointment
                            key={dataItem.id}
                            item={dataItem}
                          />
                        );
                      })
                    ) : (
                      <View style={styles.manageDayCard} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={{ paddingHorizontal: 24 }}>
            <Button
              buttonStyle={[styles.buttonSpace, styles.shadow]}
              textStyle={styles.buttonTitle}
              text={LABELS.addAppointment}
              image={require('assets/global/add.png')}
              onPress={onPress}
            />
          </View>
          {statistics && <WeeklyStatistics />}
          {appointments.length ? (
            appointments?.map((item: any) =>
              isUserClient ? (
                <RenderAppointmentClient
                  key={item.id}
                  item={item}
                  showDetailsInfo={details}
                  showStatus={showStatus}
                />
              ) : (
                <RenderAppointment
                  key={item.id}
                  item={item}
                  showDetailsInfo={details}
                  showStatus={showStatus}
                  timeRange={timeRange}
                />
              ),
            )
          ) : (
            <>
              <EmptyState
                type="image"
                image={<CalendarPlaceholder />}
                header={t(translations.calendar.placeholder.header)}
                description={t(translations.calendar.placeholder.description)}
                mt={35}
                ph={35}
              />
              {
                isUserClient ? null : (
                  <>
                    <Box mh={30}>
                      <Separator mt={30} />
                    </Box>
                    <Box flex row jc="center" ai="center">
                      <Paragraph size="s" type="book" mt={15}>
                        {t(translations.calendar.placeholder.bottomDescription)}
                      </Paragraph>
                      <Icon src={require('assets/global/toggle.png')} mt={15} size={30} />
                    </Box>
                  </>
                )
              }
            </>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default MyCalendar;
