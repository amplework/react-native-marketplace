import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import React, { useEffect, useLayoutEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { useDispatch, useSelector } from 'react-redux';
import { EmptyState } from 'shared/emptyState';
import { IconComponent, UsersPlaceholder, ClientRewardIcon } from 'shared/icon/icons';
import { MainPageTemplate } from 'shared/templates';
import { Heading } from 'shared/heading';
import { Navigator } from 'service/navigator';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { subscriptionSelectors } from 'store/entities/subscription';
import COLORS from 'utils/colors';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const Clients: React.FC<Props> = ({ navigation, route }) => {
  const subClients = useSelector(subClientsSelectors.subClients);
  const loading = useSelector(subClientsSelectors.loading);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');  
  const premiumSubscription = subscription?.subscriptionPlan?.includes('premium');  

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const headerButton = (route: string, image: any, style?: any) => {
    return (
      <TouchableOpacity onPress={() => Navigator.navigate(route)}>
        <Image style={[styles.imagePerfomance, style]} source={image} />
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <View style={styles.row}>
          {headerButton('SubClientsReview', require('assets/global/performance.png'))}
          {headerButton(
            'SubClientsSearch',
            require('assets/global/searcn.png'),
            styles.imageSearch,
          )}
        </View>
      ),
      headerLeft: () => (
        <Heading
          title="My Clients" back={route?.params?.showBackButton}
          onPress={() => Navigator.navigate('Home')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      //@ts-ignore
      dispatch(getSubClients({ query: '' }));
    }
  }, [dispatch, isFocused]);  

  const renderListItem = (item: any) => {
    const { id, photo, value, lastName, isConnected, phoneNumber, isDisconnect, isLoyaltyReward } = item || {};
    const { lastAppointmentDate, lastSaleDate } = item || {};
    
    return (
      <TouchableOpacity
        style={styles.paddingItem}
        onPress={() => {          
          navigation.navigate('SubClientDetails', { clientId: id, isClientConnected: isConnected})
        }}
      >
        <View style={[styles.listItemContainer, (!liteSubcription) ? styles.listItemContainerHeight : styles.listItemContainerHeightLite]}>
          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Image
                source={
                  photo
                    ? { uri: photo }
                    : require('assets/global/defaultAvatar.jpg')
                }
                style={styles.userAvatar}
              />
              <View>
                <View style={styles.row} >
                  <Text style={styles.userName} numberOfLines={1} >
                    {value + ' ' + (lastName || '')}
                  </Text>
                  {isConnected ? isDisconnect == false ? (
                    <Image
                      source={require('assets/onBoarding/alpha.png')}
                      style={styles.imageConnected}
                    />
                  ) : null : null}
                </View>
                <Text style={styles.userPhone}>{phoneNumber}</Text>
              </View>
            </View>
            <Image
              source={require('assets/global/arrowRight.png')}
              style={styles.arrow}
            />
          </View>
          <View style={styles.separator} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View>
              <Text style={styles.lastTitle}>
                Last appointment date:
                <Text style={styles.lastValueTitle}>
                  {lastAppointmentDate
                    ? ' ' + moment(lastAppointmentDate).format('LL')
                    : ''}
                </Text>
              </Text>
              {!liteSubcription && <Text style={styles.lastTitle}>
                Last sale date:
                <Text style={styles.lastValueTitle}>
                  {lastSaleDate ? ' ' + moment(lastSaleDate, 'YYYY-MM-DD').format('LL') : ''}
                </Text>
              </Text>}
            </View>
            {premiumSubscription && isLoyaltyReward && (
              <IconComponent
                size={20}
                Component={ClientRewardIcon}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };  

  return (
    <MainPageTemplate loading={loading}>
      <View style={styles.paddingHeader}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.push('AddClient')}
        >
          <Image
            source={require('assets/global/add.png')}
            style={styles.addImage}
          />
          <Text style={styles.addTitle}>Add Client</Text>
        </TouchableOpacity>
      </View>
      {subClients?.length ? (
        <View style={styles.paddingExtra}>
          <AlphabetList
            // dataKey={JSON.stringify(filteredContacts)}
            style={styles.itemsContainer}
            key={JSON.stringify(subClients)}
            data={subClients.map((client: any) => ({
              ...client,
              key: client.id,
              value: client.firstName,
            }))}
            // renderItem={renderListItem}
            renderCustomItem={renderListItem}
            // @ts-ignore
            renderSectionHeader={() => null}
            getItemHeight={() => (!liteSubcription) ? (16 + 122) : (16 + 106)}
            sectionHeaderHeight={0}
            showsVerticalScrollIndicator={false}
            // @ts-ignore
            renderCustomSectionHeader={() => {
              return null
            }}
            indexLetterContainerStyle={styles.styleLetter}
            indexLetterStyle={{ fontSize: 12, color: COLORS.eerieBlack }}
          />
        </View>
      ) : (
        <EmptyState
          type="image"
          image={<UsersPlaceholder />}
          header="Client details"
          description="Manage your client details, import their contact information, then invite your clients to use the mobile app and schedule their own appointments."
          ph={35}
        />
      )}
    </MainPageTemplate>
  );
};

export default Clients;
