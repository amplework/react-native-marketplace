import { StackScreenProps } from '@react-navigation/stack';
import { LIMIT } from 'api';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { EmptyState } from 'shared/emptyState';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { MainPageTemplate } from 'shared/templates';
import { chatsSelectors, createChat } from 'store/entities/chats';
import {
  getProviders,
  providersSelectors,
  refreshProviders,
} from 'store/entities/providers';
import { theme } from 'theme';
import { Chat } from 'types/chats';
import { IProvider } from 'types/users';
import COLORS from 'utils/colors';

import { ProvidersItem } from './components/providersItem';

type Props = StackScreenProps<RootStackParamList, 'AddChat'>;

const ClientAddChat: React.FC<Props> = ({ navigation, route }) => {
  const [query, setQuery] = useState('');

  const providers = useSelector(providersSelectors.providers);
  const unBlockedProviders = providers?.filter((e: any) => e.isBlocked == false);   

  const providersLoading = useSelector(providersSelectors.loading);
  const providersRefreshing = useSelector(providersSelectors.refreshing);
  const offset = useSelector(providersSelectors.offset);
  const total = useSelector(providersSelectors.total);

  const loading = useSelector(chatsSelectors.createLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.chats.addChat.header)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    dispatch(refreshProviders({ query, offset: 0 }));
  }, [dispatch, query]);

  const loadMore = () => {
    if (providers.length < total) {
      dispatch(getProviders({ query, offset: offset + LIMIT }));
    }
  };

  const navigateToChat = (chat: Chat) =>
    Navigator.stack.replace('Chat', { id: chat.id, query: route.params.query });

  const handleCreateChat = (provider: IProvider) => () =>
    dispatch(
      createChat({
        participantId: provider.id,
        onSuccess: navigateToChat,
        query: route.params.query,
      }),
    );

  return (
    <MainPageTemplate>
      <Loader loading={loading} />
      <Box mb={24} pv={20} ph={24} bc={COLORS.white} elevation>
        <Field
          value={query}
          onChange={setQuery}
          label={t(translations.common.fields.keyword)}
          startAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          endAdornment={
            providersRefreshing && (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            )
          }
        />
      </Box>
      <FlatList
        data={unBlockedProviders}
        keyExtractor={(provider) => provider.id.toString()}
        renderItem={({ item: provider }) => (
          <ProvidersItem
            provider={provider}
            onPress={handleCreateChat(provider)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        style={theme.spacing.pb(24)}
        contentContainerStyle={theme.styles.grow}
        ListEmptyComponent={() => (
          <EmptyState
            entities={t(translations.common.entities.providers)}
            ph={24}
          />
        )}
        ListFooterComponent={() => (
          <ActivityIndicator
            size="large"
            color={providersLoading ? COLORS.clearBlue : COLORS.transparent}
            style={theme.styles.listLoader}
          />
        )}
      />
    </MainPageTemplate>
  );
};

export { ClientAddChat };
