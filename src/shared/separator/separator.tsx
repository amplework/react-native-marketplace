import React from 'react';
import { View } from 'react-native';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';

import { styles } from './style';

interface Props extends IMargin {
  vertical?: boolean;
  color?: string;
}

const Separator: React.FC<Props> = ({
  vertical = false,
  color = COLORS.whiteGray,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}) => (
  <View
    style={[
      vertical ? styles.vertical : styles.horizontal,
      {
        backgroundColor: color,
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      },
    ]}
  />
);

export { Separator };
