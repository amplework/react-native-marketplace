import React from 'react';
import { View } from 'react-native';
import { IMargin } from 'utils/styles';

import { detailsStyles as S } from './style';

type DetailsProps = IMargin;

const Details: React.FC<DetailsProps> = ({
  mt = 0,
  mb = 0,
  mh = 0,
  ml = 0,
  mr = 0,
  mv = 0,
  children,
}) => {
  return (
    <View
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
    </View>
  );
};

export { Details };
