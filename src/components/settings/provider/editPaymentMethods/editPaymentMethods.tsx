import { validatePaymentMethod } from 'components/settings/helpers/validation';
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
import { toast } from 'shared/toast';
import { Toggle } from 'shared/toggle';
import {
  closeEditModal,
  createPaymentMethod,
  deletePaymentMethod,
  editPaymentMethod,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { PaymentMethodValues } from 'types/settings';
import { omit } from 'utils/object';
import {
  isOnlinePaymentOption,
} from 'utils/onlinePaymentOptions';

import { EditHeader } from './components/editHeader';
import { styles } from './style';

const EditPaymentMethods: React.FC = () => {
  const methods = useSelector(paymentMethodsSelectors.methods);
  const method = useSelector(paymentMethodsSelectors.method);
  const loading = useSelector(paymentMethodsSelectors.methodLoading);
  const provider = useSelector((state: any) => state.provider.provider);

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
    validate: validatePaymentMethod(method, methods),
    validateOnChange: false,
    onSubmit: (methodValues) => {
      if ((isOnlinePaymentOption(methodValues?.description) || isOnlinePaymentOption(methodValues?.shortName)) && !Boolean(provider?.connectAccountId?.trim())) {
        toast.info(I18n.t('paymentMethods.errors.noConnectAccount'));
      } else if (method) {
        dispatch(editPaymentMethod({ ...methodValues, id: method.id }));
      } else {
        dispatch(createPaymentMethod(methodValues));
      }
    },
  });

  useEffect(() => {
    if (!method) {
      return;
    }

    setValues(omit(method, 'id'));
  }, [method, setValues]);

  const handleClose = () => dispatch(closeEditModal());

  const handleToggle =
    (field: keyof PaymentMethodValues) => (checked: boolean) =>
      setFieldValue(field, checked);

  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.paymentMethod'),
      onDelete: () => dispatch(deletePaymentMethod(method!.id)),
    });

  return (
    <BottomSheet>
      <EditHeader
        edit={!!method}
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
              {I18n.t('paymentMethods.fields.active')}
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
            label={I18n.t('paymentMethods.placeholders.shortName')}
            mb={16}
          />
          <Field
            value={values.description}
            onChange={handleChange('description')}
            error={errors.description}
            label={I18n.t('paymentMethods.placeholders.description')}
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

export { EditPaymentMethods };
