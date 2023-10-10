import React from 'react';
import {
  Image as RNImage,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { IMargin } from 'utils/styles';

import { iconsStyles as S } from './style';

export interface IconProps extends IMargin {
  src: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  hitSlop?: any;
}

const Icon: React.FC<IconProps> = ({ onPress, hitSlop, disabled = false, ...props }) =>
  onPress ? (
    <TouchableOpacity hitSlop={hitSlop} onPress={onPress} disabled={disabled}>
      <Image {...props} />
    </TouchableOpacity>
  ) : (
    <Image {...props} />
  );

interface ImageProps extends IMargin {
  src: ImageSourcePropType;
  size?: number;  
  style?:any;
}

const Image: React.FC<ImageProps> = ({
  src,
  size = 24,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
  color,
  bg,
  style,
}) => (
  <RNImage
    source={src}
    style={[
      S.icon,
      {
        width: size,
        height: size,
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
        tintColor: color,
        backgroundColor: bg,
      },
      style
    ]}
  />
);

export { Icon };
