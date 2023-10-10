import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import SearchAppointments from 'components/providerCalendar/search';
import { RootStackParamList } from 'index';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  appointmentsSelector,
  getAppointments,
} from 'store/entities/appointments';
import { getProducts, productsSelectors } from 'store/entities/products';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { parseDate } from 'utils/dates';

import styles from './style';

type Props = StackScreenProps<RootStackParamList>;

export const CalendarSearch: React.FC<Props> = ({ navigation }) => {
  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const products = useSelector(productsSelectors.products);
  const productsLoading = useSelector(productsSelectors.loading);
  const appointments = useSelector(appointmentsSelector.appointments);
  const meta = useSelector(appointmentsSelector.meta);
  const loading = useSelector(appointmentsSelector.loading);

  const [onEnd, setOnEnd] = useState(true);
  const [startDate, setStartDate] = useState<any>(parseDate);
  const [endDate, setEndDate] = useState<any>(parseDate);
  const [query, setQuery] = useState('');
  const [service, setService] = useState(null);
  const [productId, setProductId] = useState(undefined);
  const [clients, setClients] = useState(subClients);
  const [showSubClients, setShowSubClients] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(undefined);

  const [isCompact, setCompact] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const resetSearch = () => {
    setSearchActive(false);
    setProductId(undefined);
    setService(null);
    setSelectedClient(undefined);
    setQuery('');
    setStartDate(parseDate());
    setEndDate(parseDate());
  };

  const onBack = () => {
    resetSearch();
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={'Search Calendar'} onPress={onBack} />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={resetSearch}>
          <Text style={styles.resetHeader}>Reset Search</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getSubClients({ query: '' }));
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    const modifyArray = subClients?.map((contact: any) => ({
      ...contact,
      value: contact?.firstName || 'No Name',
    }));
    setClients(modifyArray);
  }, [subClients]);

  const toggleCompact = () => setCompact(!isCompact);

  const getAppoints = () => {
    dispatch(
      getAppointments({
        limit: 10,
        order: 'ASC',
        clientId: selectedClient?.id,
        productId: productId,
        fromDate: startDate
          ? moment.utc(startDate).startOf('day').toISOString()
          : null,
        toDate: endDate ? moment.utc(endDate).endOf('day').toISOString() : null,
        query: query,
        offset: 0,
      }),
    );
  };

  const search = () => {
    if (!startDate && !endDate && !query && !productId && !selectedClient) {
      toast.info('You must to select at least 1 search parameter');
      return;
    }
    getAppoints();
    setCompact(true);
    setSearchActive(true);
  };

  useEffect(() => {
    searchActive && getAppoints();
  }, [isFocused]);

  const fetchMoreAppointments = () => {
    dispatch(
      getAppointments({
        limit: 10,
        order: 'ASC',
        clientId: selectedClient?.id,
        productId: productId,
        fromDate: startDate
          ? moment.utc(startDate).startOf('day').toISOString()
          : null,
        toDate: endDate ? moment.utc(endDate).endOf('day').toISOString() : null,
        query: query,
        offset: meta?.offset + 10,
      }),
    );
  };

  return (
    <MainPageTemplate loading={loading || productsLoading || subClientsLoading}>
      <SearchAppointments
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
        setProductId={(id: any) => setProductId(id)}
        setService={(id: any) => setService(id)}
        selectedClient={selectedClient}
        products={products}
        service={service}
        onSearch={search}
        onSelectedClient={(client: any) => setSelectedClient(client)}
        meta={meta}
        appointments={appointments}
        clients={clients}
        setEnd={(value: boolean) => setOnEnd(value)}
        end={onEnd}
        onMore={fetchMoreAppointments}
        isCompact={isCompact}
        toggleCompact={toggleCompact}
      />
    </MainPageTemplate>
  );
};
