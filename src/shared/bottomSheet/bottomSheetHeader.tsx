import React from 'react';
import { View } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { styles } from './style';

interface Props {
  title?: string;
  onClose: () => void;
}

const BottomSheetHeader: React.FC<Props> = ({ title, onClose }) => (
  <View style={styles.header}>
    <Paragraph flex centered size="l" type="bold" ml={30}>
      {title}
    </Paragraph>
    <Icon src={require('assets/global/close.png')} onPress={onClose} />
  </View>
);

export { BottomSheetHeader };
