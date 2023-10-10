import { ChatsState } from './types';

const all = (state: ChatsState) => state.chats;

const chats = (state: ChatsState) => all(state).chats;

const loading = (state: ChatsState) => all(state).loading;

const loadingMore = (state: ChatsState) => all(state).loadingMore;

const offset = (state: ChatsState) => all(state).offset;

const total = (state: ChatsState) => all(state).total;

const createLoading = (state: ChatsState) => all(state).createLoading;

const chat = (state: ChatsState) => all(state).chat;

const chatLoading = (state: ChatsState) => all(state).chatLoading;

const deleteChatLoading = (state: ChatsState) => all(state).deleteChatLoading;

const messages = (state: ChatsState) => all(state).messages;

const messagesLoading = (state: ChatsState) => all(state).messagesLoading;

const messagesLoadingMore = (state: ChatsState) =>
  all(state).messagesLoadingMore;

const lastKey = (state: ChatsState) => all(state).lastKey;

const messagesTotal = (state: ChatsState) => all(state).messagesTotal;

const unreadChatsDetails = (state: ChatsState) => all(state).unreadChatsDetails;

const requestNewClientModalShow = (state: ChatsState) => all(state).requestNewClientModal;

const updateClientModalShow = (state: ChatsState) => all(state).updateClientModal;

export const chatsSelectors = {
  chats,
  loading,
  loadingMore,
  offset,
  total,
  createLoading,
  chat,
  chatLoading,
  deleteChatLoading,
  messages,
  messagesLoading,
  messagesLoadingMore,
  lastKey,
  messagesTotal,
  unreadChatsDetails,
  requestNewClientModalShow,
  updateClientModalShow
};
