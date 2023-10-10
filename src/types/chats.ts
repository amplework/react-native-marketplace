export type Chat = {
  id: number;
  participants: Participant[];
  lastMessage: Message | null;
};

export type Participant = {
  id: number;
  firstName: string;
  lastName: string | null;
  photo: string | null;
  isConnected: boolean;
};

export type Message = {
  id: number;
  text: string;
  status: MessageStatus;
  authorId: number;
  sentAt: string;
};

type MessageStatus = 'sent' | 'read' | 'pending' | 'error';

export type GetChatsRequest = {
  query?: string;
  offset?: number;
};

export type CreateChatAction = {
  participantId: number;
  query?: string;
  onSuccess?: (chat: Chat) => void;
};

export type DeleteChatAction = {
  id: number;
  query: string;
};

export type GetMessagesRequest = {
  id: number;
  beforeKey?: number | null;
};

export type CreateMessageRequest = {
  id: number;
  messageId: number;
  authorId: number;
  text: string;
};

export type CreateMessageResponse = {
  messageId: number;
  message: Message;
};

export enum ChatSocketEvent {
  chatUpdated = 'chatUpdated',
  newMessage = 'newMessage',
  readMessage = 'readMessage',
  unreadChatsUpdated = 'unreadChatsUpdated',
}

export type ReadMessageEvent = {
  id: number;
  chatId: number;
};

export type UnreadChatsDetails = {
  unreadCount: number;
};

export type RequestNewClient = {
  client: any,
  clientId: number,
  chatId: number,
}

export type ConnectExistingClient = {
  id: number,
  clientId: number,
  shouldCopyData: boolean,
  chatId: number,
}

export type RequestNewClientModal = {
  show: boolean,
}
