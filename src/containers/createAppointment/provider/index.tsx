import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsApi } from 'api/products';
import { SettingsProviderApi } from 'api/settings';
import RNlocalize from 'react-native-localize';
import { EditProducts } from 'components/settings/provider/editProducts';
import { LABELS } from 'containers/createAppointment/helpers/labels';
import I18n, { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import ScrollContainer from 'shared/scrollContainer';
import SubClientsModal from 'shared/subClientsModal';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  appointmentsSelector,
  createAppointment,
  editAppointment,
} from 'store/entities/appointments';
import { calendarSetupSelectors } from 'store/entities/calendarSetup';
import { closeEditModal, openEditModal } from 'store/entities/products';
import { getProducts, productsSelectors } from 'store/entities/products';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { ProductValues } from 'types/products';
import COLORS from 'utils/colors';
import { countryCodes } from 'utils/countryCodes';
import REGEX from 'utils/regex';

import {
  REMIND_CLIENT_INTERVALS,
  REMIND_ME_INTERVALS,
} from '../helpers/options';
import styles from '../style';
import { alert } from 'shared/alert';
import { Pressable } from 'shared/pressable';
import { closeCountryModal, openCountryModal, userSelectors } from 'store/entities/user';
import { CountryPicker } from 'shared/countryPicker';

