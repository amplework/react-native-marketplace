import { StackScreenProps } from '@react-navigation/stack';
import { validateVendor } from 'components/vendors/helpers/validation';
import { useFormik } from 'formik';
import { useToggleState } from 'hooks';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import RNlocalize from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import { Navigator } from 'service/navigator';
import Button from 'shared/button';
import { ContactsModal } from 'shared/contactsModal';
import { CountryPicker } from 'shared/countryPicker';
import SafeContainer from 'shared/container';
import { Field } from 'shared/field';
import GoogleAutocomplete from 'shared/googleAutocomplete';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import ScrollContainer from 'shared/scrollContainer';
import {
  createVendor,
  editVendor,
  vendorsSelectors,
} from 'store/entities/vendors';
import { closeCountryModal, userSelectors, openCountryModal } from 'store/entities/user';
import { AutocompleteAddress } from 'types/address';
import { ContactValues } from 'types/contacts';
import { VendorValues } from 'types/vendors';
import { capitalize } from 'utils/strings';

import { styles } from './style';
import { countryCodes } from 'utils/countryCodes';
import { toast } from 'shared/toast';
import { adaptVendor } from 'components/vendors/helpers/adapters';
import { Pressable } from 'shared/pressable';
import COLORS from 'utils/colors';

type Props = StackScreenProps<RootStackParamList, 'AddEditVendor'>;

