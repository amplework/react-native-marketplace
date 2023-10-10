import I18n from 'locales';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Pressable } from 'shared/pressable';
import RNlocalize from 'react-native-localize';
import ImagePicker from 'react-native-image-crop-picker';
import libphonenumber from "google-libphonenumber";
import BirthdayDate from 'shared/birthdayDate';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import ScrollContainer from 'shared/scrollContainer';
import UserAvatar from 'shared/userAvatar';
import REGEX from 'utils/regex';
import { countryCodes } from 'utils/countryCodes';
import { TIMEZONES } from 'utils/constants';

import { GenderOptions, PreferenceOptions } from './options';
import styles from './style';
import { toast } from 'shared/toast';
import COLORS from 'utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelectors, openAddressModal } from 'store/entities/modal';
import { openCountryModal, userSelectors } from 'store/entities/user';
import { AddressModal } from 'shared/addressModal';
import { Paragraph } from 'shared/paragraph';
import { CountryPicker } from 'shared/countryPicker';

export interface Props {
  utctimezone:string;
  firstName: string;
  lastName: string;
  countryCode: any;
  telephone: string;
  avatar: string;
  otherNumber: string;
  addressLineFirst: string;
  addressLineSecond: string;
  addressDetailsLine: string;
  state: string;
  zip: string;
  gender: string;
  address: any;
  prefForMessage: string;
  birthday: any;
  otherNumberDetails: string;
  moreDetails: boolean;
  dialCode:any,
  onChangeBirthday: (text: string) => void;
  onChangeBirthdayData: (text: string) => void;
  onChangeAddressDetailsLine: (text: string) => void;
  onChangeTimezone: (text: string) => void;
  onChangePrefForMessage: (text: string) => void;
  onChangeOtherNumberDetails: (text: string) => void;
  onChangeFirstName: (text: string) => void;
  onChangeLastName: (text: string) => void;
  onChangeTelephone: (text: string) => void;
  onChangeCountry: (value: any) => void;
  onChangeGender: (text: string) => void;
  onChangeOtherNumber: (text: string) => void;
  onChangeAddressLineFirst: (text: string) => void;
  onChangeAddressLineSecond: (text: string) => void;
  onChangeState: (text: string) => void;
  onChangeZip: (text: string) => void;
  onChangeAvatar: (image: string | undefined) => void;
  onChangeMoreDetails: (value: boolean) => void;
  onSelectAddress: (data: any) => void;
  onContinue: () => void;
}

