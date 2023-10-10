import React from 'react';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { IMargin } from 'utils/styles';

import { styles } from '../style';

interface Props extends IMargin {
  title: string;
  onPress?: () => void;
  active?: boolean;
}

const PillButton: React.FC<Props> = ({ title, active, onPress, mr }) => (
  <Box mr={mr}>
    <Button
      text={title}
      onPress={onPress}
      buttonStyle={[styles.pillButton, active && styles.pillButtonActive]}
      textStyle={[styles.pillButtonText, active && styles.pillButtonTextActive]}
    />
  </Box>
);

export { PillButton };
