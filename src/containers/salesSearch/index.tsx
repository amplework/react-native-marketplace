import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchSales from 'components/sales/search';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { getSales, salesSelectors } from 'store/entities/sales';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { subscriptionSelectors } from 'store/entities/subscription';
import { formatApiDate } from 'utils/dates';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const SalesSearch: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollRef = useRef<FlatList<any>>();
  const [onEnd, setOnEnd] = useState(true);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const methods = useSelector(paymentMethodsSelectors.methods);
  const methodsLoading = useSelector(paymentMethodsSelectors.loading);
  const sales = useSelector(salesSelectors.sales);
  const loading = useSelector(salesSelectors.loading);
  const meta = useSelector(salesSelectors.meta);
  const totalSum = useSelector(salesSelectors.totalSum);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [query, setQuery] = useState('');
  const [methodId, setMethodId] = useState(null);
  const [clients, setClients] = useState(subClients);
  const [showSubClients, setShowSubClients] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(undefined);
  const [isCompact, setCompact] = useState(false);

  const paymentMethods = methods.filter((e: any) => (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName))));  

  const toggleCompact = () => setCompact(!isCompact);

  const resetSearch = () => {
    setSearchActive(false);
    setMethodId(null);
    setSelectedClient(undefined);
    setQuery('');
    setStartDate(new Date());
    setEndDate(new Date());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton onPress={() => {
        resetSearch();
        navigation.goBack();
      }} title={'Search Sales'} />,
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

  const getSalesAPI = () => {
    dispatch(
      getSales({
        limit: 10,
        clientSubprofileId: selectedClient?.id || null,
        paymentMethodId: methodId || null,
        fromDate: startDate ? formatApiDate(startDate) : null,
        toDate: endDate ? formatApiDate(endDate) : null,
        query: query || null,
        offset: 0,
      }),
    );
  };

  const search = () => {
    if (!startDate && !endDate && !query && !methodId && !selectedClient) {
      toast.info('You must to select at least 1 search parameter');
      return;
    }
    getSalesAPI();
    setSearchActive(true);
    setCompact(true);
  };

  useEffect(() => {
    sales?.length &&
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    searchActive && getSalesAPI();
  }, [isFocused]);

  const fetchMoreSales = () => {
    dispatch(
      getSales({
        limit: 10,
        clientSubprofileId: selectedClient?.id || null,
        paymentMethodId: methodId || null,
        fromDate: startDate ? formatApiDate(startDate) : null,
        toDate: endDate ? formatApiDate(endDate) : null,
        query: query || null,
        offset: meta?.offset + 10,
      }),
    );
  };

  return (
    <MainPageTemplate loading={loading || methodsLoading || subClientsLoading}>
      <SearchSales
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
        methods={paymentMethods}
        onSearch={search}
        onSelectedClient={(client: any) => setSelectedClient(client)}
        methodId={methodId}
        meta={meta}
        totalSum={totalSum}
        scrollRef={scrollRef}
        sales={sales}
        clients={clients}
        setEnd={(value: boolean) => setOnEnd(value)}
        end={onEnd}
        onMore={fetchMoreSales}
        isCompact={isCompact}
        toggleCompact={toggleCompact}
      />
    </MainPageTemplate>
  );
};

export default SalesSearch;
