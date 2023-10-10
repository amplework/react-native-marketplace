import { CreateMessageRequest, Message } from 'types/chats';

export const formatMessagePreview = (
  request: CreateMessageRequest,
): Message => ({
  id: request.messageId,
  text: request.text,
  sentAt: new Date().toISOString(),
  status: 'pending',
  authorId: request.authorId,
});
