import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IMessage } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { BottomSheet, BottomSheetHeader } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { userSelectors } from 'store/entities/user';
import COLORS from 'utils/colors';

type Props = {
  message: IMessage;
  onClose: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

const MessageSheet: React.FC<Props> = ({
  message,
  onClose,
  onCopy,
  onDelete,
}) => {
  const user = useSelector(userSelectors.user);

  const { t } = useTranslation();

  const deletable = user?.id === message.user._id;

  return (
    <BottomSheet size="xs">
      <BottomSheetHeader onClose={onClose} />
      <Box ph={32} pv={32}>
        <Pressable onPress={onCopy} row ai="center" mb={14}>
          <Icon src={require('assets/global/copy.png')} size={20} mr={8} />
          <Paragraph>{t(translations.chats.chat.copy)}</Paragraph>
        </Pressable>
        {deletable && (
          <Pressable
            onPress={onDelete}
            row
            ai="center"
            disabled={!message.sent}
            opacity={message.sent ? 1 : 0.4}
          >
            <Icon
              src={require('assets/global/deleteRed.png')}
              size={20}
              mr={8}
            />
            <Paragraph color={COLORS.orangeRed}>
              {t(translations.chats.chat.delete)}
            </Paragraph>
          </Pressable>
        )}
        {deletable && !message.sent && (
          <Paragraph size="s" type="book" mt={4}>
            {t(translations.chats.errors.deleteMessage)}
          </Paragraph>
        )}
      </Box>
    </BottomSheet>
  );
};

export { MessageSheet };
