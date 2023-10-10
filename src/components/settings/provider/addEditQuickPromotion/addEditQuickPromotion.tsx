import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styles } from './style';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { BottomSheet } from 'shared/bottomSheet';
import { alert } from 'shared/alert/alert';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker, DaysPicker } from 'shared/datepicker';
import { ErrorMessage, Field } from 'shared/field';
import DropMenu from 'shared/dropMenu';
import { EditHeader } from './components/editHeader';
// import { adaptSaleSpecial } from 'components/settings/helpers/adapters';
import I18n from 'locales';
import { useFormik } from 'formik';
import moment from 'moment-timezone';
import { padding } from 'utils/styles';
import {
  getProducts,
  productsSelectors,
} from 'store/entities/products';
import { useHeaderHeight } from '@react-navigation/stack';
import _ from 'lodash';
import { addQuickPromotion, closeQuickPromoModal, deleteQuickPromotion, editQuickPromotion, quickPromotionSelectors } from 'store/entities/quickPromotion';
import { adaptQuickPromotion } from 'components/settings/helpers/adapters';
import { toast } from 'shared/toast';
import { validateQuickPromotion } from 'components/settings/helpers/validation';

const AddEditQuickPromotion: React.FC = () => {
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const loading = useSelector(quickPromotionSelectors.loading);
  const quickPromotion = useSelector(quickPromotionSelectors.quickPromotion);
  const quickPromotions = useSelector(quickPromotionSelectors.quickPromotions);

  const products = useSelector(productsSelectors.products);

  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;

  const getMinutesFromDate = (m: any) => {
    return m.minutes() + m.hours() * 60;
  }

  const {
    values,
    setValues,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      sale: '',
      service: null,
      discount: 0,
      todayOnly: false,
      isQuickPromotion: true,
      timeRestriction: false,
      isAllService: true,
      timeRestrictionStart: moment().toDate(),
      timeRestrictionEnd: moment().add(1, 'hours').toDate(),
      dateRestriction: false,
      dateRestrictionStartVal: moment().startOf('day').toDate(),
      dateRestrictionEndVal: moment().startOf('day').add(1, 'days').toDate(),
      dayRestriction: false,
      dayRestrictionVal: [],
      active: true,
    },
    validate: validateQuickPromotion(quickPromotion, quickPromotions),
    validateOnChange: false,
    onSubmit: (quickPromotionValues) => {
      if (values.todayOnly || values.timeRestriction || values.dateRestriction || values.dayRestriction) {
        if (!values.todayOnly && !values.dateRestriction && !values.dayRestriction) {
          toast.info(I18n.t('salesSpecial.fields.dateDayRestrictionRequired'));
        } else if (values.timeRestriction == true && (getMinutesFromDate(moment(quickPromotionValues.timeRestrictionStart)) >= getMinutesFromDate(moment(quickPromotionValues.timeRestrictionEnd)))) {
          toast.info(I18n.t('salesSpecial.fields.lessEndTime'));
        } else if (quickPromotion) {
          dispatch(editQuickPromotion(quickPromotionValues));
        } else {
          dispatch(addQuickPromotion(quickPromotionValues));
        }
      } else {
        toast.info(I18n.t('salesSpecial.fields.dateTimeRestrictionRequired'));
      }
    },
  });

  const handleDelete = () => dispatch(deleteQuickPromotion(quickPromotion?.id));

  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.quickPromotions'),
      onDelete: handleDelete,
    });

  useEffect(() => {
    if (products && (!quickPromotion)) {
      let firstService = products
        ?.filter(
          (item: any) =>
            item.type == 'service' && item.isActive == true,
        )
        ?.[0]
      const service = firstService ? _.omit(firstService, 'saleSpecial') : null;
      service && handleFieldChange('service')(service)
    }
  }, [products, quickPromotion]);

  useEffect(() => {
    if (quickPromotion && providerOffset) {
      setValues(adaptQuickPromotion(quickPromotion, providerOffset))
    }
  }, [quickPromotion, providerOffset, setValues]);

  const handleClose = () => dispatch(closeQuickPromoModal());

  const handleFieldChange = (field: any) => (value: any) =>
    setFieldValue(field, value);

  const handleToggle = (field: any) => (checked: boolean) =>
    setFieldValue(field, checked);

  return (
    <BottomSheet keyboardVerticalOffset={headerHeight * -1}>
      <EditHeader edit={!!quickPromotion} onClose={handleClose} onDelete={confirmDelete} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box flex>
          <Field
            value={values.sale}
            onChange={handleFieldChange('sale')}
            error={errors.sale}
            label={I18n.t('salesSpecial.placeholders.sale')}
            mt={16}
          />
          <CheckBox
            checked={values.isAllService}
            onChange={(checked: boolean) => {
              handleToggle('isAllService')(checked);
              handleFieldChange('service')(null);
            }}
            label={'All Services'}
            styleLabel={styles.textPrimary}
            styleContainer={styles.checkBoxPosition}
          />
          {!values.isAllService ? (
            <>
              <DropMenu
                items={products
                  ?.filter(
                    (item: any) =>
                      item.type == 'service' && item.isActive == true,
                  )
                  ?.map((item: any) => ({
                    label: item.name,
                    value: _.omit(item, 'saleSpecial'),
                  })) || []}
                value={values.service}
                placeholder={I18n.t('salesSpecial.placeholders.service')}
                placeholderValue={null}
                error={errors.service}
                onChange={(val: any) => {
                  handleFieldChange('service')(val);
                }}
              />
              {(!values.service) && (quickPromotion?.service && (quickPromotion?.service?.isActive != true)) && (
                <ErrorMessage error={I18n.t('salesSpecial.fields.deactivatedService', { serviceName: quickPromotion?.service?.name })} mt={4} />
              )}
            </>
          ) : null}
          <Field
            value={String(values.discount)}
            keyboardType='number-pad'
            onChange={handleFieldChange('discount')}
            error={errors.discount}
            label={'Discount %'}
            maxLength={3}
            mt={16}
          />
          <CheckBox
            checked={values.todayOnly}
            onChange={(checked: boolean) => {
              handleToggle('todayOnly')(checked)
              handleToggle('dateRestriction')(false)
              handleToggle('dayRestriction')(false)
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
                label={I18n.t('salesSpecial.placeholders.timeRestrictionStart')}
                required
                mode="time"
                date={values.timeRestrictionStart}
                onConfirm={(val) => {
                  let currentDate = moment()
                  let selectedDateTime = moment(val)
                  selectedDateTime.date(currentDate.date());
                  selectedDateTime.month(currentDate.month());
                  selectedDateTime.year(currentDate.year());
                  handleFieldChange('timeRestrictionStart')(moment(selectedDateTime).toDate())
                  handleFieldChange('timeRestrictionEnd')(moment(selectedDateTime).add(1, 'hours').toDate())
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
                startDate={moment(values.timeRestrictionStart).add(1, 'hours').toDate()}
                onConfirm={(val) => {
                  let currentDate = moment()
                  let selectedDateTime = moment(val)
                  selectedDateTime.date(currentDate.date());
                  selectedDateTime.month(currentDate.month());
                  selectedDateTime.year(currentDate.year());
                  handleFieldChange('timeRestrictionEnd')(moment(selectedDateTime).toDate())
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
                    title={moment(values.dateRestrictionStartVal).format('Do MMM YYYY')}
                    // title={moment(values.dateRestrictionStartVal).format('MM/DD/YY HH:mm')}  // MY_TODO // 
                    label={I18n.t('salesSpecial.placeholders.dateRestrictionStart')}
                    required
                    mode="date"
                    date={values.dateRestrictionStartVal}
                    onConfirm={(value) => {
                      handleFieldChange('dateRestrictionStartVal')(moment(value).startOf('day').toDate())
                      if (moment(moment(value).startOf('day')).isSameOrAfter(moment(values.dateRestrictionEndVal))) {
                        handleFieldChange('dateRestrictionEndVal')(moment(value).startOf('day').add(1, 'days').toDate())
                      }
                    }}
                    icon={require('assets/bottomBar/calendar.png')}
                    mr={8}
                  />
                  <Datepicker
                    flex
                    editable
                    timeZoneOffset={providerOffset}
                    title={moment(values.dateRestrictionEndVal).format('Do MMM YYYY')}
                    label={I18n.t('salesSpecial.placeholders.dateRestrictionEnd')}
                    required
                    mode="date"
                    date={values.dateRestrictionEndVal}
                    startDate={moment(values.dateRestrictionStartVal).startOf('day').add(1, 'days').toDate()}
                    onConfirm={(value) => {
                      handleFieldChange('dateRestrictionEndVal')(moment(value).startOf('day').toDate())
                    }}
                    icon={require('assets/bottomBar/calendar.png')}
                    ml={8}
                  />
                </Box>
              )}
              <CheckBox
                checked={values.dayRestriction}
                onChange={(checked: boolean) => {
                  handleToggle('dayRestriction')(checked)
                  handleFieldChange('dayRestrictionVal')([])
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
                    styleDaysContainer={{ marginBottom: 0, ...padding(16, 0, 0, 0) }}
                  />
                  <ErrorMessage error={errors.dayRestriction} mt={4} />
                </Box>
              )}
            </>
          )}
          <CheckBox
            checked={values.active}
            onChange={handleToggle('active')}
            label={I18n.t('salesSpecial.placeholders.active')}
            styleLabel={styles.textPrimary}
            styleContainer={styles.checkBoxPosition}
          />
        </Box>
        <Box row jc={'flex-end'} >
          <Button
            text={I18n.t('salesSpecial.save')}
            onPress={handleSubmit}
            loading={loading}
            buttonStyle={styles.saveButton}
          />
        </Box>
      </ScrollView>
    </BottomSheet>
  );
};

export { AddEditQuickPromotion };