const AddEditVendor: React.FC<Props> = ({ navigation, route }) => {
  let { vendor, onEdit } = route.params || {};
  const provider = useSelector((state: any) => state.provider.provider);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const locales = RNlocalize.getLocales()[0];
  const deviceCountryCode = locales.countryCode;
  const defaultCountryCode = vendor?.countryCode ? vendor?.countryCode : (provider?.countryCode || deviceCountryCode);

  const filterCountry = countryCodes.filter((e: any) => e.sortname == defaultCountryCode)[0];

  const loading = useSelector(vendorsSelectors.addEditLoading);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  let numbers = vendor?.phoneNumber?.replace(/[!@#$%^&*+-]/g, "");
  const isFormattedNumber = vendor && vendor?.phoneNumber.includes('-');
  let numberWithoutCode = vendor?.phoneNumber.substring(vendor?.phoneNumber.indexOf('-') + 1);

  const [isModalOpen, toggleModal] = useToggleState(false);
  const [dialCode, setDialCode] = useState(filterCountry?.phonecode ? filterCountry?.phonecode : '1');
  const [countryCode, setCountryCode] = useState(vendor?.countryCode ? vendor?.countryCode : (provider?.countryCode || deviceCountryCode));
  const [maxLength, setMaxLength] = useState(vendor?.phoneNumber ? numbers?.length : 10)  

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;

  const onSubmit = (values: VendorValues) => {
    const vendorValues = {
      name: values.name,
      phoneNumber: `+${dialCode}-${values.phoneNumber}`,
      email: values.email,
      notes: values.notes,
      address: values.address,
      countryCode: countryCode
    }

    if (values?.phoneNumber.includes('+')) {
      toast.info('Please select the country code from particular country code field. Do not add it in telephone field');
      return;
    }
    if (values.phoneNumber.length >= 2) {
      var data = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );
      if (data) {
      const number = phoneUtil.parseAndKeepRawInput(`${dialCode + values?.phoneNumber}`, countryCode)
      const isValid = phoneUtil.isValidNumberForRegion(number, countryCode);
      //@ts-ignore
        let exNum = data.values_[2];
        if(countryCode == 'IN' && values?.phoneNumber.trim().length < 10) {
          setFieldError('phoneNumber', 'Phone number is not valid.')
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          console.log('valid');
        } else {
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        console.log('valid');
      }

    } else if (values?.phoneNumber.length <= 2) {
      toast.info('Phone number is not valid')
      return;
    }

    if (vendor) {
      const editValues = {
        name: values.name,
        phoneNumber: `+${dialCode}-${values.phoneNumber}`,
        email: values.email,
        notes: values.notes,
        address: values.address,
        countryCode: countryCode
      }
      dispatch(editVendor({ values: editValues, onSuccess: onEdit }));
    } else {
      dispatch(createVendor(vendorValues));
    }
  };

  const {
    values,
    errors,
    setFieldValue,
    setValues,
    setFieldError,
    handleChange,
    handleSubmit,
  } = useFormik<VendorValues>({
    initialValues: vendor ? vendor : {
      name: '',
      phoneNumber: '',
      email: '',
      notes: '',
      countryCode: '',
      address: null,
    },
    validate: validateVendor,
    validateOnChange: false,
    onSubmit,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={20}>
          {t(translations.vendors.details.title)}
        </Paragraph>
      ),
      headerRight: () => (
        <Icon
          src={require('assets/global/close.png')}
          onPress={Navigator.goBack}
          mr={20}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!route.params?.vendor) {
      return;
    }

    if (!isFormattedNumber) {
      toast.info('Inavlid Number, Please update it again with country code');
      return;
    }

    const vendorDetails = {
      name: vendor?.name,
      email: vendor?.email,
      phoneNumber: numberWithoutCode,
      address: vendor?.address,
      notes: vendor?.notes,
      countryCode: vendor?.countryCode,
    }

    setValues(adaptVendor(vendorDetails));
  }, [route.params, setValues]);

  const handleSelectAddress = (address: AutocompleteAddress) =>
    setFieldValue('address', {
      ...address,
      addressLine2: values.address?.addressLine2,
    });

  const importContactData = (contactValues: ContactValues) => {
    setValues({
      ...values,
      name: `${contactValues.givenName} ${contactValues.familyName}` || '',
      phoneNumber: contactValues.phone || '',
      email: contactValues.email || '',
    });
  };

  return (
    <SafeContainer containerStyle={styles.container}>
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setCountryCode(value.countryCode);
              setDialCode(value.dialCode)
              dispatch(closeCountryModal());
            }}
          />
        )
      }
      <ScrollContainer styleExtra={styles.content}>
        <Button
          buttonStyle={styles.buttonSpace}
          textStyle={styles.buttonTitle}
          text={t(translations.contactsModal.addFromContacts)}
          image={require('assets/global/add.png')}
          onPress={toggleModal}
        />
        <Field
          value={values.name}
          label={t(translations.form.name)}
          onChange={handleChange('name')}
          error={errors.name}
          required
          mb={10}
        />
        <Pressable mt={10} onPress={() => dispatch(openCountryModal())}>
          <Text numberOfLines={1} style={[styles.input, {
            color: 'black',
            borderColor: COLORS.whiteGray,
          }]}>
            {`${countryCode} (+${dialCode || filterCountry.phonecode})`}
          </Text>
        </Pressable>
        <Field
          value={vendor ? values.phoneNumber.substring(values.phoneNumber.indexOf('-') + 1) : values.phoneNumber}
          label={t(translations.form.phoneNumber)}
          onChange={handleChange('phoneNumber')}
          error={errors.phoneNumber}
          keyboardType="phone-pad"
          maxLength={13}
          mb={20}
          mt={30}
        />
        <Field
          value={values.email}
          label={t(translations.form.email)}
          keyboardType="email-address"
          autoCapitalize="none"
          onChange={handleChange('email')}
          error={errors.email}
          mb={20}
        />
        <Field
          value={values.notes}
          label={t(translations.form.notes)}
          onChange={handleChange('notes')}
          error={errors.notes}
          size="xl"
          multiline
          mb={40}
        />
        <GoogleAutocomplete
          formattedAddress={values.address?.formattedAddress}
          onPress={handleSelectAddress}
        />
        {values.address?.formattedAddress && (
          <Field
            value={values.address?.addressLine2 as string}
            label={t(translations.form.additionalAddress)}
            onChange={handleChange('address.addressLine2')}
            //@ts-ignore
            error={errors.address?.addressLine2}
            mb={20}
            mt={20}
          />
        )}
      </ScrollContainer>
      <ContactsModal
        isOpen={isModalOpen}
        toggleOpenModal={toggleModal}
        setDataFromContact={importContactData}
      />
      <View style={styles.saveButtonContainer}>
        <Button
          text={t(translations.common.saveDetailsButton, {
            name: capitalize(t(translations.common.entities.vendor)),
          })}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeContainer>
  );
};

export { AddEditVendor };
