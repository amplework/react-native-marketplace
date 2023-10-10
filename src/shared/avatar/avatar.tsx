import React from 'react';
import { Image } from 'react-native';
import { IMargin } from 'utils/styles';

interface Props extends IMargin {
  src?: string | null;
  size: number;
  border?: string;
}

const Avatar: React.FC<Props> = ({
  src,
  size,
  border,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}) => (
  <Image
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      },
      !!border && {
        borderWidth: 2,
        borderColor: border,
      },
    ]}
    source={src ? { uri: src } : require('assets/global/defaultAvatar.jpg')}
  />
);

export { Avatar };
