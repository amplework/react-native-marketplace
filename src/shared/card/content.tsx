import React from 'react';
import { View } from 'react-native';
import { Box } from 'shared/box';
import { IFlexible } from 'utils/styles';

import { cardStyles as S } from './style';

type Size = 'm' | 'l';

type CardBodyProps = IFlexible & {
  size?: Size;
};

const CardBody: React.FC<CardBodyProps> = ({
  flex,
  row,
  jc,
  ai,
  size = 'm',
  children,
}) => (
  <Box
    flex={flex}
    row={row}
    jc={jc}
    ai={ai}
    ph={getCardBodyPadding(size)}
    pv={getCardBodyPadding(size)}
  >
    {children}
  </Box>
);

export { CardBody };

type CardHeaderProps = IFlexible & {
  size?: Size;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  flex = false,
  row = false,
  jc,
  ai,
  size = 'm',
  children,
}) => (
  <View
    style={[
      S.cardHeader,
      {
        flex: flex ? 1 : 0,
        flexDirection: row ? 'row' : 'column',
        justifyContent: jc,
        alignItems: ai,
      },
      getCardHeaderSpacing(size),
    ]}
  >
    {children}
  </View>
);

export { CardHeader };

type CardFooterProps = {
  size?: Size;
};

const CardFooter: React.FC<CardFooterProps> = ({ size = 'm', children }) => (
  <View style={[S.cardFooter, getCardFooterSpacing(size)]}>{children}</View>
);

export { CardFooter };

const getCardBodyPadding = (size: Size) => {
  switch (size) {
    case 'm':
      return 12;
    case 'l':
      return 16;
  }
};

const getCardHeaderSpacing = (size: Size) => {
  switch (size) {
    case 'm':
      return {
        marginLeft: 12,
        paddingTop: 12,
        paddingRight: 12,
      };
    case 'l':
      return {
        marginLeft: 16,
        paddingTop: 16,
        paddingRight: 16,
      };
  }
};

const getCardFooterSpacing = (size: Size) => {
  switch (size) {
    case 'm':
      return {
        marginLeft: 12,
        paddingBottom: 12,
        paddingRight: 12,
      };
    case 'l':
      return {
        marginLeft: 16,
        paddingBottom: 16,
        paddingRight: 16,
      };
  }
};
