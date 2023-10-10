import RenderAppointment from 'components/providerCalendar/renderAppointment';
import { useToggleState } from 'hooks';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { EmptyState } from 'shared/emptyState';
import { Icon } from 'shared/icon';
import { Spin } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import moment from 'moment';
import { appointmentsSelector } from 'store/entities/appointments';
import { homeSelectors } from 'store/entities/home';
import COLORS from 'utils/colors';
import { formatDate, todayOrDate } from 'utils/dates';

import { homeStyles as S } from '../style';

const AppointmentsList: React.FC = () => {
  const selectedDate: any = useSelector(homeSelectors.selectedDate);
  const appointments = useSelector(appointmentsSelector.appointments);
  const total = useSelector(appointmentsSelector.total);
  const loading = useSelector(appointmentsSelector.loading);

  const [collapsed, toggleCollapsed] = useToggleState(false);

  const { t } = useTranslation();

  const navigateToCalendar = () =>
    Navigator.navigate('Calendar', {
      screen: 'Calendar',
      params: { date: selectedDate },
    });

  let upComingAppointments = appointments.filter((e: any) => moment().toISOString() <= e.startDate);

  let topAppointments = upComingAppointments?.length > 3 ? upComingAppointments?.slice(0, 3) : upComingAppointments;

  let isSameDay = moment(selectedDate).isSame(moment().format(), 'date')
  
  var titleApp = '';  

  if(moment(selectedDate).isSameOrAfter(moment().format(''), 'date')) {   
    if(isSameDay) {   
      if(upComingAppointments?.length > 0) {
        titleApp = t(translations.home.nextUpcomingAppointments, {count: upComingAppointments?.length, date: todayOrDate(selectedDate)});
      } else {
        titleApp = t(translations.home.noMoreAppointments, {date: todayOrDate(selectedDate)});
      }
    } else {
      if(total == 0) {
        titleApp = t(translations.home.noAppointments, {date: todayOrDate(selectedDate)});
      } else {
        titleApp = t(translations.home.nextAppointments, {count: total, date: todayOrDate(selectedDate)});
      }
    }
  } else {
    titleApp = t(translations.home.previousAppointments, {
      count: total,
      date: formatDate(selectedDate),
    });
  }

  // const title = moment(selectedDate).isSameOrAfter(moment().format(''), 'date')
  //   ? t(total == 0 ? translations.home.noAppointments :
  //     (
  //       isSameDay ? (
  //         upComingAppointments?.length > 0 ? translations.home.nextUpcomingAppointments :
  //           translations.home.noMoreAppointments
  //       ) : (
  //         translations.home.nextAppointments
  //       )
  //     ), {
  //     count: upComingAppointments?.length > 0 ? upComingAppointments?.length : total,
  //     date: todayOrDate(selectedDate),
  //   })
  //   : t(translations.home.previousAppointments, {
  //     count: total,
  //     date: formatDate(selectedDate),
  //   });

  const renderList = () =>
    appointments.length ? (
      <>
        {topAppointments.map((appointment) => (
          <RenderAppointment
            key={appointment.id}
            item={appointment}
            showDetailsInfo={false}
          />
        ))}
        <TouchableOpacity onPress={navigateToCalendar} style={S.showAllButton}>
          <Paragraph color={COLORS.orange}>
            {t(translations.home.showAllAppointments)}
          </Paragraph>
        </TouchableOpacity>
      </>
    ) : (
      <EmptyState
        type="short"
        entities={t(translations.common.entities.appointments)}
        ph={24}
      />
    );

  if (loading) {
    return <Spin size="l" />;
  }

  return (
    <Box mb={16}>
      <Pressable row ai="center" onPress={toggleCollapsed} mh={24} mb={12}>
        <Paragraph size="s" type="book">
          {titleApp}
        </Paragraph>
        <Icon
          src={
            collapsed
              ? require('assets/global/arrowRight.png')
              : require('assets/global/arrowDown.png')
          }
        />
      </Pressable>
      {!collapsed && renderList()}
    </Box>
  );
};

export { AppointmentsList };