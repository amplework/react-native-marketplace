import React from 'react';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Alpha } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { NotificationUserInfo } from 'types/notifications';

type Props = {
  user?: NotificationUserInfo;
};

const NotificationBody: React.FC<Props> = ({ user, children }) =>
  user ? (
    <>
      <Avatar src={user.avatar} size={40} mr={10} />
      <Box flex>
        <Box flex row ai="center">
          <Paragraph size="s">{user.name}</Paragraph>
          {user?.isConnected && <Alpha size={12} />}
        </Box>
        {children}
      </Box>
    </>
  ) : (
    <>{children}</>
  );

export { NotificationBody };
