import { LABELS } from 'components/providerCalendar/labels';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { Alpha } from 'shared/icon';
import { Appointment } from 'types/appointments';
import { ellipsize, getFullName } from 'utils/strings';

import styles from './style';

export interface Props {
  item: Appointment;
  showDetailsInfo?: boolean;
  showStatus?: boolean;
  timeRange?: boolean;
}

const RenderAppointment: React.FC<Props> = ({
  item,
  showDetailsInfo = true,
  showStatus = false,
  timeRange = false,
}) => {
  const {
    clientSubprofile,
    provider,
    client,
    status,
    product,
    hasClientCheckedIn,
    startDate,
    endDate
  } = item;

  const {
    firstName = LABELS.noData,
    lastName,
    photo = undefined,
  } = clientSubprofile || provider || client || LABELS.noData;

  const providerData = useSelector((state: any) => state.provider.provider);

  const compareName = getFullName({ firstName, lastName });
  const title =
    status === 'blocked'
      ? LABELS.blocked
      : provider
      ? compareName
      : client
      ? compareName
      : !clientSubprofile
      ? LABELS.noClient
      : compareName;   

  const providerTimezone = providerData?.address?.utctimezone
      
  const formatDate = (date: any, format: string) => moment(date).format(format);

  const handlePress = () =>
    provider || (status === 'scheduled' || 'blocked')
      ? Navigator.navigate('AppointmentDetails', { id: item.id })
      : Navigator.navigate('AppointmentRequestDetails', { id: item.id });        

  return (
    <TouchableOpacity
      style={[
        styles.appointmentContainer,
        styles.shadow,
        status === 'blocked' && styles.blockedContainer,
      ]}
      onPress={handlePress}
    >
      <View style={styles.rowSpace}>
        <View style={styles.row}>
          <Image
            source={
              photo
                ? { uri: photo }
                : require('assets/global/defaultAvatar.jpg')
            }
            style={styles.avatar}
          />
          <View>
            <Box row ai="center">
              <Text style={styles.appointmentTitle}>{title}</Text>
              {clientSubprofile?.isConnected ? clientSubprofile?.isDisconnect == false ? <Alpha size={12} /> : null : null}
            </Box>
            {timeRange ? (
              <Text style={styles.appointmentDate}>
                {(product?.name ? ellipsize(product?.name, 20) + ': ' : '') +
                  formatDate(startDate, 'LT') + ' - ' + formatDate(endDate, 'LT')}
              </Text>
            ) : (
              <Text style={styles.appointmentDate}>
                {(product?.name ? ellipsize(product?.name, 20) + ' at ' : '') +
                  formatDate(startDate, 'LT')}
              </Text>
            )}
          </View>
        </View>
        <Image
          source={require('assets/global/arrowRight.png')}
          style={styles.arrow}
        />
      </View>
      {showDetailsInfo && (
        <View>
          <View
            style={[styles.separator, status === 'blocked' && styles.dark]}
          />
          <View style={styles.rowSpace}>
            <Text style={styles.dateUnder}>
              {LABELS.date}
              <Text style={styles.timeUnder}>
                {formatDate(startDate, 'llll')}
              </Text>
            </Text>
            {showStatus && (
              <View
                style={[
                  styles.statusContainer,
                  status === 'pending' && styles.borderPending,
                  hasClientCheckedIn && styles.checkedIn,
                ]}
              >
                <Text style={styles.statusText}>{getStatus(item)}</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderAppointment;

const getStatus = (appointment: Appointment) => {
  if (appointment.hasClientCheckedIn) {
    return LABELS.checkedIn;
  }

  if (appointment.status === 'scheduled') {
    return LABELS.confirmed;
  }

  return appointment.status.toUpperCase();
};
