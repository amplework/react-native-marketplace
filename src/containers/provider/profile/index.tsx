import { StackNavigationProp } from '@react-navigation/stack';
import { GenderOptions } from 'components/signupFlow/client/personalInfo/options';
import moment from 'moment-timezone';
import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import RNlocalize from 'react-native-localize';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import BirthdayDate from 'shared/birthdayDate';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import ScrollContainer from 'shared/scrollContainer';
import { MainPageTemplate } from 'shared/templates';
import UserAvatar from 'shared/userAvatar';
import {
  isMoreDetails,
  getProviderProfile,
  updateProviderProfile,
} from 'store/actions/provider';
import { getIndustries, industriesSelectors } from 'store/entities/industries';
import COLORS from 'utils/colors';
import REGEX from 'utils/regex';
import { TIMEZONES } from 'utils/constants';
import { isString } from 'utils/strings';
import styles from './style';
import { toast } from 'shared/toast';
import { BackButton } from 'shared/backButton';
import { Navigator } from 'service/navigator';
import { States } from './type';
import I18n, { t, translations } from 'locales';
import { countryCodes } from 'utils/countryCodes';
import { useFocusEffect } from '@react-navigation/native';
import { userSelectors, openCountryModal, closeCountryModal } from 'store/entities/user';
import { Pressable } from 'shared/pressable';
import { modalSelectors, openAddressModal } from 'store/entities/modal';
import { AddressModal } from 'shared/addressModal';
import { CountryPicker } from 'shared/countryPicker';
import { LinkTypes } from 'types/signUpFlow';
var tzlookup = require("tz-lookup");

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const MyProfile: React.FC<Props> = ({ route, navigation }: any) => {
  const user: any = useSelector(userSelectors.user);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const isAddressModalOpen = useSelector(modalSelectors.isAddressModalOpened)
  const provider = useSelector((state: any) => state.provider.provider);
  const providerTimeZone = provider?.address?.utctimezone;
  const loading = useSelector((state: any) => state.provider.loading);
  const moreDetail = useSelector((state: any) => state.provider.isMoreDetails);
  const industries = useSelector(industriesSelectors.industries);
  const industriesLoading = useSelector(industriesSelectors.loading);
  const locales = RNlocalize.getLocales()[0];
  const deviceCountryCode = locales;

  const dispatch = useDispatch();

  const providerNumber = provider ? provider?.phoneNumber : user?.phoneNumber;
  const alternatePhoneNumber = provider ? provider?.alternatePhoneNumber : user?.alternatePhoneNumber;
  const isFormattedNumber = providerNumber && providerNumber.includes('-');
  const numberWithoutCode = providerNumber ? providerNumber.substring(providerNumber.indexOf('-') + 1) : '';
  const alternatePhoneNumberWithoutCode = alternatePhoneNumber ? alternatePhoneNumber.substring(alternatePhoneNumber.indexOf('-') + 1) : '';
  const providerCountryCode = provider ? provider?.countryCode : user?.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == providerCountryCode)[0];
  const defaultDialCode = countryCodes.filter((e: any) => e.sortname == deviceCountryCode)[0];

  let number = provider?.phoneNumber?.replace(/[!@#$%^&*+-]/g, "");

  const [state, setState] = useState<States>({
    tab: 0,
    avatar: '',
    logo: '',
    firstName: '',
    lastName: '',
    dialCode: filterCountry == undefined ? defaultDialCode : filterCountry?.phonecode,
    countryCode: providerCountryCode || filterCountry?.sortname || 'US',
    phone: numberWithoutCode,
    gender: '',
    shopName: '',
    expectedPrice: '',
    firstNameError: '',
    lastNameError: '',
    industryError: '',
    titleError: '',
    shopError: '',
    expectedError: '',
    phoneError: '',
    industry: '',
    title: '',
    address: '',
    timeZone: '',
    birthday: '',
    birthdayData: '',
    otherNumber: alternatePhoneNumberWithoutCode,
    otherNumberError: '',
    addressDetails: '',
    addressDetailsError: '',
    checkbox: false,
    moreDetails: false,
    show: false,
    showModal: false,
    webUserFirstLogin: false,
    maxLength: number?.length ? number?.length : 10,
    countryPicker: false,
    links: [{ id: 1, value: '' }]
  });

  const {
    tab,
    avatar,
    logo,
    firstName,
    lastName,
    dialCode,
    countryCode,
    phone,
    gender,
    shopName,
    expectedPrice,
    firstNameError,
    lastNameError,
    industryError,
    titleError,
    shopError,
    expectedError,
    phoneError,
    industry,
    title,
    address,
    timeZone,
    birthday,
    birthdayData,
    otherNumber,
    otherNumberError,
    addressDetails,
    checkbox,
    show,
    links,
    addressDetailsError
  } = state;

  const onAddressModalOpened = () => {
    dispatch(openAddressModal())
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton title="Profile" onPress={Navigator.drawer.open} />
      ),
    });
  }, [navigation]);

  useFocusEffect(useCallback(() => {
    dispatch(getProviderProfile());
    dispatch(getIndustries());
  }, [dispatch]));

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;

  useFocusEffect(
    useCallback(() => {
      const find = industries?.filter(
        (ind: any) => ind.id === provider?.industryId,
      );
      let myArray = provider?.links?.length && provider?.links.map((str: string, index: number) => ({ value: str, id: index + 1 }));

      if (!isFormattedNumber) {
        toast.info('Inavlid Number, Please update it again with country code');
      }
      setState((prev: any) => ({
        ...prev,
        firstName: provider ? provider?.firstName : user?.firstName,
        lastName: provider ? provider?.lastName : user?.lastName,
        avatar: provider ? (provider?.photo || provider?.photoUrl || '') : user?.photo,
        logo: provider ? provider?.providerImage : '',
        // otherNumber: provider?.alternatePhoneNumber,
        shopName: provider?.businessName || '',
        gender: provider?.gender,
        industry: find[0]?.name || '',
        title: provider?.serviceId ? find[0]?.services.filter(
          (serv: any) => serv.id === provider?.serviceId,
        )[0].name || '' : '',
        checkbox: provider?.isHouseCallAllowed,
        birthday: provider?.birthday ? moment(provider?.birthday, 'YYYY-MM-DD').format('L') : '',
        birthdayData: provider?.birthday && provider.birthday,
        expectedPrice: provider?.expectedEarning?.toString() || '',
        address: provider?.address
          ? { ...provider.address, utcOffset: provider.utcOffset }
          : '',
        addressDetails: provider?.address?.addressLine2,
        timeZone: provider?.address?.utctimezone,
        links: myArray || [{ id: 1, value: '' }]
      }))
    }, [provider, industries])
  );

  useEffect(() => {
    if (!links) {
      setState((prev: any) => ({ ...prev, links: [{ id: 1, value: '' }] }))
    }
  }, []);

  const handleAddMoreLinks = () => {
    if (links.length !== 3) {
      let linksArray = links;
      const newObj: LinkTypes = { id: links.length + 1, value: '' };
      linksArray.push(newObj);
      setState((prev: any) => ({ ...prev, links: linksArray }));
    } else {
      toast.info('You can only add maximum 3 links.')
    }
  }

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
              setState((prev: any) => ({ ...prev, avatar: image }));
            },
          ),
      },
      {
        text: 'Delete',
        onPress: () => {
          setState((prev: any) => ({ ...prev, avatar: '' }));
        },
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => { },
      },
    ], { cancelable: true });
  };

  const pickLogo = () => {
    Alert.alert('Choose method', 'Please choose a method', [
      {
        text: 'Camera',
        onPress: async () => {
          const image = await ImagePicker.openCamera({
            compressImageQuality: 0.3,
          });
          setState((prev: any) => ({ ...prev, logo: image }));
        },
      },
      {
        text: 'Library',
        onPress: async () => {
          const image = await ImagePicker.openPicker({
            compressImageQuality: 0.3,
          });
          setState((prev: any) => ({ ...prev, logo: image }));
        },
      },
      {
        text: 'Delete',
        onPress: () => {
          setState((prev: any) => ({ ...prev, logo: '' }));
        },
        style: 'destructive',
      },
      {
        text: 'Cancel',
        onPress: () => { },
      },
    ], { cancelable: true });
  };

  const servicesOfIndustry = industries?.filter(
    (item: any) => item.name === industry,
  );
  const titleLabels = servicesOfIndustry[0]?.services?.map((item: any) => ({
    label: item.name,
    value: item.name,
  }));
  const onSave = () => {
    const formData = new FormData();

    if (REGEX.fname.test(firstName)) {
      setState((prev: any) => ({ ...prev, firstNameError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, firstNameError: 'First name is not valid' }));
      return;
    }
    if (REGEX.lname.test(lastName)) {
      setState((prev: any) => ({ ...prev, lastNameError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, lastNameError: 'Last name is not valid' }));
      return;
    }
    if (expectedPrice?.trim().length > 9) {
      setState((prev: any) => ({ ...prev, expectedError: 'Enter an amount lower than 10 digits.' }));
      return;
    }
    if (!REGEX.onlyNumbers.test(expectedPrice)) {
      setState((prev: any) => ({ ...prev, expectedError: 'Expected price can only contain numbers.' }));
      return;
    }
    if (industry?.length) {
      setState((prev: any) => ({ ...prev, industryError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, industryError: 'Industry field is required' }));
      return;
    }
    if (title) {
      setState((prev: any) => ({ ...prev, titleError: '' }));
    } else {
      setState((prev: any) => ({ ...prev, titleError: 'Title field is required' }));
      return;
    }
    if (address?.formattedAddress === null || address?.formattedAddress == "null" || address?.utctimezone == null || address?.utcOffset == 0) {
      setState((prev: any) => ({ ...prev, addressDetailsError: 'Address field is required' }));
      return;
    }
    if (state.phone.length >= 2) {
      var data: any = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );

      if (data) {
        const number = phoneUtil.parseAndKeepRawInput(`${dialCode + phone}`, countryCode);
        const isValid = phoneUtil.isValidNumberForRegion(number, countryCode);

        let exNum = data.values_[2];
        if(countryCode == 'IN' && phone.trim().length < 10) {
          setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          setState((prev: any) => ({ ...prev, phoneError: '' }));
        } else {
          setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        setState((prev: any) => ({ ...prev, phoneError: '' }));
      }
    } else {
      setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
      return;
    }

    if (state.otherNumber.trim().length) {
      var data: any = phoneUtil.getExampleNumberForType(
        countryCode,
        PhoneNumberType.MOBILE,
      );

      if (data) {
        const number = phoneUtil.parseAndKeepRawInput(`${dialCode + otherNumber}`, countryCode);
        const isValid = phoneUtil.isValidNumberForRegion(number, countryCode);

        let exNum = data.values_[2];
        if(countryCode == 'IN' && otherNumber.trim().length < 10) {
          setState((prev: any) => ({ ...prev, otherNumberError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
        if (isValid == true) {
          setState((prev: any) => ({ ...prev, otherNumberError: '' }));
        } else {
          setState((prev: any) => ({ ...prev, otherNumberError: 'Phone number is not valid' }));
          toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
          return;
        }
      } else {
        setState((prev: any) => ({ ...prev, otherNumberError: '' }));
      }
    } else {
      setState((prev: any) => ({ ...prev, otherNumberError: '' }));
    }

    let userInfo: any = {
      firstName,
      lastName,
      phoneNumber: `+${dialCode}-${phone}`,
      countryCode: countryCode,
      businessName: shopName,
      expectedEarning: expectedPrice ? Number(expectedPrice) : '',
      isHouseCallAllowed: checkbox,
      industryId: industries.filter((item: any) => item.name === industry)[0]
        .id,
    };
    if (birthday) {
      userInfo = { ...userInfo, birthday: birthdayData };
    }
    if (address) {
      userInfo = {
        ...userInfo,
        address: JSON.stringify({
          ...address,
          utctimezone: timeZone,
          addressLine2: addressDetails,
        }),
      };
    }
    if (links.length) {
      links.map(
        function (item: LinkTypes) {
          formData.append('links[]', item['value']);
        });
    }
    if (otherNumber) {
      userInfo = { ...userInfo, alternatePhoneNumber: `+${dialCode}-${otherNumber}` };
    }
    if (gender) {
      userInfo = { ...userInfo, gender };
    }
    if (title) {
      userInfo = {
        ...userInfo,
        serviceId: industries
          ?.filter((item: any) => item.name === industry)[0]
          ?.services?.filter((titItem: any) => titItem.name === title)[0]?.id,
      };
    }
    for (const name in userInfo) {
      // @ts-ignore
      formData.append(name, userInfo[name]);
    }
    if (avatar) {
      formData.append(
        'photo',
        // @ts-ignore
        avatar?.path
          ? {
            // @ts-ignore
            uri: avatar?.path,
            // @ts-ignore
            name: avatar?.filename || 'name.jpg',
            // @ts-ignore
            type: avatar?.mime,
          }
          : avatar,
      );
    }

    if (logo) {
      formData.append(
        'providerImage',
        isString(logo)
          ? logo
          : {
            uri: logo.path,
            name: logo.filename || 'providerImage.jpg',
            type: logo.mime,
          },
      );
    }
    dispatch(updateProviderProfile(formData));
  };

  const setLocation = async (value: any) => {
    setState((prev: any) => ({ ...prev, address: value }));
    let tzlookupValue = tzlookup(value.location.lat, value.location.lng);
    setState((prev: any) => ({ ...prev, timeZone: tzlookupValue }));
  }

  return (
    <MainPageTemplate loading={loading || industriesLoading} bc={COLORS.white}>
      {isAddressModalOpen && (
        <AddressModal
          formattedAddress={address}
          onChangeAddress={setLocation}
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.containerHeaderItem}
          onPress={() => setState((prev: any) => ({ ...prev, tab: 0 }))}
        >
          <Text style={styles.headerTitle}>Personal Details</Text>
          {!tab ? <View style={styles.bottomIndicator} /> : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerHeaderItem}
          onPress={() => setState((prev: any) => ({ ...prev, tab: 1 }))}
        >
          <Text style={styles.headerTitle}>Other Details</Text>
          {tab ? <View style={styles.bottomIndicator} /> : null}
        </TouchableOpacity>
      </View>
      <View style={styles.paddingContent}>
        {!tab ? (
          <ScrollContainer styleExtra={styles.paddingContentTop}>
            <UserAvatar avatar={avatar} onPress={onCamera} />
            <View style={styles.rowInput}>
              <Field
                value={firstName} 
                onChange={(text: string) => {
                  setState((prev: any) => ({ ...prev, firstNameError: '', firstName: text }));
                }}
                label={I18n.t('personalInfo.fields.firstName')}
                mt={16}
                w="48%"
                error={firstNameError}
              />
              <Field
                value={lastName}
                onChange={(text: string) => {
                  setState((prev: any) => ({ ...prev, lastNameError: '', lastName: text }));
                }}
                label={I18n.t('personalInfo.fields.lastName')}
                mt={16}
                w="48%"
                error={lastNameError}
              />
            </View>
            <Pressable mt={20} onPress={() => dispatch(openCountryModal())}>
              <Text numberOfLines={1} style={[styles.input, {
                color: 'black',
                borderColor: COLORS.whiteGray,
              }]}>
                {`${countryCode} (+${dialCode || filterCountry?.phonecode})`}
              </Text>
            </Pressable>
            <Field
              keyboardType="phone-pad"
              value={phone}
              maxLength={13}
              error={phoneError}
              onChange={(text: string) => {
                const re = /^[0-9\b]+$/;
                if (text === '' || re.test(text)) {
                  setState((prev: any) => ({ ...prev, phoneError: '', phone: text }));
                }
                // setState((prev: any) => ({ ...prev, phoneError: '', phone: text }));
              }}
              label={I18n.t('personalInfo.fields.telephone')}
              mt={16}
            />
            <DropMenu
              placeholder={I18n.t('personalInfoClient.gender')}
              onChange={(value) => {
                setState((prev: any) => ({ ...prev, gender: value }));
              }}
              items={GenderOptions}
              value={gender}
              mt={10}
            />
            <Field
              value={shopName}
              error={shopError}
              onChange={(text: string) => {
                setState((prev: any) => ({ ...prev, shopName: text, shopError: '' }));
              }}
              label={I18n.t('personalInfo.fields.shopName')}
              mt={16}
            />
            <Field
              startAdornment={
                <Icon src={require('assets/global/dollar.png')} size={18} />
              }
              error={expectedError}
              keyboardType="numeric"
              value={expectedPrice}
              onChange={(text: string) => {
                setState((prev: any) => ({ ...prev, expectedPrice: text, expectedError: '' }));
              }}
              label={I18n.t('personalInfo.fields.expectedPrice')}
              mt={16}
            />
            <DropMenu
              placeholder={I18n.t('basicInfo.pickIndustry')}
              onChange={(value) => {
                setState((prev: any) => ({
                  ...prev,
                  industry: value,
                  industryError: '',
                  title: '',
                  titleError: ''
                }));
              }}
              items={
                industries?.map((item: any) => ({
                  label: item.name,
                  value: item.name,
                })) || []
              }
              value={industry}
            />
            {industryError?.length > 0 && (
              <Text style={styles.textError}>{industryError}</Text>
            )}
            <DropMenu
              placeholder={I18n.t('basicInfo.titlePick')}
              onChange={(value) => {
                setState((prev: any) => ({ ...prev, title: value, titleError: '' }));
              }}
              items={titleLabels || []}
              value={title}
            />
            {!!titleError && <Text style={styles.textError}>{titleError}</Text>}
            <CheckBox
              styleContainer={styles.checkboxContainer}
              styleLabel={styles.checkBoxLabel}
              checked={checkbox}
              onChange={(value: boolean) => {
                setState((prev: any) => ({ ...prev, checkbox: value }));
              }}
              label={"Able to provide service at client's location"}
            />
            <View style={styles.section}>
              <Box flex mr={32}>
                <Paragraph size="s" color={COLORS.brownishGrey} mb={2}>
                  Business logo
                </Paragraph>
                <Paragraph size="xs" type="book">
                  Will be shown in all your Invoices, Receipts and Emails
                </Paragraph>
              </Box>
              <Box>
                {logo ? (
                  <TouchableOpacity onPress={pickLogo}>
                    <Image
                      source={{ uri: isString(logo) ? logo : logo.path }}
                      style={styles.businessLogo}
                    />
                    <View style={styles.editIcon}>
                      <Icon
                        src={require('assets/global/pencil.png')}
                        size={10}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={pickLogo}
                    style={styles.filepicker}
                  >
                    <Icon src={require('assets/global/camera.png')} size={24} />
                  </TouchableOpacity>
                )}
              </Box>
            </View>
          </ScrollContainer>
        ) : null}
        {tab ? (
          <ScrollContainer styleExtra={styles.paddingContentTop}>
            <Pressable onPress={onAddressModalOpened}>
              <Text numberOfLines={1} style={[styles.input, {
                color: address ? 'black' : COLORS.battleshipGrey32,
                borderColor: (addressDetailsError?.trim().length > 0) ? COLORS.red : COLORS.whiteGray,
              }]}>
                {address ? (address?.formattedAddress == 'null' ? '*Address Line' : address?.formattedAddress) : '*Address Line'}
              </Text>
            </Pressable>
            {(addressDetailsError?.trim().length > 0) ? (
              <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
                {addressDetailsError}
              </Paragraph>
            ) : null}
            {address ? (
              <Field
                value={addressDetails}
                onChange={(text: string) => {
                  setState((prev: any) => ({ ...prev, addressDetails: text }));
                }}
                label="Additional address details"
                mt={16}
              />
            ) : null}
            <DropMenu
              value={timeZone}
              onChange={(value) => setState((prev: any) => ({ ...prev, timeZone: value }))}
              items={TIMEZONES?.map((item: any) => ({
                label: item.name,
                value: item.name,
              }))}
              placeholder={'select timezone'}
            />
            {links ? links.map((item: any, index: number) => {
              const linkValue = item?.value == 'null' ? '' : item?.value;
              return (
                <Field
                  value={linkValue}
                  onChange={(text: string) => {
                    let data: any = links;
                    data[index].value = text;
                    setState((prev: any) => ({ ...prev, links: data }));
                  }}
                  label={t(translations.businessInfo.fields.website)}
                  mt={16}
                />
              )
            }) : null}
            <CheckBox
              styleContainer={styles.checkboxContainer}
              styleLabel={styles.checkBoxLabel}
              checked={moreDetail == true ? true : false}
              onChange={(value: boolean) => {
                setState((prev: any) => ({ ...prev, moreDetails: value }));
                dispatch(isMoreDetails(value));
              }}
              label={'More details'}
            />
            {moreDetail == true ? (
              <>
                <BirthdayDate
                  show={show}
                  birthday={birthday || I18n.t('clientDetails.birthday')}
                  pressShow={() => setState((prev: any) => ({ ...prev, show: true }))}
                  onCancel={() => setState((prev: any) => ({ ...prev, show: false }))}
                  pressDate={(date: any) => {
                    let birthData = moment(date).format('YYYY-MM-DD');
                    let birthdate = moment.tz(date, providerTimeZone).format('L');
                    setState((prev: any) => ({
                      ...prev, birthdayData: birthData,
                      birthday: birthdate,
                      show: false
                    }));
                  }}
                />
                <Pressable disabled mt={15} onPress={() => dispatch(openCountryModal())}>
                  <Text numberOfLines={1} style={[styles.input, {
                    color: 'black',
                    borderColor: COLORS.whiteGray,
                  }]}>
                    {`${countryCode} (+${dialCode || filterCountry?.phonecode})`}
                  </Text>
                </Pressable>
                <Field
                  value={otherNumber}
                  error={otherNumberError}
                  onChange={(text: string) => {
                    const re = /^[0-9\b]+$/;
                    if (text === '' || re.test(text)) {
                      setState((prev: any) => ({ ...prev, otherNumber: text }))
                    }
                  }}
                  label={I18n.t('personalInfoClient.otherNumberDetails')}
                  keyboardType="phone-pad"
                  maxLength={13}
                  mt={16}
                />
              </>
            ) : null}
            {links?.length !== 3 ? (
              <Button
                onPress={handleAddMoreLinks}
                text={t(translations.businessInfo.addMoreLink)}
                buttonStyle={[styles.btnLinks]}
                textStyle={styles.textLink}
              />
            ) : null}
          </ScrollContainer>
        ) : null}
      </View>
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

export default MyProfile;
