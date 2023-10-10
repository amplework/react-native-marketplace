import { StackScreenProps } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { ESTIMATES_STATUSES } from 'components/invoices/helpers/constants';
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
  loadMoreEstimatesSearchResults,
  resetEstimatesSearchResults,
  searchEstimates,
} from 'store/entities/estimates';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { subscriptionSelectors } from 'store/entities/subscription';
import { theme } from 'theme';
import { Estimate, SearchEstimatesValues } from 'types/estimates';
import COLORS from 'utils/colors';
import { days, formatDate, parseDate } from 'utils/dates';
import { numberFormatter } from 'utils/numbers';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

import { EstimateItem } from '../../components/estimateItem';
import { SubClientsDropdown } from './components/subClientsDropdown';
import { styles } from './style';
import { estimatesSelectors } from 'store/entities/estimates';
import { getSearchQueryParams } from 'components/invoiceEstimates/helpers/utils';
import moment from 'moment';
import { toast } from 'shared/toast';

const initialValues: SearchEstimatesValues = {
  query: '',
  fromDate: parseDate(),
  toDate: parseDate(),
  paymentMethodId: null,
  status: null,
  subClient: null,
};

type Props = StackScreenProps<RootStackParamList>;

const SearchEstimates: React.FC<Props> = ({ navigation }) => {
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const estimates = useSelector(estimatesSelectors.searchResults);
  const totalSum = useSelector(estimatesSelectors.searchTotalSum);
  const loading = useSelector(estimatesSelectors.searchLoading);
  const loadingMore = useSelector(estimatesSelectors.searchLoadingMore);
  const offset = useSelector(estimatesSelectors.searchOffset);
  const total = useSelector(estimatesSelectors.searchTotal);
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
      const startDate = moment(values.fromDate).format('YYYY-MM-DD');
      const endDate = moment(values.toDate).format('YYYY-MM-DD')
      if (moment(endDate).isBefore(startDate)) {
        toast.info('End Date should be same or later than the Start date');
        return;
      }
      setCompact(true);
      dispatch(searchEstimates(getSearchQueryParams(searchValues)));
    },
  });

  const resetSearch = useCallback(() => {
    setValues(initialValues);

    dispatch(resetEstimatesSearchResults());
  }, [setValues, dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('estimates.searchEstimates')} />
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
    if (estimates.length < total) {
      dispatch(
        loadMoreEstimatesSearchResults({
          offset: offset + LIMIT,
          ...getSearchQueryParams(values),
        }),
      );
    }
  };

  const handleFieldChange =
    <T extends SearchEstimatesValues, F extends keyof SearchEstimatesValues>(
      field: F,
    ) =>
      (value: T[F]) =>
        setFieldValue(field, value);

  const openSubClientsModal = () => setSubClientsModalOpened(true);

  const toggleCompact = () => setCompact(!isCompact);

  const navigateToDetails =
    ({ id }: Estimate) =>
      () =>
        Navigator.navigate('EstimateDetails', {
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
                inputLabel: I18n.t('estimates.fields.paymentMethod.label', {
                  method: method.shortName,
                }),
                value: method.id,
              }))}
              value={values.paymentMethodId}
              onChange={handleFieldChange('paymentMethodId')}
              placeholder={I18n.t(
                'estimates.fields.paymentMethod.searchPlaceholder',
              )}
            />
            <DropMenu
              items={ESTIMATES_STATUSES.map((status) => ({
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
      {estimates.length > 0 && (
        <TwinCounter mh={24} mv={24}>
          <TwinCounterBar
            label={I18n.t('estimates.totalEstimateValue')}
            adornment={<Sign>$</Sign>}
          >
            {numberFormatter(totalSum)}
          </TwinCounterBar>
          <TwinCounterBar label={I18n.t('estimates.totalEstimates')}>
            {total}
          </TwinCounterBar>
        </TwinCounter>
      )}
      <FlatList
        data={estimates}
        keyExtractor={(estimate) => `${estimate.id}`}
        renderItem={({ item: estimate }) => (
          <EstimateItem
            estimate={estimate}
            onPress={navigateToDetails(estimate)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={() => (
          <EmptyState entities={I18n.t('common.entities.estimates')} />
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

export { SearchEstimates };
