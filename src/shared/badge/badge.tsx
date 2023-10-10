import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Unread } from 'shared/icon/icons';
import { IMargin } from 'utils/styles';

import { badgeStyles as S } from './style';

type Props = IMargin & {
  onPress?: () => void;
  visible?: boolean;
};

const Badge: React.FC<Props> = ({
  onPress,
  visible = true,
  children,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!onPress}
    style={[
      S.container,
      {
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      },
    ]}
  >
    {children}
    {visible && <Unread style={S.dot} height={10} width={10} />}
  </TouchableOpacity>
);

export { Badge };
