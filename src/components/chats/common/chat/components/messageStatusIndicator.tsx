import React from 'react';
import { ActivityIndicator } from 'react-native';
import { IMessage } from 'react-native-gifted-chat';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';

type Props = {
  message: IMessage;
};

const MessageStatusIndicator: React.FC<Props> = ({ message }) => {
  if (message.pending) {
    return <ActivityIndicator color={COLORS.white} />;
  }

  if (message.sent) {
    return <Icon src={require('assets/global/tickWhite.png')} size={20} />;
  }

  if (message.received) {
    return (
      <Icon src={require('assets/global/doubleTickWhite.png')} size={20} />
    );
  }

  return <Icon src={require('assets/global/errorOutline.png')} size={20} />;
};

export { MessageStatusIndicator };
