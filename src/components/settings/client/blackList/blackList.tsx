import { useIsFocused } from '@react-navigation/native';
import I18n from 'locales';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { providersSelectors } from 'store/entities/providers';
import { getBlockedProviders, unBlockProvider } from 'store/entities/providers/slice';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';

import { styles } from './styles';

const BlackList: React.FC<any> = ({ navigation }) => {

  const loading = useSelector(providersSelectors.loading);
  const blockedProviders = useSelector(providersSelectors.blockedProviders);  

  const isFocused = useIsFocused();
  const [search, setSearch] = useState<any>('');
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any>();

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
        getBlockedProviders({
          query,
        }),
      );
    }
  }, [dispatch, query]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const unblockClient = (item: any) => {            
    dispatch(unBlockProvider({
      providerId: item?.providerId,
      clientId: item?.clientId,
    }));
  }

  const navigateToClientDetails = (item: any) => {
    navigation.navigate('ProviderDetails', { id: item?.providerId });
  }

  const renderListItem = (item: any) => {    
    const photo = item?.profile?.photoFile?.url;
    
    return (
      <TouchableOpacity
        onPress={() => navigateToClientDetails(item)}
      >
        <View style={styles.listItemContainer}>
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
                <Text style={styles.userName}>{getFullName(item?.profile)}</Text>
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

  const searchFilter = (searchText: string) => {
    setSearch(searchText);
    let filterData: any = [];
    if (searchText) {
      filterData = blockedProviders.filter(function (item: any) {
        let text = String(item?.profile?.firstName).trim().toLowerCase();    
        return text.includes(String(searchText).toLowerCase());
      });
    }
    setFilteredData(filterData);
  }

  return (
    <SafeContainer containerStyle={styles.container}>
      <Box pv={16} ph={24} bc={COLORS.white}>
        <Field
          ml={10}
          w={'95%'}
          value={query}
          bg={COLORS.whiteTwo}
          label='Search Blocked Clients'
          onChange={setQuery}
          endAdornment={
            loading ? (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            ) : (
              <Icon src={require('assets/global/search.png')} size={18} />
            )
          }
        />
      </Box>
      <View style={styles.content}>
        <FlatList
          contentContainerStyle={styles.scrollContent}
          data={String(search)?.trim().length > 0 ? filteredData : blockedProviders}
          renderItem={({ item }: any) => renderListItem(item)}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.1}
        />
      </View>
    </SafeContainer>
  );
};

export { BlackList };