import { adaptProduct } from 'components/settings/helpers/adapters';
import I18n from 'locales';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SafeContainer from 'shared/container';
import { EmptyState } from 'shared/emptyState';
import { styles } from '../style';
import { PackageItem } from './packageItem';
import { IProduct } from 'types/products';
import {
  getProducts,
  openEditModal,
  productsSelectors,
  toggleActive,
} from 'store/entities/products';
import {
  ProviderSalesSpecialDetails,
} from 'components/salesSpecialDetails/provider/salesSpecialDetails';
import {
  openSalesDetailModal,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';

const PackageList: React.FC = () => {
  const products = useSelector(productsSelectors.products);
  const loading = useSelector(productsSelectors.loading);
  const isDetailsModalOpened = useSelector(salesSpecialSelectors.isSalesDetailModalOpened);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handlePress = (product: IProduct) => () =>
    dispatch(openEditModal(product));

  const handleToggleActive = (product: IProduct) => (isActive: boolean) =>
    dispatch(
      toggleActive({ ...adaptProduct(product), id: product.id, isActive }),
    );

  const handleSalePress = (salesSpecial: any) => () =>
    dispatch(openSalesDetailModal(salesSpecial));

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <FlatList
        data={products}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <PackageItem
            onPress={handlePress(item)}
            onToggle={handleToggleActive(item)}
            onSalePress={handleSalePress(item?.saleSpecial)}
            {...item}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={() =>
          loading ? null : (
            <EmptyState entities={I18n.t('common.entities.services')} />
          )
        }
      />
      {isDetailsModalOpened && <ProviderSalesSpecialDetails />}
    </SafeContainer>
  );
};

export { PackageList };
