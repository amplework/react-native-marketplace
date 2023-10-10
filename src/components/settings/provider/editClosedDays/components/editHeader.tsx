import I18n from 'locales';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'shared/icon';

import { styles } from '../style';

interface Props {
  deletable?: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const EditHeader: React.FC<Props> = ({ deletable, onClose, onDelete }) => (
  <View style={styles.header}>
    <Text style={[styles.headerText, deletable && styles.extraPadding]}>
      {I18n.t('closedDays.edit')}
    </Text>
    {deletable && (
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
