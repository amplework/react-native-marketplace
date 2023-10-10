import { StackNavigationProp } from '@react-navigation/stack';
import { PreferenceOptions } from 'components/signupFlow/client/personalInfo/options';
import moment from 'moment-timezone';
import React, { useState, useLayoutEffect } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import RNlocalize from 'react-native-localize';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import BirthdayDate from 'shared/birthdayDate';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import ScrollContainer from 'shared/scrollContainer';
import { MainPageTemplate } from 'shared/templates';
import UserAvatar from 'shared/userAvatar';
import { updateClientProfile } from 'store/actions/client';
import COLORS from 'utils/colors';
import REGEX from 'utils/regex';
import { TIMEZONES } from 'utils/constants';
var tzlookup = require("tz-lookup");
import styles from './style';
import I18n from 'locales';
import { countryCodes } from 'utils/countryCodes';
import { toast } from 'shared/toast';
import { modalSelectors, openAddressModal } from 'store/entities/modal';
import { userSelectors, openCountryModal, closeCountryModal } from 'store/entities/user';
import { AddressModal } from 'shared/addressModal';
import { Pressable } from 'shared/pressable';
import { CountryPicker } from 'shared/countryPicker';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const EditProfile: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const locales = RNlocalize.getLocales()[0];
  const deviceCountryCode = locales.countryCode;
  const user = useSelector(userSelectors.user);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const isAddressModalOpen = useSelector(modalSelectors.isAddressModalOpened)
  const client = useSelector((state: any) => state.client.client);
  const clientTimezone = client?.address?.utctimezone;

  let number = client?.phoneNumber?.replace('-', ' ').split(' ')

  const clientNumber = client ? client?.phoneNumber : user?.phoneNumber;
  const numberWithoutCode = clientNumber ? clientNumber.substring(clientNumber.indexOf('-') + 1) : '';
  const clientCountryCode = client?.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == clientCountryCode)[0];

  const loading = useSelector((state: any) => state.client.loading);

  const [state, setState] = useState({
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    avatar: client?.photo,
    timeZone: client?.address?.utctimezone || '',
    firstName: client?.firstName || '',
    lastName: client?.lastName || '',
    prefForMessage: client?.notificationChannel || '',
    phone: numberWithoutCode,
    countryCode: (filterCountry == undefined) ? deviceCountryCode : filterCountry.sortname,
    dialCode: (filterCountry == undefined) ? deviceCountryCode : filterCountry.phonecode,
    addressDetailsLine: client?.address?.addressLine2 || '',
    show: false,
    moreDetails: client?.birthday,
    address: client?.address ? { ...client.address, utcOffset: client.utcOffset } : '',
    birthday: client?.birthday ? moment(client?.birthday, 'YYYY-MM-DD').format('L') : '',
    birthdayData: client?.birthday,
  })

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;

  const { avatar, firstName, lastName, phone, address, firstNameError,
    lastNameError, countryCode, timeZone, moreDetails, birthday, prefForMessage } = state

  const onCamera = () => {
    Alert.alert('Choose method', 'Please choose a method', [
      {
        text: 'Camera',
        onPress: () =>
          ImagePicker.openCamera({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              setState(prev => ({ ...prev, avatar: image }));
            },
          ),
      },
      {
        text: 'Library',
        onPress: () =>
          ImagePicker.openPicker({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              setState(prev => ({ ...prev, avatar: image }));
            },
          ),
      },
      {
        text: 'Delete',
        onPress: () => {
          setState(prev => ({ ...prev, avatar: '' }));
        },
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => { },
      },
    ], { cancelable: true });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imageClose}
            source={require('assets/global/close.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onAddressModalOpened = () => {
    dispatch(openAddressModal())
  }

  const SetTimeZone = async (value: any) => {
    let tzlookupValue = tzlookup(value.location.lat, value.location.lng);
    setState(prev => ({ ...prev, address: value, timeZone: tzlookupValue }))
  }
  const onSave = () => {
    const formData = new FormData();
    var data: any = phoneUtil.getExampleNumberForType(
      countryCode,
      PhoneNumberType.MOBILE,
    );
    // let length = phone.length === state.maxLength

    if (REGEX.fname.test(firstName)) {
      setState(prev => ({ ...prev, firstNameError: '' }));
    } else {
      setState(prev => ({ ...prev, firstNameError: 'First name is not valid' }));
      return;
    }
    if (REGEX.lname.test(lastName)) {
      setState(prev => ({ ...prev, lastNameError: '' }));
    } else {
      setState(prev => ({ ...prev, lastNameError: 'Last name is not valid' }));
      return;
    }

    if (REGEX.onlyNumbers.test(phone)) {
      setState(prev => ({ ...prev, phoneError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
      return;
    }

    if (phone.length >= 2) {
      if (data) {
        const number = phoneUtil.parseAndKeepRawInput(`${state.dialCode + phone}`, countryCode)
        let isValid = phoneUtil.isValidNumberForRegion(number, countryCode);
        let exNum = data.values_[2];
        if(countryCode == 'IN' && phone.trim().length < 10) {
          setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          setState(prev => ({ ...prev, phoneError: '' }));
        } else {
          setState(prev => ({ ...prev, phoneError: 'Telephone is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        setState(prev => ({ ...prev, phoneError: '' }));
      }

    } else {
      setState(prev => ({ ...prev, phoneError: 'Telephone is not valid' }));
      return;
    }
    let userInfo: any = {
      firstName,
      lastName,
      phoneNumber: `+${state.dialCode}-${phone}`,
      countryCode: countryCode,
      serviceIds: JSON.stringify(client?.services.map((item: any) => item.id)),
    };

    address.utctimezone = timeZone;
    if (address) {
      userInfo = {
        ...userInfo,
        address: JSON.stringify({
          ...address,
          addressLine2: state.addressDetailsLine,
          utctimezone: timeZone
        }),
      };
    }
    if (prefForMessage) {
      userInfo = { ...userInfo, notificationChannel: prefForMessage };
    }
    if (birthday) {
      userInfo = { ...userInfo, birthday: state.birthdayData };
    }
    for (const name in userInfo) {
      formData.append(name, userInfo[name]);
    }

    if (avatar) {
      formData.append(
        'photo',
        avatar?.path
          ? {
            uri: avatar?.path,
            name: avatar?.filename || 'name.jpg',
            type: avatar?.mime,
          }
          : avatar,
      );
    } else {
      formData.append('photo', '');
    }

    dispatch(updateClientProfile(formData));
  };

  return (
    <MainPageTemplate loading={loading} bc={COLORS.white}>
      {isAddressModalOpen && (
        <AddressModal
          formattedAddress={address}
          onChangeAddress={SetTimeZone}
        />
      )}
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setState((prev) => ({ ...prev, countryCode: value.countryCode, dialCode: value.dialCode }));
              dispatch(closeCountryModal())
            }}
          />
        )
      }
      <ScrollContainer
        styleExtra={styles.scrollContainer}
        styleKeyboard={styles.keyboardContainer}
      >
        <UserAvatar avatar={avatar} onPress={onCamera} />
        <View style={styles.rowInput}>
          <Field
            value={firstName}
            onChange={(text: string) => setState(prev => ({ ...prev, firstName: text }))}
            label={I18n.t('personalInfoClient.firstName')}
            w="48%"
            mt={16}
            error={firstNameError}
          />
          <Field
            value={lastName}
            onChange={(text: string) => setState(prev => ({ ...prev, lastName: text }))}
            label={I18n.t('personalInfoClient.lastName')}
            w="48%"
            mt={16}
            error={lastNameError}
          />
        </View>
        <Pressable mt={20} onPress={() => dispatch(openCountryModal())}>
          <Text numberOfLines={1} style={[styles.input, {
            color: 'black',
            borderColor: COLORS.whiteGray,
          }]}>
            {`${state.countryCode} (+${state.dialCode || filterCountry.phonecode})`}
          </Text>
        </Pressable>
        <Field
          keyboardType="phone-pad"
          value={phone}
          maxLength={13}
          error={state.phoneError}
          onChange={(text: string) => setState(prev => ({ ...prev, phoneError: '', phone: text }))}
          label={I18n.t('personalInfoClient.telephone')}
          mt={16}
        />
        <Field
          disabled
          autoCapitalize="none"
          value={client?.email}
          label={I18n.t('basicInfo.emailField')}
          keyboardType="email-address"
          mt={26}
        />
        <View style={styles.paddingAddress}>
          <Pressable onPress={onAddressModalOpened}>
            <Text numberOfLines={1} style={[styles.input, {
              color: address ? 'black' : COLORS.battleshipGrey32,
              borderColor: (address?.formattedAddress === null || address?.formattedAddress == "null") ? COLORS.red : COLORS.whiteGray,
            }]}>
              {address ? address?.formattedAddress : '*Address Line'}
            </Text>
          </Pressable>
          {!!address && (
            <Field
              label="Additional address details"
              value={state.addressDetailsLine}
              onChange={(value) => setState(prev => ({ ...prev, addressDetailsLine: value }))}
              mt={16}
            />
          )}
        </View>
        <DropMenu
          value={timeZone}
          onChange={(value) => setState(prev => ({ ...prev, timeZone: value }))}
          items={TIMEZONES?.map((item: any) => ({
            label: item.name,
            value: item.name,
          }))}
          placeholder={'select timezone'}
        />
        <CheckBox
          styleContainer={styles.checkboxContainer}
          styleLabel={styles.checkBoxLabel}
          checked={moreDetails}
          onChange={(value: boolean) => setState(prev => ({ ...prev, moreDetails: value }))}
          label={I18n.t('personalInfoClient.moreDetails')}
        />
        {moreDetails && (
          <BirthdayDate
            show={state.show}
            birthday={birthday || I18n.t('clientDetails.birthday')}
            pressShow={() => setState(prev => ({ ...prev, show: true }))}
            onCancel={() => setState(prev => ({ ...prev, show: false }))}
            pressDate={(date: any) => {
              let birthData = moment(date).format('YYYY-MM-DD');
              let birthdate = moment.tz(date, clientTimezone).format('L');

              setState(prev => ({
                ...prev, show: false,
                birthdayData: birthData,
                birthday: birthdate,
              }))
            }}
          />
        )}
        <Text style={styles.servicesTitle}>
          {`${I18n.t('personalInfoClient.preference')}`}
        </Text>
        <DropMenu
          placeholder={I18n.t('personalInfoClient.preference')}
          onChange={(value) => setState(prev => ({ ...prev, prefForMessage: value }))}
          items={PreferenceOptions}
          value={prefForMessage}
          style={{ marginTop: 8 }}
        />
        <Text style={styles.servicesTitle}>Services you want</Text>
        <View style={styles.servicesContainer}>
          <View style={styles.servicesField}>
            {client?.services?.map((item: any, index: number) => {
              return (
                <Text key={index} style={styles.serviceTitle}>
                  {item.name +
                    (client?.services.length - 1 === index ? ' ' : ', ')}
                </Text>
              );
            })}
          </View>
          <TouchableOpacity onPress={() => navigation.push('ChooseNeeds')}>
            <Image
              source={require('assets/global/bluePen.png')}
              style={styles.imagePen}
            />
          </TouchableOpacity>
        </View>
      </ScrollContainer>
      <View style={styles.bottomBlock}>
        <Button
          onPress={onSave}
          text={'Save Changes'}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
        />
      </View>
    </MainPageTemplate>
  );
};

export default EditProfile;
