import { StackScreenProps } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { formatExpenseQueryParameters } from 'components/expenses/helpers/adapters';
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { EmptyState } from 'shared/emptyState';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import { ReviewBlock } from './components/reviewBlock';
import {
  expensesSelectors,
  loadMoreExpensesSearchResults,
  resetExpensesSearchResults,
  searchExpenses,
} from 'store/entities/expenses';
import {
  expenseTypesSelectors,
  getExpenseTypes,
} from 'store/entities/expenseTypes';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { getVendors, vendorsSelectors } from 'store/entities/vendors';
import { theme } from 'theme';
import { ExpenseData, SearchExpensesValues } from 'types/expenses';
import COLORS from 'utils/colors';
import { days, formatDate, parseDate } from 'utils/dates';

import { ExpensesItem } from '../components/expensesItem';
import { expensesStyles as S } from '../style';
import { subscriptionSelectors } from 'store/entities/subscription';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

const initialValues: SearchExpensesValues = {
  query: '',
  fromDate: parseDate(),
  toDate: parseDate(),
  vendorId: null,
  expenseTypeId: null,
  paymentMethodId: null,
};

type Props = StackScreenProps<RootStackParamList>;

const SearchExpenses: React.FC<Props> = ({ navigation }) => {  
  const [isCompact, setCompact] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const paymentMethodsLoading = useSelector(paymentMethodsSelectors.loading);
  const vendorsLoading = useSelector(vendorsSelectors.loading);
  const expenseTypesLoading = useSelector(expenseTypesSelectors.loading);
  const vendors = useSelector(vendorsSelectors.vendors);
  const expenseTypes = useSelector(expenseTypesSelectors.expenseTypes);
  const paymentMethods = useSelector(paymentMethodsSelectors.methods).filter(
    (e: any) => (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName)))
  );
  const searchResults = useSelector(expensesSelectors.searchResults);
  const searchTotal = useSelector(expensesSelectors.searchTotal);
  const totalSum = useSelector(expensesSelectors.totalSum);
  const loading = useSelector(expensesSelectors.searchLoading);
  const loadingMore = useSelector(expensesSelectors.searchLoadingMore);
  const offset = useSelector(expensesSelectors.searchOffset);
  const total = useSelector(expensesSelectors.searchTotal);
  

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { values, setValues, setFieldValue, handleSubmit } =
    useFormik<SearchExpensesValues>({
      initialValues,
      validateOnChange: false,
      onSubmit: (searchValues: SearchExpensesValues) => {
        setCompact(true);
        setSearchActive(true);        
        dispatch(searchExpenses(formatExpenseQueryParameters(searchValues)));
      },
    });

  const resetSearch = useCallback(() => {
    setValues(initialValues);
    setSearchActive(false);
    dispatch(resetExpensesSearchResults());
  }, [dispatch, setValues]);

  const refresh = () => {
    setCompact(true);

    dispatch(searchExpenses(formatExpenseQueryParameters(values)));
  };

  const loadMore = () => {
    if (searchResults.length < total) {
      dispatch(
        loadMoreExpensesSearchResults(
          formatExpenseQueryParameters({
            ...values,
            offset: offset + LIMIT,
          }),
        ),
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={t(translations.expenses.search)} />,
      headerRight: () => (
        <TouchableOpacity onPress={resetSearch} style={S.resetButton}>
          <Paragraph size="s" type="book">
            {t(translations.common.resetSearch)}
          </Paragraph>
        </TouchableOpacity>
      ),
    });
  }, [navigation, resetSearch]);

  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  useEffect(() => {
    dispatch(getVendors());
    dispatch(getExpenseTypes({ isActive: true }));
    dispatch(getPaymentMethods({ isActive: true }));
  }, [dispatch]);

  useEffect(() => {
    if (days.isSameOrAfter(values.fromDate, values.toDate)) {
      setFieldValue('toDate', values.fromDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.fromDate]);

  const handleChange =
    <F extends keyof SearchExpensesValues>(field: F) =>
      (value: SearchExpensesValues[F]) =>
        setFieldValue(field, value);

  const toggleCompact = () => setCompact(!isCompact);

  const navigateToExpenses = () => Navigator.navigate('Expenses');

  const navigateToDetails = (expense: ExpenseData) => () => 
    Navigator.navigate('ExpenseDetails', {
      id: expense.id,
      onEdit: navigateToExpenses,
      onDelete:handleSubmit
    });    
    
  return (
    <MainPageTemplate
      loading={paymentMethodsLoading || expenseTypesLoading || vendorsLoading}
    >
      <View style={S.searchBar}>
        <Field
          value={values.query || ''}
          onChange={handleChange('query')}
          label={t(translations.common.fields.keyword)}
          endAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          mb={16}
        />
        {!isCompact && (
          <Box mb={16}>
            <Box row jc="space-between">
              <Datepicker
                flex
                title={formatDate(values.fromDate, { utc: false })}
                label={t('common.fields.startDate')}
                required
                date={values.fromDate}
                onConfirm={handleChange('fromDate')}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
              <Datepicker
                flex
                title={formatDate(values.toDate, { utc: false })}
                label={t(translations.common.fields.endDate)}
                required
                date={values.toDate}
                minimumDate={values.fromDate}
                onConfirm={handleChange('toDate')}
                icon={require('assets/global/calendar.png')}
              />
            </Box>
            <DropMenu
              items={vendors.map((vendor) => ({
                label: vendor.name,
                inputLabel: t(translations.expenses.fields.vendor.label, {
                  vendor: vendor.name,
                }),
                value: vendor.id,
              }))}
              value={values.vendorId}
              onChange={handleChange('vendorId')}
              placeholder={t(translations.expenses.fields.vendor.placeholder)}
            />
            <DropMenu
              items={expenseTypes.map((type) => ({
                label: type.shortName,
                inputLabel: t(translations.expenses.fields.expenseType.label, {
                  type: type.shortName,
                }),
                value: type.id,
              }))}
              value={values.expenseTypeId}
              onChange={handleChange('expenseTypeId')}
              placeholder={t(
                translations.expenses.fields.expenseType.placeholder,
              )}
            />
            <DropMenu
              items={paymentMethods.map((method) => ({
                label: method.shortName,
                inputLabel: t(
                  translations.expenses.fields.paymentMethod.label,
                  {
                    method: method.shortName,
                  },
                ),
                value: method.id,
              }))}
              value={values.paymentMethodId}
              onChange={handleChange('paymentMethodId')}
              placeholder={t(
                translations.expenses.fields.paymentMethod.placeholder,
              )}
            />
          </Box>
        )}
        <Box row ai="center">
          <TouchableOpacity
            onPress={toggleCompact}
            style={theme.styles.tuneButton}
          >
            <Icon src={require('assets/global/tune.png')} size={22} />
          </TouchableOpacity>
          <Button
            text={t(translations.common.search)}
            onPress={handleSubmit}
            loading={loading}
            buttonStyle={S.searchButton}
          />
        </Box>
      </View>
      {
        searchActive && (
          <FlatList
            data={searchResults}
            keyExtractor={(expense) => `${expense.id}`}
            ListHeaderComponent={() => (
              <ReviewBlock totalSum={searchResults.length > 0 ? totalSum : 0} count={searchResults.length > 0 ? searchTotal : 0} />
            )}
            renderItem={({ item: expense }) => (
              <ExpensesItem data={expense} onPress={navigateToDetails} />
            )}
            contentContainerStyle={S.containerListStyle}
            ListEmptyComponent={() => (
              <EmptyState entities={t(translations.common.entities.expenses)} />
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refresh} />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            ListFooterComponent={() => (
              <ActivityIndicator
                size="large"
                color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
                style={S.loader}
              />
            )}
          />
        )
      }
    </MainPageTemplate>
  );
};

export { SearchExpenses };
