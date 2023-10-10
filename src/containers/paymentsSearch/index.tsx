import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchPayments from 'components/payments/search';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { getSearchPayments, paymentsSelectors } from 'store/entities/payments';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import COLORS from 'utils/colors';
import { formatApiDate, parseDate } from 'utils/dates';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const PaymentsSearch: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollRef = useRef<FlatList<any>>();
  const [onEnd, setOnEnd] = useState(true);
  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const methods = useSelector(paymentMethodsSelectors.methods);
  const methodsLoading = useSelector(paymentMethodsSelectors.loading);
  const searchPayment = useSelector(paymentsSelectors.searchPayment);
  const loading = useSelector(paymentsSelectors.loading);
  const meta = useSelector(paymentsSelectors.meta);
  const totalSum = useSelector(paymentsSelectors.totalSum);
  const [startDate, setStartDate] = useState<any>(parseDate);
  const [endDate, setEndDate] = useState<any>(parseDate);
  const [query, setQuery] = useState('');
  const [methodId, setMethodId] = useState(null);
  const [clients, setClients] = useState(subClients);
  const [showSubClients, setShowSubClients] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(undefined);
  const [isCompact, setCompact] = useState(false);  

  const resetSearch = () => {
    setSearchActive(false);
    setMethodId(null);
    setSelectedClient(undefined);
    setQuery('');
    setStartDate(parseDate());
    setEndDate(parseDate());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={'Search Payments'} />,
      headerRight: () => (
        <TouchableOpacity onPress={resetSearch}>
          <Text style={styles.resetHeader}>Reset Search</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getSubClients({ query: '' }));
    dispatch(getPaymentMethods());
  }, [dispatch]);

  useEffect(() => {
    const modifyArray = subClients
      ?.filter((client: any) => client?.isActive)
      ?.map((contact: any) => ({
        ...contact,
        value: contact?.firstName || 'No Name',
      }));
    setClients(modifyArray);
  }, [subClients]);

  const toggleCompact = () => setCompact(!isCompact);

  const getPaymentsAPI = () => {
    dispatch(
      getSearchPayments({
        limit: 10,
        clientSubprofileId: selectedClient?.id || null,
        paymentMethodId: methodId || null,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
        query: query || null,
        offset: 0,
      }),
    );
  };

  const search = () => {
    getPaymentsAPI();
    setCompact(true);
    setSearchActive(true);
  };

  useEffect(() => {
    searchPayment?.length &&
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    searchActive && getPaymentsAPI();
  }, [isFocused]);

  const fetchMorePayments = () => {
    dispatch(
      getSearchPayments({
        limit: 10,
        clientSubprofileId: selectedClient?.id || null,
        paymentMethodId: methodId || null,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
        query: query || null,
        offset: meta?.offset + 10,
      }),
    );
  };

  return (
    <MainPageTemplate
      loading={loading || subClientsLoading || methodsLoading}
      bc={COLORS.white}
    >
      <SearchPayments
        searchActive={searchActive}
        showSubClients={showSubClients}
        setQuery={(text: string) => setQuery(text)}
        query={query}
        startDate={startDate}
        endDate={endDate}
        setStartDate={(date: any) => {
          setStartDate(date);
          endDate.getTime() < date.getTime() && setEndDate(date);
        }}
        setEndDate={(date: any) => setEndDate(date)}
        setShowSubClients={(value: boolean) => setShowSubClients(value)}
        setMethodId={(id: any) => setMethodId(id)}
        selectedClient={selectedClient}
        methods={methods}
        onSearch={search}
        onSelectedClient={(client: any) => setSelectedClient(client)}
        methodId={methodId}
        meta={meta}
        totalSum={totalSum}
        scrollRef={scrollRef}
        payments={searchPayment}
        clients={clients}
        setEnd={(value: boolean) => setOnEnd(value)}
        end={onEnd}
        onMore={fetchMorePayments}
        isCompact={isCompact}
        toggleCompact={toggleCompact}
      />
    </MainPageTemplate>
  );
};

export default PaymentsSearch;
