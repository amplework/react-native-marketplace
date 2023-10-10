import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Button from 'shared/button';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import ScrollContainer from 'shared/scrollContainer';
import COLORS from 'utils/colors';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import { BackButton } from 'shared/backButton';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import FastImage from 'react-native-fast-image';
import CheckBox from 'shared/checkbox';
import { BusinessDetailsValues, LinkTypes } from 'types/signUpFlow';
import { isString } from 'lodash';
import { updateProviderProfile } from 'store/actions/provider';
import { adaptBusinessDetails } from 'components/signupFlow/helpers/utils';
import { industriesSelectors } from 'store/entities/industries';
import { BusinessDetailSchema } from 'components/signupFlow/helpers/validation';
import { toast } from 'shared/toast';
import REGEX from 'utils/regex';

type Props = {
  navigation: any;
};

const BusinessDetails: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const provider = useSelector((state: any) => state.provider.provider);
  const industries = useSelector(industriesSelectors.industries);
  const loading = useSelector(industriesSelectors.loading);
  const Providerloading = useSelector((state: any) => state.provider.loading);
  const industriesList = industries?.filter((e: any) => e?.name.toLowerCase() != 'education');

  const dispatch = useDispatch();

  let addressObj = {
    placeId: provider?.address?.placeId || "1",
    formattedAddress: provider?.address?.formattedAddress || "null",
    location: {
      lat: provider?.address?.location?.lat || 0,
      lng: provider?.address?.location?.lng || 0,
    },
    utctimezone: provider?.address?.utctimezone || "",
    utcOffset: provider?.utcOffset || 0,
    addressLine2: provider?.address?.addressLine2 || '',
  }

  const { values, setFieldValue, setValues, errors, setFieldError, handleSubmit } =
    useFormik<BusinessDetailsValues>({
      initialValues: provider ? adaptBusinessDetails(provider) : {
        industryId: null,
        isHouseCallAllowed: false,
        businessName: '',
        expectedEarning: '',
        serviceId: null,
        logo: null,
        description: '',
        links: [{ value: '', id: 1 }],
      },
      validationSchema: BusinessDetailSchema,
      validateOnChange: false,
      onSubmit: (formValues) => {
        let newFormData = new FormData();
        newFormData.append('serviceId', formValues?.serviceId);
        newFormData.append('industryId', formValues?.industryId);
        newFormData.append('businessName', formValues?.businessName);
        newFormData.append('lastName', provider?.lastName || '');
        newFormData.append('firstName', provider?.firstName || '');
        newFormData.append('expectedEarning', formValues?.expectedEarning);
        newFormData.append('profileDescription', formValues?.description);
        newFormData.append('phoneNumber', provider?.phoneNumber || '');
        newFormData.append('countryCode', provider?.countryCode || '');
        newFormData.append('isHouseCallAllowed', formValues?.isHouseCallAllowed);
        newFormData.append('address', JSON.stringify(addressObj));
        if (provider?.photo) {
          newFormData.append('photo', provider?.photo || '');
        }

        if (formValues?.links?.length) {
          formValues?.links.map(
            function (item: LinkTypes) {
              newFormData.append('links[]', item['value']);
            });

        }
        if (values?.logo) {
          newFormData.append(
            'providerImage',
            // @ts-ignore
            values?.logo?.path
              ? {
                // @ts-ignore
                uri: values?.logo?.path,
                // @ts-ignore
                name: values?.logo?.filename || 'name.jpg',
                // @ts-ignore
                type: values?.logo?.mime,
              }
              : values?.logo,
          );
        }
        if (!REGEX.onlyNumbers.test(formValues.expectedEarning)) {
          setFieldError('expectedEarning', 'Expected price can only contain numbers.');
          return;
        }
        dispatch(updateProviderProfile(newFormData, true));
      },
    });

  const handleFieldChange =
    <F extends keyof BusinessDetailsValues>(field: F) =>
      (value: BusinessDetailsValues[F]) =>
        setFieldValue(field, value);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: null,
      headerLeft: () => <BackButton />,
    });
  }, [navigation, t]);

  useEffect(() => {
    if (!values?.links) {
      handleFieldChange('links')([{ id: 1, value: '' }]);
    }
  }, []);

  const services = useMemo(
    () => industries?.find((item) => item.id === values.industryId)?.services,
    [values.industryId],
  );

  const handleAddMoreLinks = () => {
    if (values?.links.length !== 3) {
      let linksArray = values?.links;
      const newObj: LinkTypes = { id: values?.links.length + 1, value: '' };
      linksArray.push(newObj);
      handleFieldChange('links')(linksArray);
    } else {
      toast.info('You can only add maximum 3 links.')
    }
  }

  const pickLogo = () => {
    Alert.alert('Choose method', 'Please choose a method', [
      {
        text: 'Camera',
        onPress: async () => {
          const image = await ImagePicker.openCamera({
            compressImageQuality: 0.3,
          });
          handleFieldChange('logo')(image);
        },
      },
      {
        text: 'Library',
        onPress: async () => {
          const image = await ImagePicker.openPicker({
            compressImageQuality: 0.3,
          });
          handleFieldChange('logo')(image);
        },
      },
      {
        text: 'Delete',
        onPress: () => {
          handleFieldChange('logo')('');
        },
        style: 'destructive'
      },
      {
        text: 'Cancel',
        onPress: () => { },
      },
    ], { cancelable: true });
  };

  return (
    <MainPageTemplate
      containerStyle={styles.container}
      bc={COLORS.white}
      loading={loading || Providerloading}
    >
      <Text style={styles.title}>{t(translations.businessInfo.title)}</Text>
      <Text style={styles.description}>
        {t(translations.businessInfo.description)}
      </Text>
      <ScrollContainer extraScroll={200}>
        <DropMenu
          items={industriesList.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          value={values?.industryId}
          error={errors?.industryId}
          placeholder={t(translations.basicInfo.pickIndustry)}
          onChange={handleFieldChange('industryId')}
        />
        <DropMenu
          items={
            services?.map((service) => ({
              label: service.name,
              value: service.id,
            })) || []
          }
          value={values?.serviceId}
          error={errors?.serviceId}
          placeholder={t(translations.basicInfo.titlePick)}
          onChange={handleFieldChange('serviceId')}
        />
        {values.logo ? (
          <TouchableOpacity onPress={pickLogo}>
            <View style={styles.bannerContainer}>
              <FastImage
                source={{
                  uri: isString(values?.logo) ? values?.logo : values?.logo.path
                }}
                resizeMode='stretch'
                style={styles.bannerImage} />
            </View>
            <View style={styles.editIcon}>
              <Icon src={require('assets/global/pencil.png')} size={10} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickLogo} style={styles.filepicker}>
            <Icon src={require('assets/global/camera.png')} size={36} mb={8} />
            <Paragraph color={COLORS.clearBlue} size="s" mv={2}>{t(translations.businessInfo.fields.logo)}</Paragraph>
            <Paragraph size="xs" type='book'>{t(translations.businessInfo.logoDescription)}</Paragraph>
          </TouchableOpacity>
        )}
        <Field
          value={values?.businessName}
          error={errors.businessName}
          onChange={handleFieldChange('businessName')}
          label={t(translations.businessInfo.fields.shopName)}
          required
        />
        <Field
          startAdornment={
            <Icon src={require('assets/global/dollar.png')} size={18} />
          }
          keyboardType="numeric"
          value={values?.expectedEarning}
          error={errors.expectedEarning}
          onChange={handleFieldChange('expectedEarning')}
          label={t(translations.businessInfo.fields.expectedPrice)}
          required
          mt={16}
        />
        <Field
          value={values?.description}
          onChange={handleFieldChange('description')}
          label={t(translations.businessInfo.fields.about)}
          multiline
          size='xl'
          mt={16}
        />
        {values?.links ? values?.links.map((item: any, index: number) => {
          const linkValue = item?.value == 'null' ? '' : item?.value;
          return (
            <Field
              value={linkValue}
              onChange={(text: string) => {
                let data: any = values?.links;
                data[index].value = text;
                handleFieldChange('links')(data);
              }}
              label={t(translations.businessInfo.fields.website)}
              mt={16}
            />
          )
        }) : null}
        <CheckBox
          label={"Able to provide service at client's location"}
          checked={values.isHouseCallAllowed}
          styleContainer={styles.checkboxContainer}
          styleLabel={styles.checkBoxLabel}
          onChange={handleFieldChange('isHouseCallAllowed')}
        />
        {values?.links?.length !== 3 ? (
          <Button
            onPress={handleAddMoreLinks}
            text={t(translations.businessInfo.addMoreLink)}
            buttonStyle={styles.btnLinks}
            textStyle={styles.textLink}
          />
        ) : null}
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

export { BusinessDetails };