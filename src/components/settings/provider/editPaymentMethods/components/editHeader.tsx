import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { styles } from '../style';

interface Props {
  edit: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const EditHeader: React.FC<Props> = ({ edit, onDelete, onClose }) => (
  <View style={styles.header}>
    <Paragraph flex centered size="l" type="bold" ml={edit ? 80 : 30}>
      {edit
        ? I18n.t('paymentMethods.editPaymentMethod')
        : I18n.t('paymentMethods.newPaymentMethod')}
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

export { EditHeader };
