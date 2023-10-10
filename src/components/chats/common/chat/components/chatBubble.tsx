import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BubbleProps, IMessage } from 'react-native-gifted-chat';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { theme } from 'theme';
import { Message } from 'types/chats';
import COLORS from 'utils/colors';
import { formatTime } from 'utils/dates';

import { chatStyles as S } from '../style';
import { MessageStatusIndicator } from './messageStatusIndicator';
import { UnreadBar } from './unreadBar';

type Props = BubbleProps<IMessage> & {
  firstUnread?: Message;
  onPress: (message: IMessage) => () => void;
};

const ChatBubble: React.FC<Props> = ({
  firstUnread,
  position,
  currentMessage,
  onPress,
}) => {
  const isCurrentUser = position === 'right';
  const isLastUnread = firstUnread?.id === currentMessage?._id;

  return currentMessage ? (
    <>
      {isLastUnread && <UnreadBar />}
      <TouchableOpacity
        onLongPress={onPress(currentMessage)}
        style={[
          isCurrentUser ? S.bubble : S.participantBubble,
          isLastUnread && theme.spacing.mt(40),
        ]}
      >
        <Paragraph color={isCurrentUser ? COLORS.white : COLORS.brownishGrey}>
          {currentMessage.text}
        </Paragraph>
        <Box row jc="space-between" ai="center">
          <Paragraph
            size="xs"
            type="book"
            color={isCurrentUser ? COLORS.whiteFour : COLORS.brownishGrey}
          >
            {formatTime(new Date(currentMessage.createdAt))}
          </Paragraph>
          {isCurrentUser && (
            <Box ml={8}>
              <MessageStatusIndicator message={currentMessage} />
            </Box>
          )}
        </Box>
      </TouchableOpacity>
    </>
  ) : null;
};

export { ChatBubble };
