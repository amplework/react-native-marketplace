import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-crop-picker';
import libphonenumber from "google-libphonenumber";
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { Alert, Text, View } from 'react-native';
import RNlocalize from 'react-native-localize';
import Button from 'shared/button';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import ScrollContainer from 'shared/scrollContainer';
import COLORS from 'utils/colors';

import styles from './style';
import { AddressModal } from 'shared/addressModal';
import { useDispatch, useSelector } from 'react-redux';
import { modalSelectors, openAddressModal } from 'store/entities/modal';
import { closeCountryModal, openCountryModal, userSelectors } from 'store/entities/user';
import { Pressable } from 'shared/pressable';
import { CountryPicker } from 'shared/countryPicker';
import { MainPageTemplate } from 'shared/templates';
import { BackButton } from 'shared/backButton';
import UserAvatar from 'shared/userAvatar';
import { isIOS } from 'utils/device';
import { alert } from 'shared/alert';
import { countryCodes } from 'utils/countryCodes';
import { toast } from 'shared/toast';
import { Paragraph } from 'shared/paragraph';
import { PersonalInfoValues } from 'types/signUpFlow';
import { adaptPerosonalInfo } from 'components/signupFlow/helpers/utils';
import { signUpPersonalInfoSchema } from 'components/signupFlow/helpers/validation';
import { updateProviderProfile } from 'store/actions/provider';
var tzlookup = require("tz-lookup");

type Props = {
  navigation: any;
};

