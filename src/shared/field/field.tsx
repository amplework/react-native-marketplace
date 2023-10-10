import { useToggleState } from 'hooks';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardTypeOptions,
  LayoutChangeEvent,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';
import { IMargin } from 'utils/styles';

import { ErrorMessage } from './errorMessage';
import { styles } from './style';

const MINIMIZED_FONT_SIZE = 12;
const MAXIMIZED_FONT_SIZE = 14;
const LABEL_SCALE = MINIMIZED_FONT_SIZE / MAXIMIZED_FONT_SIZE;

type Size = 'm' | 'l' | 'xl';

type AutoCapitalize = 'none' | 'sentences' | 'words' | 'characters';

export interface Props extends IMargin {
  value: string;
  onChange?: (value: string) => void;
  onEndEditing?: () => void;
  onFocus?: () => void;
  label: string;
  error?: string;
  size?: Size;
  disabled?: boolean;
  secure?: boolean;
  required?: boolean;
  multiline?: boolean;
  autoCapitalize?: AutoCapitalize;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  numberOfLines?: number;
  staticLabel?: boolean;
  flex?: boolean;
  w?: string | number;
  pill?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

const Field: React.FC<Props> = ({
  value,
  onChange,
  onEndEditing,
  onFocus,
  label,
  error,
  size = 'm',
  disabled = false,
  secure = false,
  required = false,
  multiline = false,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  maxLength,
  numberOfLines,
  staticLabel = false,
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  flex = false,
  w = '100%',
  pill = false,
  startAdornment,
  endAdornment,
}) => {
  const [hide, toggleHide] = useToggleState(true);
  const [focused, setFocused] = useState(false);

  const animation = useRef(new Animated.Value(value ? 1 : 0));
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: focused || value ? 1 : 0,
      duration: 130,
      useNativeDriver: true,
    }).start();
  }, [focused, value]);

  useEffect(() => {
    if (focused && onFocus) {
      onFocus();
    }
  }, [focused, onFocus]);

  const handleFocus = () => setFocused(true);

  const handleBlur = () => setFocused(false);

  const handleLayout = (e: LayoutChangeEvent) =>
    setLabelWidth(e.nativeEvent.layout.width);

  const baseLabelTranslateX =
    labelWidth / 2 -
    (LABEL_SCALE * labelWidth) / 2 -
    (MAXIMIZED_FONT_SIZE - MINIMIZED_FONT_SIZE) * LABEL_SCALE;

  const zIndex = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const translateY = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [getTranslateY(size), isIOS ? -8 : -10],
  });

  const translateX = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [startAdornment ? 32 : 8, 8 - baseLabelTranslateX],
  });

  const scale = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, LABEL_SCALE],
  });

  return (
    <Box flex={flex} w={w} mv={mv} mh={mh} mt={mt} mr={mr} mb={mb} ml={ml}>
      <Box>
        {startAdornment && (
          <View style={styles.startAdornment}>{startAdornment}</View>
        )}
        {!staticLabel && (
          <Animated.Text
            onLayout={handleLayout}
            style={[
              styles.label,
              {
                zIndex,
                transform: [{ translateY }, { translateX }, { scale }],
                color: getColor(focused, error),
              },
            ]}
          >
            {required ? `*${label}` : label}
          </Animated.Text>
        )}
        <TextInput
          value={value}
          onChangeText={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onEndEditing={onEndEditing}
          placeholder={staticLabel ? label : ''}
          placeholderTextColor={COLORS.warmGrey}
          editable={!disabled}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          secureTextEntry={secure && hide}
          underlineColorAndroid={COLORS.transparent}
          style={[
            styles.input,
            {
              height: getHeight(size),
              borderRadius: pill ? 25 : 5,
              borderColor: getBorderColor(staticLabel, focused, error),
              paddingRight: secure || endAdornment ? 36 : 12,
              paddingLeft: startAdornment ? 36 : 12,
            },
          ]}
        />
        {secure && (
          <TouchableOpacity style={styles.endAdornment} onPress={toggleHide}>
            <Icon
              src={
                hide
                  ? require('assets/global/eyeClosed.png')
                  : require('assets/global/eye.png')
              }
              size={getIconSize(size)}
            />
          </TouchableOpacity>
        )}
        {endAdornment && (
          <TouchableOpacity style={styles.endAdornment} onPress={toggleHide}>
            {endAdornment}
          </TouchableOpacity>
        )}
      </Box>
      <ErrorMessage error={error} mt={4} />
    </Box>
  );
};

export { Field };

const getTranslateY = (size: Size) => {
  switch (size) {
    case 'm':
      return isIOS ? 12 : 10;
    case 'l':
      return isIOS ? 17 : 15;
    case 'xl':
      return isIOS ? 12 : 10;
  }
};

const getColor = (focused: boolean, error?: string) => {
  if (error) {
    return COLORS.orangeRed;
  }

  return focused ? COLORS.clearBlue : COLORS.warmGrey;
};

const getHeight = (size: Size) => {
  switch (size) {
    case 'm':
      return 42;
    case 'l':
      return 52;
    case 'xl':
      return 102;
  }
};

const getBorderColor = (
  staticLabel: boolean,
  focused: boolean,
  error?: string,
) => {
  if (staticLabel) {
    return COLORS.whiteGray;
  }

  if (error) {
    return COLORS.orangeRed;
  }

  return focused ? COLORS.clearBlue : COLORS.whiteGray;
};

const getIconSize = (size: Size) => {
  switch (size) {
    case 'm':
      return 18;
    case 'l':
      return 20;
  }
};
