import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LIMIT } from 'api';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import {
  getConnectedClients,
  getNotConnectedClients,
  subClientsSelectors,
  getSubClientSales,
  getSubClientAppointmentsReview
} from 'store/entities/subClients';
import { ISubClient } from 'types/subClients';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';
import { userSelectors } from 'store/entities/user';
import { subscriptionSelectors } from 'store/entities/subscription';

import styles from './style';
import moment from 'moment';
import { ClientRewardIcon } from 'shared/icon/icons';
import { IconComponent } from 'shared/icon/icons';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const SubClientsFilter: React.FC<Props> = ({ navigation, route }) => {
  const [offset, setOffset] = useState(0);

  const connectedClients = useSelector(subClientsSelectors.connectedClients);
  const user = useSelector(userSelectors.user);
  const appointmentWithClients = useSelector(subClientsSelectors.appointmentsReview);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const filterConnectedClients = connectedClients?.filter((client: any) => client?.isDisconnect == false);

  const notConnectedClients = useSelector(
    subClientsSelectors.notConnectedClients,
  );
  const notConnectedClientsLoading = useSelector(
    subClientsSelectors.notConnectedClientsLoading,
  );
  const connectedClientsLoading = useSelector(
    subClientsSelectors.connectedClientsLoading,
  );
  const clientWithAppointmentsLoading = useSelector(
    subClientsSelectors.appointmentsReviewLoading
  );
  const clientsWithSalesLoading = useSelector(
    subClientsSelectors.subClientSalesLoading
  );

  const salesWithClients = useSelector(subClientsSelectors.sales);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      switch (route?.params?.filter) {
        case 'not_connected':
          setOffset(LIMIT);
          break;
        case 'connected':
          dispatch(getConnectedClients({ offset: 0, query: '', limit: LIMIT }));
          setOffset(LIMIT);
          break;
        case 'with_appointment':
          dispatch(getSubClientAppointmentsReview({ id: user?.userId, offset: 0, limit: LIMIT }));
          setOffset(LIMIT);
          break;
        case 'with_sales':
          dispatch(getSubClientSales({ id: user?.userId, offset: 0, limit: LIMIT }));
          setOffset(LIMIT);
          break;
        case 'with_unused_rewards':
          setOffset(LIMIT);
          break;
        case 'with_payment_requests':
          setOffset(LIMIT);
        case 'with_no_activity':
          setOffset(LIMIT);
          break;
        case 'top_20_clients':
          setOffset(LIMIT);
          break;
        default:
          break;
      }
    }
  }, [isFocused]);

  const fetchMoreClients = () => {
    switch (route?.params?.filter) {
      case 'not_connected':
        dispatch(getNotConnectedClients({ offset, query: '', limit: LIMIT }));
        setOffset(offset + LIMIT);
        break;
      case 'connected':
        dispatch(getConnectedClients({ offset, query: '', limit: LIMIT }));
        setOffset(offset + LIMIT);
        break;
      case 'with_appointment':
        dispatch(getSubClientAppointmentsReview({ id: user?.userId, offset: 0, limit: LIMIT }));
        setOffset(offset + LIMIT);
        break;
      case 'with_sales':
        dispatch(getSubClientSales({ id: 416, offset: 0, limit: LIMIT }));
        setOffset(offset + LIMIT);
        break;
      default:
        break;
    }
  };

  const currentArray = () => {
    switch (route?.params?.filter) {
      case 'not_connected':
        return notConnectedClients;
      case 'connected':
        return filterConnectedClients;
      case 'with_appointment':
        return appointmentWithClients;
      case 'with_sales':
        return salesWithClients;
      case 'with_unused_rewards':
        return route?.params?.data;
      case 'with_payment_requests':
        return route?.params?.data;
      case 'top_20_clients':
        return route?.params?.data;
      case 'with_no_activity':
        return route?.params?.data;
      default:
        return [];
    }
  };

  const currentHeader = () => {
    switch (route?.params?.filter) {
      case 'not_connected':
        return 'Clients not connected through app';
      case 'connected':
        return 'Clients connected through app';
      case 'with_appointment':
        return 'Clients with appointments this month';
      case 'with_sales':
        return 'Clients with sales this month';
      case 'with_unused_rewards':
        return 'Clients with unused rewards';
      case 'with_payment_requests':
        return 'Clients with pending payment request';
      case 'with_no_activity':
        return 'Clients inactive for last 3 months';
      case 'top_20_clients':
        return 'Top 20 Clients';
      default:
        return '';
    }
  };

  const renderListItem = (item: ISubClient | any) => {
    const lastAppointmentDate = item?.lastAppointmentWithProvider?.startDate || item?.lastAppointmentDate;
    const lastSaleDate = item?.lastSaleWithProvider?.date || item?.lastSaleDate;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('SubClientDetails', { clientId: route?.params?.filter == 'with_payment_requests' ? item?.clientSubprofile?.id : item.id })
        }
      >
        <View style={styles.listItemContainer}>
          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Image
                source={
                  item.photo
                    ? { uri: item.photo }
                    : require('assets/global/defaultAvatar.jpg')
                }
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>{route?.params?.filter == 'with_payment_requests' ? getFullName(item?.clientSubprofile) : getFullName(item)}</Text>
                <Text style={styles.userPhone}>{route?.params?.filter == 'with_payment_requests' ? item?.clientSubprofile?.phoneNumber : item?.phoneNumber}</Text>
              </View>
            </View>
            <Image
              source={require('assets/global/arrowRight.png')}
              style={styles.arrow}
            />
          </View>
          {(route?.params?.filter !== 'with_payment_requests') && <View style={styles.separator} />}
          {(route?.params?.filter !== 'with_payment_requests') && (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }} >
              <View>
                <Text style={styles.lastTitle}>
                  Last appointment date: {lastAppointmentDate && <Text style={styles.lastValueTitle}>{moment(lastAppointmentDate).format('LL')}</Text>}
                  <Text style={styles.lastValueTitle} />
                </Text>
                {!liteSubcription && <Text style={styles.lastTitle}>
                  Last sale date: {lastSaleDate && <Text style={styles.lastValueTitle}>{moment(lastSaleDate).format('LL')}</Text>}
                  <Text style={styles.lastValueTitle} />
                </Text>}
                {item?.paymentTotalSpend && (
                  <Text style={styles.lastTitle}>
                    Total payment spend: <Text style={styles.lastValueTitle}>{'$' + item?.paymentTotalSpend}</Text>
                    <Text style={styles.lastValueTitle} />
                  </Text>
                )}
              </View>
              {(item?.loyaltyReward && item?.loyaltyReward?.active) && (
                <IconComponent
                  Component={ClientRewardIcon}
                  size={20}
                />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainPageTemplate
      loading={connectedClientsLoading || notConnectedClientsLoading || clientWithAppointmentsLoading || clientsWithSalesLoading}
      bc={COLORS.whiteTwo}
    >
      <View style={styles.header}>
        <Text style={styles.titleHeader}>{currentHeader()}</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={currentArray()}
          renderItem={({ item }) => renderListItem(item)}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchMoreClients}
          onEndReachedThreshold={0.1}
        />
      </View>
    </MainPageTemplate>
  );
};

export default SubClientsFilter;
