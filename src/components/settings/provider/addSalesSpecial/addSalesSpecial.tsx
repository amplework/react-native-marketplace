import React, { useEffect, useState, useRef } from 'react';
import ViewShot from 'react-native-view-shot';
import { Alert, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { styles } from './style';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import ColorPicker from 'react-native-wheel-color-picker';
import { BottomSheet } from 'shared/bottomSheet';
import { alert } from 'shared/alert/alert';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker, DaysPicker } from 'shared/datepicker';
import { ErrorMessage, Field } from 'shared/field';
import { Paragraph } from 'shared/paragraph';
import { Icon } from 'shared/icon';
import DropMenu from 'shared/dropMenu';
import { toast } from 'shared/toast';
import { EditHeader } from './components/editHeader';
import { validateSalesSpecial } from 'components/settings/helpers/validation';
import { adaptSaleSpecial } from 'components/settings/helpers/adapters';
import I18n, { t, translations } from 'locales';
import ImagePicker from 'react-native-image-crop-picker';
import { useFormik } from 'formik';
import moment from 'moment-timezone';
import COLORS from 'utils/colors';
import { padding } from 'utils/styles';
import {
  closeAddModal,
  salesSpecialSelectors,
  addSaleSpecial,
  editSaleSpecial,
  deleteSaleSpecial,
} from 'store/entities/salesSpecial';
import { getProducts, productsSelectors } from 'store/entities/products';
import { useHeaderHeight } from '@react-navigation/stack';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import { Pressable } from 'shared/pressable';

