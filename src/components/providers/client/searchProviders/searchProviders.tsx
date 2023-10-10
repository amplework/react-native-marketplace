import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { getClientProfile } from 'store/actions/client';
import { getIndustries } from 'store/entities/industries';
import {
  openFiltersModal,
  providersSelectors,
  searchProviders,
} from 'store/entities/providers';
import { IClientUser } from 'types/users';
import COLORS from 'utils/colors';

import { SearchBar } from './components/searchBar';
import { SearchResultsList } from './components/searchResultsList';
import { SpecialAndDiscounts } from './components/specialsAndDiscounts';
import { Tabs } from './components/tabs';
import { styles } from './style';

interface IUserState {
  user: {
    user: IClientUser;
  };
}

type Props = StackScreenProps<RootStackParamList, 'SearchProviders'>;

const SearchProviders: React.FC<Props> = ({ navigation, route }) => {
  const [query, setQuery] = useState('');
  const [serviceIds, setServicesIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const address = useSelector((state: IUserState) => state.user.user.address);
  const locationFilter: any = useSelector(providersSelectors.locationFilter);
  const place = useSelector(providersSelectors.place);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const name = place?.name || address?.formattedAddress.split(',')[0];

    const navigateToSearchLocation = () => Navigator.navigate('SearchLocation');

    navigation.setOptions({
      headerShown: true,
      headerTitle: locationFilter ? () => (
        <TouchableOpacity
          onPress={navigateToSearchLocation}
          style={styles.locationButton}
        >
          <Icon src={require('assets/global/mapsPlace.png')} size={16} mr={4} />
          <Paragraph size="s" type="book" color={COLORS.warmGrey}>
            {name || I18n.t('search.selectYourLocation')}
          </Paragraph>
        </TouchableOpacity>
      ) : '',
      headerLeft: () => <BackButton />,
    });
  }, [navigation, place, address, locationFilter]);

  useEffect(() => {
    dispatch(getClientProfile());
    dispatch(getIndustries());
  }, [dispatch]);

  useEffect(() => {
    if (!route.params?.servicesIds) {
      return;
    }

    if (route.params.servicesIds.length === 0) {
      dispatch(openFiltersModal());
    } else {
      setServicesIds(route.params.servicesIds);
    }
  }, [route.params, dispatch]);

  useEffect(() => {
    const location = place?.location || address?.location;
    // dispatch(searchProviders({ query, offset: 0, location, serviceIds }));
    if(locationFilter) {
      dispatch(searchProviders({ query, offset: 0, location, serviceIds }));
    } else {
      dispatch(searchProviders({ query, offset: 0, serviceIds }));
    }
  }, [dispatch, query, place, address, serviceIds]);

  const changeTab = (tab: number) => () => setActiveTab(tab);

  const action = route?.params?.action || 'basic';
  const selectedDayStart = route?.params?.selectedDayStart || '';
  const selectedDayEnd = route?.params?.selectedDayEnd || '';

  return (
    <SafeContainer safeStyle={styles.safe} containerStyle={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      <Separator />
      <Tabs activeTab={activeTab} changeTab={changeTab} />
      {activeTab === 0 && (
        <SearchResultsList
          query={query}
          action={action}
          selectedDayEnd={selectedDayEnd}
          selectedDayStart={selectedDayStart}
          serviceIds={serviceIds}
          setServicesIds={setServicesIds}
        />
      )}
      {activeTab === 1 && (
        <SpecialAndDiscounts
          serviceIds={serviceIds}
          setServicesIds={setServicesIds}
        />
      )}
    </SafeContainer>
  );
};

export { SearchProviders };