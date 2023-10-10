import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment-timezone';
import RNlocalize from 'react-native-localize';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import ScrollContainer from 'shared/scrollContainer';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import { postAppointmentRequest } from 'store/actions/appointments';
import {
  appointmentsSelector,
  editAppointment,
} from 'store/entities/appointments';
import {
  getNotificationSettings,
  notificationSettingsSelectors,
} from 'store/entities/notificationSettings';
import {
  getProductsById,
  productsSelectors,
} from 'store/entities/products';
import {
  getProviderPlanId,
  providersSelectors,
} from 'store/entities/providers';
import COLORS from 'utils/colors';

import { LABELS } from '../helpers/labels';
import { REMIND_ME_INTERVALS } from '../helpers/options';
import { hasRemindMeOptionAvailable } from '../helpers/utils';
import styles from '../style';
import { AppointmentRequestModal } from './components/appointmentRequestModal';
import _ from 'lodash';
import I18n, { t, translations } from 'locales';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const AddAppointment: React.FC<Props> = ({ navigation, route }) => {
  const providerPlanId = useSelector(providersSelectors.providerPlanId);
  const isPremiumProvider = providerPlanId?.subscriptionPlanId?.includes('premium');
  const appointment = useSelector(appointmentsSelector.appointment);
  const loading = useSelector(appointmentsSelector.addEditLoading);
  const products = useSelector(productsSelectors.products);
  const productsLoading = useSelector(productsSelectors.loading);
  const settings = useSelector(notificationSettingsSelectors.settings);
  const reminderTime = useSelector(notificationSettingsSelectors.reminderTime);
  const notificationsSettingsLoading = useSelector(
    notificationSettingsSelectors.loading,
  );

  const dispatch = useDispatch();
  const didMountRef = useRef(false);

  const isEditAppointment = route?.params?.appointmentId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={LABELS.backProviders} />,
    });
  }, [navigation]);

  const [salesSpecial, setSalesSpecial] = useState([route?.params?.selectedSalesSpecial] || [])
  const [mySaleSpecial, setMySaleSpecial] = useState<any>(null)
  const [activity, setActivity] = useState<any>(
    isEditAppointment ? appointment?.product?.name : '',
  );
  const [remindMe, setRemindMe] = useState(
    isEditAppointment ? appointment?.remindClient : reminderTime,
  );
  const [notes, setNotes] = useState<any>(
    isEditAppointment ? appointment?.notes : '',
  );
  const [selectedStartTime, setSelectedStartTime] = useState(
    isEditAppointment ? appointment?.startDate : '',
  );
  const [productId, setProductId] = useState(
    isEditAppointment ? appointment?.product?.id : undefined,
  );
  const selectedClient = isEditAppointment
    ? appointment?.provider
    : route?.params?.client;
  const resetTimeSlot = () => {
    setSelectedStartTime('');
    Alert.alert(LABELS.warning, LABELS.serviceNote);
  };

  const validateSalesSpecial = (e: any) => {
    let shouldVisible = true;

    if (e?.saleToday) {
      if (e?.isExpired || (moment.tz(moment(selectedStartTime), selectedClient?.address?.utctimezone).isBefore(moment(e?.date).startOf('day')) || moment.tz(moment(selectedStartTime), selectedClient?.address?.utctimezone).isAfter(moment(e?.date).endOf('day')))) {
        shouldVisible = false
      }
    }
    if (e?.isTimeRestrication) {
      if (e?.restricationStartTime < e?.restricationEndTime) {
        if ((moment.utc(moment(selectedStartTime)).format('HH:mm:00') < e?.restricationStartTime) || (moment.utc(moment(selectedStartTime)).format('HH:mm:00') > e?.restricationEndTime)) {
          shouldVisible = false;
        }
      } else if (e?.restricationStartTime > e?.restricationEndTime) {
        if ((moment.utc(moment(selectedStartTime)).format('HH:mm:00') < e?.restricationStartTime) && (moment.utc(moment(selectedStartTime)).format('HH:mm:00') > e?.restricationEndTime)) {
          shouldVisible = false;
        }
      }
    }
    if (e?.isDateRestrication) {
      if ((moment(selectedStartTime).isBefore(moment(e?.restricationStartDate))) || (moment(selectedStartTime).isAfter(moment(e?.restricationEndDate)))) {
        shouldVisible = false;
      }
    }
    if (e?.isDayRestrication) {
      if (!e?.restricationDay?.includes(moment.tz(moment(selectedStartTime), selectedClient?.address?.utctimezone).format('dddd').toLowerCase())) {
        shouldVisible = false;
      }
    }

    return shouldVisible
  }

  useEffect(() => {
    const selectedSpecial = route?.params?.selectedSalesSpecial;
    if (selectedSpecial) {
      setActivity(selectedSpecial?.service?.name);
      setProductId(selectedSpecial?.service?.id)
    }

  }, [route?.params?.selectedSalesSpecial])

  useEffect(() => {
    if (salesSpecial?.length > 0 && selectedStartTime) {
      const specialFromRoute = route?.params?.selectedSalesSpecial;
      if (specialFromRoute && specialFromRoute?.service?.id === productId) {
        if (validateSalesSpecial(specialFromRoute)) {
          setMySaleSpecial(specialFromRoute?.id);
          toast.info('Sale special offer applied on this appointment.');
        } else {
          Alert.alert('Info', t(translations.salesSpecial.notEligible), [
            {
              text: I18n.t('common.cancel'),
            },
            {
              text: I18n.t('common.confirm'),
              onPress: () => selectedStartTime && setNotes('I want to book this appointment under the sale special offer.'),
            },
          ])
        }
      } else {
        let validSpecial = _.minBy(salesSpecial?.filter((e: any) => (e?.active && validateSalesSpecial(e))), function (ele: any) {
          return ele?.id;
        });
        if (validSpecial) {
          setMySaleSpecial(validSpecial?.id);
        }
      }
    }
  }, [salesSpecial, selectedStartTime])

  useEffect(() => {
    if (!isEditAppointment && selectedStartTime) {
      resetTimeSlot();
    }
    if (isEditAppointment && didMountRef.current && selectedStartTime) {
      resetTimeSlot();
    }
  }, [activity]);

  useEffect(() => {
    if (selectedClient?.id) {
      dispatch(getProviderPlanId({ id: selectedClient?.id }))
    }
  }, [dispatch, selectedClient?.id]);

  useEffect(() => {
    dispatch(getProductsById({ id: selectedClient?.id }));
    dispatch(getNotificationSettings());
  }, [dispatch]);

  const createAppointment = () => {
    if (!productId) {
      toast.info(LABELS.selectActivity);
      return;
    }
    if (!selectedStartTime) {
      toast.info(LABELS.selectTimeSlot);
      return;
    }

    let appointment: any = {
      startDate: selectedStartTime,
      remindClient: remindMe,
      notes,
      providerId: selectedClient.id,
      productId,
      saleSpecialId: (isPremiumProvider && mySaleSpecial?.id) ? mySaleSpecial?.id : null
    };

    dispatch(
      isEditAppointment
        ? editAppointment({
          data: appointment,
          id: route?.params?.appointmentId,
        })
        : postAppointmentRequest(appointment),
    );
  };

  const createAppointmentHandler = _.throttle(createAppointment, 3000, { leading: true, trailing: false });

  const renderClient = () => {
    const { photo, firstName, lastName, businessName, service } = selectedClient || {};
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.row}
        onPress={() =>
          isEditAppointment && Alert.alert(LABELS.warning, LABELS.touchPNote)
        }
      >
        <Image
          source={
            photo ? { uri: photo } : require('assets/global/defaultAvatar.jpg')
          }
          style={styles.avatar}
        />
        <View>
          <Text style={styles.firstName}>
            {(firstName || '') + ' ' + (lastName || '')}
          </Text>
          <Text style={styles.phoneNumber}>{'Buisness name: '}
            <Text style={styles.value}>{businessName || ''}</Text>
          </Text>
          <Text style={styles.phoneNumber}>{'Title: '}
            <Text style={styles.value}>{service?.name || ''}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainPageTemplate
      loading={productsLoading || notificationsSettingsLoading}
      bc={COLORS.white}
    >
      <AppointmentRequestModal />
      <ScrollContainer styleExtra={styles.scrollContainer}>
        <View style={styles.notifyContainer}>{renderClient()}</View>
        <DropMenu
          placeholder={LABELS.activityField}
          onChange={(value) => {
            setActivity(value);
            setProductId(
              products?.find((item: any) => item.name === value)?.id,
            );
            setSalesSpecial(
              products?.find((item: any) => item.name == value)?.saleSpecial,
            );
            if (isEditAppointment) {
              didMountRef.current = true;
            }
          }}
          items={
            products
              ?.filter((item: any) => item.type === 'service')
              ?.map((item: any) => ({
                label: item.name,
                value: item.name,
                inputLabel: LABELS.activity + item.name,
              })) || []
          }
          value={activity}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PickTimeslot', {
              handleSave: (start: any) => {
                setSelectedStartTime(start);
              },
              selectedDayStart:
                selectedStartTime || route?.params?.selectedDayStart || '',
              selectedDayEnd: route?.params?.selectedDayEnd || '',
              isEditStartTime: selectedStartTime,
              isEdit: !!isEditAppointment,
              providerId: selectedClient?.id,
              defaultDuration:
                products?.find((item: any) => item?.id === productId)?.time ||
                30,
            })
          }
          style={styles.rowWrapper}
        >
          <Text style={styles.birthdateLabel}>
            {selectedStartTime
              ? moment(selectedStartTime).format('LLL')
              : LABELS.slot}
          </Text>
          <Image
            source={require('assets/global/calendar.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
        {hasRemindMeOptionAvailable(settings) && (
          <DropMenu
            placeholder={''}
            onChange={(value) => setRemindMe(value)}
            items={REMIND_ME_INTERVALS}
            value={remindMe}
          />
        )}
        <Field
          value={notes}
          onChange={(text: string) => {
            setNotes(text);
          }}
          maxLength={1000}
          size="xl"
          multiline
          label={LABELS.notes}
          mt={16}
        />
      </ScrollContainer>
      <View style={styles.bottomBlock}>
        <Button
          onPress={createAppointmentHandler}
          text={LABELS.confirm}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
          loading={loading}
        />
      </View>
    </MainPageTemplate>
  );
};

export default AddAppointment;
