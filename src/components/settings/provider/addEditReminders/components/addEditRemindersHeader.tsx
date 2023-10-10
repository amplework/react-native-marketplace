import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { addEditRemindersStyles as S } from '../style';

interface Props {
  edit: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const AddEditRemindersHeader: React.FC<Props> = ({
  edit,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <View style={S.header}>
      <Paragraph flex centered size="l" type="bold" ml={edit ? 80 : 30}>
        {t(translations.reminders.reminderSetting)}
      </Paragraph>
      {edit && (
        <Icon
          src={require('assets/global/delete.png')}
          onPress={onDelete}
          mr={16}
        />
      )}
      <Icon src={require('assets/global/close.png')} onPress={onClose} />
    </View>
  );
};

export { AddEditRemindersHeader };
