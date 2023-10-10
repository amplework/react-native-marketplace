import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Error } from 'shared/error';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import {
  deleteExpense,
  expensesSelectors,
  getExpense,
} from 'store/entities/expenses';

import { DetailsHeader } from './components/detailsHeader';
import { DetailsSection } from './components/detailsSection';
import { expenseDetailsStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList, 'ExpenseDetails'>;

const ExpenseDetails: React.FC<Props> = ({ navigation, route }) => {
  const { id, onEdit, onDelete } = route?.params;

  const expense = useSelector(expensesSelectors.expense);
  const loading = useSelector(expensesSelectors.expenseLoading);
  const error = useSelector(expensesSelectors.expenseError);

  const dispatch = useDispatch();

  const confirmDelete = useCallback(() => {
    alert.deletion({
      entity: I18n.t('common.entities.expense'),
      onDelete: () => dispatch(deleteExpense({ id, onSuccess: onDelete })),
    });
  }, [dispatch, id, onDelete]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () => (
        <Icon
          src={require('assets/global/deleteGray.png')}
          onPress={confirmDelete}
          disabled={loading}
          size={20}
          mr={24}
        />
      ),
    });
  }, [navigation, loading, confirmDelete]);

  useEffect(() => {
    dispatch(getExpense(id));
  }, [dispatch, id]);

  const fetchExpense = () => dispatch(getExpense(id));

  const navigateToEditExpense = () =>
    Navigator.navigate('AddEditExpense', { expense, onEdit });

  if (error) {
    return <Error onRetry={fetchExpense} />;
  }

  return loading ? (
    <SafeContainer containerStyle={S.container}>
      <Loader loading />
    </SafeContainer>
  ) : (
    <SafeContainer containerStyle={S.container}>
      <ScrollView style={S.scrollView} contentContainerStyle={S.content}>
        <DetailsHeader />
        <DetailsSection />
      </ScrollView>
      <View style={S.editButton}>
        <Button
          text={I18n.t('expenses.editExpenseDetails')}
          onPress={navigateToEditExpense}
          image={require('assets/global/pencilFill.png')}
        />
      </View>
    </SafeContainer>
  );
};

export { ExpenseDetails };
