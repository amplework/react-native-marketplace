import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LIMIT } from 'api';
import { KeysetPagination, Pagination } from 'types/api';
import {
  Chat,
  ConnectExistingClient,
  CreateChatAction,
  CreateMessageRequest,
  CreateMessageResponse,
  DeleteChatAction,
  GetChatsRequest,
  GetMessagesRequest,
  Message,
  RequestNewClient,
  RequestNewClientModal,
  UnreadChatsDetails,
} from 'types/chats';
import { findIndexById } from 'utils/array';
import { getTime } from 'utils/dates';

import { formatMessagePreview } from './formatters';
import { ChatsSlice } from './types';

const initialState: ChatsSlice = {
  chats: [],
  loading: false,
  loadingMore: false,
  offset: 0,
  total: LIMIT,
  createLoading: false,
  chat: null,
  chatLoading: true,
  deleteChatLoading: false,
  messages: [],
  messagesLoading: true,
  messagesLoadingMore: false,
  lastKey: null,
  messagesTotal: LIMIT,
  requestNewClientModal: false,
  updateClientModal: false,
  unreadChatsDetails: {
    unreadCount: 0,
  },
};

const chats = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    getChats: (state, _action: PayloadAction<GetChatsRequest>) => {
      state.loading = true;
    },
    getChatsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Chat[]>>,
    ) => {
      state.loading = false;
      state.chats = payload.result;

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    getChatsFailure: (state) => {
      state.loading = false;
    },
    loadMoreChats: (state, _action: PayloadAction<GetChatsRequest>) => {
      state.loadingMore = true;
    },
    loadMoreChatsSuccess: (
      state,
      { payload }: PayloadAction<Pagination<Chat[]>>,
    ) => {
      state.loadingMore = false;
      state.chats.push(...payload.result);

      state.offset = payload.meta.offset;
      state.total = payload.meta.totalCount;
    },
    loadMoreChatsFailure: (state) => {
      state.loadingMore = false;
    },
    updateChats: (state, { payload }: PayloadAction<Chat>) => {
      const updatedChatIndex = findIndexById(payload.id)(state.chats);

      if (updatedChatIndex === -1) {
        state.chats.push(payload);
      } else {
        state.chats[updatedChatIndex].lastMessage = payload.lastMessage;
      }

      state.chats.sort(
        (a, b) =>
          getTime(b.lastMessage?.sentAt || 0) -
          getTime(a.lastMessage?.sentAt || 0),
      );

      state.chats.slice(0, LIMIT);
    },
    createChat: (state, _action: PayloadAction<CreateChatAction>) => {
      state.createLoading = true;
    },
    createChatSuccess: (state) => {
      state.createLoading = false;
    },
    createChatFailure: (state) => {
      state.createLoading = false;
    },
    deleteChat: (state, _action: PayloadAction<DeleteChatAction>) => {
      state.deleteChatLoading = true;
    },
    deleteChatSuccess: (state) => {
      state.deleteChatLoading = false;
    },
    deleteChatFailure: (state) => {
      state.deleteChatLoading = false;
    },
    getChat: (state, _action: PayloadAction<number>) => {
      state.chatLoading = true;
    },
    getChatSuccess: (state, action: PayloadAction<Chat>) => {
      state.chat = action.payload;
      state.chatLoading = false;
    },
    getChatFailure: (state) => {
      state.chatLoading = false;
    },
    getMessages: (state, _action: PayloadAction<GetMessagesRequest>) => {
      state.messagesLoading = true;
    },
    getMessagesSuccess: (
      state,
      { payload }: PayloadAction<KeysetPagination<Message[]>>,
    ) => {
      state.messagesLoading = false;
      state.messages = payload.result;

      state.lastKey = payload.meta.lastKey;
      state.messagesTotal = payload.meta.totalCount;
    },
    getMessagesFailure: (state) => {
      state.messagesLoading = false;
    },
    loadMoreMessages: (state, _action: PayloadAction<GetMessagesRequest>) => {
      state.messagesLoadingMore = true;
    },
    loadMoreMessagesSuccess: (
      state,
      { payload }: PayloadAction<KeysetPagination<Message[]>>,
    ) => {
      state.messagesLoadingMore = false;
      state.messages.push(...payload.result);

      state.lastKey = payload.meta.lastKey;
      state.messagesTotal = payload.meta.totalCount;
    },
    loadMoreMessagesFailure: (state) => {
      state.messagesLoadingMore = false;
    },
    createMessage: (state, action: PayloadAction<CreateMessageRequest>) => {
      state.messages.unshift(formatMessagePreview(action.payload));
    },
    createMessageSuccess: (
      state,
      { payload }: PayloadAction<CreateMessageResponse>,
    ) => {
      const index = findIndexById(payload.messageId)(state.messages);

      state.messages.splice(index, 1, payload.message);
    },
    createMessageFailure: (
      state,
      { payload }: PayloadAction<CreateMessageRequest>,
    ) => {
      const index = findIndexById(payload.messageId)(state.messages);

      state.messages[index].status = 'error';
    },
    // readMessage: (_state, _action: PayloadAction<number>) => {},
    readMessage: (_state, _action: PayloadAction<number>) => {
      _state.messages.map((message) => {
        if (message?.id <= _action?.payload) {
          message.status = 'read';
        }
      })
    },
    readMessageSuccess: () => { },
    readMessageFailure: () => { },
    deleteMessage: (_state, _action: PayloadAction<number>) => { },
    deleteMessageSuccess: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload,
      );
    },
    deleteMessageFailure: () => { },
    pushMessage: (state, action: PayloadAction<Message>) => {
      state.messages.unshift(action.payload);
    },
    updateMessagesStatus: (state, action: PayloadAction<number>) => {
      state.messages.map((message) => {
        if (message.id <= action.payload) {
          message.status = 'read';
        }
      });
    },
    getUnreadChatsDetails: () => { },
    getUnreadChatsDetailsSuccess: (
      state,
      action: PayloadAction<UnreadChatsDetails>,
    ) => {
      state.unreadChatsDetails = action.payload;
    },
    getUnreadChatsDetailsFailure: () => { },
    requestNewClientModal: (state, action: PayloadAction<RequestNewClientModal>) => {
      state.requestNewClientModal = action?.payload?.show;
    },
    updateClientModal: (state, action: PayloadAction<RequestNewClientModal>) => {
      state.updateClientModal = action?.payload?.show;
    },
    confirmRequestNewClientInChat: (state, action: PayloadAction<RequestNewClient>) => {
      state.loading = true
    },
    confirmRequestNewClientInChatSuccess: (state) => {
      state.loading = false
    },
    confirmRequestNewClientInChatFailure: (state) => {
      state.loading = false
    },
    connectExistingClientInChat: (state, action: PayloadAction<ConnectExistingClient>) => {      
      state.loading = true
    },
    connectExistingClientInChatSuccess: (state) => {
      state.loading = false
    },
    connectExistingClientInChatChatFailure: (state) => {
      state.loading = false
    }
  },
});

