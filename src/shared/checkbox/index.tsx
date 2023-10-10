// @ts-ignore
import RNCheckBox from '@react-native-community/checkbox';
import React from 'react';
import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import COLORS from 'utils/colors';

import styles from './style';

type Type = 'default' | 'primary';

type BoxType = 'circle' | 'square';

export interface Props {
  checked?: boolean;
  onChange?: (newValue: boolean) => void;
  onPressLabel?: () => void;
  type?: Type;
  label?: string;
  disabled?: boolean;
  boxType?: BoxType;
  arrow?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
}

const CheckBox: React.FC<Props> = ({
  checked = false,
  onChange,
  onPressLabel,
  type = 'default',
  disabled = false,
  label,
  arrow,
  styleContainer,
  styleLabel,
  boxType,
}) => {
  const toggleCheckBox = () => onChange && onChange(!checked);

  return (
    <View style={[styles.checkboxContainer, styleContainer]}>
      <RNCheckBox
        value={checked ? true : false} // do not change
        onValueChange={onChange}
        boxType={boxType || 'square'}
        disabled={arrow ? true : disabled}
        style={styles.checkbox}
        onCheckColor={COLORS.white}
        onTintColor={disabled ? COLORS.warmGrey : getColor(type)}
        onFillColor={disabled ? COLORS.warmGrey : getColor(type)}
        animationDuration={0}
      />
      {arrow ? (
        <TouchableOpacity
          onPress={arrow ? onPressLabel : toggleCheckBox}
          activeOpacity={arrow ? 0.3 : 1}
          disabled={disabled}
          style={styles.labelContainer}
        >
          <Text
            style={[
              styles.label,
              styleLabel,
              disabled && styles.disabled,
              checked && styles.strikeThorugh,
            ]}
          >
            {label}
          </Text>
          {arrow && (
            <Image
              source={require('assets/global/arrowRight.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginRight: 20,
              }}
            />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={toggleCheckBox}
          activeOpacity={1}
          disabled={disabled}
        >
          <Text style={[styles.label, styleLabel, disabled && styles.disabled]}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckBox;

const getColor = (type: Type) => {
  switch (type) {
    case 'default':
      return COLORS.clearBlue;
    case 'primary':
      return COLORS.orange;
  }
};
