import { validateExpenseType } from 'components/settings/helpers/validation';
import { useFormik } from 'formik';
import I18n from 'locales';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Field } from 'shared/field';
import { Paragraph } from 'shared/paragraph';
import { Toggle } from 'shared/toggle';
import { expenseTypesSelectors } from 'store/entities/expenseTypes';
import {
  closeEditModal,
  createExpenseType,
  deleteExpenseType,
  editExpenseType,
} from 'store/entities/expenseTypes/slice';
import { ExpenseTypeValues } from 'types/settings';
import { omit } from 'utils/object';

import { EditHeader } from './components/editHeader';
import { styles } from './style';

const EditExpenseTypes: React.FC = () => {
  const expenseTypes = useSelector(expenseTypesSelectors.expenseTypes);
  const expenseType = useSelector(expenseTypesSelectors.expenseType);
  const loading = useSelector(expenseTypesSelectors.expenseTypeLoading);

  const dispatch = useDispatch();

  const {
    values,
    setValues,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      isActive: true,
      shortName: '',
      description: '',
    },
    validate: validateExpenseType(expenseType, expenseTypes),
    validateOnChange: false,
    onSubmit: (expenseTypeValues) => {
      if (expenseType) {
        dispatch(editExpenseType({ ...expenseTypeValues, id: expenseType.id }));
      } else {
        dispatch(createExpenseType(expenseTypeValues));
      }
    },
  });

  useEffect(() => {
    if (!expenseType) {
      return;
    }

    setValues(omit(expenseType, 'id'));
  }, [expenseType, setValues]);

  const handleClose = () => dispatch(closeEditModal());

  const handleToggle = (field: keyof ExpenseTypeValues) => (checked: boolean) =>
    setFieldValue(field, checked);

  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.expenseType'),
      onDelete: () => dispatch(deleteExpenseType(expenseType!.id)),
    });

  return (
    <BottomSheet>
      <EditHeader
        edit={!!expenseType}
        onDelete={confirmDelete}
        onClose={handleClose}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box>
          <Box row jc="space-between" ai="center" mb={16}>
            <Paragraph size="s" type="bold">
              {I18n.t('expenseTypes.fields.active')}
            </Paragraph>
            <Toggle
              checked={values.isActive}
              onChange={handleToggle('isActive')}
            />
          </Box>
          <Field
            value={values.shortName}
            onChange={handleChange('shortName')}
            error={errors.shortName}
            label={I18n.t('expenseTypes.placeholders.shortName')}
            mb={16}
          />
          <Field
            value={values.description}
            onChange={handleChange('description')}
            error={errors.description}
            label={I18n.t('expenseTypes.placeholders.description')}
            mb={16}
          />
        </Box>
        <Button
          text={I18n.t('common.saveChanges')}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={styles.saveButton}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { EditExpenseTypes };
