import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { AddButton } from 'shared/button/add';
import SafeContainer from 'shared/container';
import { expenseTypesSelectors } from 'store/entities/expenseTypes';
import { openEditModal } from 'store/entities/expenseTypes/slice';
import { capitalize } from 'utils/strings';

import { EditExpenseTypes } from '../editExpenseTypes';
import { ExpenseTypesList } from './components/expenseTypesList';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList, 'ExpenseTypes'> {}

const ExpenseTypes: React.FC<Props> = ({ navigation }) => {
  const isModalOpen = useSelector(expenseTypesSelectors.isModalOpened);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={capitalize(I18n.t('settings.links.expenseType'))} />
      ),
    });
  }, [navigation]);

  const handleAddPress = () => dispatch(openEditModal(null));

  return (
    <SafeContainer
      containerStyle={styles.container}
      safeStyle={styles.safeArea}
    >
      {isModalOpen && <EditExpenseTypes />}
      <AddButton title={I18n.t('expenseTypes.add')} onPress={handleAddPress} />
      <ExpenseTypesList />
    </SafeContainer>
  );
};

export { ExpenseTypes };
