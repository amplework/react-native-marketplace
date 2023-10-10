import { IMessage } from 'react-native-gifted-chat';
import { Message } from 'types/chats';

export const adaptMessage = (message: Message): IMessage => ({
  _id: message.id,
  text: message.text,
  createdAt: new Date(message.sentAt),
  pending: message.status === 'pending',
  sent: message.status === 'sent',
  received: message.status === 'read',
  user: {
    _id: message.authorId,
  },
});
