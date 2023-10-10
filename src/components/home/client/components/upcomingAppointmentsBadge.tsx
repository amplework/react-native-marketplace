import { translations } from 'locales';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Avatar } from 'shared/avatar';
import { AvatarGroup } from 'shared/avatar';
import { Box } from 'shared/box';
import { ArrowForward } from 'shared/icon/icons';
import { Paragraph } from 'shared/paragraph';
import {
  appointmentsSelector,
} from 'store/entities/appointments';
import COLORS from 'utils/colors';

import { homeStyles as S } from '../style';

const MAX_PROVIDERS_PREVIEW_SIZE = 3;

const UpcomingAppointmentsBadge: React.FC = () => {
  const appointments = useSelector(appointmentsSelector.clientAppointments);
  // const total = useSelector(appointmentsSelector.total);
  const loading = useSelector(appointmentsSelector.loading); 
  const upcomingAppointments = appointments.filter((e: any) => moment().toISOString() <= e.startDate);  

  const { t } = useTranslation();

  const navigateToCalendar = () =>
    Navigator.navigate('CalendarStack', {
      screen: 'Calendar',
      params: { date: upcomingAppointments?.[0]?.startDate },
    });

  if (loading || !appointments.length) {
    return null;
  }  

  return (
    <TouchableOpacity
      onPress={navigateToCalendar}
      style={S.upcomingAppointmentsBadge}
    >
      <Box row ai="center">
        <AvatarGroup size={32} mr={10}>
          {upcomingAppointments
            .slice(0, MAX_PROVIDERS_PREVIEW_SIZE)
            .map((appointment) => (
              <Avatar
                key={appointment.id}
                src={appointment.provider.photo}
                size={32}
                border={COLORS.opaqueOrange}
              />
            ))}
        </AvatarGroup>
        <Box>
          <Paragraph size="s">
            {t(translations.home.upcomingAppointments, { count: upcomingAppointments.length })}
            {/* {t(translations.home.upcomingAppointments, { count: total })} */}
          </Paragraph>
          <Paragraph size="s" type="book">
            {t(translations.home.manageBookings)}
          </Paragraph>
        </Box>
      </Box>
      <View style={S.arrowForward}>
        <ArrowForward />
      </View>
    </TouchableOpacity>
  );
};

export { UpcomingAppointmentsBadge };