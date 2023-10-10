import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { IMargin, shadow } from 'utils/styles';

import { twinCounterStyles as S } from './style';

type TwinCounterProps = IMargin & {
  bordered?: boolean;
  children: [ReactNode, ReactNode];
};

const TwinCounter: React.FC<TwinCounterProps> = ({
  bordered = false,
  children,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}) => (
  <View
    style={[
      S.twinCounter,
      bordered ? S.border : shadow(),
      {
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      },
    ]}
  >
    {children[0]}
    <Separator vertical mh={20} />
    {children[1]}
  </View>
);

type TwinCounterBarProps = {
  label: string;
  adornment?: ReactNode;
};

const TwinCounterBar: React.FC<TwinCounterBarProps> = ({
  adornment,
  label,
  children,
}) => (
  // <Box flex>
  <Box>
    <Paragraph size="s" type="book" mb={4}>
      {label}
    </Paragraph>
    <Box row ai="flex-end">
      {adornment}
      <Paragraph size="xxl">{children}</Paragraph>
    </Box>
  </Box>
);

const Sign: React.FC = ({ children }) => <Text style={S.sign}>{children}</Text>;

export { Sign, TwinCounter, TwinCounterBar };
