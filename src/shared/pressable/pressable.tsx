import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IFlexible, IMargin, IPadding } from 'utils/styles';

type Props = IFlexible &
  IMargin &
  IPadding & {
    onPress?: () => void;
    disabled?: boolean;
    r?: number;
    opacity?: number;
    bc?: string;
  };

const Pressable: React.FC<Props> = ({
  onPress,
  disabled = false,
  flex = false,
  row = false,
  wrap = false,
  jc,
  ai,
  opacity,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
  ph = 0,
  pv = 0,
  pt = 0,
  pr = 0,
  pb = 0,
  pl = 0,
  r,
  bc,
  children,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={{
      flex: flex ? 1 : undefined,
      flexDirection: row ? 'row' : 'column',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      justifyContent: jc,
      alignItems: ai,
      marginTop: mv || mt,
      marginRight: mh || mr,
      marginBottom: mv || mb,
      marginLeft: mh || ml,
      paddingTop: pv || pt,
      paddingRight: ph || pr,
      paddingBottom: pv || pb,
      paddingLeft: ph || pl,
      backgroundColor: bc,
      borderRadius: r,
      opacity,
    }}
  >
    {children}
  </TouchableOpacity>
);

export { Pressable };
