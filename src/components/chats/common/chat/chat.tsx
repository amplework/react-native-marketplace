import Clipboard from '@react-native-clipboard/clipboard';
import { StackScreenProps } from '@react-navigation/stack';
import { adaptMessage } from 'components/chats/helpers/utils';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { env } from 'config';
import { RootStackParamList } from 'index';
import I18n, { translations } from 'locales';
import { Storage } from 'service/localStorage/localStorage';
import React, { useEffect, useLayoutEffect } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { Avatar } from 'shared/avatar';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Alpha, Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import SubClientsModal from 'shared/subClientsModal';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { toast } from 'shared/toast';
import { io, Socket } from 'socket.io-client';
import {
  chatsSelectors,
  confirmRequestNewClientInChat,
  connectExistingClientInChat,
  createMessage,
  deleteChat,
  deleteMessage,
  getChat,
  getMessages,
  loadMoreMessages,
  pushMessage,
  readMessage,
  requestNewClientModal,
  updateClientModal,
  updateMessagesStatus,
} from 'store/entities/chats';
import { userSelectors } from 'store/entities/user';
import { ChatSocketEvent, Message, ReadMessageEvent } from 'types/chats';
import { isProvider } from 'types/users';
import { findLastIndex } from 'utils/array';
import COLORS from 'utils/colors';
import { ellipsize, getFullName } from 'utils/strings';
import { USER_TOKEN } from 'utils/constants';
import _ from 'lodash';

