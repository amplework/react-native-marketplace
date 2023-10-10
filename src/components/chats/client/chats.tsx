import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { AddButton } from 'shared/button/add';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Spin } from 'shared/loader';
import { MainPageTemplate } from 'shared/templates';
import { chatsSelectors } from 'store/entities/chats';
import COLORS from 'utils/colors';

import { ChatsList } from '../components/chatsList';

type Props = StackScreenProps<RootStackParamList>;

const ClientChats: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const loading = useSelector(chatsSelectors.loading);

  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={t(translations.chats.header)} />,
    });
  }, [navigation, t]);

  const navigateToAddChat = () => Navigator.navigate('AddChat', { query });

  return (
    <MainPageTemplate>
      <Box pv={20} ph={24} bc={COLORS.white}>
        <Field
          value={query}
          label={t(translations.common.fields.keyword)}
          onChange={setQuery}
          startAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          endAdornment={<Spin loading={loading} />}
        />
      </Box>
      <AddButton
        title={t(translations.chats.add)}
        onPress={navigateToAddChat}
        icon={require('assets/global/newMessage.png')}
      />
      <ChatsList query={query} />
    </MainPageTemplate>
  );
};

export { ClientChats };
