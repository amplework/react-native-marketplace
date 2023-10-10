import { StackScreenProps } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { INVOICES_STATUSES } from 'components/invoices/helpers/constants';
import { getSearchQueryParams } from 'components/invoices/helpers/utils';
//@ts-ignore
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { EmptyState } from 'shared/emptyState';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import SubClientsModal from 'shared/subClientsModal';
import {
  invoicesSelectors,
  loadMoreInvoicesSearchResults,
  resetInvoicesSearchResults,
  searchInvoices,
} from 'store/entities/invoices';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { subscriptionSelectors } from 'store/entities/subscription';
import { theme } from 'theme';
import { Invoice, SearchInvoicesValues } from 'types/invoices';
import COLORS from 'utils/colors';
import { days, formatDate, parseDate } from 'utils/dates';
import { formatNumber, numberFormatter } from 'utils/numbers';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

import { InvoicesItem } from '../../components/invoicesItem';
import { SubClientsDropdown } from './components/subClientsDropdown';
import { styles } from './style';

const initialValues: SearchInvoicesValues = {
  query: '',
  fromDate: parseDate(),
  toDate: parseDate(),
  paymentMethodId: null,
  status: null,
  subClient: null,
};

type Props = StackScreenProps<RootStackParamList>;

const SearchInvoices: React.FC<Props> = ({ navigation }) => {
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const invoices = useSelector(invoicesSelectors.searchResults);
  const totalSum = useSelector(invoicesSelectors.searchTotalSum);
  const loading = useSelector(invoicesSelectors.searchLoading);
  const loadingMore = useSelector(invoicesSelectors.searchLoadingMore);
  const offset = useSelector(invoicesSelectors.searchOffset);
  const total = useSelector(invoicesSelectors.searchTotal);
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;

  const subClients = useSelector(subClientsSelectors.subClients);
  const methods = useSelector(paymentMethodsSelectors.methods);
  const activeMethods = methods.filter((method) =>
    method?.isActive &&
      (isPremiumProvider) ? true : (!(isOnlinePaymentOption(method?.shortName))));

  const dispatch = useDispatch();

  const [isSubClientsModalOpened, setSubClientsModalOpened] = useState(false);
  const [isCompact, setCompact] = useState(false);

  const { values, setValues, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validateOnChange: false,
    onSubmit: (searchValues: any) => {
      setCompact(true);

      dispatch(searchInvoices(getSearchQueryParams(searchValues)));
    },
  });

  const resetSearch = useCallback(() => {
    setValues(initialValues);

    dispatch(resetInvoicesSearchResults());
  }, [setValues, dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('invoices.searchInvoices')} />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={resetSearch} style={styles.resetButton}>
          <Paragraph size="s" type="book">
            {I18n.t('common.resetSearch')}
          </Paragraph>
        </TouchableOpacity>
      ),
    });
  }, [navigation, resetSearch]);

  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  useEffect(() => {
    dispatch(getPaymentMethods());
    dispatch(getSubClients());
  }, [dispatch]);

  useEffect(() => {
    if (days.isSameOrAfter(values.fromDate, values.toDate)) {
      setFieldValue('toDate', values.fromDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.fromDate]);

  const loadMore = () => {
    if (invoices.length < total) {
      dispatch(
        loadMoreInvoicesSearchResults({
          offset: offset + LIMIT,
          ...getSearchQueryParams(values),
        }),
      );
    }
  };

  const handleFieldChange =
    <T extends SearchInvoicesValues, F extends keyof SearchInvoicesValues>(
      field: F,
    ) =>
      (value: T[F]) =>
        setFieldValue(field, value);

  const openSubClientsModal = () => setSubClientsModalOpened(true);

  const toggleCompact = () => setCompact(!isCompact);

  const navigateToDetails =
    ({ id }: Invoice) =>
      () =>
        Navigator.navigate('InvoiceDetails', {
          id,
          onEdit: handleSubmit,
          onDelete: handleSubmit,
          onPay: handleSubmit,
        });

  const activeSubClients = subClients.filter((client) => client.isActive);
  const mappedSubClients = activeSubClients.map((client) => ({
    ...client,
    value: client.firstName,
  }));

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <SubClientsModal
        subClients={mappedSubClients}
        onModalShow={setSubClientsModalOpened}
        showModal={isSubClientsModalOpened}
        onChangeSelectedClient={handleFieldChange('subClient')}
      />
      <View style={styles.searchBar}>
        <Field
          value={values.query}
          onChange={handleFieldChange('query')}
          label={I18n.t('common.fields.keyword')}
          endAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          mb={16}
        />
        {!isCompact && (
          <Box mb={16}>
            <Box row jc="space-between" mb={16}>
              <Datepicker
                flex
                editable
                title={formatDate(values.fromDate, { utc: false })}
                label={I18n.t('common.fields.startDate')}
                required
                date={values.fromDate}
                timeZoneOffset={providerOffset}
                onConfirm={handleFieldChange('fromDate')}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
              <Datepicker
                flex
                editable
                title={formatDate(values.toDate, { utc: false })}
                label={I18n.t('common.fields.endDate')}
                required
                timeZoneOffset={providerOffset}
                date={values.toDate}
                minimumDate={values.fromDate}
                onConfirm={handleFieldChange('toDate')}
                icon={require('assets/global/calendar.png')}
              />
            </Box>
            <SubClientsDropdown
              subClient={values.subClient}
              onPress={openSubClientsModal}
            />
            <DropMenu
              items={activeMethods.map((method) => ({
                label: method.shortName,
                inputLabel: I18n.t('invoices.fields.paymentMethod.label', {
                  method: method.shortName,
                }),
                value: method.id,
              }))}
              value={values.paymentMethodId}
              onChange={handleFieldChange('paymentMethodId')}
              placeholder={I18n.t(
                'invoices.fields.paymentMethod.searchPlaceholder',
              )}
            />
            <DropMenu
              items={INVOICES_STATUSES.map((status) => ({
                label: status.name,
                inputLabel: status.name,
                value: status.value,
              }))}
              value={values.status}
              onChange={handleFieldChange('status')}
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
            text={I18n.t('common.search')}
            onPress={handleSubmit}
            loading={loading}
            buttonStyle={styles.searchButton}
          />
        </Box>
      </View>
      {invoices.length > 0 && (
        <TwinCounter mh={24} mv={24}>
          <TwinCounterBar
            label={I18n.t('invoices.totalInvoiceValue')}
            adornment={<Sign>$</Sign>}
          >
            {numberFormatter(totalSum)}
          </TwinCounterBar>
          <TwinCounterBar label={I18n.t('invoices.totalInvoices')}>
            {total}
          </TwinCounterBar>
        </TwinCounter>
      )}
      <FlatList
        data={invoices}
        keyExtractor={(invoice) => `${invoice.id}`}
        renderItem={({ item: invoice }) => (
          <InvoicesItem
            invoice={invoice}
            onPress={navigateToDetails(invoice)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={() => (
          <EmptyState entities={I18n.t('common.entities.invoices')} />
        )}
        ListFooterComponent={() => (
          <ActivityIndicator
            size="large"
            color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
            style={styles.loader}
          />
        )}
      />
    </SafeContainer>
  );
};

export { SearchInvoices };
