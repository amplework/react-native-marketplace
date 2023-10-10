import { adaptPayment } from 'components/invoices/helpers/adapters';
import { validateInvoicePayment } from 'components/invoices/helpers/validation';
import { useFormik } from 'formik';
import I18n from 'locales';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { BottomSheet, BottomSheetHeader } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Radio } from 'shared/radio';
import { paymentMethodsSelectors } from 'store/entities/paymentMethods';
import { subscriptionSelectors } from 'store/entities/subscription';
import { InvoicePayment, InvoicePaymentValues } from 'types/invoices';
import COLORS from 'utils/colors';
import { toFloat } from 'utils/numbers';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

import { styles } from '../style';

const initialValues: InvoicePaymentValues = {
  paymentMethodId: '',
  isFullPayment: true,
  total: '',
};

interface Props {
  payment: InvoicePayment | null;
  invoiceTotal: number;
  onSubmit: (payment: InvoicePayment) => void;
  onClose: () => void;
}

const AddEditQuickPayment: React.FC<Props> = ({
  payment,
  invoiceTotal,
  onSubmit,
  onClose,
}) => {
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const methods = useSelector(paymentMethodsSelectors.methods);
  const activeMethods = methods.filter((method) =>
    method?.isActive &&
    (isPremiumProvider) ? true : (!(isOnlinePaymentOption(method?.shortName))));

  const { values, errors, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: payment ? adaptPayment(payment) : initialValues,
      validate: validateInvoicePayment(invoiceTotal),
      validateOnChange: false,
      onSubmit: (paymentValues) => {
        onSubmit({
          isFullPayment: paymentValues.isFullPayment,
          paymentMethodId: paymentValues.paymentMethodId,
          total: toFloat(paymentValues.total),
        });
        onClose();
      },
    });

  const selectPaymentMethod = (id: number) =>
    setFieldValue('paymentMethodId', id);

  const selectFullPayment = () => setFieldValue('isFullPayment', true);

  const selectPartialPayment = () => setFieldValue('isFullPayment', false);

  return (
    <BottomSheet>
      <BottomSheetHeader
        title={I18n.t('invoices.invoiceQuickPayment')}
        onClose={onClose}
      />
      <ScrollView
        style={styles.modalScrollView}
        contentContainerStyle={styles.modalContent}
      >
        <Box flex>
          <DropMenu
            items={activeMethods.map((method) => ({
              label: method.shortName,
              inputLabel: I18n.t('invoices.fields.paymentMethod.label', {
                method: method.shortName,
              }),
              value: method.id,
            }))}
            value={values.paymentMethodId}
            onChange={selectPaymentMethod}
            placeholder={I18n.t('invoices.fields.paymentMethod.placeholder')}
          />
          {!!errors.paymentMethodId && (
            <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
              {errors.paymentMethodId}
            </Paragraph>
          )}
          <Radio
            checked={values.isFullPayment}
            onChange={selectFullPayment}
            mt={16}
            mb={16}
          >
            <Paragraph size="s" ml={8}>
              {I18n.t('invoices.fields.fullPayment')}
            </Paragraph>
          </Radio>
          <Radio
            checked={!values.isFullPayment}
            onChange={selectPartialPayment}
            mb={16}
          >
            <Paragraph size="s" ml={8}>
              {I18n.t('invoices.fields.partialPayment')}
            </Paragraph>
          </Radio>
          {!values.isFullPayment && (
            <Field
              value={values.total}
              label={I18n.t('invoices.fields.total')}
              onChange={handleChange('total')}
              error={errors.total}
              keyboardType="numeric"
              startAdornment={
                <Icon src={require('assets/global/dollar.png')} size={18} />
              }
              mb={16}
            />
          )}
        </Box>
        <Button
          onPress={handleSubmit}
          text={I18n.t('common.continue')}
          buttonStyle={styles.continue}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { AddEditQuickPayment };
