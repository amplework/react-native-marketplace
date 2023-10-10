import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Card, CardBody } from 'shared/card';
import { Alpha, Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Chat } from 'types/chats';
import { getFullName } from 'utils/strings';

import { formatChatDate } from '../helpers/dates';

type Props = {
  chat: Chat;
  onPress: (chat: Chat) => () => void;
};

const ChatsItem: React.FC<Props> = ({ chat, onPress }) => {
  const { lastMessage, participants } = chat;
  const [participant] = participants;

  const { t } = useTranslation();

  const isUnread =
    lastMessage?.status === 'sent' && lastMessage.authorId === participant.id;

  return (
    <Card onPress={onPress(chat)} spacing="both">
      <CardBody row ai="center" size="l">
        <Avatar src={participant.photo} size={40} mr={8} />
        <Box flex>
          <Box row jc="space-between" ai="center">
            <Box flex row ai="center" mr={30}>
              <Paragraph lines={1}>{getFullName(participant)}</Paragraph>
              {participant.isConnected && <Alpha size={12} />}
              {isUnread && (
                <Icon src={require('assets/global/oval.png')} size={8} ml={6} />
              )}
            </Box>
            {lastMessage && (
              <Paragraph size="xs" type="book">
                {formatChatDate(new Date(lastMessage.sentAt))}
              </Paragraph>
            )}
          </Box>
          <Paragraph size="s" type="book" lines={1}>
            {lastMessage?.text || t(translations.chats.noMessagePlaceholder)}
          </Paragraph>
        </Box>
      </CardBody>
    </Card>
  );
};

export { ChatsItem };
