import { LIMIT } from 'api';
import { translations } from 'locales';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { UsersPlaceholder } from 'shared/icon/icons';
import {
  getProviders,
  providersSelectors,
  refreshProviders,
  shortlistProvider,
  unshortlistProvider,
} from 'store/entities/providers';
import { theme } from 'theme';
import { IProvider } from 'types/users';
import COLORS from 'utils/colors';

import { styles } from '../style';
import { ProvidersItem } from './providersItem';

const ProvidersList: React.FC = () => {
  const providers = useSelector(providersSelectors.providers);

  const loading = useSelector(providersSelectors.loading);
  const refreshing = useSelector(providersSelectors.refreshing);
  const offset = useSelector(providersSelectors.offset);
  const total = useSelector(providersSelectors.total);

  const shortlistLoading = useSelector(providersSelectors.shortlistLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(refreshProviders({ offset: 0 }));
  }, [dispatch]);

  const refresh = () => dispatch(refreshProviders({ offset: 0 }));

  const loadMore = () => {
    if (providers.length < total) {
      dispatch(getProviders({ offset: offset + LIMIT }));
    }
  };

  const navigateToDetails = (id: number) => () =>
    Navigator.navigate('ProviderDetails', { id });

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

  return (
    <FlatList
      data={providers}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <ProvidersItem
          provider={item}
          disabled={shortlistLoading}
          onPress={navigateToDetails(item.id)}
          onFavouritePress={toggleShortlist(item)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      style={styles.providersList}
      contentContainerStyle={theme.styles.grow}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <EmptyState
          type="image"
          image={<UsersPlaceholder />}
          header={t(translations.providers.placeholder.header)}
          description={t(translations.providers.placeholder.description)}
          ph={11}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loading ? COLORS.clearBlue : COLORS.transparent}
          style={styles.loader}
        />
      )}
    />
  );
};

export { ProvidersList };