const AddSalesSpecial: React.FC = () => {
  const ref = useRef(null);
  const viewShotRef: any = useRef();
  const [colorState, setColorState] = useState(false);
  const [bgColor, setBgColor] = useState(false);
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const weekDays = ["saturday", "sunday", "monday", "tuesday", "thursday", "friday", "wednesday"]

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const loading = useSelector(salesSpecialSelectors.saleSpecialLoading);
  const saleSpecial = useSelector(salesSpecialSelectors.saleSpecial);
  const salesSpecials = useSelector(salesSpecialSelectors.salesSpecials);
  const products = useSelector(productsSelectors.products);

  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;

  const isAnySocialMediaEnabled =
    provider?.fbSocialId ||
    provider?.twiOauthToken ||
    provider?.instagramBusinessId;

  const getMinutesFromDate = (m: any) => {
    return m.minutes() + m.hours() * 60;
  };

  const { values, setValues, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      bannerImage: null,
      photo: null,
      sale: '',
      service: null,
      salePrice: '',
      price: '',
      saleDescription: '',
      todayOnly: false,
      timeRestriction: false,
      color: 'rgba(0, 0, 0, 0.8)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      timeRestrictionStart: moment().toDate(),
      timeRestrictionEnd: moment().add(1, 'hours').toDate(),
      dateRestriction: false,
      dateRestrictionStartVal: moment().startOf('day').toDate(),
      dateRestrictionEndVal: moment().startOf('day').add(1, 'days').toDate(),
      dayRestriction: false,
      dayRestrictionVal: [],
      existingClientsOnly: false,
      noCombination: false,
      sendOfferToClientApp: false,
      sendOfferToSocialMediaPages: false,
      active: true,
    },
    validate: validateSalesSpecial(saleSpecial, salesSpecials),
    validateOnChange: false,
    onSubmit: (salesSpecialValues: any) => {
      if (
        values.todayOnly ||
        values.timeRestriction ||
        values.dateRestriction ||
        values.dayRestriction
      ) {
        if (
          !values.todayOnly &&
          !values.dateRestriction &&
          !values.dayRestriction
        ) {
          toast.info(I18n.t('salesSpecial.fields.dateDayRestrictionRequired'));
        } else if (
          values.timeRestriction == true &&
          getMinutesFromDate(moment(salesSpecialValues.timeRestrictionStart)) >=
          getMinutesFromDate(moment(salesSpecialValues.timeRestrictionEnd))
        ) {
          toast.info(I18n.t('salesSpecial.fields.lessEndTime'));
        } else if (
          values.dateRestriction == true
          && moment(salesSpecialValues.dateRestrictionStartVal).isBefore(moment().format(), 'date')
        ) {
          toast.info(I18n.t('salesSpecial.fields.lessStartDate'));
        } else if (
          values.todayOnly &&
          values.timeRestriction == true &&
          getMinutesFromDate(moment(salesSpecialValues.timeRestrictionStart)) <=
          getMinutesFromDate(moment(salesSpecialValues.timeRestrictionEnd)) &&
          getMinutesFromDate(moment(salesSpecialValues.timeRestrictionStart)) <
          getMinutesFromDate(moment())
        ) {
          toast.info(I18n.t('salesSpecial.fields.pastTime'));
        } else if (saleSpecial) {
          dispatch(editSaleSpecial(salesSpecialValues));
        } else {
          if (values.sendOfferToSocialMediaPages && !isAnySocialMediaEnabled) {
            alert.info(t(translations.salesSpecial.errors.socialMediaError));
            return;
          }
          dispatch(addSaleSpecial(salesSpecialValues));
        }
      } else {
        toast.info(I18n.t('salesSpecial.fields.dateTimeRestrictionRequired'));
      }
    },
  });

  const handleDelete = () => dispatch(deleteSaleSpecial(saleSpecial?.id));

  const onCapture = async () => {
    await viewShotRef.current.capture().then((uri: string) => {
      handleFieldChange('photo')(uri);
    });
  };

  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.salesSpecial'),
      onDelete: handleDelete,
    });

  useEffect(() => {
    if (products && !saleSpecial) {
      let firstService = products?.filter(
        (item: any) => item.type == 'service' && item.isActive == true,
      )?.[0];
      const service = firstService ? _.omit(firstService, 'saleSpecial') : null;
      service && handleFieldChange('service')(service);
    }
  }, [products, saleSpecial]);

  useEffect(() => {
    if (saleSpecial && providerOffset) {
      setValues(adaptSaleSpecial(saleSpecial, providerOffset));
    }
  }, [saleSpecial, providerOffset, setValues]);

  const handleClose = () => dispatch(closeAddModal());

  const pickLogo = () => {
    Alert.alert(
      'Choose method',
      'Please choose a method',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const image = await ImagePicker.openCamera({
              cropping: true,
              width: 400,
              height: 300,
              compressImageQuality: 0.3,
            });
            setFieldValue('bannerImage', image);
          },
        },
        {
          text: 'Library',
          onPress: async () => {
            const image = await ImagePicker.openPicker({
              cropping: true,
              width: 400,
              height: 300,
              compressImageQuality: 0.3,
            });
            setFieldValue('bannerImage', image);
          },
        },
        {
          text: 'Delete',
          onPress: () => {
            setFieldValue('bannerImage', '');
            setFieldValue('photo', '');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const dealPrice = values?.salePrice;
  const actualPrice = values?.price;
  const difference = Number(actualPrice) - Number(dealPrice);
  const percentOff = (difference / Number(actualPrice)) * 100;
  const serviceName: any = values?.service;

  const showColorPicker = () => setColorState(true);
  const hideColorPicker = () => setColorState(false);

  const confirmColorPicker = () => {
    setFieldValue('backgroundColor', bgColor);
    setColorState(false);
  };

  const handleFieldChange = (field: any) => (value: any) =>
    setFieldValue(field, value);

  const handleToggle = (field: any) => (checked: boolean) =>
    setFieldValue(field, checked);

  return (
    <BottomSheet keyboardVerticalOffset={headerHeight * -1}>
      <EditHeader
        edit={!!saleSpecial}
        onClose={handleClose}
        onDelete={confirmDelete}
      />
      {colorState ? (
        <View style={styles.pickerContent}>
          <ColorPicker
            ref={ref}
            color={values.backgroundColor}
            thumbSize={25}
            sliderSize={25}
            noSnap={true}
            row={false}
            onColorChangeComplete={(color: any) => {
              setBgColor(color);
            }}
          />
          <Box row jc="space-between">
            <Button
              text={I18n.t('Cancel')}
              onPress={hideColorPicker}
              buttonStyle={styles.cancelButton}
            />
            <Button
              text={I18n.t('Confirm')}
              onPress={confirmColorPicker}
              buttonStyle={styles.confirmButton}
            />
          </Box>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <Box flex>
            <Box mt={16}>
              {values.bannerImage ? (
                <TouchableOpacity onPress={pickLogo}>
                  <ViewShot
                    ref={viewShotRef}
                    options={{ format: 'jpg', quality: 1 }}
                  >
                    <View
                      style={[
                        styles.bannerContainer,
                        { backgroundColor: values.backgroundColor },
                      ]}
                    >
                      <View style={styles.upperOfferContainer}>
                        <Text style={styles.offerHeadingText}>{`${(
                          Math.round(percentOff * 100) / 100
                        ).toFixed(0)} % Off \n`}</Text>
                        <Text style={styles.offerSubHeadingText}>{`Get ${(
                          Math.round(percentOff * 100) / 100
                        ).toFixed(0)} % Off on`}</Text>
                        <Text style={styles.offerSubHeadingText}>
                          {serviceName?.name}
                        </Text>
                      </View>
                      <View style={styles.bannerImageConainer}>
                        <FastImage
                          onLoad={onCapture}
                          source={{
                            uri:
                              values.bannerImage['url'] ??
                              values.bannerImage['path'],
                          }}
                          resizeMode="stretch"
                          style={styles.bannerImage}
                        />
                      </View>
                    </View>
                  </ViewShot>
                  <View style={styles.editIcon}>
                    <Icon src={require('assets/global/pencil.png')} size={10} />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pickLogo} style={styles.filepicker}>
                  <Icon
                    src={require('assets/global/uploadImg.png')}
                    size={36}
                    mb={8}
                  />
                  <Paragraph color={COLORS.clearBlue} size="s" mv={2}>
                    {'Upload banner for your special'}
                  </Paragraph>
                  <Paragraph size="xs" type="book">
                    {'400 x 300 px size'}
                  </Paragraph>
                </TouchableOpacity>
              )}
              {values?.bannerImage ? (
                <Pressable onPress={showColorPicker}>
                  <Paragraph
                    centered
                    type={'bold'}
                    color={COLORS.clearBlue}
                    mt={10}
                    size="xs"
                  >
                    {'Change Banner Background Color'}
                  </Paragraph>
                </Pressable>
              ) : null}
            </Box>
            <Field
              value={values.sale}
              onChange={handleFieldChange('sale')}
              error={errors.sale}
              label={I18n.t('salesSpecial.placeholders.sale')}
              mt={16}
              maxLength={30}
            />
            <>
              <DropMenu
                items={
                  products
                    ?.filter(
                      (item: any) =>
                        item.type == 'service' && item.isActive == true,
                    )
                    ?.map((item: any) => ({
                      label: item.name,
                      value: _.omit(item, 'saleSpecial'),
                    })) || []
                }
                value={values.service}
                placeholder={I18n.t('salesSpecial.placeholders.service')}
                placeholderValue={null}
                error={errors.service}
                onChange={(val: any) => {
                  handleFieldChange('service')(val);
                  if (saleSpecial && saleSpecial?.service?.name == val?.name) {
                    handleFieldChange('salePrice')(
                      saleSpecial?.salePrice?.toString(),
                    );
                  } else {
                    handleFieldChange('salePrice')('');
                  }
                  handleFieldChange('price')(val?.price?.toString());
                }}
              />
              {!values.service &&
                saleSpecial?.service &&
                saleSpecial?.service?.isActive != true && (
                  <ErrorMessage
                    error={I18n.t('salesSpecial.fields.deactivatedService', {
                      serviceName: saleSpecial?.service?.name,
                    })}
                    mt={4}
                  />
                )}
            </>
            {values.service != null && (
              <Box row jc="space-between" mt={16}>
                <Field
                  value={values.salePrice}
                  onChange={handleFieldChange('salePrice')}
                  onEndEditing={onCapture}
                  error={errors.salePrice}
                  label={I18n.t('salesSpecial.placeholders.salePrice')}
                  keyboardType="numeric"
                  flex
                  mr={8}
                />
                <Field
                  disabled
                  value={values.price?.toString()}
                  onChange={handleFieldChange('price')}
                  error={errors.price}
                  label={I18n.t('salesSpecial.placeholders.price')}
                  keyboardType="numeric"
                  flex
                  ml={8}
                />
              </Box>
            )}
            <Field
              value={values.saleDescription}
              onChange={handleFieldChange('saleDescription')}
              error={errors.saleDescription}
              label={I18n.t('salesSpecial.placeholders.saleDescription')}
              mt={16}
              size="xl"
              multiline
              numberOfLines={5}
              maxLength={999}
            />
            <CheckBox
              checked={values.todayOnly}
              onChange={(checked: boolean) => {
                handleToggle('todayOnly')(checked);
                handleToggle('dateRestriction')(false);
                handleToggle('dayRestriction')(false);
              }}
              label={I18n.t('salesSpecial.placeholders.todayOnly')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
            />
            <CheckBox
              checked={values.timeRestriction}
              onChange={handleToggle('timeRestriction')}
              label={I18n.t('salesSpecial.placeholders.timeRestriction')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
            />
            {values.timeRestriction && (
              <Box row jc="space-between" mt={16}>
                <Datepicker
                  flex
                  editable
                  timeZoneOffset={providerOffset}
                  title={moment(values.timeRestrictionStart).format('hh:mm A')}
                  label={I18n.t(
                    'salesSpecial.placeholders.timeRestrictionStart',
                  )}
                  required
                  mode="time"
                  date={values.timeRestrictionStart}
                  onConfirm={(val) => {
                    let currentDate = moment();
                    let selectedDateTime = moment(val);
                    selectedDateTime.date(currentDate.date());
                    selectedDateTime.month(currentDate.month());
                    selectedDateTime.year(currentDate.year());
                    handleFieldChange('timeRestrictionStart')(
                      moment(selectedDateTime).toDate(),
                    );
                    handleFieldChange('timeRestrictionEnd')(
                      moment(selectedDateTime).add(1, 'hours').toDate(),
                    );
                  }}
                  icon={require('assets/global/reminders.png')}
                  mr={8}
                />
                <Datepicker
                  flex
                  editable
                  timeZoneOffset={providerOffset}
                  title={moment(values.timeRestrictionEnd).format('hh:mm A')}
                  label={I18n.t('salesSpecial.placeholders.timeRestrictionEnd')}
                  required
                  mode="time"
                  date={values.timeRestrictionEnd}
                  startDate={moment(values.timeRestrictionStart)
                    .add(30, 'minutes')
                    .toDate()}
                  onConfirm={(val) => {
                    let currentDate = moment();
                    let selectedDateTime = moment(val);
                    selectedDateTime.date(currentDate.date());
                    selectedDateTime.month(currentDate.month());
                    selectedDateTime.year(currentDate.year());
                    handleFieldChange('timeRestrictionEnd')(
                      moment(selectedDateTime).toDate(),
                    );
                  }}
                  icon={require('assets/global/reminders.png')}
                  ml={8}
                />
              </Box>
            )}
            {!values.todayOnly && (
              <>
                <CheckBox
                  checked={values.dateRestriction}
                  onChange={handleToggle('dateRestriction')}
                  label={I18n.t('salesSpecial.placeholders.dateRestriction')}
                  styleLabel={styles.textPrimary}
                  styleContainer={styles.checkBoxPosition}
                />
                {values.dateRestriction && (
                  <Box row jc="space-between" mt={16}>
                    <Datepicker
                      flex
                      editable
                      timeZoneOffset={providerOffset}
                      title={moment(values.dateRestrictionStartVal).format(
                        'Do MMM YYYY',
                      )}
                      // title={moment(values.dateRestrictionStartVal).format('MM/DD/YY HH:mm')}  // MY_TODO //
                      label={I18n.t(
                        'salesSpecial.placeholders.dateRestrictionStart',
                      )}
                      required
                      mode="date"
                      date={values.dateRestrictionStartVal}
                      onConfirm={(value) => {
                        handleFieldChange('dateRestrictionStartVal')(
                          moment(value).startOf('day').toDate(),
                        );
                        if (
                          moment(moment(value).startOf('day')).isSameOrAfter(
                            moment(values.dateRestrictionEndVal),
                          )
                        ) {
                          handleFieldChange('dateRestrictionEndVal')(
                            moment(value)
                              .startOf('day')
                              .add(1, 'days')
                              .toDate(),
                          );
                        }
                      }}
                      icon={require('assets/bottomBar/calendar.png')}
                      mr={8}
                    />
                    <Datepicker
                      flex
                      editable
                      timeZoneOffset={providerOffset}
                      title={moment(values.dateRestrictionEndVal).format(
                        'Do MMM YYYY',
                      )}
                      // title={moment(values.dateRestrictionEndVal).format('MM/DD/YY HH:mm')}  // MY_TODO //
                      label={I18n.t(
                        'salesSpecial.placeholders.dateRestrictionEnd',
                      )}
                      required
                      mode="date"
                      date={values.dateRestrictionEndVal}
                      startDate={moment(values.dateRestrictionStartVal)
                        .startOf('day')
                        .add(1, 'days')
                        .toDate()}
                      onConfirm={(value) => {
                        handleFieldChange('dateRestrictionEndVal')(
                          moment(value).startOf('day').toDate(),
                        );
                      }}
                      icon={require('assets/bottomBar/calendar.png')}
                      ml={8}
                    />
                  </Box>
                )}
                <CheckBox
                  checked={values.dayRestriction}
                  onChange={(checked: boolean) => {
                    handleToggle('dayRestriction')(checked);
                    handleFieldChange('dayRestrictionVal')(weekDays);
                  }}
                  label={I18n.t('salesSpecial.placeholders.dayRestriction')}
                  styleLabel={styles.textPrimary}
                  styleContainer={styles.checkBoxPosition}
                />
                {values.dayRestriction && (
                  <Box mt={16}>
                    <DaysPicker
                      days={values.dayRestrictionVal}
                      onChange={handleFieldChange('dayRestrictionVal')}
                      styleDaysContainer={{
                        marginBottom: 0,
                        ...padding(16, 0, 0, 0),
                      }}
                    />
                    <ErrorMessage
                      error={errors.dayRestriction} mt={4}
                    />
                  </Box>
                )}
              </>
            )}
            <CheckBox
              checked={values.existingClientsOnly}
              onChange={handleToggle('existingClientsOnly')}
              label={I18n.t('salesSpecial.placeholders.existingClientsOnly')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
            />
            <CheckBox
              checked={values.noCombination}
              onChange={handleToggle('noCombination')}
              label={I18n.t('salesSpecial.placeholders.noCombination')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
            />
            <CheckBox
              checked={values.sendOfferToClientApp}
              onChange={handleToggle('sendOfferToClientApp')}
              label={I18n.t('salesSpecial.placeholders.sendOfferToClientApp')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
            />
            <CheckBox
              checked={values.sendOfferToSocialMediaPages ? true : false}
              onChange={handleToggle('sendOfferToSocialMediaPages')}
              label={I18n.t(
                'salesSpecial.placeholders.sendOfferToSocialMediaPages',
              )}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
              disabled={saleSpecial?.isSocial ? true : false}
            />
            <CheckBox
              checked={values.active}
              onChange={handleToggle('active')}
              label={I18n.t('salesSpecial.placeholders.active')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkBoxPosition}
            />
          </Box>
          <Box row jc={'flex-end'}>
            <Button
              text={I18n.t('salesSpecial.save')}
              onPress={handleSubmit}
              loading={loading}
              buttonStyle={styles.saveButton}
            />
          </Box>
        </ScrollView>
      )}
    </BottomSheet>
  );
};

export { AddSalesSpecial };