const PersonalInfo: React.FC<Props> = (props) => {
  const {
    utctimezone,
    firstName,
    lastName,
    gender,
    countryCode,
    telephone,
    avatar,
    otherNumber,
    prefForMessage,
    addressDetailsLine,
    moreDetails,
    address,
    birthday,
    dialCode,
    onSelectAddress,
    onChangeBirthday,
    onChangeBirthdayData,
    onChangePrefForMessage,
    onChangeAddressDetailsLine,
    onChangeTimezone,
    onChangeMoreDetails,
    onChangeFirstName,
    onChangeLastName,
    onChangeGender,
    onChangeCountry,
    onChangeTelephone,
    onChangeAvatar,
    onChangeOtherNumber,
    onContinue,
  } = props;
  const isAddressModalOpen = useSelector(modalSelectors.isAddressModalOpened);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const [show, setShow] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otherNumberError, setOtherNumberError] = useState('');
  const [addressError, setAddressError] = useState('');

  const dispatch = useDispatch();  

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;
  
  const onCamera = () => {
    Alert.alert('Choose method', 'Please choose a method', [
      {
        text: 'Camera',
        onPress: () =>
          ImagePicker.openCamera({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              onChangeAvatar(image);
            },
          ),
      },
      {
        text: 'Library',
        onPress: () =>
          ImagePicker.openPicker({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              onChangeAvatar(image);
            },
          ),
      },
      {
        text: 'Delete',
        onPress: () => {
          onChangeAvatar('');
        },
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ], {cancelable: true});
  };

  const onAddressModalOpened = () => {
    dispatch(openAddressModal())
  }

  const validate = () => {
    if (REGEX.fname.test(firstName)) {
      setFirstNameError('');
    } else {
      setFirstNameError('First name is not valid');
      return;
    }
    if (REGEX.lname.test(lastName)) {
      setLastNameError('');
    } else {
      setLastNameError('Last name is not valid');
      return;
    }
    if (telephone.length >= 2) {
      var data: any = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );

      if (data) {
        const number = phoneUtil.parseAndKeepRawInput(`${dialCode + telephone}`, countryCode)
        let isValid = phoneUtil.isValidNumberForRegion(number, countryCode);

        let exNum = data.values_[2];
        if(countryCode == 'IN' && telephone.trim().length < 10) {
          setPhoneError('Phone number is not valid');
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          console.log('valid');
        } else {
          setPhoneError('Phone number is not valid');
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        console.log('valid');
      }
    } else {
      toast.info('phone number is not valid')
      return;
    }
    // if (!otherNumber.length || otherNumber.length==maxLength) {
    //   setOtherNumberError('');
    // } else {
    //   setOtherNumberError('WhatsApp / Other number is not valid');
    //   return;
    // }

    if (otherNumber.trim().length) {
      var data: any = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );

      if (data) {
        const number = phoneUtil.parseAndKeepRawInput(`${dialCode + otherNumber}`, countryCode);
        const isValid = phoneUtil.isValidNumberForRegion(number, countryCode);

        let exNum = data.values_[2];
        if(countryCode == 'IN' && otherNumber.trim().length < 10) {
          setOtherNumberError('Phone number is not valid');
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          setOtherNumberError('');
        } else {
          setOtherNumberError('Phone number is not valid');
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        setOtherNumberError('');
      }
    } else {
      setOtherNumberError('');
    }

    if (address?.formattedAddress) {
      setAddressError('');
    } else {
      setAddressError('Address line is a required field');
      return;
    }

    onContinue();
  };
  return (
    <>
      {isAddressModalOpen && (
        <AddressModal
          formattedAddress={address}
          onChangeAddress={onSelectAddress}
        />
      )}
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => onChangeCountry(value)}
          />
        )
      }
      <Text style={styles.title}>{I18n.t('personalInfoClient.title')}</Text>
      <Text style={styles.description}>
        {I18n.t('personalInfoClient.description')}
      </Text>
      <ScrollContainer styleExtra={styles.extraPadding} extraScroll={200}>
        <UserAvatar avatar={avatar} onPress={onCamera} />
        <View style={styles.rowInput}>
          <Field
            value={firstName}
            error={firstNameError}
            onChange={(text: string) => onChangeFirstName(text)}
            label={I18n.t('personalInfoClient.firstName')}
            w="48%"
            mt={16}
          />
          <Field
            value={lastName}
            error={lastNameError}
            onChange={(text: string) => onChangeLastName(text)}
            label={I18n.t('personalInfoClient.lastName')}
            w="48%"
            mt={16}
          />
        </View>
        <Pressable mt={20} onPress={() => dispatch(openCountryModal())}>
          <Text numberOfLines={1} style={[styles.input, {
            color: 'black',
            borderColor: COLORS.whiteGray,
          }]}>
            {`${countryCode} (+${dialCode})`}
          </Text>
        </Pressable>
        <Field
          keyboardType="phone-pad"
          maxLength={13}
          value={telephone}
          error={phoneError}
          onChange={(text: string) => {
            setPhoneError('');
            onChangeTelephone(text);
          }}
          label={I18n.t('personalInfoClient.telephone')}
          mt={16}
        />
        <DropMenu
          placeholder={I18n.t('personalInfoClient.gender')}
          onChange={(value) => {
            onChangeGender(value);
          }}
          items={GenderOptions}
          value={gender}
        />
        <Field
          keyboardType="phone-pad"
          value={otherNumber}
          maxLength={13}
          error={otherNumberError}
          onChange={(text: string) => {
            setOtherNumberError('');
            onChangeOtherNumber(text);
          }}
          label={I18n.t('personalInfoClient.otherNumber')}
          mt={16}
        />
        <View style={styles.paddingAddress}>
          <Pressable onPress={onAddressModalOpened}>
            <Text numberOfLines={1} style={[styles.input, {
              color: address ? 'black' : COLORS.battleshipGrey32,
              borderColor: addressError?.trim().length > 0 ? COLORS.red : COLORS.whiteGray,
            }]}>
              {address ? address?.formattedAddress : '*Address Line'}
            </Text>
          </Pressable>
          {addressError?.trim().length > 0 && (
            <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
              {addressError}
            </Paragraph>
          )}
          {address ? (
            <Field
              value={addressDetailsLine}
              onChange={(text: string) => {
                onChangeAddressDetailsLine(text);
              }}
              label="Additional address details"
              mt={16}
            />
          ) : null}
        </View>
        <DropMenu
          value={utctimezone}
          onChange={onChangeTimezone}
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
          onChange={(value: boolean) => onChangeMoreDetails(value)}
          label={I18n.t('personalInfoClient.moreDetails')}
        />
        {moreDetails && (
          <>
            <BirthdayDate
              show={show}
              birthday={birthday || I18n.t('clientDetails.birthday')}
              pressShow={() => setShow(true)}
              onCancel={() => setShow(false)}
              pressDate={(date: any) => {
                onChangeBirthdayData(date.toISOString());
                onChangeBirthday(moment(date).format('L'));
                setShow(false);
              }}
            />
            <DropMenu
              placeholder={I18n.t('personalInfoClient.preference')}
              onChange={onChangePrefForMessage}
              items={PreferenceOptions}
              value={prefForMessage}
            />
          </>
        )}
      </ScrollContainer>
      <View style={styles.rowButtons}>
        <Button
          onPress={validate}
          text={I18n.t('personalInfoClient.continue')}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default PersonalInfo;
