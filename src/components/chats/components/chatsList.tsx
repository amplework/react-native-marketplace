import { LIMIT } from 'api';
import { env } from 'config';
import { translations } from 'locales';
import { Storage } from 'service/localStorage/localStorage';
import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/core';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { io, Socket } from 'socket.io-client';
import {
  chatsSelectors,
  getChats,
  loadMoreChats,
  updateChats,
} from 'store/entities/chats';
import { userSelectors } from 'store/entities/user';
import { theme } from 'theme';
import { Chat, ChatSocketEvent } from 'types/chats';
import { USER_TOKEN } from 'utils/constants';
import COLORS from 'utils/colors';

import { ChatsItem } from './chatsItem';
import { getBlockedSubClients, getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { providersSelectors, refreshProviders } from 'store/entities/providers';
import { isProvider } from 'types/users';
import { getBlockedProviders } from 'store/entities/providers/slice';

type Props = {
  query: string;
};

const ChatsList: React.FC<Props> = ({ query }) => {
  const user = useSelector(userSelectors.user);
  const chats = useSelector(chatsSelectors.chats);
  const subClients = useSelector(subClientsSelectors.subClients);
  const blockedClients = useSelector(subClientsSelectors.blockedSubClients);
  const blockedProviders = useSelector(providersSelectors.blockedProviders);

  const loading = useSelector(chatsSelectors.loading);
  const loadingMore = useSelector(chatsSelectors.loadingMore);

  const offset = useSelector(chatsSelectors.offset);
  const total = useSelector(chatsSelectors.total);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getChats({ query }));
    if(isProvider(user)) {
      dispatch(getBlockedSubClients());
    } else {
      dispatch(getBlockedProviders());
    }
  }, [query, dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    let socket: Socket | null = null;
    const room = `chatList:${user.id}`;

    const init = async () => {
      const userToken = await Storage.get(USER_TOKEN);
      const authorization = `Bearer ${userToken}`;

      socket = io(env.CHAT_API_HOST, { extraHeaders: { authorization } });

      socket.emit('join', { room });

      socket.on(ChatSocketEvent.chatUpdated, (chat: Chat) => {
        const blocked = isProvider(user) ? 
          blockedClients?.filter((client: any) => client?.cliendId == chat?.lastMessage?.authorId):
          blockedProviders?.filter((provider: any) => provider?.providerId == chat?.lastMessage?.authorId);

        if(blocked?.length) {
          dispatch(updateChats(chat)); 
        } else {
          return;
        }
      },
      );
    };

    init();

    return () => {
      socket?.off(ChatSocketEvent.chatUpdated);
      socket?.emit('leave', { room });
    };
  }, [user, dispatch]);

  const refresh = () => dispatch(getChats({ query }));

  const loadMore = () => {
    if (chats.length < total) {
      dispatch(loadMoreChats({ query, offset: offset + LIMIT }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getChats({ query }));
      if(isProvider(user)) {
        dispatch(getSubClients({ query: '' }));
      }else {
        dispatch(refreshProviders({ offset: 0 }));
      }
    }, [dispatch]),
  );

  const navigateToChat = (chat: Chat) => () => {
    const userDetails = chat?.participants[0];
    
    const findClient = subClients.filter((e: any) => e.clientId == userDetails?.id);
      
    const clientDetails = findClient[0];        
    
    if(isProvider(user)) {
      Navigator.navigate('Chat', { id: chat.id, query, userDetails: clientDetails });
    } else {
      Navigator.navigate('Chat', { id: chat.id, query, userDetails: userDetails });
    }
  }

  return (
    <FlatList
      data={chats}
      keyExtractor={(chat) => `${chat.id}`}
      renderItem={({ item: chat }) => (
        <ChatsItem chat={chat} onPress={navigateToChat} />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      contentContainerStyle={theme.styles.grow}
      ListEmptyComponent={() => (
        <EmptyState entities={t(translations.common.entities.chats)} ph={24} />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={theme.styles.listLoader}
        />
      )}
    />
  );
};

export { ChatsList };
