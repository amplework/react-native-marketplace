import {
  checkWorkStatus,
  parseWorkingTime,
} from 'components/providers/helpers/dates';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { providersSelectors } from 'store/entities/providers';
import { formatDatetime, formatTime, range } from 'utils/dates';

import { styles } from '../style';
import { capitalize } from 'utils/strings';
import COLORS from 'utils/colors';
import moment from 'moment';
import { DAYS_SCHEDULE } from 'utils/constants';
import { isSmallDevice } from 'utils/device';

const BusinessDetailsSection: React.FC = () => {
  const provider: any = useSelector(providersSelectors.provider);

  const calendarSettings = provider?.calendarSettings;
  const closedDays = provider?.closedDays;
  const weekDays = calendarSettings?.weekdayTimes;

  console.log("weekDays === >> ", weekDays);


  const dayStart = provider?.calendarSettings?.dayStart || '';
  const dayEnd = provider?.calendarSettings?.dayEnd || '';
  const utcOffset = provider?.calendarSettings?.utcOffset;

  const { t } = useTranslation();

  const toDay = moment.tz(provider?.address?.utctimezone).format('dddd').toLowerCase();

  const updatedData = weekDays ? DAYS_SCHEDULE.map((day: any) => {
    const matchingDatabaseDay = weekDays.find(
      (dbDay: any) => dbDay.weekDay === day.weekDay,
    );
    if (matchingDatabaseDay) {
      return Object.assign({}, day, matchingDatabaseDay);
    }
    return day;
  }) : DAYS_SCHEDULE;

  const parsedDayStart = parseWorkingTime(dayStart, utcOffset);
  const parsedDayEnd = parseWorkingTime(dayEnd, utcOffset);
  const isOpened = checkWorkStatus({ calendarSettings, closedDays });
  const workingStatus = isOpened
    ? t(translations.providers.currentlyOpened)
    : t(translations.providers.currentlyClosed);
  const houseCallStatus = provider?.isHouseCallAllowed
    ? t(translations.providers.ableToProvideServices)
    : t(translations.providers.unableToProvideServices);

  const formattedLastAppointmentDate = provider?.lastAppointmentDate
    ? formatDatetime(provider?.lastAppointmentDate)
    : ' ';
  const formattedUpcomingAppointmentDate = provider?.upcomingAppointmentDate
    ? formatDatetime(provider?.upcomingAppointmentDate)
    : ' ';

  return (
    <>
      <Box row jc="space-between" mb={12}>
        <Paragraph size="s" type="book">
          {t(translations.providers.businessDetails)}
        </Paragraph>
        <Box row>
          <Icon src={require('assets/global/timer.png')} size={20} mr={8} />
          <Paragraph size="s" type="book">
            {workingStatus}
          </Paragraph>
        </Box>
      </Box>
      <View style={styles.card}>
        <Box pr={24} mb={16}>
          <Paragraph size="s" type="book" mb={4}>
            {t(translations.providers.category)}
          </Paragraph>
          <Paragraph>{provider?.industry.name || ''}</Paragraph>
        </Box>
        <Separator mb={16} />
        <Box pr={24} mb={16}>
          <Paragraph size="s" type="book" mb={4}>
            {t(translations.providers.shopName)}
          </Paragraph>
          <Paragraph>{provider?.businessName || ''}</Paragraph>
        </Box>
        <Separator mb={16} />
        <Box pr={24} mb={16}>
          <Paragraph size="s" type="book" mb={4}>
            {t(translations.providers.houseCall)}
          </Paragraph>
          <Paragraph>{houseCallStatus}</Paragraph>
        </Box>
        <Separator mb={16} />
        <Box pr={24} mb={16}>
          <Paragraph size="s" type="book" mb={4}>
            {t(translations.providers.workingHours)}
          </Paragraph>
          {weekDays ? (
            updatedData.map((item: any, index: number) => {
              const isToday = toDay == item.weekDay;
              const isDayMatching = weekDays.some(
                (dbDay: any) => dbDay.weekDay === item.weekDay,
              );
              return (
                <Box key={index} w={'100%'} jc={'space-between'} row>
                  <Paragraph size={isSmallDevice ? 's' : 'm'}>
                    {capitalize(item.weekDay)}
                  </Paragraph>
                  <Paragraph size={isSmallDevice ? 's' : 'm'} color={isToday ? (isDayMatching ? COLORS.clearBlue : COLORS.orange) : (isDayMatching ? COLORS.warmGrey : COLORS.orange)}>
                    {isDayMatching ?
                      range(formatTime, { from: parseWorkingTime(item.startTime, utcOffset), to: parseWorkingTime(item.endTime, utcOffset) })
                      : 'Closed'}
                  </Paragraph>
                </Box>
              )
            })
          ) : (
            <>
              <Paragraph>
                {range(formatTime, { from: parsedDayStart, to: parsedDayEnd })}
              </Paragraph>
            </>
          )}
        </Box>
        <Separator mb={16} />
        <Box pr={24} mb={16}>
          <Paragraph size="s" type="book" mb={4}>
            {t(translations.providers.lastAppointment)}
          </Paragraph>
          <Paragraph>{formattedLastAppointmentDate}</Paragraph>
        </Box>
        <Separator mb={16} />
        <Box pr={24}>
          <Paragraph size="s" type="book" mb={4}>
            {t(translations.providers.upcomingAppointment)}
          </Paragraph>
          <Paragraph>{formattedUpcomingAppointmentDate}</Paragraph>
        </Box>
      </View>
    </>
  );
};

export { BusinessDetailsSection };
