import I18n from 'locales';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyState } from 'shared/emptyState';
import {
  expenseTypesSelectors,
  getExpenseTypes,
} from 'store/entities/expenseTypes';
import { openEditModal, toggleActive } from 'store/entities/expenseTypes/slice';
import { IExpenseType } from 'types/settings';

import { styles } from '../style';
import { ExpenseTypesItem } from './expenseTypesItem';

const ExpenseTypesList: React.FC = () => {
  const expenseTypes = useSelector(expenseTypesSelectors.expenseTypes);
  const loading = useSelector(expenseTypesSelectors.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenseTypes());
  }, [dispatch]);

  const handlePress = (expenseType: IExpenseType) => () =>
    dispatch(openEditModal(expenseType));

  const handleToggle = (expenseType: IExpenseType) => (isActive: boolean) =>
    dispatch(toggleActive({ ...expenseType, isActive }));

  return (
    <FlatList
      data={expenseTypes}
      keyExtractor={(expenseType) => `${expenseType.id}`}
      renderItem={({ item: expenseType }) => (
        <ExpenseTypesItem
          expenseType={expenseType}
          onPress={handlePress(expenseType)}
          onToggle={handleToggle(expenseType)}
        />
      )}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() =>
        loading ? null : (
          <EmptyState entities={I18n.t('common.entities.expenseType')} />
        )
      }
    />
  );
};

export { ExpenseTypesList };
