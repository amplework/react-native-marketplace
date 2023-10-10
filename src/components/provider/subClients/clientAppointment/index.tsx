import { translations } from 'locales';
import moment from 'moment-timezone';
import * as RNLocalize from "react-native-localize";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Navigator } from 'service/navigator';
import Button from 'shared/button';
import { getValueOrNA } from 'utils/fields';

import styles from './style';

export interface Props {
  details: any;
  appointments: any;
  scrollRef: any;
  onEnd: boolean;
  onMore: () => void;
  setEnd: (value: boolean) => void;
}

const ClientAppointment: React.FC<Props> = ({
  details,
  appointments,
  scrollRef,
  onMore,
  onEnd,
  setEnd,
}) => {
  const { t } = useTranslation();
  let timezone = RNLocalize.getTimeZone();
  
  const providerData = useSelector((state: State) => state.provider.provider);
  
  const providerTimezone = providerData?.address?.utctimezone
  
  let formatTime = (date: any) => moment.tz(date, providerTimezone).format('hh:mm A');
  const renderAppointment = (item: any) => {
    const { product, startDate, id } = item;
    const date = moment(startDate).format('LL');
    // const time = moment(startDate).format('LT');    

    return (
      <TouchableOpacity
        style={[styles.appointmentContainer, styles.shadow]}
        onPress={() =>
          // Navigator.navigate('CalendarStack', {
          //   screen: 'AppointmentDetails',
          //   params: { id },
          // })
          Navigator.navigate('AppointmentDetails', {
            id: id
          })
        }
      >
        <View>
          <Text style={styles.appointmentTitle}>
            {getValueOrNA(product?.name)}
          </Text>
          <Text style={styles.appointmentDate}>{`${date} | ${formatTime(startDate, timezone)}`}</Text>
        </View>
        <Image
          source={require('assets/global/arrowRight.png')}
          style={styles.arrow}
        />
      </TouchableOpacity>
    );
  };  

  const { firstName, lastName, id, phoneNumber, photo } = details;

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={[styles.buttonSpace, styles.shadow]}
        textStyle={styles.buttonTitle}
        text={t(translations.appAppointments.addForClient, {
          client: firstName,
        })}
        image={require('assets/global/add.png')}
        onPress={() =>
          Navigator.navigate('AddAppointment', {
            subProfile: {
              firstName,
              lastName,
              id,
              phoneNumber,
              photo,
            },
            selectedDayStart: moment.utc(new Date()).startOf('day'),
            selectedDayEnd: moment.utc(new Date()).endOf('day'),
          })
        }
      />
      <FlatList
        ref={scrollRef}
        data={appointments || []}
        ListFooterComponent={() => <View style={styles.bottomContainer} />}
        renderItem={({ item }) => renderAppointment(item)}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!onEnd) {
            onMore();
            setEnd(true);
          }
        }}
        onMomentumScrollBegin={() => setEnd(false)}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default ClientAppointment;
