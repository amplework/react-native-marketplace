import React from 'react';
import { Text, View } from 'react-native';
import COLORS from 'utils/colors';

import { styles } from './style';

const MAX_HEIGHT = 36;

export type ChipType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tetriary'
  | 'success'
  | 'danger';

type Size = 'xs' | 's' | 'm';

type Props = {
  type?: ChipType;
  size?: Size;
  mr?: number;
  outline?: boolean;
  pill?: boolean;
};

const Chip: React.FC<Props> = ({
  type = 'default',
  size = 'm',
  outline = false,
  pill = false,
  children,
  mr
}) => (
  <View
    style={[
      styles.chip,
      {
        paddingVertical: getPaddingVertical(size),
        paddingHorizontal: getPaddingHorizontal(size),
        backgroundColor: outline
          ? COLORS.transparent
          : getBackgroundColor(type),
        borderColor: outline ? getBorderColor(type) : COLORS.transparent,
        borderRadius: pill ? MAX_HEIGHT / 2 : 4,
        marginRight: mr
      },
    ]}
  >
    <Text
      style={[
        styles.text,
        {
          fontSize: getFontSize(size),
          lineHeight: getLineHeight(size),
          color: getColor(type),
        },
      ]}
    >
      {children}
    </Text>
  </View>
);

export { Chip };

const getPaddingVertical = (size: Size) => {
  switch (size) {
    case 'xs':
      return 4;
    case 's':
      return 4;
    case 'm':
      return 6;
  }
};

const getPaddingHorizontal = (size: Size) => {
  switch (size) {
    case 'xs':
      return 10;
    case 's':
      return 10;
    case 'm':
      return 14;
  }
};

const getBackgroundColor = (type: ChipType) => {
  switch (type) {
    case 'default':
      return COLORS.orange10;
    case 'primary':
      return COLORS.clearBlue10;
    case 'secondary':
      return COLORS.whiteGray;
    case 'tetriary':
      return COLORS.duskyBlue10;
    case 'success':
      return COLORS.greenblue10;
    case 'danger':
      return COLORS.orangeRed10;
  }
};

const getBorderColor = (type: ChipType) => {
  switch (type) {
    case 'default':
      return COLORS.orange;
    case 'primary':
      return COLORS.clearBlue;
    case 'secondary':
      return COLORS.whiteGray;
    case 'tetriary':
      return COLORS.duskyBlue;
    case 'success':
      return COLORS.greenblue;
    case 'danger':
      return COLORS.orangeRed;
  }
};

const getFontSize = (size: Size) => {
  switch (size) {
    case 'xs':
      return 12;
    case 's':
      return 14;
    case 'm':
      return 16;
  }
};

const getLineHeight = (size: Size) => {
  switch (size) {
    case 'xs':
      return 14;
    case 's':
      return 16;
    case 'm':
      return 18;
  }
};

const getColor = (type: ChipType) => {
  switch (type) {
    case 'default':
      return COLORS.orange;
    case 'primary':
      return COLORS.clearBlue;
    case 'secondary':
      return COLORS.black60;
    case 'tetriary':
      return COLORS.duskyBlue;
    case 'success':
      return COLORS.greenblue;
    case 'danger':
      return COLORS.orangeRed;
  }
};