export const {
  actions: {
    getChats,
    getChatsFailure,
    getChatsSuccess,
    loadMoreChats,
    loadMoreChatsFailure,
    loadMoreChatsSuccess,
    updateChats,
    createChat,
    createChatFailure,
    createChatSuccess,
    deleteChat,
    deleteChatFailure,
    deleteChatSuccess,
    getChat,
    getChatFailure,
    getChatSuccess,
    getMessages,
    getMessagesFailure,
    getMessagesSuccess,
    loadMoreMessages,
    loadMoreMessagesFailure,
    loadMoreMessagesSuccess,
    createMessage,
    createMessageFailure,
    createMessageSuccess,
    readMessage,
    readMessageFailure,
    readMessageSuccess,
    deleteMessage,
    deleteMessageFailure,
    deleteMessageSuccess,
    pushMessage,
    updateMessagesStatus,
    getUnreadChatsDetails,
    getUnreadChatsDetailsFailure,
    getUnreadChatsDetailsSuccess,
    confirmRequestNewClientInChat,
    confirmRequestNewClientInChatSuccess,
    confirmRequestNewClientInChatFailure,
    requestNewClientModal,
    updateClientModal,
    connectExistingClientInChat,
    connectExistingClientInChatSuccess,
    connectExistingClientInChatChatFailure,
  },
  reducer: chatsReducer,
} = chats;
