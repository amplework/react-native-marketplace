import I18n from 'locales';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { styles } from '../style';

interface Props {
  edit: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const EditHeader: React.FC<Props> = ({ edit, onClose, onDelete }) => (
  <View style={styles.header}>
    <Paragraph ml={40} flex centered size="l" type="bold">
      {edit ? I18n.t('taxes.editTax') : I18n.t('taxes.addTax')}
    </Paragraph>
    {edit && (
      <TouchableOpacity onPress={onDelete}>
        <Icon src={require('assets/global/delete.png')} mr={16} />
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={onClose}>
      <Icon src={require('assets/global/close.png')} />
    </TouchableOpacity>
  </View>
);

export { EditHeader };
