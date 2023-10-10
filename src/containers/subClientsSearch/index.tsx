import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { translations } from 'locales';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { MainPageTemplate } from 'shared/templates';
import {
  resetSearchResults,
  searchSubClients,
  subClientsSelectors,
} from 'store/entities/subClients';
import { subscriptionSelectors } from 'store/entities/subscription';
import { LITE } from 'types/subscription';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';

import { subClientsStyles as S } from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const SubClientsSearch: React.FC<Props> = ({ navigation }) => {
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');

  const searchResults = useSelector(subClientsSelectors.searchResults);
  const loading = useSelector(subClientsSelectors.searchLoading);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const handleSearch = useCallback(() => {
    if (isFocused) {
      dispatch(
        searchSubClients({
          offset: 0,
          query,
          limit: LIMIT,
        }),
      );
      setOffset(LIMIT);
    }
  }, [dispatch, query]);

  const onBack = () => {
    Navigator.goBack();
    dispatch(resetSearchResults());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title="Search Clients" onPress={onBack} />,
    });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const fetchMoreClients = () => {
    dispatch(
      searchSubClients({
        offset,
        query,
        limit: LIMIT,
      }),
    );
    setOffset(offset + LIMIT);
  };

  const renderListItem = (item: any) => {
    const { lastAppointmentDate, lastSaleDate } = item || {};
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('SubClientDetails', { clientId: item.id })
        }
      >
        <View style={S.listItemContainer}>
          <View style={S.rowSpace}>
            <View style={S.row}>
              <Image
                source={
                  item.photo
                    ? { uri: item.photo }
                    : require('assets/global/defaultAvatar.jpg')
                }
                style={S.userAvatar}
              />
              <View>
                <Text style={S.userName}>{getFullName(item)}</Text>
                <Text style={S.userPhone}>{item.phoneNumber}</Text>
              </View>
            </View>
            <Image
              source={require('assets/global/arrowRight.png')}
              style={S.arrow}
            />
          </View>
          <View style={S.separator} />
          <Text style={S.lastTitle}>
            Last appointment date:
            <Text style={S.lastValueTitle}>
              {lastAppointmentDate
                ? ' ' + moment(lastAppointmentDate).format('LL')
                : ''}
            </Text>
            <Text style={S.lastValueTitle} />
          </Text>
          {!liteSubcription && <Text style={S.lastTitle}>
            Last sale date: 
            <Text style={S.lastValueTitle}>
              {lastSaleDate
                ? ' ' + moment(lastSaleDate).format('LL')
                : ''}
            </Text>
            <Text style={S.lastValueTitle} />
          </Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainPageTemplate bc={COLORS.whiteTwo}>
      <Box pv={16} ph={24} bc={COLORS.white}>
        <Field
          value={query}
          onChange={setQuery}
          label={t(translations.common.search)}
          endAdornment={
            loading ? (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            ) : (
              <Icon src={require('assets/global/search.png')} size={18} />
            )
          }
        />
      </Box>
      <View style={S.content}>
        <FlatList
          contentContainerStyle={S.scrollContent}
          data={searchResults}
          renderItem={({ item }) => renderListItem(item)}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchMoreClients}
          onEndReachedThreshold={0.1}
        />
      </View>
    </MainPageTemplate>
  );
};

export default SubClientsSearch;
