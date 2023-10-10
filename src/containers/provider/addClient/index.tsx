import { StackNavigationProp } from '@react-navigation/stack';
import { translations } from 'locales';
import moment from 'moment';
import RNlocalize from 'react-native-localize';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import { alert } from 'shared/alert';
import BirthdayDate from 'shared/birthdayDate';
import Button from 'shared/button';
import CheckBoxComponent from 'shared/checkbox';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import GoogleAutocomplete from 'shared/googleAutocomplete';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import ScrollContainer from 'shared/scrollContainer';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import { Toggle } from 'shared/toggle';
import UserAvatar from 'shared/userAvatar';
import { CountryPicker } from 'shared/countryPicker';
import { subClientsSelectors } from 'store/entities/subClients';
import { userSelectors, openCountryModal, closeCountryModal } from 'store/entities/user';
import {
  createSubClient,
  editSubClient,
} from 'store/entities/subClients/slice';
import COLORS from 'utils/colors';
import REGEX from 'utils/regex';
import { countryCodes } from 'utils/countryCodes';

import styles from './style';
import { toast } from 'shared/toast';
import { Pressable } from 'shared/pressable';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const AddClient: React.FC<Props> = ({ navigation, route }) => {
  const subClient = useSelector(subClientsSelectors.subClient);
  const provider = useSelector((state: any) => state.provider.provider);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);

  const loading = useSelector(subClientsSelectors.addEditLoading);
  const locales = RNlocalize.getLocales()[0];
  const deviceCountryCode = locales.countryCode;
  const subClientNumber = subClient ? subClient?.phoneNumber : '';
  const subClientAlternativeNumber = subClient ? subClient?.alternatePhoneNumber : '';
  // const isFormattedNumber = providerNumber && providerNumber.includes('-');
  const numberWithoutCode = subClientNumber ? subClientNumber.substring(subClientNumber.indexOf('-') + 1) : '';
  const alternativeNumberWithoutCode = subClientAlternativeNumber ? subClientAlternativeNumber.substring(subClientAlternativeNumber.indexOf('-') + 1) : '';
  const subClientCountryCode = subClient && subClient?.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == (provider?.countryCode || deviceCountryCode))[0];
  const findAvailableCountryCode = subClient && countryCodes.filter((e: any) => e.sortname == subClientCountryCode)[0];

  const isAddressExist = (provider?.address?.location?.lat == null
    && provider?.address?.location?.lat == null)
    ? false : true
  const dispatch = useDispatch()

  const isEdit = !!route?.params?.clientId;

  const [state, setState] = useState<any>({
    avatar: isEdit ? subClient?.photo : '',
    gender: isEdit ? subClient?.gender : '',
    firstName: isEdit ? subClient?.firstName : '',
    lastName: isEdit ? subClient?.lastName : '',
    phone: isEdit ? numberWithoutCode : '',
    countryCode: isEdit ? (findAvailableCountryCode?.sortname || provider?.countryCode) : (provider?.countryCode || deviceCountryCode),
    dialCode: isEdit ? (findAvailableCountryCode?.phonecode || filterCountry.phonecode) : filterCountry.phonecode,
    email: isEdit ? subClient?.email : '',
    notes: isEdit ? subClient?.notes : '',
    notifications: subClient ? (subClient?.isNotificationsAllowed != null) ? subClient?.isNotificationsAllowed : false : false,
    isActive: isEdit ? !!subClient?.isActive : true,
    addressVisible: isEdit && !!subClient?.address,
    moreVisible: true,
    show: false,
    showModal: false,
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    alternativePhoneError: '',
    emailError: '',
    address: isEdit ? subClient?.address : '',
    additionalAddress: isEdit ? subClient?.address?.addressLine2 : '',
    birthday: isEdit
      ? subClient?.birthday
        ? moment(subClient?.birthday, 'YYYY-MM-DD').format('L')
        : ''
      : '',
    birthdayData: isEdit ? subClient?.birthday : new Date().toISOString(),
    alternativePhone: isEdit ? alternativeNumberWithoutCode : '',
    notificationChannel: isEdit ? subClient?.notificationChannel : '',
    notificationChannelError: '',
    selectedIdContact: '',
    search: '',
    phoneContacts: [],
    filteredContacts: [],
  });

  const {
    avatar,
    gender,
    firstName,
    lastName,
    phone,
    countryCode,
    dialCode,
    email,
    notes,
    notifications,
    isActive,
    addressVisible,
    moreVisible,
    show,
    showModal,
    firstNameError,
    lastNameError,
    phoneError,
    alternativePhoneError,
    emailError,
    address,
    additionalAddress,
    birthday,
    birthdayData,
    alternativePhone,
    notificationChannel,
    notificationChannelError,
    selectedIdContact,
    search,
    phoneContacts,
    filteredContacts,
  } = state;

  let number = subClient?.phoneNumber?.replace('-', ' ').split(' ')

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;

  const { t } = useTranslation();

  const goBack = () => navigation.goBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={20}>
          {t(translations.clientDetails.details)}
        </Paragraph>
      ),
      headerRight: () => (
        <Icon
          src={require('assets/global/close.png')}
          onPress={goBack}
          mr={20}
        />
      ),
    });
  }, [navigation, t]);

  const onCamera = () => {
    Alert.alert('Choose method', 'Please choose a method', [
      {
        text: 'Camera',
        onPress: () =>
          ImagePicker.openCamera({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              setState((prev: any) => ({ ...prev, avatar: image }));
            },
          ),
      },
      {
        text: 'Library',
        onPress: () =>
          ImagePicker.openPicker({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              setState((prev: any) => ({ ...prev, avatar: image }))
            },
          ),
      },
      {
        text: 'Delete',
        onPress: () => {
          setState((prev: any) => ({ ...prev, avatar: '' }))
        },
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => { },
      },
    ], { cancelable: true });
  };

  const getContacts = (permission: string) => {
    if (permission === 'authorized') {
      Contacts.getAll().then((contacts: any) => {
        const modifyArray = contacts.map((contact: any) => ({
          ...contact,
          value: contact?.givenName || 'No name',
        }));
        setState((prev: any) => ({
          ...prev,
          phoneContacts: modifyArray,
          filteredContacts: modifyArray
        }))
      });
    }
    if (permission === 'denied') {
      Alert.alert('Please allow access to contacts in settings');
    }
  };

  const moveToSettings = () => {
    Alert.alert(
      'We need access to your contacts!',
      'To load your contacts, we need you to give us Contacts permissions in your Settings.',
      [
        {
          text: 'Nevermind',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Ok, take me to Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    if (showModal) {
      if (Platform.OS === 'ios') {
        Contacts.checkPermission().then((permission) => {
          if (permission === 'undefined') {
            Contacts.requestPermission().then((permission) => {
              getContacts(permission);
            });
          }
          getContacts(permission);
        });
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'We need access to your contacts!',
            message:
              'To load your contacts, we need you to give us Contacts permissions in your Settings.',
            buttonNegative: 'Nevermind',
            buttonPositive: 'Ok, take me to Settings',
          },
        )
          .then((granted) => {
            if (granted === 'never_ask_again') {
              moveToSettings();
            }
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Contacts.getAll()
                .then((contacts) => {
                  const modifyArray: any = contacts.map((contact: any) => ({
                    ...contact,
                    value: contact?.givenName || 'No name',
                  }));
                  setState((prev: any) => ({
                    ...prev,
                    phoneContacts: modifyArray,
                    filteredContacts: modifyArray
                  }))
                })
                .catch((error) => console.log(error));
            }
          })
          .catch((e) => console.log(e));
      }
    }
  }, [showModal]);

  const onSave = () => {
    const formData = new FormData();
    let data = {
      formData: formData,
      notification: notifications
    }
    if (REGEX.fname.test(firstName)) {
      setState((prev: any) => ({ ...prev, firstNameError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, firstNameError: 'First name is not valid' }));
      return;
    }

    if (REGEX.fname.test(lastName)) {
      setState((prev: any) => ({ ...prev, lastNameError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, lastNameError: 'Last name is not valid' }));
      return;
    }

    if (phone.trim().length) {
      if(!REGEX.onlyNumbers.test(phone)) {
        setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
        return;
      }
      var numberData: any = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );
      if (numberData) {
        const number = phoneUtil.parseAndKeepRawInput(`${dialCode + phone}`, countryCode)
        let isValid = phoneUtil.isValidNumberForRegion(number, countryCode);
        let exNum = numberData.values_[2];
        if(countryCode == 'IN' && phone.trim().length < 10) {
          setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          setState((prev: any) => ({ ...prev, phoneError: '' }));
        } else {
          setState((prev: any) => ({ ...prev, phoneError: 'Mobile number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        setState((prev: any) => ({ ...prev, phoneError: '' }));
      }
    } else {
      setState((prev: any) => ({ ...prev, phoneError: '' }));
    }

    if (alternativePhone.trim().length) {
      if(!REGEX.onlyNumbers.test(alternativePhone)) {
        setState((prev: any) => ({ ...prev, alternativePhoneError: 'Alternative phone number is not valid' }));
        return;
      }
      var numberData: any = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );
      if (numberData) {
        const number = phoneUtil.parseAndKeepRawInput(`${dialCode + alternativePhone}`, countryCode)
        let isValid = phoneUtil.isValidNumberForRegion(number, countryCode);
        let exNum = numberData.values_[2];
        if(countryCode == 'IN' && alternativePhone.trim().length < 10) {
          setState((prev: any) => ({ ...prev, alternativePhoneError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          setState((prev: any) => ({ ...prev, alternativePhoneError: '' }));
        } else {
          setState((prev: any) => ({ ...prev, alternativePhoneError: 'Mobile number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        setState((prev: any) => ({ ...prev, alternativePhoneError: '' }));
      }
    } else {
      setState((prev: any) => ({ ...prev, alternativePhoneError: '' }));
    }
    

    if (!email || REGEX.email.test(String(email).trim().toLowerCase())) {
      setState((prev: any) => ({ ...prev, emailError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, emailError: 'Email is not valid' }))
      return;
    }

    if (notifications && !notificationChannel) {
      setState((prev: any) => ({
        ...prev,
        notificationChannelError: t(translations.common.errors.required, {
          field: t(translations.clientDetails.preference),
        })
      }))
      return;
    } else {
      setState((prev: any) => ({
        ...prev,
        notificationChannelError: ''
      }))
    }

    let clientInfo: any = {
      firstName,
      isActive,
    };

    if (lastName) {
      clientInfo = { ...clientInfo, lastName };
    }
    if (countryCode) {
      clientInfo = { ...clientInfo, countryCode: countryCode };
    }
    if (phone) {
      clientInfo = { ...clientInfo, phoneNumber: `+${dialCode}-${phone}` };
    }
    if (email) {
      clientInfo = { ...clientInfo, email };
    }
    if (gender) {
      clientInfo = { ...clientInfo, gender };
    }
    if (notes) {
      clientInfo = { ...clientInfo, notes };
    }
    if (alternativePhone) {
      clientInfo = { ...clientInfo, alternatePhoneNumber: `+${dialCode}-${alternativePhone}` };
    }
    if (!subClient?.isConnected) {
      clientInfo = { ...clientInfo, isNotificationsAllowed: notifications };
    }
    if ((phone || alternativePhone || email) && notificationChannel) {
      clientInfo = { ...clientInfo, notificationChannel };
    }
    if (birthday) {
      clientInfo = { ...clientInfo, birthday: birthdayData };
    }
    if (address) {
      clientInfo = {
        ...clientInfo,
        address: JSON.stringify({
          ...address,
          addressLine2: additionalAddress,
        }),
      };
    }
    for (const name in clientInfo) {
      // @ts-ignore
      formData.append(name, clientInfo[name]);
    }
    if (avatar) {
      formData.append(
        'photo',
        avatar?.path
          ? {
            uri: avatar?.path,
            name: avatar?.filename || 'name1.jpg',
            type: avatar?.mime || 'image/jpeg',
          }
          : avatar,
      );
    }

    dispatch(isEdit ? editSubClient(formData) : createSubClient(data));
  };

  const getOptions = () => {
    if (email && (phone || alternativePhone)) {
      return [
        { label: 'Email', value: 'email' },
        { label: 'SMS', value: 'sms' },
      ];
    }
    if (phone || alternativePhone) {
      return [{ label: 'SMS', value: 'sms' }];
    }
    if (email) {
      return [{ label: 'Email', value: 'email' }];
    }
  };

  const renderListItem = (contact: any) => {
    const { item } = contact;
    return (
      <TouchableOpacity
        key={item?.recordID}
        style={styles.paddingItem}
        onPress={() => takeContact(item.recordID)}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Image
                source={
                  item.thumbnailPath
                    ? { uri: item.thumbnailPath }
                    : require('assets/global/defaultAvatar.jpg')
                }
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>
                  {(item.value || '') + ' ' + (item.familyName || '')}
                </Text>
                <Text style={styles.userPhone}>
                  {item?.phoneNumbers[0]?.number}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = phoneContacts?.filter((item: any) => {
        const itemData = item.value
          ? item.value.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setState((prev: any) => ({
        ...prev,
        filteredContacts: newData,
        search: text
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        filteredContacts: phoneContacts,
        search: text
      }));
    }
  };

  const takeContact = (id: any) => {
    const getContact: any = phoneContacts?.find(
      (contact: any) => contact?.recordID === id,
    );

    const { givenName, familyName, thumbnailPath } = getContact || {};
    const { emailAddresses, phoneNumbers } = getContact || {};
    if (phoneNumbers.length) {
      phoneNumbers[0].number.includes('+') ? toast.info('Country code is already selected please re-enter mobile number') : null;
      setState((prev: any) => ({
        ...prev,
        firstName: givenName || '',
        lastName: familyName || '',
        avatar: thumbnailPath ? { path: thumbnailPath } : '',
        email: emailAddresses[0]?.email || '',
        phone: phoneNumbers[0]?.number.replace(/[^\d\+]/g, '') || '',
        alternativePhone: phoneNumbers[1]?.number.replace(/[^\d\+]/g, '') || '',
        selectedIdContact: '',
        showModal: false,
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        firstName: givenName || '',
        lastName: familyName || '',
        avatar: thumbnailPath ? { path: thumbnailPath } : '',
        email: emailAddresses[0]?.email || '',
        selectedIdContact: '',
        showModal: false,
      }));
    }
  };

  return (
    <MainPageTemplate bc={COLORS.white}>
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setState((prev: any) => ({
                ...prev,
                countryCode: value.countryCode,
                dialCode: value.dialCode
              }))
              dispatch(closeCountryModal())
            }}
          />
        )
      }
      <ScrollContainer>
        <View style={styles.paddingContent}>
          <Button
            buttonStyle={styles.buttonSpace}
            textStyle={styles.buttonTitle}
            text={'Add from contacts'}
            image={require('assets/global/add.png')}
            onPress={() => setState((prev: any) => ({
              ...prev,
              showModal: true,
            }))}
          />
          <UserAvatar avatar={avatar} onPress={onCamera} />
          <View style={styles.rowInput}>
            <Field
              required
              value={firstName}
              error={firstNameError}
              onChange={(text: string) => {
                setState((prev: any) => ({
                  ...prev,
                  firstNameError: '',
                  firstName: text
                }));
              }}
              label={t(translations.clientDetails.firstName)}
              w="48%"
              mt={16}
            />
            <Field
              required
              value={lastName}
              error={lastNameError}
              onChange={(text: string) => {
                setState((prev: any) => ({
                  ...prev,
                  lastNameError: '',
                  lastName: text
                }));
              }}
              label={t(translations.clientDetails.lastName)}
              w="48%"
              mt={16}
            />
          </View>
          <Pressable mt={10} onPress={() => dispatch(openCountryModal())}>
            <Text numberOfLines={1} style={[styles.input, {
              color: 'black',
              borderColor: COLORS.whiteGray,
            }]}>
              {`${countryCode} (+${dialCode || filterCountry.phonecode})`}
            </Text>
          </Pressable>
          <Field
            keyboardType="phone-pad"
            value={phone}
            maxLength={13}
            error={phoneError}
            onChange={(text: string) => {
              setState((prev: any) => ({
                ...prev,
                phone: text,
                phoneError: ''
              }))
              !text && !email && !alternativePhone && setState((prev: any) => ({
                ...prev,
                notifications: false
              }));
            }}
            label={t(translations.clientDetails.mobile)}
            mt={16}
          />
          <Field
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            disabled={isEdit && subClient?.isConnected}
            error={emailError}
            onChange={(text: string) => {
              setState((prev: any) => ({
                ...prev,
                email: text,
                emailError: ''
              }));
              !text && !phone && !alternativePhone && setState((prev: any) => ({
                ...prev,
                notifications: false
              }));
            }}
            label={t(translations.clientDetails.email)}
            mt={26}
          />
          <Field
            value={notes}
            onChange={(text: string) => {
              setState((prev: any) => ({
                ...prev,
                notes: text,
              }));
            }}
            multiline
            label={t(translations.clientDetails.notes)}
            size="xl"
            mt={16}
          />
          <View style={styles.notifyContainer}>
            {(!isEdit || (isEdit && !subClient?.isConnected)) && (
              <>
                <View style={styles.rowSpace}>
                  <Text style={styles.switchTitle}>
                    {t(translations.clientDetails.notifications)}
                  </Text>
                  <Toggle
                    checked={!!notifications}
                    onChange={(value) => {
                      if (!phone && !alternativePhone && !email) {
                        return alert.info(
                          t(translations.clientDetails.warning),
                        );
                      }

                      setState((prev: any) => ({
                        ...prev,
                        notifications: value,
                        notificationChannel: null
                      }));
                    }}
                  />
                </View>
                <Separator />
              </>
            )}
            <View style={styles.rowSpace}>
              <Text style={styles.switchTitle}>
                {t(translations.clientDetails.active)}
              </Text>
              <Toggle checked={isActive} onChange={(value: any) =>
                setState((prev: any) => ({
                  ...prev,
                  isActive: value
                }))} />
            </View>
          </View>
          {(phone || alternativePhone || email) && notifications ? (
            <DropMenu
              placeholder={t(translations.clientDetails.preference)}
              items={getOptions()}
              value={notificationChannel}
              error={notificationChannelError}
              onChange={(value) => {
                setState((prev: any) => ({
                  ...prev,
                  notificationChannel: value
                }))
              }}
            />
          ) : null}
          <CheckBoxComponent
            styleContainer={styles.checkboxContainer}
            styleLabel={styles.checkBoxLabel}
            checked={addressVisible}
            onChange={(value: boolean) => {
              setState((prev: any) => ({
                ...prev,
                addressVisible: value
              }))
            }}
            label={t(translations.clientDetails.clientAddress)}
          />
          {addressVisible && (
            <View style={styles.paddingAddress}>
              <GoogleAutocomplete
                formattedAddress={address?.formattedAddress}
                onPress={(value: any) => setState((prev: any) => ({
                  ...prev,
                  address: value
                }))}
              />
              {!!address?.formattedAddress && (
                <Field
                  value={additionalAddress}
                  onChange={(value: any) => setState((prev: any) => ({
                    ...prev,
                    additionalAddress: value
                  }))}
                  label={t(translations.clientDetails.additionalAddress)}
                  mt={16}
                />
              )}
            </View>
          )}
          <CheckBoxComponent
            styleContainer={styles.checkboxContainer}
            styleLabel={styles.checkBoxLabel}
            checked={moreVisible}
            onChange={(value: boolean) =>
              setState((prev: any) => ({
                ...prev,
                moreVisible: value
              }))}
            label={t(translations.clientDetails.moreDetails)}
          />
          {moreVisible && (
            <>
              <BirthdayDate
                show={show}
                birthday={birthday || t(translations.clientDetails.birthday)}
                date={new Date(birthdayData)}
                pressShow={() => {
                  if (!isAddressExist) {
                    toast.info(t(translations.common.errors.timezoneErrorBday))
                  } else {
                    setState((prev: any) => ({
                      ...prev,
                      show: true
                    }))
                  }
                }}
                onCancel={() => setState((prev: any) => ({
                  ...prev,
                  show: false
                }))}
                pressDate={(date: any) => {
                  setState((prev: any) => ({
                    ...prev,
                    show: false,
                    birthdayData: date.toISOString(),
                    birthday: moment(date).format('L')
                  }))
                }}
              />
              <Pressable disabled mt={10} onPress={() => { }}>
                <Text numberOfLines={1} style={[styles.input, {
                  color: 'black',
                  borderColor: COLORS.whiteGray,
                }]}>
                  {`${countryCode} (+${dialCode || filterCountry.phonecode})`}
                </Text>
              </Pressable>
              <Field
                value={alternativePhone}
                error={alternativePhoneError}
                onChange={(text: string) => {
                  setState((prev: any) => ({
                    ...prev,
                    alternativePhone: text,
                    alternativePhoneError: ''
                  }));
                  !text && !email && !phone && setState((prev: any) => ({ ...prev, notifications: false }));;
                }}
                label={t(translations.clientDetails.otherNumber)}
                keyboardType="phone-pad"
                mt={16}
                maxLength={13}
              />
            </>
          )}
        </View>
      </ScrollContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal || false}
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
                    {'Choose from contacts'}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setState((prev: any) => ({
                  ...prev,
                  showModal: false,
                }))}>
                  <Image
                    source={require('assets/global/close.png')}
                    style={styles.closeImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.paddingContentScroll}>
                <View style={styles.textBoxContainer}>
                  <TextInput
                    style={styles.inputSearch}
                    placeholder={'Keyword...'}
                    onChangeText={(text: string) => searchFilterFunction(text)}
                    placeholderTextColor={COLORS.warmGrey}
                    underlineColorAndroid="transparent"
                    defaultValue={search}
                  />
                  <View style={styles.searchPosition}>
                    <Image
                      source={require('assets/global/searcn.png')}
                      style={styles.arrow}
                    />
                  </View>
                </View>
                <Text style={styles.yourTitle}>Your contacts list</Text>
                <View style={styles.paddingExtra}>
                  <FlatList
                    data={filteredContacts || []}
                    renderItem={renderListItem}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                  />
                </View>
              </View>
              {selectedIdContact ? (
                <TouchableOpacity
                  style={styles.importButton}
                  onPress={takeContact}
                >
                  <Text style={styles.titleImport}>Import Contact</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <View style={styles.bottomBlock}>
        <Button
          text={t(translations.clientDetails.button)}
          onPress={onSave}
          loading={loading}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
        />
      </View>
    </MainPageTemplate>
  );
};

export default AddClient;
