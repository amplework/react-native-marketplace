import { translations } from 'locales';
import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { days, parseDate, todayOrDate } from 'utils/dates';

import { scheduleBadgeStyles as S } from './style';
import { ToggleWithIcon } from 'shared/toggle';

type Props = {
  date: Date | any;
  onReset: () => void;
  value?: number;
  loading?: boolean;
  isClient?: boolean;
  counter?: string;
  isHomeScreen?: boolean;
  manageDaySwitch?: boolean;
  onPressSwitch?: () => void;
};

const ScheduleBadge: React.FC<Props> = ({
  date,
  value = 0,
  loading = false,
  onReset,
  isClient,
  counter,
  isHomeScreen,
  onPressSwitch,
  manageDaySwitch,
}) => {
  const { t } = useTranslation();

  const be = days.isSameOrAfter(parseDate(date), parseDate())
    ? t(translations.common.is)
    : t(translations.common.was);

  const isDifferentDate =
    moment(date).format('DD-MM-YYYY') !== moment().format('DD-MM-YYYY');

  const ResetCalendar = () => {
    return (
      <View>
        <TouchableOpacity onPress={onReset}>
          <Image
            source={require('assets/global/calendar.png')}
            style={{ width: 20, height: 18 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const ScheduleText = () => {
    return (
      <>
        <Paragraph size="s" type="book" color={COLORS.eerieBlack}>
          {t(translations.scheduleBadge.yourSchedule, { be })}
        </Paragraph>
        <Paragraph size="s" type="bold" color={getBackgroundColor(value)}>
          {t(getBadgeLabel(value))}
        </Paragraph>
        <Paragraph size="s" type="book" color={COLORS.eerieBlack}>
          {todayOrDate(date, { prefix: t(translations.common.on) })}
        </Paragraph>
      </>
    );
  };

  return (
    <View style={S.scheduleBadge}>
      <>
        {isClient ? (
          <Box row jc="center" pv={5} bc={COLORS.orange10} r={5} ai={'center'}>
            <Paragraph size="s" type="book" color={COLORS.eerieBlack}>
              {counter}
            </Paragraph>
            {isHomeScreen && isDifferentDate ? (
              <Box ml={30}>
                <ResetCalendar />
              </Box>
            ) : null}
          </Box>
        ) : (
          <Box row pv={5} bc={COLORS.orange10} r={5} ai={'center'}>
            {isHomeScreen ? (
              <>
                <Box w={'100%'} row ai={'center'} jc="center">
                  <ScheduleText />
                  {isDifferentDate ? (
                    <Box ml={30}>
                      <ResetCalendar />
                    </Box>
                  ) : null}
                </Box>
              </>
            ) : (
              <>
                <Box w={'85%'} row ai={'center'} jc="center">
                  <ScheduleText />
                </Box>
                <Box w={'15%'} pr={20} row ai={'center'} jc={'center'}>
                  {!isHomeScreen && (
                    <ToggleWithIcon
                      checked={manageDaySwitch}
                      onChange={onPressSwitch}
                      activeIcon={require('assets/global/reorder.png')}
                      inactiveIcon={require('assets/global/outlinedTime.png')}
                    />
                  )}
                </Box>
              </>
            )}
          </Box>
        )}
      </>
    </View>
  );
};

export { ScheduleBadge };

const getBackgroundColor = (percentage: number) => {
  if (percentage < 30) {
    return COLORS.clearBlue;
  }

  if (percentage < 70) {
    return COLORS.greenblue;
  }

  return COLORS.orange;
};

const getBadgeLabel = (percentage: number) => {
  if (percentage < 30) {
    return translations.scheduleBadge.status.lite;
  }

  if (percentage < 70) {
    return translations.scheduleBadge.status.normal;
  }

  return translations.scheduleBadge.status.busy;
};
