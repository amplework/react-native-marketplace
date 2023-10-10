import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import COLORS from 'utils/colors';
import { IMargin, margin } from 'utils/styles';

import { styles } from './style';

type Type = 'default' | 'primary';

interface Props extends IMargin {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: number;
  type?: Type;
}

const Radio: React.FC<Props> = ({
  checked = false,
  onChange,
  size = 20,
  type = 'default',
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
  children,
}) => {
  const handleChange = () => onChange && onChange(!checked);

  return (
    <TouchableOpacity
      onPress={handleChange}
      style={[
        styles.pressable,
        { ...margin(mv || mt, mh || mr, mv || mb, mh || ml) },
      ]}
    >
      <View
        style={[
          styles.radio,
          {
            height: size,
            width: size,
            borderColor: checked ? getColor(type) : COLORS.warmGrey,
            borderRadius: size / 2,
          },
        ]}
      >
        {checked && (
          <View
            style={{
              width: size / 2,
              height: size / 2,
              backgroundColor: getColor(type),
              borderRadius: size / 2,
            }}
          />
        )}
      </View>
      {children}
    </TouchableOpacity>
  );
};

export { Radio };

const getColor = (type: Type) => {
  switch (type) {
    case 'default':
      return COLORS.clearBlue;
    case 'primary':
      return COLORS.orange;
  }
};
