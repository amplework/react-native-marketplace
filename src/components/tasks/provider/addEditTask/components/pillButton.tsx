import React from 'react';
import Button from 'shared/button';

import { styles } from '../style';

interface Props {
  text: string;
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
}

const PillButton: React.FC<Props> = ({
  text,
  onPress,
  active = false,
  disabled = false,
}) => (
  <Button
    text={text}
    onPress={onPress}
    disabled={disabled}
    buttonStyle={[
      styles.pillButton,
      active && styles.pillButtonActive,
      disabled && styles.pillButtonDisabled,
    ]}
    textStyle={[
      styles.pillButtonText,
      active && styles.pillButtonTextActive,
      disabled && styles.pillButtonTextDisabled,
    ]}
  />
);

export { PillButton };