import {
  openSalesDetailModal,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  ProviderSalesSpecialDetails,
} from 'components/salesSpecialDetails/provider/salesSpecialDetails';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import _ from 'lodash';
import { subscriptionSelectors } from 'store/entities/subscription';
import { RepeatModal } from '../components/repeatModal';
import { RepeatValues } from 'types/tasks';
import { Toggle } from 'shared/toggle';
import { getRepeatDetails } from '../helpers/adapters';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const AddAppointment: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isDetailsModalOpened = useSelector(salesSpecialSelectors.isSalesDetailModalOpened);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const isModalOpened = useSelector(productsSelectors.isModalOpened);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const provider = useSelector((state: any) => state.provider.provider);
  const didMountRef = useRef(false);
  const isEditAppointment = route?.params?.appointmentId;
  const locales = RNlocalize.getLocales()[0];

  const isAddressExist = (provider?.address?.location?.lat == null
    && provider?.address?.location?.lat == null)
    ? false : true
  const deviceCountryCode = locales.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == (provider?.countryCode || deviceCountryCode))[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imageSearch}
            source={require('assets/global/close.png')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Text style={styles.titleLeftStyle}>{LABELS.backTitle}</Text>
      ),
    });
  }, [navigation]);

  const settings = useSelector(calendarSetupSelectors.settings);
  const appointment: any = useSelector(appointmentsSelector.appointment);
  const loading = useSelector(appointmentsSelector.addEditLoading);
  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const products: any = useSelector(productsSelectors.products);
  const productsLoading = useSelector(productsSelectors.loading);

  const [state, setState] = useState<any>({
    salesSpecial: [],
    noClientDetails: !!(isEditAppointment && !appointment?.clientSubprofile),
    additionalSalesSpecial: [],
    newClient: false,
    shouldUpdateProduct: false,
    blockoutTime: isEditAppointment ? appointment?.status === 'blocked' : false,
    repeatAppointment: false,
    repeatModal: false,
    showModal: false,
    showModalService: false,
    doubleBooking: isEditAppointment ? appointment?.isDoubleBookingAllowed : false,
    remindMe: isEditAppointment ? appointment?.remindProvider : 60,
    firstName: '',
    lastName: '',
    countryCode: provider?.countryCode || deviceCountryCode,
    dialCode: filterCountry.phonecode,
    phoneNumber: '',
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    remindClient: isEditAppointment ? appointment?.remindClient : settings.remindClient || 60,
    notes: isEditAppointment ? appointment?.notes : '',
    priceError: '',
    price: null,
    quantitySold: '1',
    isEdit: false,
    isEditIndex: 0,
    selectedStartTime: (isEditAppointment ? appointment?.startDate : route?.params?.startSlotTime) || '',
    selectedEndTime: (isEditAppointment ? appointment?.endDate : route?.params?.endSlotTime) || '',
    activeTypeService: 'service',
    productId: isEditAppointment ? appointment?.product?.id : undefined,
    selectedServiceId: undefined,
    clients: subClients,
    servicesArray: isEditAppointment
      ? appointment?.additionalProducts?.map((item: any) => ({
        productId: item?.product?.id,
        price: item?.price,
        quantity: item?.quantity,
        name: item?.product?.name,
        type: item?.product?.type,
      }))
      : [],
    selectedClient: isEditAppointment
      ? appointment?.clientSubprofile
      : route?.params?.subProfile || undefined,
    mySaleSpecial: null,
    repeatOption: 0,
    repeatWeekday: null,
    repeatMonthDay: null,
    repeatMonth: null,
    repeatEndOptions: 0,
    endAfterDate: null,
    endAfterTotalAppointment: null,
    extended: isEditAppointment ? (appointment?.notes || appointment?.additionalProducts.length) : false
  });

  const {
    salesSpecial, noClientDetails, additionalSalesSpecial, newClient, shouldUpdateProduct, blockoutTime,
    repeatAppointment, repeatModal, showModal, showModalService, doubleBooking, remindMe, firstName, lastName, countryCode,
    dialCode, phoneNumber, firstNameError, lastNameError, phoneError, remindClient, notes, priceError, price,
    quantitySold, isEdit, isEditIndex, selectedStartTime, selectedEndTime, activeTypeService, productId,
    selectedServiceId, clients, servicesArray, selectedClient, mySaleSpecial, repeatOption, repeatWeekday,
    repeatMonthDay, repeatMonth, repeatEndOptions, endAfterDate, endAfterTotalAppointment, extended
  } = state;

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;

  const appointmentDetailValues = {
    name: state.name,
    description: state.description,
    dueDate: state.dueDate,
    time: state.time,
    remindProvider: state.remindProvider,
    repeat: state.repeat,
    repeatModal: state.repeatModal,
    repeatOption: state.repeatOption,
    repeatWeekday: state.repeatWeekday,
    repeatMonthDay: state.repeatMonthDay,
    repeatMonth: state.repeatMonth,
  }

  const validateSalesSpecial = (e: any) => {
    let shouldVisible = true;

    if (e?.saleToday) {
      if (e?.isExpired || (moment(selectedStartTime).isBefore(moment(e?.date).startOf('day')) || moment(selectedStartTime).isAfter(moment(e?.date).endOf('day')))) {
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
      if (!e?.restricationDay?.includes(moment(selectedStartTime).format('dddd').toLowerCase())) {
        shouldVisible = false;
      }
    }

    return shouldVisible
  }

  useEffect(() => {
    if (salesSpecial?.length > 0 && selectedStartTime) {
      setState((prev: any) => ({
        ...prev,
        mySaleSpecial: _.minBy(salesSpecial?.filter((e: any) => (e?.active && validateSalesSpecial(e))), function (ele: any) { return ele?.id; })
      }))
    }
  }, [salesSpecial, selectedStartTime])

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await SettingsProviderApi.getCalendarSettings();
        setState((prev: any) => ({
          ...prev,
          doubleBooking: isEditAppointment
            ? appointment?.isDoubleBookingAllowed
            : data?.isDoubleBookingAllowed
        }))
      } catch (error: any) {
        toast.info(error.message);
      }
    };
    const modifyArray = subClients
      ?.filter((client: any) => client?.isActive)
      ?.map((contact: any) => ({
        ...contact,
        value: contact?.firstName || LABELS.noName,
      }));
    setState((prev: any) => ({
      ...prev,
      clients: modifyArray
    }))
    init();
  }, [subClients]);
  const resetTimeSlot = () => {
    setState((prev: any) => ({
      ...prev,
      selectedStartTime: '',
      selectedEndTime: ''
    }))
    Alert.alert(LABELS.warning, LABELS.serviceNote);
  };
  useEffect(() => {
    if (!isEditAppointment &&
      selectedStartTime &&
      selectedEndTime &&
      !route?.params?.startSlotTime) {
      resetTimeSlot();
    }
    if (
      isEditAppointment &&
      didMountRef.current &&
      selectedStartTime &&
      selectedEndTime
    ) {
      resetTimeSlot();
    }
  }, [productId]);
  useEffect(() => {
    dispatch(getSubClients());
    dispatch(getProducts());
  }, []);
  const renderToggle = (
    title: string,
    value: boolean,
    onPress: () => void,
    disabled?: boolean,
  ) => {
    return (
      <View style={styles.rowSpace}>
        <Text style={styles.switchTitle}>{title}</Text>
        <Switch
          trackColor={{
            false: COLORS.battleshipGrey32,
            true: COLORS.coolGreen,
          }}
          thumbColor={COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onPress}
          value={value}
          disabled={disabled}
        />
      </View>
    );
  };
  const addServiceToArray = () => {
    if (!selectedServiceId) {
      toast.info(LABELS.selectService);
      return;
    }
    if (!price) {
      toast.info(LABELS.selectPrice);
      return;
    }
    if (!quantitySold) {
      toast.info(LABELS.selectQuantity);
      return;
    }
    const service = {
      productId: selectedServiceId,
      price,
      quantity: quantitySold,
      name: products?.find((item: any) => item.id === selectedServiceId)?.name,
      type: activeTypeService,
      saleSpecialId: (isPremiumProvider) ? ((_.minBy((products?.find((item: any) => item.id === selectedServiceId)?.saleSpecial)?.filter((e: any) => (e?.active && validateSalesSpecial(e))), function (ele: any) { return ele?.id; }))?.id ?? null) : null
    };
    if (isEdit) {
      const filteredServices = servicesArray.filter(
        (serv: any, index: number) => index !== isEditIndex,
      );
      setState((prev: any) => ({
        ...prev,
        servicesArray: [...filteredServices, service]
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        servicesArray: [...servicesArray, service]
      }))
    }
    setState((prev: any) => ({
      ...prev,
      price: '',
      selectedServiceId: undefined,
      quantitySold: '1',
      isEdit: false,
      isEditIndex: 0,
      showModalService: false,
    }))
  };
  const deleteServiceFromArray = (indexItem?: number) => {
    const filteredServices = servicesArray.filter(
      (serv: any, index: number) => index !== indexItem,
    );
    setState((prev: any) => ({
      ...prev,
      servicesArray: filteredServices,
      price: '',
      selectedServiceId: undefined,
      quantitySold: '1',
      isEdit: false,
      isEditIndex: 0,
      showModalService: false,
    }))
  };

  const openRepeatModal = () => setState((prev: any) => ({ ...prev, repeatModal: true }));

  const closeRepeatModal = () => setState((prev: any) => ({ ...prev, repeatModal: false }));

  const handleShowMore = () => setState((prev: any) => ({ ...prev, extended: true }));

  const handleHideMore = () => setState((prev: any) => ({ ...prev, extended: false }));

  const toggleRepeat = (checked: boolean) =>
    checked
      ? setState((prev: any) => ({ ...prev, repeatModal: checked }))
      : setState((prev: any) => ({ ...prev, repeatAppointment: checked }));

  const handleCreateAppointment = () => {
    if (!newClient || REGEX.fname.test(firstName)) {
      setState((prev: any) => ({ ...prev, firstNameError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, firstNameError: LABELS.notValidFirstName }));
      return;
    }
    if (!newClient || REGEX.fname.test(lastName)) {
      setState((prev: any) => ({ ...prev, lastNameError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, lastNameError: LABELS.notValidLastName }));
      return;
    }
    if (newClient) {      
      if (phoneNumber.length >= 2) {
        var data: any = phoneUtil.getExampleNumberForType(
          countryCode,
          PhoneNumberType.MOBILE,
        );

        if (data) {
          const number = phoneUtil.parseAndKeepRawInput(`${dialCode + phoneNumber}`, countryCode)
          let isValid = phoneUtil.isValidNumberForRegion(number, countryCode);

          let exNum = data.values_[2];          
          if(countryCode == 'IN' && phoneNumber.trim().length < 10) {
            setState((prev: any) => ({
              ...prev,
              phoneError: 'Mobile number is not valid',
            }))
            toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
            return;
          }
          if (isValid == true) {
            setState((prev: any) => ({
              ...prev,
              phoneError: '',
            }))
          } else {
            setState((prev: any) => ({
              ...prev,
              phoneError: 'Mobile number is not valid',
            }))
            toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
            return;
          }
        } else {
          setState((prev: any) => ({
            ...prev,
            phoneError: '',
          }))
        }

      } else {
        setState((prev: any) => ({
          ...prev,
          phoneError: 'Mobile number is not valid',
        }))
        return;
      }
    }
    if (!selectedStartTime || !selectedEndTime) {
      toast.info(LABELS.selectTimeSlot);
      return;
    }
    if (!newClient && !noClientDetails && !selectedClient && !blockoutTime) {
      toast.info(LABELS.selectClient);
      return;
    }
    let appointment: any = {
      startDate: moment(selectedStartTime).toISOString(),
      endDate: moment(selectedEndTime).toISOString(),
      remindProvider: remindMe,
      remindClient:
        (!selectedClient?.isConnected &&
          selectedClient?.isNotificationsAllowed) ||
          newClient
          ? remindClient
          : null,
      notes,
      shouldBlockoutTime: blockoutTime,
      saleSpecialId: (isPremiumProvider && mySaleSpecial?.id) ? mySaleSpecial?.id : null
    };

    if (isEditAppointment) {
      appointment = {
        ...appointment,
        shouldUpdateProduct,
      };
    }
    if (!blockoutTime) {
      if (noClientDetails) {
        appointment = {
          ...appointment,
          productId,
          isDoubleBookingAllowed: doubleBooking,
        };
      }
      if (newClient) {
        const fullNumber = `+${dialCode}-${phoneNumber}`
        appointment = {
          ...appointment,
          newClient: {
            firstName,
            lastName,
            phoneNumber: fullNumber,
            countryCode,
          },
          productId,
          isDoubleBookingAllowed: doubleBooking,
        };
      }
      if (!newClient && !noClientDetails) {
        appointment = {
          ...appointment,
          productId,
          isDoubleBookingAllowed: doubleBooking,
          clientSubprofileId: selectedClient?.id,
        };
      }
      if (servicesArray?.length) {
        appointment = {
          ...appointment,
          additionalProducts: servicesArray?.map((item: any) => ({
            productId: item.productId,
            saleSpecialId: item?.saleSpecialId,
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        };
      }
    }

    if (!blockoutTime && !appointment?.clientSubprofileId && !appointment?.newClient && !appointment?.productId) {
      alert.info(t(translations.appAppointments.blockoutCondition));
      return;
    }

    if (appointment.shouldBlockoutTime) {
      alert.confirmation({
        message: t(translations.appAppointments.blockoutAlert),
        onConfirm: () => {
          dispatch(createAppointment(appointment));
        }
      })
    } else {
      dispatch(
        isEditAppointment
          ? editAppointment({
            id: route?.params?.appointmentId,
            data: appointment,
          })
          : createAppointment(appointment),
      );
    }
  };

  const renderClient = () => {
    const { photo, firstName, lastName, phoneNumber } = selectedClient || {};
    return selectedClient ? (
      <View style={styles.row}>
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
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
      </View>
    ) : (
      <Text style={styles.textSelect}>{LABELS.selectAClient}</Text>
    );
  };
  const createService = async (product: ProductValues) => {
    dispatch(closeEditModal());
    try {
      const { data } = await ProductsApi.createProduct(product);
      const service = {
        productId: data.id,
        price: data.price,
        quantity: 1,
        name: data.name,
        type: data.type,
      };
      data.isActive && setState((prev: any) => ({
        ...prev,
        servicesArray: [...servicesArray, service]
      }));
      setTimeout(() => dispatch(getProducts()), 500);
    } catch (error: any) {
      toast.info(error?.message);
    }
  };

  const handleRepeatFormSubmit = (repeatValues: RepeatValues) => {
    setState((prev: any) => ({
      ...prev,
      repeatOption: repeatValues.repeatOption,
      repeatEndOptions: repeatValues.repeatEndOptions,
      repeatWeekday:
        repeatValues.repeatOption === 1
          ? [repeatValues.weekly.day]
          : repeatValues.repeatOption === 4
            ? repeatValues.weekly.days
            : null,
      repeatMonth:
        repeatValues.repeatOption === 3 ? repeatValues.yearly.month : null,
      repeatMonthDay:
        repeatValues.repeatOption === 2
          ? repeatValues.monthly.day
          : repeatValues.repeatOption === 3
            ? repeatValues.yearly.day
            : null,
      repeatModal: false,
      repeatAppointment: true,
    }))
  };

  function handleChooseTimeSlot() {
    if (isAddressExist) {
      navigation.navigate('PickTimeslot', {
        handleSave: (start: any, end: any) => {
          setState((prev: any) => ({
            ...prev,
            selectedStartTime: start,
            selectedEndTime: end
          }))
        },
        selectedDayStart:
          selectedStartTime || route?.params?.selectedDayStart || '',
        selectedDayEnd:
          selectedEndTime || route?.params?.selectedDayEnd || '',
        isEditStartTime: selectedStartTime,
        isEditEndTime: selectedEndTime,
        isEdit: !!isEditAppointment,
        timeBetweenAppointments: settings.timeBetweenAppointments,
        defaultDuration:
          products?.find((item: any) => item.id === productId)?.time ||
          30,
      })
    } else {
      toast.info(t(translations.appAppointments.errors.timezoneError))
    }
  }

  const onSalePress = (isAdditionalSalesSpecial: boolean) => {
    dispatch(openSalesDetailModal(isAdditionalSalesSpecial ? additionalSalesSpecial : salesSpecial))
  }

  return (
    <MainPageTemplate
      loading={productsLoading || subClientsLoading}
      bc={COLORS.white}
    >
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setState((prev: any) => ({
                ...prev,
                countryCode: value.countryCode,
                dialCode: value.dialCode
              }))
              dispatch(closeCountryModal());
            }}
          />
        )
      }
      {repeatModal && (
        <RepeatModal
          initialValues={{
            repeatMonth: repeatMonth,
            repeatMonthDay: repeatMonthDay,
            repeatOption: repeatOption,
            repeatWeekday: repeatWeekday,
            repeatEndOptions: repeatEndOptions,
            endAfterDate: endAfterDate,
            endAfterTotalAppointment: endAfterTotalAppointment,
          }}
          onSubmit={handleRepeatFormSubmit}
          onClose={closeRepeatModal}
        />
      )}
      <ScrollContainer styleExtra={styles.scrollContainer}>
        {isEditAppointment && appointment?.status === 'blocked' && (
          <Text style={styles.blockoutTimeText}>{LABELS.blockoutTitle}</Text>
        )}
        {!isEditAppointment ||
          (isEditAppointment &&
            appointment?.status !== 'blocked' &&
            !appointment?.clientSubprofile) ? (
          <View style={styles.notifyContainer}>
            {renderToggle(
              LABELS.noClientDetails,
              noClientDetails,
              () => {
                setState((prev: any) => ({
                  ...prev,
                  noClientDetails: !noClientDetails,
                  blockoutTime: false,
                  newClient: false
                }))
              },
              isEditAppointment &&
              (appointment?.clientSubprofile?.isConnected === false ||
                appointment?.clientSubprofile?.isConnected),
            )}
            <View style={styles.separator} />
            {renderToggle(
              LABELS.newClient,
              newClient,
              () => {
                setState((prev: any) => ({
                  ...prev,
                  noClientDetails: false,
                  blockoutTime: false,
                  newClient: !newClient
                }))
              },
              isEditAppointment &&
              (appointment?.clientSubprofile?.isConnected === false ||
                appointment?.clientSubprofile?.isConnected),
            )}
          </View>
        ) : null}
        {newClient ? (
          <>
            <View style={styles.rowInput}>
              <Field
                value={firstName}
                error={firstNameError}
                onChange={(text: string) => {
                  setState((prev: any) => ({
                    ...prev,
                    firstName: text,
                    firstNameError: ''
                  }))
                }}
                label={LABELS.firstName}
                w="48%"
                mt={16}
              />
              <Field
                value={lastName}
                error={lastNameError}
                onChange={(text: string) => {
                  setState((prev: any) => ({
                    ...prev,
                    lastName: text,
                    lastNameError: ''
                  }))
                }}
                label={LABELS.lastName}
                w="48%"
                mt={16}
              />
            </View>
            <Pressable mt={20} onPress={() => dispatch(openCountryModal())}>
              <Text numberOfLines={1} style={[styles.input, {
                color: 'black',
                borderColor: COLORS.whiteGray,
              }]}>
                {`${countryCode} (+${dialCode || filterCountry.phonecode})`}
              </Text>
            </Pressable>
            <Field
              keyboardType="phone-pad"
              value={phoneNumber}
              error={phoneError}
              maxLength={13}
              onChange={(text: string) => {
                setState((prev: any) => ({
                  ...prev,
                  phoneError: '',
                  phoneNumber: text
                }))
              }}
              label={LABELS.telephone}
              mt={16}
            />
          </>
        ) : noClientDetails || blockoutTime ? null : route?.params
          ?.subProfile ||
          (isEditAppointment && appointment?.clientSubprofile) ? (
          <View style={[styles.notifyContainer, styles.rowSpace]}>
            {renderClient()}
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.notifyContainer, styles.rowSpace]}
            onPress={() => setState((prev: any) => ({
              ...prev,
              showModal: true
            }))}
          >
            {renderClient()}
            <Image
              source={require('assets/global/chevron.png')}
              style={styles.arrowDown}
            />
          </TouchableOpacity>
        )}
        {!blockoutTime ? (
          <Box jc='center'>
            <DropMenu
              placeholder={LABELS.labelActivity}
              onChange={(value) => {
                setState((prev: any) => ({
                  ...prev,
                  productId: products?.find((item: any) => item.name === value)?.id
                }))
                if (isPremiumProvider) {
                  setState((prev: any) => ({
                    ...prev,
                    salesSpecial: products?.find((item: any) =>
                      item.name == value)?.saleSpecial
                  }))
                }
                if (isEditAppointment) {
                  didMountRef.current = true;
                }
              }}
              onOpen={() => {
                if (isEditAppointment && selectedStartTime && selectedEndTime) {
                  const find =
                    products?.find(
                      (item: any) => item.id === appointment?.product?.id,
                    ) || undefined;
                  if (
                    find?.name !== appointment.product?.name ||
                    find?.price !== appointment.product?.price ||
                    find?.time !== appointment.product?.time
                  ) {
                    resetTimeSlot();
                    setState((prev: any) => ({
                      ...prev,
                      shouldUpdateProduct: true
                    }))
                  }
                }
              }}
              items={
                products
                  ?.filter(
                    (item: any) => item.type === 'service' && item.isActive,
                  )
                  ?.map((item: any) => ({
                    label: (isPremiumProvider && item.saleSpecial?.length > 0) ? `${item.name} (On Sale)` : item.name,
                    value: item.name,
                    inputLabel:
                      LABELS.activity +
                      item.name +
                      (isEditAppointment &&
                        appointment?.product! &&
                        appointment?.product.id === item.id &&
                        (appointment?.product.name !== item.name ||
                          appointment.product.time !== item.time)
                        ? ` (${appointment.product.name})`
                        : ''),
                  })) || []
              }
              value={products?.find((item: any) => item.id === productId)?.name}
            />
            {(salesSpecial?.length > 0) && (
              <TouchableOpacity
                style={{ position: 'absolute', paddingTop: 16, right: 36 }}
                hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
                onPress={() => onSalePress(false)}>
                <Box pv={2} ph={8} jc="center" ai="center" r={15} bc={COLORS.greenblue}>
                  <Paragraph color={COLORS.white} type='book' size='xs'>
                    {(salesSpecial?.length == 1)
                      ? I18n.t<string>('products.saleBadge', { salePrice: `$${salesSpecial?.[0]?.salePrice?.toString()}` })
                      : I18n.t<string>('products.saleBadge', { salePrice: '' })
                    }
                  </Paragraph>
                </Box>
              </TouchableOpacity>
            )}
          </Box>
        ) : null}
        {isDetailsModalOpened && <ProviderSalesSpecialDetails />}
        <TouchableOpacity
          onPress={handleChooseTimeSlot}
          style={styles.rowWrapper}
        >
          <Text style={styles.birthdateLabel}>
            {selectedStartTime
              ? moment(selectedStartTime).format('LLL')
              : LABELS.chooseTimeSlot}
          </Text>
          <Image
            source={require('assets/global/calendar.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <DropMenu
          placeholder={''}
          onChange={(value) =>
            setState((prev: any) => ({
              ...prev,
              remindMe: value
            }))}
          items={REMIND_ME_INTERVALS}
          value={remindMe}
        />
        {!extended ? (
          <TouchableOpacity onPress={handleShowMore} style={styles.showMore}>
            <Paragraph size='xs' color={COLORS.orange} >
              {t(translations.appAppointments.showDetails)}
            </Paragraph>
          </TouchableOpacity>
        ) : null}
        {extended ? (
          <>
            <Field
              value={notes}
              onChange={(text: string) => {
                setState((prev: any) => ({
                  ...prev,
                  notes: text,
                }))
              }}
              maxLength={1000}
              size="xl"
              multiline
              label={LABELS.notes}
              mt={16}
            />
            {!blockoutTime ? (
              <>
                <Text style={styles.serviceDetailsTitle}>
                  {LABELS.serviceTitle}
                </Text>
                <View style={styles.notifyContainer}>
                  {servicesArray?.map((service: any, index: number) => (
                    <View key={index}>
                      <TouchableOpacity
                        style={styles.rowSpace}
                        onPress={() => {
                          setState((prev: any) => ({
                            ...prev,
                            isEdit: true,
                            isEditIndex: index,
                            selectedServiceId: service.productId,
                            price: service.price,
                            quantitySold: service.quantity.toString(),
                            activeTypeService: service.type,
                            showModalService: true,
                            additionalSalesSpecial: products?.find((item: any) => item.name === service?.name)?.saleSpecial
                          }))
                        }}
                      >
                        <View style={styles.row}>
                          <Icon
                            src={require('assets/global/deleteRed.png')}
                            onPress={() => deleteServiceFromArray(index)}
                            size={18}
                            mr={4}
                          />
                          <Text style={styles.serviceNameSelected}>
                            {service.name} x {service.quantity}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.servicePriceSelected}>
                            ${service.price * service.quantity}
                          </Text>
                          <Icon
                            src={require('assets/global/arrowRight.png')}
                            size={20}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.rowCenter}
                    onPress={() =>
                      setState((prev: any) =>
                      ({
                        ...prev, showModalService: true
                      }))}
                  >
                    <Image
                      source={require('assets/global/plus.png')}
                      style={styles.addImage}
                    />
                    <Text style={styles.addServiceText}>{LABELS.moreServices}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
            {!blockoutTime ? (
              <CheckBox
                styleContainer={styles.checkboxContainer}
                styleLabel={styles.checkBoxLabel}
                checked={doubleBooking}
                onChange={(value: boolean) =>
                  setState((prev: any) => ({
                    ...prev,
                    doubleBooking: value
                  }))}
                label={LABELS.allowBooking}
              />
            ) : null}
            {!noClientDetails &&
              !blockoutTime &&
              ((!selectedClient?.isConnected &&
                selectedClient?.isNotificationsAllowed) ||
                newClient) ? (
              <DropMenu
                placeholder={''}
                onChange={(value) => setState((prev: any) => ({
                  ...prev,
                  remindClient: value,
                }))}
                items={REMIND_CLIENT_INTERVALS}
                value={remindClient}
              />
            ) : null}
            {!isEditAppointment ||
              (isEditAppointment &&
                !noClientDetails &&
                appointment?.status !== 'blocked') ? (
              isEditAppointment &&
                (appointment?.clientSubprofile?.isConnected === false ||
                  appointment?.clientSubprofile?.isConnected ||
                  !appointment?.clientSubprofile) ? null : (
                <View style={styles.notifyContainer}>
                  {renderToggle(LABELS.blockoutTime, blockoutTime, () => {
                    setState((prev: any) => ({
                      ...prev,
                      noClientDetails: false,
                      blockoutTime: !blockoutTime,
                      newClient: false
                    }))
                  })}
                </View>
              )
            ) : null}
            {isEditAppointment ? null : (
              <View style={styles.card}>
                <Box row jc="space-between" ai="center" pv={16} pr={16}>
                  <Paragraph size="s" type="book">
                    {LABELS.repeatAppointment}
                  </Paragraph>
                  <Toggle checked={repeatAppointment} onChange={toggleRepeat} />
                </Box>
              </View>
            )}
            {repeatAppointment && (
              <>
                <Paragraph size="s" mb={6}>
                  {getRepeatDetails(appointmentDetailValues)}
                </Paragraph>
                <TouchableOpacity onPress={openRepeatModal}>
                  <Paragraph size="s" color={COLORS.clearBlue}>
                    {I18n.t('appAppointments.editRepeatSettings')}
                  </Paragraph>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              onPress={handleHideMore}
              style={[styles.showMore,
              { marginVertical: isEditAppointment ? 10 : 0 }]}>
              <Paragraph size='xs' color={COLORS.orange} >
                {t(translations.appAppointments.hideDetails)}
              </Paragraph>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollContainer>
      <SubClientsModal
        subClients={clients}
        onModalShow={(show: boolean) => setState((prev: any) => ({
          ...prev,
          showModal: show
        }))}
        showModal={showModal}
        onChangeSelectedClient={(client: any) =>
          setState((prev: any) => ({
            ...prev,
            selectedClient: client
          }))}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalService}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardStyle}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.posHeader}>
                <View style={styles.titleNewCenter}>
                  <Text style={styles.titleNewService}>
                    {isEdit
                      ? t(translations.appAppointments.editAppointmentService)
                      : t(translations.appAppointments.addAppointmentService)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setState((prev: any) => ({
                      ...prev,
                      isEdit: false,
                      isEditIndex: 0,
                      selectedServiceId: undefined,
                      price: '',
                      quantitySold: '1',
                      showModalService: false,
                      additionalSalesSpecial: []
                    }))
                  }}
                >
                  <Image
                    source={require('assets/global/close.png')}
                    style={styles.closeImage}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.paddingContentScroll}>
                  <View style={styles.rowSpace}>
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={[
                          styles.containerTypeService,
                          activeTypeService === 'service' &&
                          styles.containerTypeServiceActive,
                        ]}
                        onPress={() => setState((prev: any) => ({
                          ...prev,
                          activeTypeService: 'service'
                        }))}
                      >
                        <Text
                          style={[
                            styles.textTypeService,
                            activeTypeService === 'service' &&
                            styles.textTypeServiceActive,
                          ]}
                        >
                          {LABELS.service}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.containerTypeService,
                          activeTypeService === 'item' &&
                          styles.containerTypeServiceActive,
                        ]}
                        onPress={() => setState((prev: any) => ({
                          ...prev,
                          activeTypeService: 'item'
                        }))}
                      >
                        <Text
                          style={[
                            styles.textTypeService,
                            activeTypeService === 'item' &&
                            styles.textTypeServiceActive,
                          ]}
                        >
                          {LABELS.item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {!isEdit && (
                      <TouchableOpacity
                        style={[
                          styles.containerTypeService,
                          styles.containerTypeServiceActive,
                        ]}
                        onPress={() => {
                          setState((prev: any) => ({ ...prev, showModalService: false }));
                          setTimeout(() => dispatch(openEditModal(null)), 500);
                        }}
                      >
                        <Text
                          style={[
                            styles.textTypeService,
                            styles.textTypeServiceActive,
                          ]}
                        >
                          {LABELS.createNew}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Box jc='center'>
                    <DropMenu
                      placeholder={LABELS.saleForEdit}
                      onChange={(value) => {
                        setState((prev: any) => ({
                          ...prev,
                          price: products?.find((item: any) => item.name === value)
                            ?.price,
                          selectedServiceId: products?.find((item: any) => item.name === value)?.id,
                          quantitySold: '1'
                        }))
                        if (isPremiumProvider) {
                          setState((prev: any) => ({
                            ...prev,
                            additionalSalesSpecial: products?.find((item: any) =>
                              item.name === value)?.saleSpecial
                          }))
                        }
                      }}
                      items={
                        products
                          ?.filter(
                            (item: any) =>
                              item.type === activeTypeService && item.isActive,
                          )
                          ?.map((item: any) => ({
                            label: (isPremiumProvider && item.saleSpecial?.length > 0) ? `${item.name} (On Sale)` : item.name,
                            value: item.name,
                          })) || []
                      }
                      value={
                        products?.find(
                          (item: any) => item.id === selectedServiceId,
                        )?.name
                      }
                    />
                    {(additionalSalesSpecial?.length > 0) && (
                      <TouchableOpacity
                        style={{ position: 'absolute', paddingTop: 16, right: 36 }}
                        hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
                        onPress={() => onSalePress(true)}>
                        <Box pv={2} ph={8} jc="center" ai="center" r={15} bc={COLORS.greenblue}>
                          <Paragraph color={COLORS.white} type='book' size='xs'>
                            {(additionalSalesSpecial?.length == 1)
                              ? I18n.t<string>('products.saleBadge', { salePrice: `$${additionalSalesSpecial?.[0]?.salePrice?.toString()}` })
                              : I18n.t<string>('products.saleBadge', { salePrice: '' })
                            }
                          </Paragraph>
                        </Box>
                      </TouchableOpacity>
                    )}
                  </Box>
                  <View style={styles.textBoxContainerSold}>
                    <Field
                      value={quantitySold}
                      label={LABELS.quantitySold}
                      disabled={!selectedServiceId}
                      keyboardType="numeric"
                      onChange={(value) => setState((prev: any) => ({
                        ...prev,
                        quantitySold: value
                      }))}
                      mt={16}
                    />
                  </View>
                  <Field
                    startAdornment={
                      <Icon
                        src={require('assets/global/dollar.png')}
                        size={18}
                      />
                    }
                    disabled={!selectedServiceId}
                    error={priceError}
                    keyboardType="numeric"
                    value={price?.toString()}
                    onChange={(text: string) => {
                      setState((prev: any) => ({
                        ...prev,
                        priceError: '',
                        price: text
                      }))
                    }}
                    label={LABELS.price}
                    mt={16}
                  />
                  <FlatList
                    horizontal
                    data={
                      products?.find(
                        (item: any) => item.id === selectedServiceId,
                      )?.images
                    }
                    renderItem={(item: any) => (
                      <View style={styles.row}>
                        <View style={styles.selectedImage}>
                          <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                          />
                        </View>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <CheckBox
                    styleContainer={styles.checkboxQuickSale}
                    styleLabel={styles.checkBoxLabel}
                    checked={
                      products?.find(
                        (item: any) => item.id === selectedServiceId,
                      )?.isQuickSale
                    }
                    onChange={() => { }}
                    disabled
                    label={LABELS.quickSale}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={[styles.rowButtons, !isEdit && styles.rowButtonsCreate]}>
            {isEdit && (
              <Button
                onPress={() => {
                  setState((prev: any) => ({
                    ...prev,
                    additionalSalesSpecial: []
                  }))
                  deleteServiceFromArray(isEditIndex);
                }}
                text={LABELS.deleteItem}
                buttonStyle={styles.btnDeleteService}
                textStyle={styles.textDeleteService}
              />
            )}
            <Button
              onPress={() => {
                setState((prev: any) => ({
                  ...prev,
                  additionalSalesSpecial: []
                }))
                addServiceToArray()
              }}
              text={LABELS.continue}
              buttonStyle={styles.btnContinueService}
              textStyle={styles.textContinueService}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {isModalOpened && (
        <EditProducts
          fromAppointment
          onCreateProduct={(data) => createService(data)}
        />
      )}
      <View style={styles.bottomBlock}>
        <Button
          onPress={handleCreateAppointment}
          text={LABELS.saveAppointment}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
          loading={loading}
        />
      </View>
    </MainPageTemplate>
  );
};

export default AddAppointment;