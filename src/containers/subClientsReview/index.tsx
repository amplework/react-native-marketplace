import { StackNavigationProp } from '@react-navigation/stack';
import { LIMIT } from 'api';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import {
  getConnectedClients,
  getNotConnectedClients,
  getSubClientsReview,
  getSubClientsWithActiveRewards,
  getSubClientsWithPendingPaymentRequests,
  subClientsSelectors,
} from 'store/entities/subClients';
import { subscriptionSelectors } from 'store/entities/subscription';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const SubClientsReview: React.FC<Props> = ({ navigation }) => {
  const review: any = useSelector(subClientsSelectors.review);
  const clientWithUnusedRewardCount: any = useSelector(subClientsSelectors.clientWithActiveRewardsCount);
  const clientWithUnusedRewards: any = useSelector(subClientsSelectors.clientWithActiveRewards);
  const clientWithPendingPaymentRequests: any = useSelector(subClientsSelectors.clientWithPendingPaymentRequests);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const premiumSubcription = subscription?.subscriptionPlan?.includes('premium');
  const connectedClients = useSelector(subClientsSelectors.connectedClients);
  const notConnectedClients = useSelector(subClientsSelectors.notConnectedClients);
  const provider = useSelector((state: any) => state.provider.provider);
  const filterConnectedClients = connectedClients?.filter((client: any) => client?.isDisconnect == false);

  const loading = useSelector(subClientsSelectors.reviewLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubClientsReview());
    dispatch(getSubClientsWithActiveRewards(provider?.id));
    dispatch(getSubClientsWithPendingPaymentRequests(provider?.id));
    dispatch(getConnectedClients({ offset: 0, query: '', limit: LIMIT }));
    dispatch(getNotConnectedClients({ offset: 0, query: '', limit: LIMIT }));
  }, []);

  const renderListItem = (
    title: string,
    value: number,
    separator: boolean,
    onPress: () => void,
  ) => (
    <View>
      <TouchableOpacity style={styles.rowSpace} onPress={onPress}>
        <Text style={styles.titleItem}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.valueItem}>{value}</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.arrow}
          />
        </View>
      </TouchableOpacity>
      {separator && <Separator mv={14} />}
    </View>
  );
  const { totalCount, newCount } =
    review?.clients;

  return (
    <MainPageTemplate loading={loading}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Image
            source={require('assets/backgrounds/reviewBackground.png')}
            style={styles.headerImage}
          />
          <Text style={styles.title}>Clients Details Review</Text>
        </View>
        <View style={[styles.headerContainer, styles.shadow]}>
          <Box flex>
            <Text style={styles.titleOfHeader}>Total Clients</Text>
            <Text style={styles.valueOfHeader}>{totalCount || 0}</Text>
          </Box>
          <Separator vertical mh={26} />
          <Box flex>
            <Text style={styles.titleOfHeader}>New Clients</Text>
            <Text style={styles.valueOfHeader}>
              {newCount || 0}
              <Text style={styles.subValue}> this month</Text>
            </Text>
          </Box>
        </View>
        <View style={[styles.contentContainer, styles.shadow]}>
          {renderListItem(
            'Clients with appointments this month',
            review?.clients.clientWithAppointmentCount,
            true,
            () => navigation.push('SubClientsFilter', { filter: 'with_appointment' }),
          )}
          {!liteSubcription && renderListItem(
            'Clients with sales this month',
            review?.clients.clientWithSaleCount,
            true,
            () => navigation.push('SubClientsFilter', { filter: 'with_sales' }),
          )}
          {premiumSubcription && renderListItem(
            'Clients with unused rewards',
            clientWithUnusedRewardCount || 0,
            true,
            () => navigation.push('SubClientsFilter', { filter: 'with_unused_rewards', data: clientWithUnusedRewards }),
          )}
          {premiumSubcription && renderListItem(
            'Clients with pending payment requests',
            clientWithPendingPaymentRequests?.length || 0,
            true,
            () => navigation.push('SubClientsFilter', { filter: 'with_payment_requests', data: clientWithPendingPaymentRequests }),
          )}
          {renderListItem(
            'Clients not using app',
            notConnectedClients?.length || 0,
            true,
            () =>
              navigation.push('SubClientsFilter', { filter: 'not_connected' }),
          )}
          {renderListItem(
            'Clients connected through app',
            filterConnectedClients?.length || 0,
            true,
            () => navigation.push('SubClientsFilter', { filter: 'connected' }),
          )}
          {renderListItem(
            'Clients with no activity for last 3 months',
            review?.clients?.inactiveClients ? review?.clients?.inactiveClients.length : 0,
            false,
            () => navigation.push('SubClientsFilter', { filter: 'with_no_activity', data: review?.clients?.inactiveClients }),
          )}
        </View>
        {!liteSubcription && (
          <View style={[styles.contentContainer, styles.shadow]}>
            {renderListItem(
              'Top 20 Clients',
              review?.clients?.topClients?.length,
              false,
              () => navigation.push('SubClientsFilter', { filter: 'top_20_clients', data: review?.clients?.topClients }),
            )}
          </View>
        )}
        <View style={styles.logoPosition}>
          <Image
            source={require('assets/global/logoInactive.png')}
            style={styles.logo}
          />
          <Text style={styles.titleLogo}>Work Smarter</Text>
        </View>
      </ScrollView>
    </MainPageTemplate>
  );
};

export default SubClientsReview;
