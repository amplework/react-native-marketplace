import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { env } from 'config';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Badge } from 'shared/badge';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Notification } from 'shared/icon/icons';
import { io, Socket } from 'socket.io-client';
import {
  chatsSelectors,
  getChats,
  // getUnreadChatsDetails,
  getUnreadChatsDetailsSuccess,
} from 'store/entities/chats';
import {
  getNotificationsStatus,
  notificationsSelectors,
} from 'store/entities/notifications';
import { ChatSocketEvent, UnreadChatsDetails } from 'types/chats';
import COLORS from 'utils/colors';

const HomeIconGroup: React.FC = () => {
  const hasNewNotifications = useSelector(
    notificationsSelectors.hasNewNotifications,
  );
  // const unreadChatsDetails = useSelector(chatsSelectors.unreadChatsDetails);
  const chats = useSelector(chatsSelectors.chats);

  const isUnread =
   chats?.length ? chats[0]?.lastMessage?.status === 'sent' && chats[0]?.lastMessage.authorId === chats[0].participants[0].id : false;    

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getNotificationsStatus());
    }, [dispatch]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getChats({ query: '' }));
      // dispatch(getUnreadChatsDetails());
    }, [dispatch]),
  );

  useEffect(() => {
    let socket: Socket | null = null;

    const listener = (details: UnreadChatsDetails) =>
      dispatch(getUnreadChatsDetailsSuccess(details));

    const init = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      const authorization = `Bearer ${userToken}`;

      socket = io(env.CHAT_API_HOST, { extraHeaders: { authorization } });

      socket.on(ChatSocketEvent.unreadChatsUpdated, listener);
    };

    init();

    return () => {
      socket?.off(ChatSocketEvent.unreadChatsUpdated);
    };
  }, [dispatch]);

  const navigateToChats = () => Navigator.navigate('Chats');

  const navigateToNotification = () => Navigator.navigate('Notifications');

  return (
    <Box row ai="center">
      <Badge onPress={navigateToNotification} visible={hasNewNotifications}>
        <Notification color={COLORS.black80} height={20} width={20} />
      </Badge>
      <Badge
        onPress={navigateToChats}
        visible={isUnread}
        ml={16}
      >
        <Icon src={require('assets/global/chatBlack.png')} size={20} />
      </Badge>
    </Box>
  );
};

export { HomeIconGroup };
