import { StackScreenProps } from '@react-navigation/stack';
import { adaptExpense } from 'components/expenses/helpers/adapters';
import { validateExpense } from 'components/expenses/helpers/validation';
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { SearchVendorsModal } from 'shared/modals';
import { Paragraph } from 'shared/paragraph';
import { Select } from 'shared/select';
import { AddPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  createExpense,
  editExpense,
  expensesSelectors,
} from 'store/entities/expenses';
import {
  expenseTypesSelectors,
  getExpenseTypes,
} from 'store/entities/expenseTypes';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { subscriptionSelectors } from 'store/entities/subscription';
import { ExpenseValues } from 'types/expenses';
import { IVendor } from 'types/vendors';
import { dateFormatWithoutTz, dateWithoutTz, parseDate } from 'utils/dates';
import { isIOS } from 'utils/device';
import { formatArrayToSelectItems } from 'utils/fields';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';
import { capitalize } from 'utils/strings';

type Props = StackScreenProps<RootStackParamList, 'AddEditExpense'>;

const AddEditExpense: React.FC<Props> = ({ navigation, route }) => {
  const { expense, onEdit } = route.params || {};

  const providerDetails = useSelector((state: any) => state.provider.provider);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const providerOffset = providerDetails?.utcOffset;
  const providerTimezone = providerDetails?.address?.utctimezone;

  const [vendorName, setVendorName] = useState('');
  const [isVendorsModalOpen, setIsVendorsModalOpen] = useState(false);

  const loading = useSelector(expensesSelectors.addEditLoading);
  const expenseTypes = useSelector(expenseTypesSelectors.expenseTypes);
  const paymentMethods = useSelector(paymentMethodsSelectors.methods);
  const methodList = paymentMethods.filter((e: any) =>
    e?.isActive !== false &&
    (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName))));
  
  const dispatch = useDispatch();

  const isAddressExist = (providerDetails?.address?.location?.lat == null
    && providerDetails?.address?.location?.lat == null)
    ? false : true

  const { t } = useTranslation();

  const { values, errors, setFieldValue, handleChange, handleSubmit } =
    useFormik<ExpenseValues>({
      initialValues: expense
        ? adaptExpense(expense)
        : {
          description: '',
          vendorId: null,
          expenseTypeId: null,
          paymentMethodId: null,
          date: parseDate(),
          total: '',
          invoiceNumber: '',
          notes: '',
        },
      validate: validateExpense,
      validateOnChange: false,
      onSubmit: (expenseValues: ExpenseValues) => {  
        if(!isAddressExist) {
          toast.info(t(translations.expenses.errors.timezoneError));
          return;
        }
        
        if (expense) {
          dispatch(editExpense({ values: expenseValues, onSuccess: onEdit }));
        } else {
          let newExpense: any = {
            description: expenseValues?.description,
            expenseTypeId: expenseValues?.expenseTypeId,
            paymentMethodId: expenseValues?.paymentMethodId,
            date: moment(expenseValues?.date, providerTimezone).format('YYYY-MM-DD'),
            total: expenseValues?.total,
            invoiceNumber: expenseValues?.invoiceNumber,
            notes: expenseValues?.notes,
          }
          newExpense = {
            ...newExpense,
            vendorId: expenseValues?.vendorId
          }
          dispatch(createExpense(newExpense));
        }
      },
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={20}>
          {t(translations.expenses.details.title)}
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
    dispatch(getExpenseTypes({ isActive: true }));
    dispatch(getPaymentMethods({ isActive: true }));
  }, [dispatch]);

  useEffect(() => {
    if (expense) {
      setVendorName(expense?.vendor?.name || '');
    }
  }, [expense]);

  const handleFieldChange =
    <F extends keyof (ExpenseValues) >(field: F) =>
      (value: ExpenseValues[F]) =>
        setFieldValue(field, value);

  const openVendorsModal = () => setIsVendorsModalOpen(true);

  const closeVendorsModal = () => setIsVendorsModalOpen(false);

  const onVendorPress = (vendor: IVendor) => {
    setVendorName(vendor.name);
    setFieldValue('vendorId', vendor.id);
    closeVendorsModal();
  };

  const expenseDate = dateWithoutTz(values.date, providerOffset);

  return (
    <>
      <AddPageTemplate
        loading={loading}
        entity={translations.common.entities.expense}
        onSavePress={handleSubmit}
      >
        <Field
          value={values.description}
          label={t(translations.form.description)}
          onChange={handleChange('description')}
          error={errors.description}
          maxLength={255}
          required
          size="xl"
          multiline
          mb={20}
        />
        <Select
          placeholder={capitalize(t(translations.common.entities.vendor))}
          value={
            vendorName && t(translations.vendors.vendorName, { vendorName })
          }
          onPress={openVendorsModal}
          error={errors?.vendorId}
        />
        <DropMenu
          value={values.expenseTypeId}
          placeholder={capitalize(t(translations.common.entities.expenseType))}
          placeholderValue={null}
          onChange={handleFieldChange('expenseTypeId')}
          items={formatArrayToSelectItems(
            expenseTypes,
            'id',
            'shortName',
            t(translations.common.entities.expenseType),
          )}
          error={errors.expenseTypeId}
        />
        <DropMenu
          value={values.paymentMethodId}
          placeholder={capitalize(
            t(translations.common.entities.paymentMethod),
          )}
          placeholderValue={null}
          onChange={handleFieldChange('paymentMethodId')}
          items={formatArrayToSelectItems(
            methodList,
            'id',
            'shortName',
            t(translations.common.entities.paymentMethod),
          )}
          error={errors.paymentMethodId}
        />
        {expense ? (
          <Datepicker
            flex
            editable
            title={isIOS ? dateFormatWithoutTz(expenseDate) : moment(values?.date, 'YYYY-MM-DD').format('Do MMM YYYY')}
            timeZoneOffset={0}
            label={t(translations.form.date)}
            date={moment(values.date).toDate()}
            onConfirm={handleFieldChange('date')}
            mode="date"
            required
            icon={require('assets/global/calendar.png')}
            mb={20}
            mt={20}
          />
        ) : (
          <Datepicker
            flex
            editable
            title={moment.tz(values?.date, providerTimezone).format('Do MMM YYYY')}
            timeZoneOffset={providerOffset}
            label={t(translations.form.date)}
            date={moment(values.date).toDate()}
            onConfirm={handleFieldChange('date')}
            mode="date"
            required
            icon={require('assets/global/calendar.png')}
            mb={20}
            mt={20}
          />
        )}
        <Field
          value={values.total}
          label={t(translations.form.expenseTotal)}
          onChange={handleChange('total')}
          error={errors.total}
          required
          keyboardType="numeric"
          mb={20}
        />
        <Field
          value={values.invoiceNumber}
          label={t(translations.form.invoiceNumber)}
          onChange={handleChange('invoiceNumber')}
          error={errors.invoiceNumber}
          mb={20}
        />
        <Field
          value={values.notes}
          label={t(translations.form.notes)}
          onChange={handleChange('notes')}
          error={errors.notes}
          multiline
          size="xl"
          mb={20}
        />
      </AddPageTemplate>
      {isVendorsModalOpen && (
        <SearchVendorsModal
          isOpen={isVendorsModalOpen}
          closeModal={closeVendorsModal}
          onVendorPress={onVendorPress}
        />
      )}
    </>
  );
};

export { AddEditExpense };