const PersonalInfo: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const timezones = moment.tz.names();
  const timezoneArray = timezones.map((e) => ({ name: e }));

  Geocoder.init('AIzaSyDtN8tEhH79TiHl56qlP1P5gSSLOgyIvik');

  const provider = useSelector((state: any) => state.provider.provider);
  const isAddressModalOpen = useSelector(modalSelectors.isAddressModalOpened);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);

  const locales = RNlocalize.getLocales()[0];
  const localCountryCode = locales.countryCode;
  const loading = useSelector((state: any) => state.provider.loading);

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;

  const { values, setFieldValue, setFieldError, errors, handleSubmit } =
    useFormik<PersonalInfoValues>({
      initialValues: provider ? adaptPerosonalInfo(provider) : {
        avatar: '',
        address: null,
        lastName: '',
        phoneNumber: '',
        countryCode: '',
        dialCode: '',
        addressDetailsLine: '',
        firstName: '',
        utctimezone: '',
        utcOffset: 0,
      },
      validationSchema: signUpPersonalInfoSchema,
      validateOnChange: false,
      onSubmit: (formValues) => {
        let newFormData = new FormData();
        if (Number(formValues?.phoneNumber) >= 2) {
          var data: any = phoneUtil.getExampleNumberForType(
            formValues?.countryCode,
            PhoneNumberType.MOBILE,
          );
          if (data) {
            let exNum = data.values_[2];
            let errorMessage = `Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`;
            const number = phoneUtil.parseAndKeepRawInput(`+${formValues?.dialCode}-${formValues?.phoneNumber}`, formValues?.countryCode);
            let isValid = phoneUtil.isValidNumberForRegion(number, formValues?.countryCode);
            if(formValues?.countryCode == 'IN' && formValues?.phoneNumber.trim().length < 10) {
              setFieldError('phoneNumber', 'Phone number is not valid')
              toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
              return;
            }
            
            if (!isValid) {
              setFieldError('phoneNumber', errorMessage);
              return;
            }
          }
        } else {
          setFieldError('phoneNumber', 'Phone number is not valid')
          return;
        }

        newFormData.append('lastName', formValues?.lastName);
        newFormData.append('firstName', formValues?.firstName);
        newFormData.append('countryCode', formValues?.countryCode ? formValues?.countryCode : 'US');
        newFormData.append('phoneNumber', `+${formValues?.dialCode}-${formValues?.phoneNumber}`);
        newFormData.append('addressDetailsLine', formValues?.addressDetailsLine);
        if(provider?.isHouseCallAllowed) {
          newFormData.append('isHouseCallAllowed', provider?.isHouseCallAllowed || false);
        }
        newFormData.append(
          'address',
          JSON.stringify({
            ...formValues?.address,
            utcOffset: formValues?.utcOffset || 0,
            utctimezone: formValues?.address?.utctimezone || '',
            addressLine2: formValues?.addressDetailsLine,
          })
        );
        if (provider?.industryId) {
          newFormData.append('industryId', provider?.industryId);
        }
        if (provider?.serviceId) {
          newFormData.append('serviceId', provider?.serviceId);
        }
        if (provider?.providerImage) {
          newFormData.append('providerImage', provider?.providerImage);
        }
        if (formValues?.avatar) {
          newFormData.append(
            'photo',
            // @ts-ignore
            formValues?.avatar?.path
              ? {
                // @ts-ignore
                uri: formValues?.avatar?.path,
                // @ts-ignore
                name: formValues?.avatar?.filename || 'name.jpg',
                // @ts-ignore
                type: formValues?.avatar?.mime,
              }
              : formValues?.avatar,
          );
        }
        dispatch(updateProviderProfile(newFormData, true));
      },
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: null,
      headerLeft: () => <BackButton />,
    });
  }, [navigation, t]);

  useEffect(() => {
    if (!provider?.countryCode && !provider?.address?.utctimezone) {
      getCurrentLocation();
    }
  }, [provider]);

  const handleFieldChange =
    <F extends keyof PersonalInfoValues>(field: F) =>
      (value: PersonalInfoValues[F]) =>
        setFieldValue(field, value);

  const handleAddressChange =
    <F extends keyof PersonalInfoValues>(field: F) =>
      (value: PersonalInfoValues[F]) => {
        let offset = moment.tz(value?.utctimezone).utcOffset();
        setFieldValue('address', value);
        setFieldValue('utctimezone', value?.utctimezone);
        setFieldValue('utcOffset', offset);
      }
  const handleCountryCodeChange =
    <F extends keyof PersonalInfoValues>(field: F) =>
      (value: PersonalInfoValues[F]) => {
        setFieldValue('countryCode', value?.countryCode);
        setFieldValue('dialCode', value?.dialCode);
        dispatch(closeCountryModal());
      }

  const dispatch = useDispatch();

  const onAddressModalOpened = () => dispatch(openAddressModal());

  const onCamera = () => {
    Alert.alert('Choose method', 'Please choose a method', [
      {
        text: 'Camera',
        onPress: () =>
          ImagePicker.openCamera({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              handleFieldChange('avatar')(image)
            },
          ),
      },
      {
        text: 'Library',
        onPress: () =>
          ImagePicker.openPicker({ compressImageQuality: 0.3 }).then(
            (image: any) => {
              handleFieldChange('avatar')(image)
            },
          ),
      },
      {
        text: 'Delete',
        onPress: () => {
          handleFieldChange('avatar')('')
        },
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => { },
      },
    ], { cancelable: true });
  };

  const getCurrentLocation = async () => {
    if (isIOS) {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if (auth === "denied") {
        return alert.info(
          t(translations.dashboard.deniedPermission),
          t(translations.common.warning),
        );
      }

      if (auth === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const utcTimezone = tzlookup(latitude, longitude);
            handleFieldChange('utctimezone')(utcTimezone);
            const json = await Geocoder.from({ latitude, longitude });
            const result = json?.results[0]?.address_components;

            const findCountry = result?.filter((e: any) => e.types[0] == 'country');
            const userCountryCode = findCountry?.length ? findCountry[0]?.short_name : localCountryCode;
            const filterCode = countryCodes.filter((e: any) => e.sortname == (userCountryCode || localCountryCode))[0];

            handleFieldChange('countryCode')(userCountryCode);
            handleFieldChange('dialCode')(filterCode?.phonecode)
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    } else {
      const auth = await Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (auth === "denied") {
        return alert.info(
          t(translations.dashboard.deniedPermission),
          t(translations.common.warning),
        );
      }

      if (auth === "granted") {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const utcTimezone = tzlookup(latitude, longitude);
            const json = await Geocoder.from({ latitude, longitude });
            const result = json?.results[0]?.address_components;

            const findCountry = result?.filter((e: any) => e.types[0] == 'country');

            const userCountryCode = findCountry?.length ? findCountry[0]?.short_name : localCountryCode;
            const filterCode = countryCodes.filter((e: any) => e.sortname == (userCountryCode || localCountryCode))[0];

            handleFieldChange('countryCode')(userCountryCode);
            handleFieldChange('dialCode')(filterCode?.phonecode)
          },
          (error) => toast.info(error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    }
  }

  return (
    <MainPageTemplate
      containerStyle={styles.container}
      bc={COLORS.white}
      loading={loading}
    >
      {isAddressModalOpen && (
        <AddressModal
          formattedAddress={values?.address}
          onChangeAddress={handleAddressChange('address')}
        />
      )}
      {
        countryCodePicker && (
          <CountryPicker
            onPress={handleCountryCodeChange('countryCode')}
          />
        )
      }
      <Text style={styles.title}>{t(translations.personalInfo.title)}</Text>
      <Text style={styles.description}>
        {t(translations.personalInfo.description)}
      </Text>
      <ScrollContainer extraScroll={200}>
        <UserAvatar avatar={values?.avatar} onPress={onCamera} />
        <View style={styles.rowInput}>
          <Field
            value={values?.firstName}
            onChange={handleFieldChange('firstName')}
            label={t(translations.personalInfo.fields.firstName)}
            required
            error={errors?.firstName}
            w="48%"
            mt={16}
          />
          <Field
            value={values?.lastName}
            onChange={handleFieldChange('lastName')}
            label={t(translations.personalInfo.fields.lastName)}
            required
            error={errors?.lastName}
            w="48%"
            mt={16}
          />
        </View>
        <Pressable mt={20} onPress={() => dispatch(openCountryModal())}>
          <Text numberOfLines={1} style={[styles.input, {
            color: 'black',
            borderColor: COLORS.whiteGray,
          }]}>
            {`${values?.countryCode} (+${values?.dialCode || '91'})`}
          </Text>
        </Pressable>
        <Field
          keyboardType="phone-pad"
          value={values?.phoneNumber}
          onChange={handleFieldChange('phoneNumber')}
          maxLength={13}
          error={errors?.phoneNumber}
          label={t(translations.personalInfo.fields.telephone)}
          required
          mt={16}
        />
        <View style={styles.paddingAddress}>
          <Pressable onPress={onAddressModalOpened}>
            <Text numberOfLines={1} style={[styles.input,
            errors?.address ? styles.addressError : null,
            values?.address ? styles.addressText : null,
            ]}>
              {values?.address ? values?.address?.formattedAddress : '*Address Line'}
            </Text>
          </Pressable>
          {errors?.address ? (
            <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
              {errors?.address}
            </Paragraph>
          ) : null}
          {values?.address?.formattedAddress ? (
            <Field
              mt={16}
              value={values?.addressDetailsLine}
              onChange={handleFieldChange('addressDetailsLine')}
              label={t(translations.personalInfo.fields.additionalAddress)}
            />)
            : null}
        </View>
        <DropMenu
          value={values?.utctimezone}
          onChange={handleFieldChange('utctimezone')}
          items={timezoneArray?.map((item: any) => ({
            label: item.name,
            value: item.name,
          }))}
          placeholder={'Select timezone'}
        />
      </ScrollContainer>
      <View style={styles.rowButtons}>
        <Button
          onPress={handleSubmit}
          text={t(translations.personalInfo.continue)}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </MainPageTemplate>
  );
};

export { PersonalInfo };