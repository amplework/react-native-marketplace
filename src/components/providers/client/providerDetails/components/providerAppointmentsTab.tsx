import { useFocusEffect } from '@react-navigation/core';
import { LIMIT } from 'api';
import { translations } from 'locales';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import {
  getAppointments,
  providersSelectors,
  refreshAppointments,
} from 'store/entities/providers';
import { IAppointment } from 'types/appointments';
import COLORS from 'utils/colors';

import { styles } from '../style';
import { ProviderAppointmentsItem } from './providerAppointmentsItem';

const ProviderAppointmentsTab: React.FC = () => {
  const provider = useSelector(providersSelectors.provider)!;
  const appointments = useSelector(providersSelectors.appointments);

  const loading = useSelector(providersSelectors.appointmentsLoading);
  const refreshing = useSelector(providersSelectors.appointmentsRefreshing);
  const offset = useSelector(providersSelectors.appointmentsOffset);
  const total = useSelector(providersSelectors.appointmentsTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      dispatch(refreshAppointments(provider.id));
    }, [dispatch, provider.id]),
  );

  const refresh = () => dispatch(refreshAppointments(provider.id));

  const loadMore = () => {
    if (appointments.length < total) {
      dispatch(getAppointments({ id: provider.id, offset: offset + LIMIT }));
    }
  };

  const handlePress = (appointment: IAppointment) => () =>
    Navigator.navigate('AppointmentDetails', { id: appointment.id });

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item: appointment }) => (
        <ProviderAppointmentsItem
          appointment={appointment}
          onPress={handlePress(appointment)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.appointments)}
          ph={24}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loading ? COLORS.clearBlue : COLORS.transparent}
          style={styles.loader}
        />
      )}
    />
  );
};

export { ProviderAppointmentsTab };
