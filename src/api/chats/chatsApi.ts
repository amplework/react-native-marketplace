import { ChatApi, LIMIT } from 'api';
import { ApiResponse, KeysetApiResponse, PageableApiResponse } from 'types/api';
import {
  Chat,
  CreateMessageRequest,
  GetChatsRequest,
  GetMessagesRequest,
  Message,
  UnreadChatsDetails,
} from 'types/chats';

const getChats = (params: GetChatsRequest): PageableApiResponse<Chat[]> =>
  ChatApi.get('/chats', {
    params: {
      offset: 0,
      limit: LIMIT,
      ...params,
    },
  });

const createChat = (participantId: number): ApiResponse<Chat> =>
  ChatApi.post('/chat', { participantId });

const deleteChat = (id: number): ApiResponse<void> =>
  ChatApi.delete(`/chat/${id}`);

const getChat = (id: number): ApiResponse<Chat> => ChatApi.get(`/chat/${id}`);

const getMessages = ({
  id,
  beforeKey,
}: GetMessagesRequest): KeysetApiResponse<Message[]> =>
  ChatApi.get(`/chat/${id}/messages`, { params: { limit: LIMIT, beforeKey } });

const createMessage = ({
  id,
  text,
}: CreateMessageRequest): ApiResponse<Message> =>
  ChatApi.post(`/chat/${id}/message`, { text });

const readMessage = (id: number): ApiResponse<void> =>
  ChatApi.patch(`/message/${id}/read`);

const deleteMessage = (id: number): ApiResponse<void> =>
  ChatApi.delete(`/message/${id}`);

const getUnreadChatsDetails = (): ApiResponse<UnreadChatsDetails> =>
  ChatApi.get('/chats/unread');

export const ChatsApi = {
  getChats,
  createChat,
  deleteChat,
  getChat,
  getMessages,
  createMessage,
  readMessage,
  deleteMessage,
  getUnreadChatsDetails,
};
