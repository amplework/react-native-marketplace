import React from 'react';
import { Switch } from 'react-native';
import COLORS from 'utils/colors';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<Props> = ({ checked, onChange, disabled = false }) => (
  <Switch
    value={checked}
    onValueChange={onChange}
    disabled={disabled}
    trackColor={{
      false: COLORS.battleshipGrey32,
      true: COLORS.coolGreen,
    }}
    thumbColor={COLORS.white}
    ios_backgroundColor={COLORS.battleshipGrey32}
  />
);

export { Toggle };
