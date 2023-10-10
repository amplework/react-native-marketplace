import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

interface Props {
  onClose: () => void;
}

const EditHeader: React.FC<Props> = ({ onClose }) => (
  <View style={styles.header}>
    <Paragraph flex centered size="l" type="bold" ml={30}>
      {'Add Address'}
    </Paragraph>
    <Icon src={require('assets/global/close.png')} onPress={onClose} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
})

export { EditHeader };