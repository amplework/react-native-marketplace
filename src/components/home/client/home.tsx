import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { getClientProfile } from 'store/actions/client';
import { appointmentsSelector, getClientAppointments } from 'store/entities/appointments';
import { salesSpecialSelectors, getClientSalesSpecials, getClientMoreSpecials } from 'store/entities/salesSpecial';
import { theme } from 'theme';
import COLORS from 'utils/colors';
import { formatApiDate, years, parseDate } from 'utils/dates';

import { HomeHeader } from './components/homeHeader';
import { HomeIndustries } from './components/homeIndustries';
import { HomeSearchBar } from './components/homeSearchBar';
import { MoreSpecials } from './components/moreSpecials';
import { TopSpecials } from './components/topSpecials';
import { UpcomingAppointmentsBadge } from './components/upcomingAppointmentsBadge';

const Home: React.FC = () => {
  const appointments = useSelector(appointmentsSelector.clientAppointments);
  const upcomingAppointments = appointments.filter((e: any) => moment().toISOString() <= e.startDate);
  const clientSalesSpecialsTopFive = useSelector(salesSpecialSelectors.clientSalesSpecialsTopFive);
  const clientSalesSpecialsList = useSelector(salesSpecialSelectors.clientSalesSpecialsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientProfile())
    dispatch(getClientSalesSpecials());
    dispatch(getClientMoreSpecials());
  }, [dispatch])

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getClientAppointments({
          limit: 100,
          order: 'ASC',
          fromDate: moment().format('YYYY-MM-DD'), //formatApiDate(parseDate()),
          toDate: formatApiDate(years.increment(parseDate())),
          // isUpcoming: true,
          status: 'scheduled',
        }),
      );
      // dispatch(getClientSalesSpecials());
      // dispatch(getClientMoreSpecials());
    }, [dispatch]),
  );

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <Box pv={20} ph={24} bc={COLORS.white}>
        <HomeHeader />
        <HomeSearchBar />
      </Box>
      {upcomingAppointments?.length > 0 && <UpcomingAppointmentsBadge />}
      <ScrollView style={theme.styles.safeView}>
        {(clientSalesSpecialsTopFive?.length > 0) && (
          <TopSpecials />
        )}
        <HomeIndustries />
        {(clientSalesSpecialsList?.length > 0) && (
          <MoreSpecials />
        )}
      </ScrollView>
    </SafeContainer>
  )
};

export { Home };