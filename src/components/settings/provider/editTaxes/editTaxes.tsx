import { adaptTax } from 'components/settings/helpers/adapters';
import { validateTax } from 'components/settings/helpers/validation';
import { useFormik } from 'formik';
import I18n from 'locales';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert/alert';
import { AlertComponent } from 'shared/alert/alertComponent';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker } from 'shared/datepicker';
import { Field } from 'shared/field';
import { Paragraph } from 'shared/paragraph';
import {
  closeEditModal,
  createTax,
  deleteTax,
  editTax,
  taxesSelectors,
} from 'store/entities/taxes';
import { TaxValues } from 'types/taxes';
import COLORS from 'utils/colors';
import { formatDate, parseDate } from 'utils/dates';

import { EditHeader } from './components/editHeader';
import { HistoryModal } from './components/historyModal';
import { styles } from './style';

const EditTaxes: React.FC = () => {
  const [fromDate, setFromDate] = useState<any>(parseDate());
  const [showHistory, setShowHistory] = useState(false);
  const taxes = useSelector(taxesSelectors.taxes);
  const tax = useSelector(taxesSelectors.tax);
  const loading = useSelector(taxesSelectors.taxLoading);

  const {
    values,
    setValues,
    setFieldValue,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      shortName: '',
      description: '',
      rate: '',
      shouldApplyToTransactions: true,
    },
    validate: validateTax(tax, taxes),
    validateOnChange: false,
    onSubmit: (taxValues) => {
      const modifyRate = Number(
        values.rate.toString().replace(/[,-]/g, '.').split(' ').join(''),
      );
      if (tax) {
        dispatch(
          editTax({
            ...taxValues,
            rate: modifyRate,
            effectiveDate: fromDate.toISOString(),
            id: tax.id,
          }),
        );
      } else {
        dispatch(
          createTax({
            ...taxValues,
            rate: modifyRate,
            effectiveDate: fromDate.toISOString(),
          }),
        );
      }
    },
  });

  useEffect(() => {
    if (!tax) {
      return;
    }
    // @ts-ignore
    setFromDate(parseDate(tax.effectiveDate));
    setValues(adaptTax(tax));
  }, [tax, setValues]);

  const dispatch = useDispatch();

  const handleToggle = (field: keyof TaxValues) => (checked: boolean) =>
    setFieldValue(field, checked);
  //const handleClose = () => dispatch(closeEditModal());
  const handleClose = () =>
    AlertComponent(
      I18n.t('taxes.note'),
      I18n.t('taxes.cancelNote'),
      () => dispatch(closeEditModal()),
      () => null,
      I18n.t('common.cancel'),
      I18n.t('common.confirm'),
    );
  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.tax'),
      onDelete: handleDelete,
    });

  const handleDelete = () => dispatch(deleteTax(tax!.id));
  return (
    <BottomSheet>
      <EditHeader edit={!!tax} onClose={handleClose} onDelete={confirmDelete} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box flex>
          <Field
            value={values.shortName}
            onChange={handleChange('shortName')}
            error={errors.shortName}
            label={I18n.t('taxes.placeholders.name')}
            mt={16}
          />
          <Field
            value={values.description}
            onChange={handleChange('description')}
            error={errors.description}
            label={I18n.t('taxes.placeholders.description')}
            size="xl"
            multiline
            mt={16}
          />
          <Field
            value={values.rate.toString()}
            onChange={handleChange('rate')}
            error={errors.rate}
            label={I18n.t('taxes.placeholders.rate')}
            keyboardType="numeric"
            mt={16}
          />
          <Datepicker
            title={formatDate(fromDate)}
            label={I18n.t('taxes.placeholders.date')}
            required
            mode="date"
            date={fromDate}
            minimumDate={tax ? parseDate() : undefined}
            onConfirm={setFromDate}
            icon={require('assets/bottomBar/calendar.png')}
            mt={16}
          />
          <CheckBox
            styleContainer={styles.checkBoxPosition}
            checked={!!values.shouldApplyToTransactions}
            onChange={handleToggle('shouldApplyToTransactions')}
            label={I18n.t('taxes.applyTaxRate')}
            styleLabel={styles.textPrimary}
          />
          {true && (
            <TouchableOpacity onPress={() => setShowHistory(true)}>
              <Paragraph size="s" color={COLORS.clearBlue} mt={16}>
                {I18n.t('taxes.history')}
              </Paragraph>
            </TouchableOpacity>
          )}
        </Box>
        <Button
          text={I18n.t('taxes.save')}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={styles.saveButton}
        />
      </ScrollView>
      <HistoryModal
        show={showHistory}
        data={tax?.rateHistory || []}
        onClose={(value) => setShowHistory(value)}
      />
    </BottomSheet>
  );
};

export { EditTaxes };
