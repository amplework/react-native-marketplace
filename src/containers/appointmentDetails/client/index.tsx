import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { alert } from 'shared/alert';
import { Box } from 'shared/box';
import Button from 'shared/button';
// import { EmptyState } from 'shared/emptyState';
import { MainPageTemplate } from 'shared/templates';
import { checkInAppointment } from 'store/actions/appointments';
import {
  appointmentsSelector,
  deleteAppointment,
  getAppointment,
} from 'store/entities/appointments';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';

import { appointmentsStyles as S } from '../style';
import { Loader } from 'shared/loader';

type Props = StackScreenProps<RootStackParamList, 'AppointmentDetails'>;

const AppointmentDetails: React.FC<Props> = ({ navigation, route }: any) => {
  const appointment: any = useSelector(appointmentsSelector.appointment);
  const appointmentLoading = useSelector(appointmentsSelector.appointmentLoading);
  const deleteLoading = useSelector(appointmentsSelector.deleteLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    provider,
    status = '',
    startDate,
    endDate,
    remindClient = 0,
    hasClientCheckedIn,
  } = appointment || {};
  const {
    firstName = '',
    lastName = '',
    photo,
    phoneNumber,
    address,
  } = provider || {};

  const headerButton = (action: any, image: any, style?: any) => (
    <TouchableOpacity onPress={action}>
      <Image style={[S.imagePerfomance, style]} source={image} />
    </TouchableOpacity>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () =>
        appointment && (
          <View style={S.row}>
            {headerButton(
              () =>
                alert.deletion({
                  entity: t(translations.common.entities.appointment),
                  onDelete: () =>
                    dispatch(deleteAppointment({ id: route?.params?.id })),
                }),
              require('assets/global/deleteGray.png'),
              S.imageSearch,
            )}
          </View>
        ),
      headerLeft: () =>
        headerButton(
          navigation.goBack,
          require('assets/global/back.png'),
          S.back,
        ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getAppointment(route?.params?.id));
  }, [route?.params?.id]);

  const renderItem = (text: string, value: string, textStyle?: any) => (
    <>
      <View style={[S.rowSpace, { marginTop: 0 }]}>
        <Text style={S.titleValue}>{text}</Text>
        <Text style={[S.value, textStyle]}>{value}</Text>
      </View>
      <View style={S.separator} />
    </>
  );

  const onCall = (phone: string) => {
    if (phone) {
      return LinkingHelper.telprompt(phone);
    }

    alert.info(t(translations.common.alerts.mobileWarning));
  };

  const handleOpenMaps = () => {
    if (address) {
      const { location, formattedAddress } = address;

      return LinkingHelper.maps({ ...location, place: formattedAddress });
    }

    alert.info(t(translations.appAppointments.addressNotProvided));
  };

  return (
    <MainPageTemplate bc={COLORS.white}>
      {appointmentLoading ? (
        <Loader loading={appointmentLoading} />
      ) : (
        <>
          <ScrollView
            style={S.scrollContainer}
            contentContainerStyle={S.extraBottom}
          >
            <View style={S.clientContainer}>
              <View style={S.row}>
                <Image
                  source={
                    photo
                      ? { uri: photo }
                      : require('assets/global/defaultAvatar.jpg')
                  }
                  style={S.avatar}
                />
                <View>
                  <Text style={S.userName}>
                    {getFullName({ firstName, lastName })}
                  </Text>
                  <Text style={S.userPhone}>
                    {provider?.businessName || ''}
                  </Text>
                </View>
              </View>
              {phoneNumber && (
                <TouchableOpacity onPress={() => onCall(phoneNumber)}>
                  <Image
                    source={require('assets/global/callGrey.png')}
                    style={S.callImage}
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text style={S.titleContainer}>Appointment Details</Text>
            <View style={S.infoContainer}>
              {renderItem(
                'Status',
                status === 'scheduled' ? 'CONFIRMED' : status?.toUpperCase(),
                {
                  color:
                    status === 'pending' ? COLORS.orange : COLORS.greenblue,
                },
              )}
              {renderItem('Service', appointment?.product?.name)}
              {renderItem('Business Name', provider?.businessName || '')}
              {renderItem('Date', moment(startDate).format('MMM Do YYYY'))}
              {renderItem('Time', moment(startDate).format('LT'))}
              {renderItem(
                'Alert Me',
                !remindClient
                  ? t(translations.common.labels.noRemind)
                  : remindClient < 60
                    ? t(translations.common.time.min, { count: remindClient })
                    : t(translations.common.time.hour, {
                      count: remindClient / 60,
                    }),
              )}
              {renderItem(
                'Expected Duration',
                (
                  (new Date(endDate).getTime() -
                    new Date(startDate).getTime()) /
                  1000 /
                  60
                ).toString() + ' mins',
              )}
              <View>
                <Text style={S.titleValue}>Notes</Text>
                <Text style={S.value}>{appointment?.notes || ''}</Text>
              </View>
            </View>
            <Box ai="flex-end" mh={24} mt={16}>
              <Button
                text={t(translations.appAppointments.getDirection)}
                image={require('assets/global/direction.png')}
                onPress={handleOpenMaps}
                buttonStyle={S.directionButton}
                textStyle={S.directionButtonText}
              />
            </Box>
          </ScrollView>
          {new Date(endDate).getTime() >= new Date().getTime() && (
            <View style={S.bottomBlock}>
              {new Date(startDate).setHours(0, 0, 0, 0) ===
                new Date().setHours(0, 0, 0, 0) &&
                status === 'scheduled' &&
                !hasClientCheckedIn && (
                  <Button
                    text="Check In"
                    onPress={() => dispatch(checkInAppointment(appointment.id))}
                    buttonStyle={S.btnCheckIn}
                    textStyle={S.textTrial}
                  />
                )}
              {new Date().getTime() < new Date(startDate).getTime() && (
                <Button
                  onPress={() =>
                    navigation.navigate('AddAppointment', {
                      appointmentId: appointment.id,
                    })
                  }
                  text={'Edit Appointment'}
                  image={require('assets/global/pencilFill.png')}
                  buttonStyle={S.btnTrial}
                  textStyle={S.textTrial}
                  loading={deleteLoading}
                />
              )}
            </View>
          )}
        </>
      )}
    </MainPageTemplate>
  );
};

export default AppointmentDetails;
