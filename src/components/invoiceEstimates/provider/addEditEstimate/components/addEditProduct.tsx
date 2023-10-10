import { adaptInvoiceProduct } from 'components/invoices/helpers/adapters';
import { validateInvoiceProduct } from 'components/invoices/helpers/validation';
import { useFormik } from 'formik';
import I18n, { translations } from 'locales';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, BottomSheetHeader } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { openEditModal, productsSelectors } from 'store/entities/products';
import { InvoiceProductValues } from 'types/invoices';
import { ProductSnapshot } from 'types/products';
import { findById } from 'utils/array';
import COLORS from 'utils/colors';
import { toFloat } from 'utils/numbers';

import { styles } from '../style';
import { PillButton } from './pillButton';

import {
  openSalesDetailModal,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  ProviderSalesSpecialDetails,
} from 'components/salesSpecialDetails/provider/salesSpecialDetails';
import { subscriptionSelectors } from 'store/entities/subscription';

const initialValues: InvoiceProductValues = {
  type: 'service',
  selectedProduct: null,
  quantity: '1',
  price: '',
  description: ''
};

interface Props {
  product: ProductSnapshot | null;
  onSubmit: (product: ProductSnapshot) => void;
  onClose: () => void;
}

const AddEditProduct: React.FC<Props> = ({ product, onSubmit, onClose }) => {
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const isDetailsModalOpened = useSelector(salesSpecialSelectors.isSalesDetailModalOpened);
  const products = useSelector(productsSelectors.products);

  const {
    values,
    setValues,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: product
      ? adaptInvoiceProduct(products)(product)
      : initialValues,
    validate: validateInvoiceProduct,
    validateOnChange: false,
    onSubmit: (productValues) => {
      onSubmit({
        id: Number(productValues.selectedProduct!.id),
        name: productValues.selectedProduct!.name,
        price: toFloat(productValues.price),
        quantity: Number(productValues.quantity),
        description: productValues.description
      });

      onClose();
    },
  });

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (values.selectedProduct && values.selectedProduct.type !== values.type) {
      setValues({ ...values, selectedProduct: null, quantity: '1', price: '', description: '' });
    }
  }, [setValues, values]);

  const [salesSpecial, setSalesSpecial] = useState([])

  const onSalePress = () => {
    dispatch(openSalesDetailModal(salesSpecial))
  }

  const openEditProductModal = () => {
    onClose();
    dispatch(openEditModal(null));
  };

  const selectService = () => setFieldValue('type', 'service');

  const selectItem = () => setFieldValue('type', 'item');

  const handleSelectProduct = (value: number) => {
    const selectedProduct = findById(value)(products);

    setValues({
      ...values,
      selectedProduct,
      quantity: '1',
      price: selectedProduct?.price.toString() || '',
      description: selectedProduct?.description || '',
    });

    if (isPremiumProvider) {
      setSalesSpecial(
        products?.find((item: any) => item.id == value)?.saleSpecial,
      );
    }
  };

  const availableProducts = products.filter(
    ({ type, isActive }) => type === values.type && isActive,
  );

  return (
    <BottomSheet>
      <BottomSheetHeader
        title={
          product
            ? t(translations.estimates.editEstimateService)
            : t(translations.estimates.addEstimateService)
        }
        onClose={onClose}
      />
      <ScrollView
        style={styles.modalScrollView}
        contentContainerStyle={styles.modalContent}
      >
        <Box flex>
          <Box row jc="space-between" mb={16}>
            <Box row>
              <PillButton
                title={t(translations.invoices.service)}
                onPress={selectService}
                active={values.type === 'service'}
                mr={12}
              />
              <PillButton
                title={t(translations.invoices.item)}
                onPress={selectItem}
                active={values.type === 'item'}
                mr={12}
              />
            </Box>
            <PillButton
              title={t(translations.invoices.createNewService)}
              onPress={openEditProductModal}
              active
            />
          </Box>
          <Box jc='center'>
            <DropMenu
              items={availableProducts.map(({ name, id, saleSpecial }) => ({
                label: (isPremiumProvider && saleSpecial?.length > 0) ? `${name} (On Sale)` : name,
                // label: name,
                value: id,
              }))}
              value={values.selectedProduct?.id}
              onChange={handleSelectProduct}
              placeholder={t(translations.invoices.fields.product)}
            />
            {(salesSpecial?.length > 0) && (
              <TouchableOpacity
                style={{ position: 'absolute', paddingTop: 16, right: 36 }}
                hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
                onPress={() => onSalePress()}>
                <Box pv={2} ph={8} jc="center" ai="center" r={15} bc={COLORS.greenblue}>
                  <Paragraph color={COLORS.white} type='book' size='xs'>
                    {(salesSpecial?.length == 1)
                      ? I18n.t<string>('products.saleBadge', { salePrice: `$${salesSpecial?.[0]?.salePrice?.toString()}` })
                      : I18n.t<string>('products.saleBadge', { salePrice: '' })
                    }
                  </Paragraph>
                </Box>
              </TouchableOpacity>
            )}
          </Box>
          {isDetailsModalOpened && <ProviderSalesSpecialDetails />}
          {!!errors.selectedProduct && (
            <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
              {errors.selectedProduct}
            </Paragraph>
          )}
          <Field
            value={values.description}
            label={t(translations.invoices.fields.description)}
            onChange={handleChange('description')}
            error={errors.description}
            size='xl'
            mt={16}
            mb={16}
          />
          <Field
            value={values.quantity}
            label={t(translations.invoices.fields.quantity)}
            onChange={handleChange('quantity')}
            error={errors.quantity}
            mt={16}
            mb={16}
          />
          <Field
            startAdornment={
              <Icon src={require('assets/global/dollar.png')} size={18} />
            }
            value={values.price}
            label={t(translations.invoices.fields.price)}
            onChange={handleChange('price')}
            error={errors.price}
            disabled={!values.selectedProduct}
            keyboardType="numeric"
            mb={16}
          />
          <CheckBox
            checked={!!values.selectedProduct?.isQuickSale}
            label={t(translations.invoices.fields.quickSale)}
            disabled
            styleLabel={styles.checkboxText}
          />
        </Box>
        <Button
          onPress={handleSubmit}
          text={t(translations.common.continue)}
          buttonStyle={styles.continue}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { AddEditProduct };
