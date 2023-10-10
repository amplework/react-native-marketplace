import { StackScreenProps } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { CashJournalsItem } from 'components/cashJournals/components/cashJournalsItem';
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { Datepicker } from 'shared/datepicker';
import { EmptyState } from 'shared/emptyState';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import {
  cashJournalsSelectors,
  loadMoreCashJournalsSearchResults,
  resetCashJournalsSearchResults,
  searchCashJournals,
} from 'store/entities/cashJournals';
import { theme } from 'theme';
import { CashJournal, SearchCashJournalsValues } from 'types/cashJournals';
import COLORS from 'utils/colors';
import { days, formatDate, parseDate } from 'utils/dates';
import { formatNumber } from 'utils/numbers';

import { searchCashJournalsStyles as S } from './style';

const initialValues: SearchCashJournalsValues = {
  query: '',
  fromDate: parseDate(),
  toDate: parseDate(),
};

type Props = StackScreenProps<RootStackParamList>;

const SearchCashJournals: React.FC<Props> = ({ navigation }) => {
  const cashJournals = useSelector(cashJournalsSelectors.searchResults);
  const totalSum = useSelector(cashJournalsSelectors.searchTotalSum);

  const loading = useSelector(cashJournalsSelectors.searchLoading);
  const loadingMore = useSelector(cashJournalsSelectors.searchLoadingMore);

  const offset = useSelector(cashJournalsSelectors.searchOffset);
  const total = useSelector(cashJournalsSelectors.searchTotal);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { values, setValues, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: (searchValues) => {
      dispatch(
        searchCashJournals({
          offset: 0,
          query: searchValues.query,
          fromDate: searchValues.fromDate.toISOString(),
          toDate: searchValues.toDate.toISOString(),
        }),
      );
    },
  });

  const resetSearch = useCallback(() => {
    setValues(initialValues);

    dispatch(resetCashJournalsSearchResults());
  }, [setValues, dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.cashJournals.search.back)} />
      ),
      headerRight: () => (
        <Pressable onPress={resetSearch} mr={12} ph={12} pv={12}>
          <Paragraph size="s" type="book">
            {t(translations.common.resetSearch)}
          </Paragraph>
        </Pressable>
      ),
    });
  }, [navigation, resetSearch, t]);

  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  useEffect(() => {
    if (days.isSameOrAfter(values.fromDate, values.toDate)) {
      setFieldValue('toDate', values.fromDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.fromDate]);

  const handleChange =
    <F extends keyof SearchCashJournalsValues>(field: F) =>
    (value: SearchCashJournalsValues[F]) =>
      setFieldValue(field, value);

  const loadMore = () => {
    if (cashJournals.length < total) {
      dispatch(
        loadMoreCashJournalsSearchResults({
          offset: offset + LIMIT,
          query: values.query,
          fromDate: values.fromDate.toISOString(),
          toDate: values.toDate.toISOString(),
        }),
      );
    }
  };

  const navigateToDetails = (journal: CashJournal) => () =>
    Navigator.navigate('CashJournalDetails', {
      journal,
      onEdit: handleSubmit,
      onDelete: handleSubmit,
    });

  return (
    <SafeContainer
      safeStyle={theme.styles.safeView}
      containerStyle={theme.styles.flex}
    >
      <View style={S.searchBar}>
        <Field
          value={values.query}
          onChange={handleChange('query')}
          label={t(translations.common.fields.keyword)}
          endAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          mb={16}
        />
        <Box row jc="space-between" mb={16}>
          <Datepicker
            flex
            title={formatDate(values.fromDate, { utc: false })}
            label={t(translations.common.fields.startDate)}
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
        <Button
          text={t(translations.common.search)}
          onPress={handleSubmit}
          loading={loading}
          buttonStyle={theme.spacing.p(12)}
        />
      </View>
      {cashJournals.length > 0 && (
        <TwinCounter mh={24} mv={24}>
          <TwinCounterBar
            label={t(translations.cashJournals.search.totalCash)}
            adornment={<Sign>$</Sign>}
          >
            {formatNumber(totalSum, 2)}
          </TwinCounterBar>
          <TwinCounterBar label={t(translations.cashJournals.search.total)}>
            {total}
          </TwinCounterBar>
        </TwinCounter>
      )}
      <FlatList
        data={cashJournals}
        keyExtractor={(journal) => `${journal.id}`}
        renderItem={({ item: journal }) => (
          <CashJournalsItem
            journal={journal}
            onPress={navigateToDetails(journal)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        contentContainerStyle={theme.styles.grow}
        ListEmptyComponent={() => (
          <EmptyState
            entities={t(translations.common.entities.cashJournals)}
            ph={24}
          />
        )}
        ListFooterComponent={() => (
          <ActivityIndicator
            size="large"
            color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
            style={theme.styles.listLoader}
          />
        )}
      />
    </SafeContainer>
  );
};

export { SearchCashJournals };
