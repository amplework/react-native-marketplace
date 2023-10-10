import { LIMIT } from 'api';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import {
  loadMoreSearchResults,
  providersSelectors,
  shortlistProvider,
  unshortlistProvider,
} from 'store/entities/providers';
import { IClientUser, IProvider } from 'types/users';
import COLORS from 'utils/colors';

import { ProvidersItem } from '../../components/providersItem';
import { styles } from '../style';
import { ListEmptyComponent } from './listEmptyComponent';
import { ProvidersFilters } from './providersFilters';
import { ResultsCountHeader } from './resultsCountHeader';

type UserState = {
  user: { user: IClientUser };
};

interface Props {
  query: string;
  action: string;
  selectedDayStart: string;
  selectedDayEnd: string;
  serviceIds: number[];
  setServicesIds: (ids: number[]) => void;
}

const SearchResultsList: React.FC<Props> = ({
  query,
  action,
  selectedDayEnd,
  selectedDayStart,
  serviceIds,
  setServicesIds,
}) => {
  const address = useSelector((state: UserState) => state.user.user.address);
  const place = useSelector(providersSelectors.place);
  const location = place?.location || address?.location;

  const searchResults = useSelector(providersSelectors.searchResults);

  const loading = useSelector(providersSelectors.searchLoading);
  const shortlistLoading = useSelector(providersSelectors.shortlistLoading);
  const loadingMore = useSelector(providersSelectors.searchLoadingMore);
  const offset = useSelector(providersSelectors.searchOffset);
  const total = useSelector(providersSelectors.searchTotal);

  const isModalOpened = useSelector(providersSelectors.isModalOpened);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loadMore = () => {
    if (searchResults.length < total) {
      dispatch(
        loadMoreSearchResults({
          query,
          offset: offset + LIMIT,
          location,
          serviceIds,
        }),
      );
    }
  };

  const navigateToDetails = (id: number) => () =>
    Navigator.navigate('ProviderDetails', { id });

  const navigateToBook = (item: any) => () =>
    Navigator.navigate('AddAppointment', {
      client: item,
      selectedDayStart: selectedDayStart || '',
      selectedDayEnd: selectedDayEnd || '',
    });

  const confirmUnshortlist = (provider: IProvider) =>
    Alert.alert(
      t(translations.common.warning),
      t(translations.providers.unshortlistWarning),
      [
        {
          text: t(translations.common.cancel),
          style: 'cancel',
        },
        {
          text: t(translations.common.remove),
          onPress: () => dispatch(unshortlistProvider(provider)),
          style: 'destructive',
        },
      ],
    );

  const toggleShortlist = (provider: IProvider) => () =>
    provider.isShortlisted
      ? confirmUnshortlist(provider)
      : dispatch(shortlistProvider(provider));

  if (!loading && !searchResults.length) {
    return (
      <>
        {isModalOpened && (
          <ProvidersFilters
            initialSelectedServices={serviceIds}
            onSubmit={setServicesIds}
          />
        )}
        <ListEmptyComponent title={t(translations.search.noResults)} />
      </>
    );
  }  

  return (
    <View style={styles.searchResultsContainer}>
      {isModalOpened && (
        <ProvidersFilters
          initialSelectedServices={serviceIds}
          onSubmit={setServicesIds}
        />
      )}
      <ResultsCountHeader count={total} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <ProvidersItem
            provider={item}
            disabled={shortlistLoading}
            onPress={
              action === 'book'
                ? navigateToBook(item)
                : navigateToDetails(item.id)
            }
            onFavouritePress={toggleShortlist(item)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        style={styles.searchResultsList}
        ListFooterComponent={() => (
          <ActivityIndicator
            size="large"
            color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
            style={styles.loader}
          />
        )}
      />
    </View>
  );
};

export { SearchResultsList };
