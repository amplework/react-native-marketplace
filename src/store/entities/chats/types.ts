import { Chat, Message, Participant, UnreadChatsDetails } from 'types/chats';

export type ChatsState = {
  chats: ChatsSlice;
};

export type ChatsSlice = {
  chats: Chat[];
  loading: boolean;
  loadingMore: boolean;
  offset: number;
  total: number;
  createLoading: boolean;
  chat: Chat | null;
  participant: any;
  chatLoading: boolean;
  deleteChatLoading: boolean;
  messages: Message[];
  messagesLoading: boolean;
  messagesLoadingMore: boolean;
  lastKey: number | null;
  messagesTotal: number;
  requestNewClientModal: boolean;
  updateClientModal: boolean;
  unreadChatsDetails: UnreadChatsDetails;
};
