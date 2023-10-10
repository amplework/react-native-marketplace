import { StackScreenProps } from '@react-navigation/stack';
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
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import { chatsSelectors, createChat } from 'store/entities/chats';
import {
  getBlockedSubClients,
  getSubClients,
  resetSubClients,
  subClientsSelectors,
} from 'store/entities/subClients';
import { theme } from 'theme';
import { Chat } from 'types/chats';
import { ISubClient } from 'types/subClients';
import COLORS from 'utils/colors';

import { SubClientsItem } from './components/subClientsItem';

type Props = StackScreenProps<RootStackParamList, 'AddChat'>;

const ProviderAddChat: React.FC<Props> = ({ navigation, route }) => {
  const [query, setQuery] = useState('');

  const subClients = useSelector(subClientsSelectors.subClients);
  const blockedClients = useSelector(subClientsSelectors.blockedSubClients);
  const unBlockedClients = subClients?.filter((e: any) => e.isActive && e.isConnected &&
    !blockedClients?.find((blocked: any) => blocked?.clientId == e.clientId));

  const subClientsLoading = useSelector(subClientsSelectors.loading);

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
    dispatch(resetSubClients());

    return () => {
      dispatch(resetSubClients());
    };
  }, [dispatch]);

  useEffect(() => {
    //@ts-ignore
    dispatch(getSubClients({ query, isActive: true, isConnected: true }));
    dispatch(getBlockedSubClients({ query: '' }));
  }, [dispatch, query]);

  const navigateToChat = (chat: Chat) =>
    Navigator.stack.replace('Chat', { id: chat.id, query: route.params.query });

  const handleCreateChat = (client: ISubClient) => () =>
    dispatch(
      createChat({
        participantId: client.clientId!,
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
            subClientsLoading && (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            )
          }
        />
      </Box>
      <Paragraph size="s" type="book" mh={24} mb={12}>
        {t(translations.chats.total, { count: unBlockedClients?.length })}
      </Paragraph>
      <FlatList
        data={unBlockedClients}
        keyExtractor={(client) => client.id.toString()}
        renderItem={({ item: client }) => (
          <SubClientsItem client={client} onPress={handleCreateChat} />
        )}
        style={theme.spacing.pb(24)}
        contentContainerStyle={theme.styles.grow}
        ListEmptyComponent={() => (
          <EmptyState
            entities={t(translations.common.entities.clients)}
            ph={24}
          />
        )}
      />
    </MainPageTemplate>
  );
};

export { ProviderAddChat };