import { ChatBubble } from './components/chatBubble';
import { MessageSheet } from './components/messageSheet';
import { chatStyles as S } from './style';
import { blockUser, getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { chatStyles } from './style'
import Button from 'shared/button';
import { Navigator } from 'service/navigator';
import moment from 'moment';
import { getProvider, providersSelectors } from 'store/entities/providers';
import ReactNativeModal from 'react-native-modal';

type Props = StackScreenProps<RootStackParamList, 'Chat'>;

const Chat: React.FC<Props> = ({ navigation, route }) => {
  const { id, query, userDetails } = route.params;

  const user = useSelector(userSelectors.user);
  const chat = useSelector(chatsSelectors.chat);
  const provider = useSelector(providersSelectors.provider);
  const messages = useSelector(chatsSelectors.messages);

  const lastKey = useSelector(chatsSelectors.lastKey);
  const total = useSelector(chatsSelectors.messagesTotal);

  const userLoading = useSelector(userSelectors.loading);
  const chatLoading = useSelector(chatsSelectors.chatLoading);
  const deleteChatLoading = useSelector(chatsSelectors.deleteChatLoading);
  const messagesLoading = useSelector(chatsSelectors.messagesLoading);
  const subClients = useSelector(subClientsSelectors.subClients);
  const messagesLoadingMore = useSelector(chatsSelectors.messagesLoadingMore);
  const showModal = useSelector(chatsSelectors.requestNewClientModalShow);
  const updateModal = useSelector(chatsSelectors.updateClientModalShow);

  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [clients, setClients] = useState(subClients);
  const [showSubClients, setShowSubClients] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(undefined);

  const connectClient = () => {
    setVisible(false);
    setTimeout(() => {
      dispatch(requestNewClientModal({
        show: true,
      }))
    }, 500);
  };

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const receiver = useMemo(
    () => chat?.participants.find((participant) => participant.id !== user?.id),
    [chat, user],
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDeleteChat = useCallback(() => {
    const providerMessage = receiver?.isConnected
      ? translations.chats.alerts.deleteChat.provider.connected
      : translations.chats.alerts.deleteChat.provider.unconnected;
    const clientMessage = translations.chats.alerts.deleteChat.client;
    const message = isProvider(user) ? t(providerMessage) : t(clientMessage);

    const handler = () => dispatch(deleteChat({ id: chat!.id, query }));

    alert.deletion({ message, onDelete: handler });
  }, [t, dispatch, chat, user, receiver, query]);

  const handleBlockUser = useCallback(() => {
    const handler = () => {
      setVisible(false);
      if (isProvider(user)) {
        dispatch(blockUser({
          providerId: user?.id,
          clientId: receiver?.id,
          isProvider: isProvider(user),
        }));
      } else {
        dispatch(blockUser({
          providerId: receiver?.id,
          clientId: user?.id,
          isProvider: isProvider(user),
        }));
      }
    };
    if (isProvider(user)) {
      alert.blockClient({
        entity: receiver?.firstName,
        onBlock: handler
      });
    } else {
      alert.blockProvider({
        entity: receiver?.firstName,
        onBlock: handler
      });
    }
  }, [receiver]);

  const bookAppointment = () => {
    Navigator.navigate('AddAppointment', {
      client: provider,
      selectedDayStart: moment.utc(new Date()).startOf('day'),
      selectedDayEnd: moment.utc(new Date()).endOf('day'),
    });
    setVisible(false);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () =>
        chatLoading ? null : (
          <Box row ai="center">
            <BackButton />
            <Avatar src={receiver!.photo} size={32} mr={12} />
            <Paragraph>{ellipsize(getFullName(receiver!), 20)}</Paragraph>
            {receiver!.isConnected && <Alpha size={14} />}
          </Box>
        ),
      headerRight: () =>
        chatLoading ? null : (
          <Box row ai='center'>
            {/* {isProvider(user) && (
              <Pressable flex onPress={handleBlockUser} jc="center" mt={1} pr={20}>
                <Icon src={require('assets/global/block.png')} color={COLORS.orangeRed} size={19} />
              </Pressable>
            )} */}
            <Pressable flex onPress={handleDeleteChat} jc="center" pr={24}>
              <Icon src={require('assets/global/deleteGray.png')} size={20} />
            </Pressable>
            <Box mr={20}>
              <Feather
                size={22}
                onPress={showMenu}
                style={{ color: COLORS.warmGrey }}
                name={'more-vertical'}
              />
            </Box>
          </Box>
        ),
    });
  }, [navigation, chatLoading, chat, user, handleDeleteChat, receiver]);

  useEffect(() => {
    dispatch(getChat(id));
    dispatch(getMessages({ id }));
    if (isProvider(user)) {
      dispatch(getSubClients());
    }
  }, [dispatch, id]);

  useEffect(() => {
    let socket: Socket | null = null;
    const room = `chat:${id}`;

    const init = async () => {
      const userToken = await Storage.get(USER_TOKEN);
      const authorization = `Bearer ${userToken}`;
      socket = io(env.CHAT_API_HOST, { extraHeaders: { authorization } });

      // socket = io(env.CHAT_API_HOST, { extraHeaders: { authorization } });    

      socket.emit('join', { room });

      socket.on(ChatSocketEvent.newMessage, (newMessage: Message) => {
        if (messages.every((message) => message.id !== newMessage.id)) {
          dispatch(pushMessage(newMessage));
        }
      });

      socket.on(ChatSocketEvent.readMessage, (event: ReadMessageEvent) =>
        dispatch(updateMessagesStatus(event.id)),
      );
    };

    init();

    return () => {
      socket?.off(ChatSocketEvent.newMessage);
      socket?.off(ChatSocketEvent.readMessage);
      socket?.emit('leave', { room });
    };
  }, [id, dispatch, messages]);

  useEffect(() => {

  }, [showModal])

  useEffect(() => {
    const lastUnread = messages.find(
      (message) => message.status === 'sent' && message.authorId !== user?.id,
    );

    if (lastUnread) {
      dispatch(readMessage(lastUnread.id));
    }
  }, [dispatch, messages, user]);

  useEffect(() => {
    const modifyArray = subClients?.map((contact: any) => ({
      ...contact,
      value: contact?.firstName || 'No Name',
    }));
    setClients(modifyArray);
  }, [subClients]);

  const loadMore = () => dispatch(loadMoreMessages({ id, beforeKey: lastKey }));

  const handleSendMessage = ([message]: IMessage[]) => {
    const messageId = Date.now();

    dispatch(
      createMessage({ id, text: message.text, authorId: user!.id, messageId }),
    );
  };

  const openSheet = (message: IMessage) => () => setSelectedMessage(message);

  const closeSheet = () => setSelectedMessage(null);

  const handleCopy = (message: IMessage) => () => {
    Clipboard.setString(message.text);

    setSelectedMessage(null);

    toast.info(t(translations.chats.chat.copied));
  };

  const handleDelete = (message: IMessage) => () => {
    dispatch(deleteMessage(message._id as number));
    closeSheet();
  };

  // const renderModal = (show: boolean, content: any) => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={show}
  //       onRequestClose={() => { }}
  //     >
  //       <View style={chatStyles.chooseModalView}>
  //         <View style={[chatStyles.chooseView, chatStyles.shadow]}>{content}</View>
  //       </View>
  //     </Modal>
  //   );
  // };

  const availableSubClients = clients.filter(
    (client) => client.isActive && !client.isConnected,
  );

  const createExistClient = async (update: boolean) => {
    dispatch(
      connectExistingClientInChat(
        {
          id: selectedClient?.id,
          //@ts-ignore
          clientId: receiver?.id,
          shouldCopyData: update,
          chatId: id
        },
      ),
    );
  };

  const onConnectExisting = (clientName: string) => {
    alert.editing({
      entity: undefined,
      message: I18n.t('common.alerts.connectClient', { clientName }),
      onEdit: () => {
        dispatch(requestNewClientModal({ show: false }))
        setTimeout(() => setShowSubClients(true), 500);
      },
    });
  };

  const firstUnreadIndex = findLastIndex(messages)(
    (message) => message.status === 'sent' && message.authorId !== user?.id,
  );
  const firstUnread = messages[firstUnreadIndex];

  return userLoading || messagesLoading ? (
    <Loader loading />
  ) : (
    <Box flex>
      <Loader loading={deleteChatLoading} />
      <Menu
        visible={visible}
        onRequestClose={hideMenu}
        style={{ position: 'absolute', left: 230, marginTop: 10 }}
      >
        {isProvider(user) && <MenuItem
          disabled={receiver?.isConnected ? true : false}
          onPress={connectClient}>{'Connect Client'}</MenuItem>}
        <MenuDivider />
        <MenuItem onPress={handleBlockUser}>{isProvider(user) ? 'Block Client' : 'Block Provider'}</MenuItem>
        {!isProvider(user) && <MenuDivider />}
        {!isProvider(user) && <MenuItem onPress={bookAppointment}>{'Book Appointment'}</MenuItem>}
      </Menu>
      {!!selectedMessage && (
        <MessageSheet
          message={selectedMessage}
          onClose={closeSheet}
          onCopy={handleCopy(selectedMessage)}
          onDelete={handleDelete(selectedMessage)}
        />
      )}
      <GiftedChat
        user={{ _id: user!.id }}
        messages={_.uniqBy(messages, 'id').map(adaptMessage)}
        onSend={handleSendMessage}
        placeholder={t(translations.chats.chat.placeholder)}
        renderBubble={(props) => (
          <ChatBubble
            firstUnread={firstUnread}
            {...props}
            onPress={openSheet}
          />
        )}
        infiniteScroll
        loadEarlier={messages.length < total}
        isLoadingEarlier={messagesLoadingMore}
        onLoadEarlier={loadMore}
        alwaysShowSend
        renderSend={(props) => (
          <Send {...props} containerStyle={S.send}>
            <Icon src={require('assets/global/send.png')} size={44} />
          </Send>
        )}
        minInputToolbarHeight={95}
        messagesContainerStyle={S.messagesContainer}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            renderComposer={(composerProps) => (
              <Composer
                {...composerProps}
                placeholderTextColor={COLORS.warmGrey}
                textInputStyle={S.input}
              />
            )}
            primaryStyle={S.toolbar}
            containerStyle={S.toolbarContainer}
          />
        )}
        scrollToBottom
        scrollToBottomComponent={() => (
          <Icon src={require('assets/global/arrowDown.png')} />
        )}
        scrollToBottomStyle={S.scrollToBottomButton}
      />
      <SubClientsModal
        subClients={availableSubClients}
        onModalShow={(show: boolean) => setShowSubClients(show)}
        showModal={showSubClients}
        onChangeSelectedClient={(client: any) => {
          setSelectedClient(client);
          setTimeout(() => dispatch(updateClientModal({
            show: true,
          })), 500);
        }}
      />
      <ReactNativeModal
        // animationType="slide"
        // transparent={true}
        isVisible={showModal}
        statusBarTranslucent
        // onRequestClose={() => { }}
      >
        <View style={chatStyles.chooseModalView}>
          <View style={[chatStyles.chooseView, chatStyles.shadow]}>
            <TouchableOpacity
              style={{ alignItems: 'flex-end' }}
              onPress={() => dispatch(requestNewClientModal({
                show: false,
              }))}
            >
              <Image
                source={require('assets/global/close.png')}
                style={chatStyles.closeImage}
              />
            </TouchableOpacity>
            <Text style={chatStyles.titleChooseModal}>
              {receiver?.firstName +
                ' ' +
                (receiver?.lastName || '')}{' '}
              is not a connected client. Do you want to connect to one of your
              clients? Or create a new client?
            </Text>
            <Button
              text={'Create new'}
              onPress={() => {
                const formData = new FormData();
                formData.append('firstName', receiver?.firstName);
                dispatch(confirmRequestNewClientInChat({
                  client: formData,
                  //@ts-ignore
                  clientId: receiver?.id,
                  chatId: id,
                }));
              }}
              buttonStyle={chatStyles.createNew}
            />
            <Button
              text={'Connect existing'}
              onPress={() => onConnectExisting(receiver?.firstName!)}
              buttonStyle={chatStyles.connectClient}
            />
          </View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
      statusBarTranslucent
        // animationType="slide"
        // transparent={true}
        isVisible={updateModal}
        // onRequestClose={() => { }}
      >
        <View style={chatStyles.chooseModalView}>
          <View style={[chatStyles.chooseView, chatStyles.shadow]}>
            <TouchableOpacity
              style={{ alignItems: 'flex-end' }}
              onPress={() => {
                dispatch(updateClientModal({
                  show: false,
                }))
              }}
            >
              <Image
                source={require('assets/global/close.png')}
                style={chatStyles.closeImage}
              />
            </TouchableOpacity>
            <Text style={chatStyles.titleChooseModal}>
              Do you want to update the client profile from the client app?
            </Text>
            <Button
              text={'Do not update'}
              onPress={() => {
                dispatch(updateClientModal({
                  show: false,
                }));
                createExistClient(false);
              }}
              buttonStyle={chatStyles.createNew}
            />
            <Button
              text={'Update client'}
              onPress={() => {
                dispatch(updateClientModal({
                  show: false,
                }));
                createExistClient(true);
              }}
              buttonStyle={chatStyles.connectClient}
            />
          </View>
        </View>
      </ReactNativeModal>
    </Box>
  );
};

export { Chat };
