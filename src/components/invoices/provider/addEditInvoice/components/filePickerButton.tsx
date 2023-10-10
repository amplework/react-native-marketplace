import I18n from 'locales';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

import { styles } from '../style';

interface Props {
  onPick: () => void;
}

const FilePickerButton: React.FC<Props> = ({ onPick }) => (
  <TouchableOpacity onPress={onPick} style={styles.filepicker}>
    <Icon src={require('assets/global/camera.png')} mb={8} />
    <Paragraph size="xs" type="bold" color={COLORS.brightBlue}>
      {I18n.t('invoices.addPhoto')}
    </Paragraph>
  </TouchableOpacity>
);

export { FilePickerButton };
