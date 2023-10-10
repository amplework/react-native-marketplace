import { adaptProduct } from 'components/settings/helpers/adapters';
import { validateProduct } from 'components/settings/helpers/validation';
import { useFormik } from 'formik';
import I18n from 'locales';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Toggle } from 'shared/toggle';
import {
  closeEditModal,
  createProduct,
  editProduct,
  productsSelectors,
} from 'store/entities/products';
import { deleteProduct } from 'store/entities/products/slice';
import { subscriptionSelectors } from 'store/entities/subscription';
import { IProduct, ProductValues } from 'types/products';
import { LITE } from 'types/subscription';

import { EditHeader } from './components/editHeader';
import { styles } from './style';

export interface Props {
  fromAppointment?: boolean | undefined;
  onCreateProduct?: (data: ProductValues) => void;
  onCreate?: (product: IProduct) => void;
}

const EditProducts: React.FC<Props> = ({
  fromAppointment = false,
  onCreateProduct,
  onCreate,
}) => {
  const products = useSelector(productsSelectors.products);
  const product = useSelector(productsSelectors.product);
  const loading = useSelector(productsSelectors.productLoading);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const {
    values,
    setValues,
    setFieldValue,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
      type: 'service',
      price: '',
      isQuickSale: false,
      time: '30',
      isActive: true,
    },
    validate: validateProduct(product, products),
    validateOnChange: false,
    onSubmit: (productValues) => {
      if (product) {
        dispatch(editProduct({ ...productValues, id: product.id }));
      } else {
        fromAppointment
          ? onCreateProduct && onCreateProduct(productValues)
          : dispatch(
              createProduct({ values: productValues, onSuccess: onCreate }),
            );
      }
    },
  });

  useEffect(() => {
    if (!product) {
      return;
    }

    setValues(adaptProduct(product));
  }, [product, setValues]);

  const dispatch = useDispatch();

  const handleToggleType = (checked: boolean) =>
    setFieldValue('type', checked ? 'item' : 'service');

  const handleToggle = (field: keyof ProductValues) => (checked: boolean) =>
    setFieldValue(field, checked);

  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.service'),
      onDelete: () => dispatch(deleteProduct(product!.id)),
    });

  const handleClose = () => dispatch(closeEditModal());
    
  return (
    <BottomSheet keyboardVerticalOffset={-100} >
      <EditHeader
        edit={!!product}
        onDelete={confirmDelete}
        onClose={handleClose}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box flex>
          <Box row jc="space-between" ai="center" mb={16}>
            <Paragraph size="s" type="bold">
              {I18n.t('products.active')}
            </Paragraph>
            <Toggle
              checked={values.isActive}
              onChange={handleToggle('isActive')}
            />
          </Box>
          <CheckBox
            checked={values.type === 'item'}
            onChange={handleToggleType}
            label={I18n.t('products.physicalItem')}
            disabled={!!product}
            styleLabel={styles.textPrimary}
          />
          <Field
            value={values.name}
            onChange={handleChange('name')}
            error={errors.name}
            label={I18n.t(`products.placeholders.name.${values.type}`)}
            required
            mt={16}
          />
          <Field
            value={values.description}
            onChange={handleChange('description')}
            error={errors.description}
            label={I18n.t(`products.placeholders.description.${values.type}`)}
            size="xl"
            multiline
            mt={16}
          />
          <Field
            value={values.price}
            onChange={handleChange('price')}
            error={errors.price}
            label={I18n.t('products.placeholders.price')}
            required
            startAdornment={
              <Icon src={require('assets/global/dollar.png')} size={18} />
            }
            keyboardType="numeric"
            mt={16}
          />
          {!liteSubcription && (
            <CheckBox
              checked={values.isQuickSale}
              onChange={handleToggle('isQuickSale')}
              label={I18n.t('products.quickSale')}
              styleLabel={styles.textPrimary}
              styleContainer={styles.checkbox}
            />
          )}
          {values.type === 'service' && (
            <Field
              value={values.time}
              onChange={handleChange('time')}
              error={errors.time}
              label={I18n.t('products.placeholders.time')}
              keyboardType="numeric"
              mt={16}
            />
          )}
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

export { EditProducts };
