import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';

import { buttonStyles as S } from './style';

export interface Props {
  text?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: any;
  textStyle?: any;
  imageStyle?: IMargin;
  image?: any;
  lines?: number;
  size?: number;
  loadingColor?: string;
}

const Button: React.FC<Props> = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  buttonStyle,
  textStyle,
  imageStyle,
  image,
  lines,
  size,
  loadingColor
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled || loading}
    style={[S.button, buttonStyle]}
  >
    {loading ? (
      <ActivityIndicator size="small" color={loadingColor || COLORS.white} style={S.loader} />
    ) : (
      <>
        {image && <Icon src={image} size={size ? size : 20} mr={8} {...imageStyle} />}
        {text && (
          <Text numberOfLines={lines} style={[S.text, textStyle]}>
            {text}
          </Text>
        )}
      </>
    )}
  </TouchableOpacity>
);

export default Button;
