import { translations } from 'locales';
import moment from 'moment';
import React, { useEffect, useLayoutEffect } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import { EmptyState } from 'shared/emptyState';
import { MainPageTemplate } from 'shared/templates';
import {
  appointmentsSelector,
  deleteAppointment,
  getAppointment,
  readyForClientMessage,
} from 'store/entities/appointments';
import { createChat } from 'store/entities/chats';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';

import { appointmentsStyles as S } from '../style';
import { subscriptionSelectors } from 'store/entities/subscription';

// type Props = StackScreenProps<RootStackParamList, 'AppointmentDetails'>;

const AppointmentDetails: React.FC<any> = ({ navigation, route }) => {
  const appointment: any = useSelector(appointmentsSelector.appointment);
  const loading = useSelector(appointmentsSelector.appointmentLoading);
  const deleteLoading = useSelector(appointmentsSelector.deleteLoading);
  const readyBtnLoading = useSelector(appointmentsSelector.readyBtnLoading);
  const providerData = useSelector((state: any) => state.provider.provider);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const { clientSubprofile, client, startDate, endDate, product } = appointment || {};
  const { remindProvider, status, hasClientCheckedIn } = appointment || {};
  const {
    firstName = status === 'blocked' ? 'Blocked' : 'No Client Data',
    lastName = '',
    photo,
    isConnected,
  } = clientSubprofile || client || {};

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isAppointmentExpiredOrStarted = moment(startDate).format() <= moment().format();


  const headerButton = (action: any, image: any, style?: any) => {
    return (
      <TouchableOpacity onPress={action}>
        <Image style={[S.imagePerfomance, style]} source={image} />
      </TouchableOpacity>
    );
  };

  const handleCreateChat = useCallback(() => {
    if (appointment) {
      dispatch(
        createChat({
          participantId: appointment?.client
            ? appointment?.client?.id
            : appointment?.clientSubprofile?.clientId,
          onSuccess: (chat) => Navigator.navigate('Chat', { id: chat.id }),
        }),
      );
    }
  }, [dispatch, appointment]);

  const handleReadyforClient = () => {
    alert.confirmation({
      message: 'Are you sure you want to call in the client?',
      onConfirm: () => {
        dispatch(readyForClientMessage({
          id: appointment?.clientSubprofile?.id,
          appointmentId: appointment?.id
        }))
      }
    })
  }

  const navigateToSale = () => {
    let additionalServiceData = appointment?.additionalProducts?.length ? appointment?.additionalProducts?.map((e: any) => ({
      name: e?.product?.name,
      productId: e?.product?.id,
      quantity: e?.quantity,
      price: e?.product?.price,
      type: 'service'
    })) : [];

    let serviceData = product ? [{
      name: product?.name,
      productId: product?.id,
      quantity: 1,
      price: product?.price,
      type: 'service'
    }] : [];

    Navigator.navigate('AddSale', {
      noClient: clientSubprofile ? false : true,
      client: clientSubprofile,
      productArray: serviceData?.concat(additionalServiceData),
      appliedSaleSpecialData: appointment?.saleSpecial?.find((e: any) => (e?.ServiceName == appointment?.product?.name)),
      fromDate: startDate,
      isFromAppointment: true,
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () =>
        appointment && (
          <View style={S.row}>
            {/* {status == 'scheduled' && headerButton(
              navigateToSale,
              require('assets/global/sale.png'),
            )} */}
            {appointment?.clientSubprofile?.isConnected && headerButton(
              handleCreateChat,
              require('assets/global/chatBlack.png'),
            )}
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
      headerLeft: () => <BackButton />,
    });
  }, [navigation, handleCreateChat]);

  useEffect(() => {
    dispatch(getAppointment(route?.params?.id));
  }, []);

  const renderItem = (text: string, value: string) => {
    return (
      <>
        <View style={[S.rowSpace, { marginTop: 0 }]}>
          <Text style={S.titleValue}>{text}</Text>
          <Text style={S.value}>{value}</Text>
        </View>
        <View style={S.separator} />
      </>
    );
  };

  const onCall = (phone: string) => {
    if (phone) {
      return LinkingHelper.telprompt(phone);
    }

    alert.info(t(translations.common.alerts.mobileWarning));
  };

  const getDate = (v: any, h: number, m: number) =>
    new Date(v.getFullYear(), v.getMonth(), v.getDate(), h, m);

  const formatDate = (date: any, format: string) => moment(date).format(format);

  const selectedDayStart = new Date(startDate!);
  const selectedDayEnd = new Date(endDate!);

  return (
    <MainPageTemplate loading={loading} bc={COLORS.white}>
      {!appointment ? (
        <EmptyState
          type="deleted"
          entities={t(translations.common.entities.appointment)}
        />
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
                      ? {
                        uri: photo,
                      }
                      : require('assets/global/defaultAvatar.jpg')
                  }
                  style={S.avatar}
                />
                <View>
                  <View style={S.row}>
                    <Text style={S.userName}>
                      {getFullName({ firstName, lastName })}
                    </Text>
                    {isConnected ? clientSubprofile?.isDisconnect == false ? (
                      <Image
                        source={require('assets/onBoarding/alpha.png')}
                        style={S.imageConnected}
                      />
                    ) : null : null}
                  </View>
                  <Text style={S.userPhone}>
                    {clientSubprofile?.phoneNumber}
                  </Text>
                </View>
              </View>
              {status !== 'blocked' && (
                <TouchableOpacity
                  onPress={() => onCall(clientSubprofile?.phoneNumber!)}
                >
                  <Image
                    source={require('assets/global/callGrey.png')}
                    style={S.callImage}
                  />
                </TouchableOpacity>
              )}
            </View>
            {hasClientCheckedIn ? (
              <View style={S.checkInContainer}>
                <Image
                  source={require('assets/global/checkCircle.png')}
                  style={S.checkCircle}
                />
                <Text style={S.checkInText}>Client has checked in</Text>
              </View>
            ) : null}
            <Text style={S.titleContainer}>Appointment Details</Text>
            <View style={S.infoContainer}>
              {renderItem('Service', appointment?.product?.name)}
              {renderItem('Date', formatDate(startDate, 'MMM Do YYYY'))}
              {renderItem('Time', formatDate(startDate, 'LT'))}
              {renderItem(
                'Alert Me',
                !remindProvider
                  ? t(translations.common.labels.noRemind)
                  : remindProvider! < 60
                    ? t(translations.common.time.min, { count: remindProvider })
                    : t(translations.common.time.hour, {
                      count: remindProvider! / 60,
                    }),
              )}
              {renderItem(
                'Expected Duration',
                (
                  (new Date(endDate!).getTime() -
                    new Date(startDate!).getTime()) /
                  1000 /
                  60
                ).toString() + ' mins',
              )}
              {renderItem('End Time', formatDate(endDate, 'LT'))}
              <View>
                <Text style={S.titleValue}>Notes</Text>
                <Text style={S.value}>{appointment?.notes}</Text>
              </View>
            </View>
            <View style={S.twinButtonContainer}>
              {(isConnected && !isAppointmentExpiredOrStarted && !hasClientCheckedIn) ? (
                <Button
                  loading={readyBtnLoading}
                  onPress={handleReadyforClient}
                  text={'Ready for client'}
                  buttonStyle={{ width: liteSubcription ? '100%' : '48%', borderRadius: 5 }}
                  textStyle={S.twinBtnText}
                />
              ) : null}
              {!liteSubcription ? (
                <Button
                  onPress={navigateToSale}
                  text={'Pay for appointment'}
                  buttonStyle={[S.payForAppointmentBtn, {
                    width: (isAppointmentExpiredOrStarted || hasClientCheckedIn)
                      ? '100%' : '50%'
                  }]}
                  textStyle={S.twinBtnText}
                />
              ) : null}
            </View>
          </ScrollView>
          {
            status !== 'blocked' && (
              <View style={S.bottomBlock}>
                <Button
                  onPress={() =>
                    navigation.navigate('AddAppointment', {
                      appointmentId: appointment?.id,
                      selectedDayStart: getDate(selectedDayStart, 0, 0),
                      selectedDayEnd: getDate(selectedDayEnd, 23, 59),
                    })
                  }
                  text={'Edit Appointment'}
                  image={require('assets/global/pencilFill.png')}
                  buttonStyle={S.btnTrial}
                  textStyle={S.textTrial}
                  loading={deleteLoading}
                />
              </View>
            )
          }
        </>
      )}
    </MainPageTemplate>
  );
};

export default AppointmentDetails;