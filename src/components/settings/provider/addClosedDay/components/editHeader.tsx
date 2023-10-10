import I18n from 'locales';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'shared/icon';

import { styles } from '../styles';

interface Props {
  onClose: () => void;
}

const EditHeader: React.FC<Props> = ({ onClose }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>
      {'Add closed days'}
    </Text>
    <TouchableOpacity onPress={onClose}>
      <Icon src={require('assets/global/close.png')} />
    </TouchableOpacity>
  </View>
);

export { EditHeader };