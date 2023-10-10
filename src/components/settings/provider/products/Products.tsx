import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { AddButton } from 'shared/button/add';
import SafeContainer from 'shared/container';
import { openEditModal, productsSelectors } from 'store/entities/products';

import { EditProducts } from '../editProducts';
import { ProductsList } from './components/productsList';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const Products: React.FC<Props> = ({ navigation }) => {
  const isModalOpened = useSelector(productsSelectors.isModalOpened);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.servicesOffered')} />
      ),
    });
  }, [navigation]);

  const handlePress = () => dispatch(openEditModal(null));

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <EditProducts />}
      <AddButton title={I18n.t('products.addService')} onPress={handlePress} />
      <ProductsList />
    </SafeContainer>
  );
};

export { Products };
