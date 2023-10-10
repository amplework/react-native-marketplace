import I18n from 'locales';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyState } from 'shared/emptyState';
import { getTaxes, openEditModal, taxesSelectors } from 'store/entities/taxes';
import { ITax } from 'types/taxes';

import { styles } from '../style';
import { TaxesItem } from './taxesItem';

const TaxesList: React.FC = () => {
  const taxes = useSelector(taxesSelectors.taxes);
  const loading = useSelector(taxesSelectors.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaxes());
  }, [dispatch]);

  const handlePress = (tax: ITax) => () => dispatch(openEditModal(tax));

  return (
    <FlatList
      data={taxes}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <TaxesItem onPress={handlePress(item)} tax={item} />
      )}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() =>
        loading ? null : (
          <EmptyState entities={I18n.t('common.entities.taxes')} />
        )
      }
    />
  );
};

export { TaxesList };
