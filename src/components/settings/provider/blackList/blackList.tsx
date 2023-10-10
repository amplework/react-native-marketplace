import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import I18n from 'locales';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Loader, Spin } from 'shared/loader';
import { toast } from 'shared/toast';
import { getBlockedSubClients, subClientsSelectors, unblockUser } from 'store/entities/subClients';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';

import { styles } from './styles';

const BlackList: React.FC<any> = ({ navigation }) => {

  const loading = useSelector(subClientsSelectors.loading);
  const blockedClients = useSelector(subClientsSelectors.blockedSubClients);

  const isFocused = useIsFocused();
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.blackList')} />
      ),
    });
  }, [navigation]);

  const handleSearch = useCallback(() => {
    if (isFocused) {
      dispatch(
        getBlockedSubClients({
          query,
        }),
      );
    }
  }, [dispatch, query]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
    
    // useFocusEffect(
  //   useCallback(() => {          
  //     dispatch(getBlockedSubClients({query: ''}));
  //   }, [dispatch])
  // );

  const unblockClient = (item: any) => {                
    dispatch(unblockUser({
      providerId: item?.providerId,
      clientId: item?.clientId,
    }));
  }

  const navigateToClientDetails = (item: any) => {    
    if(isEmpty(item?.client?.clientSubprofile)) {
      return;
    } else {      
      navigation.push('SubClientDetails', { clientId: item?.client?.clientSubprofile?.id });
    }     
  }

  const renderListItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToClientDetails(item)}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Image
                source={
                  item?.client?.photoFile?.url
                    ? { uri: item?.client?.photoFile?.url }
                    : require('assets/global/defaultAvatar.jpg')
                }
                style={styles.userAvatar}
              />
              <View>
                <Text style={styles.userName}>{getFullName(item?.client)}</Text>
              </View>
            </View>
            <View style={styles.arrorContainer}>
              <TouchableOpacity onPress={() => unblockClient(item)} style={styles.unblockContainer}>
                <Text style={styles.unblockText} >UNBLOCK</Text>
              </TouchableOpacity>
              <Image
                source={require('assets/global/arrowRight.png')}
                style={styles.arrow}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeContainer containerStyle={styles.container}>
      <Box pv={16} ph={24} bc={COLORS.white}>
        <Field
          ml={10}
          w={'95%'}
          value={query}
          bg={COLORS.whiteTwo}
          onChange={setQuery}
          label='Search Blocked Clients'
          endAdornment={
            loading ? (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            ) : (
              <Icon src={require('assets/global/search.png')} size={18} />
            )
          }
        />
      </Box>
      {
        <View style={styles.content}>
          <FlatList
            contentContainerStyle={styles.scrollContent}
            data={blockedClients}
            renderItem={({ item }: any) => renderListItem(item)}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.1}
          />
        </View>
      }
    </SafeContainer>
  );
};

export { BlackList };