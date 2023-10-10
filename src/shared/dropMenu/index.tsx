import React from 'react';
import { Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';

import styles from './style';

export type Props<T> = IMargin & {
  placeholder?: string;
  placeholderValue?: null;
  value?: T;
  onChange: (value: T) => void;
  onDonePress?: () => void;
  onOpen?: () => void;
  items: any;
  style?: any;
  disabled?: boolean;
  error?: string;
  flex?: boolean;
  w?: string | number;
};

function DropMenu<T extends any>({
  placeholder,
  placeholderValue,
  onChange,
  items,
  value,
  onDonePress,
  style,
  onOpen,
  disabled,
  error,
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  flex = false,
  w = '100%',
}: Props<T>) {
  return (
    <Box flex={flex} w={w} mv={mv} mh={mh} mt={mt} mr={mr} mb={mb} ml={ml}>
      <RNPickerSelect
        placeholder={
          placeholder
            ? { label: placeholder, value: placeholderValue || '' }
            : {}
        }
        value={value}
        onValueChange={onChange}
        onDonePress={onDonePress}
        disabled={disabled || false}
        onOpen={onOpen}
        items={items}
        style={{
          inputAndroid: {
            ...styles.dropInput,
            ...style,
            borderColor: error ? COLORS.orangeRed : COLORS.border,
          },
          inputIOS: {
            ...styles.dropInput,
            ...style,
            borderColor: error ? COLORS.orangeRed : COLORS.border,
          },
          iconContainer: styles.positionIcon,
          placeholder: {
            color: error ? COLORS.orangeRed : COLORS.black,
          },
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() =>
          !disabled ? (
            <Image
              source={require('assets/global/chevron.png')}
              style={styles.chevronStyle}
            />
          ) : null
        }
      />
      {!!error && (
        <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
          {error}
        </Paragraph>
      )}
    </Box>
  );
}

export default DropMenu;
