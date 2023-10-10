import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

import { chatStyles as S } from '../style';

const UnreadBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={S.unreadBar}>
      <Paragraph color={COLORS.clearBlue}>
        {t(translations.chats.chat.unreadMessages)}
      </Paragraph>
    </View>
  );
};

export { UnreadBar };
