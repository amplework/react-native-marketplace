import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'shared/icon';

import { styles } from '../style';

interface Props {
  onClose: () => void;
}

const Header: React.FC<Props> = ({ onClose }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>
      {'Select Country Code'}
    </Text>
    <TouchableOpacity onPress={onClose}>
      <Icon src={require('assets/global/close.png')} />
    </TouchableOpacity>
  </View>
);

export { Header };