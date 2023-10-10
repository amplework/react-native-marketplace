import React from 'react';
import { View } from 'react-native';
import { IFlexible, IMargin, IPadding, shadow } from 'utils/styles';

interface Props extends IFlexible, IMargin, IPadding {
  w?: number | string;
  h?: number | string;
  r?: number;
  bc?: string;
  elevation?: boolean; // Should be used with bc
  extraStyle?:any;

}

const Box: React.FC<Props> = ({
  flex = false,
  row = false,
  wrap = false,
  jc,
  ai,
  as,
  w,
  h,
  r,
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
  bc,
  elevation = false,
  children,
  extraStyle
}) => (
  <View
    style={[
      {
        flex: flex ? 1 : 0,
        flexDirection: row ? 'row' : 'column',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        justifyContent: jc,
        alignItems: ai,
        alignSelf: as,
        width: w,
        height: h,
        borderRadius: r,
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
        paddingTop: pv || pt,
        paddingRight: ph || pr,
        paddingBottom: pv || pb,
        paddingLeft: ph || pl,
        backgroundColor: bc,
      },
      elevation && shadow(),
      extraStyle
    ]}
  >
    {children}
  </View>
);

export { Box };
