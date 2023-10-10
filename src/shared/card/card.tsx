import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';

import { cardStyles as S } from './style';

type Spacing = 'vertical' | 'both';

interface CardProps extends IMargin {
  onPress?: () => void;
  spacing?: Spacing;
  isClickable?: boolean;
}

const Card: React.FC<CardProps> = ({
  onPress,
  spacing = 'vertical',
  isClickable = true,
  mt = 0,
  bg = COLORS.white,
  children,
}) =>
  isClickable ? (
    <TouchableOpacity
      onPress={onPress}
      style={[S.card, getCardSpacing(spacing), { marginTop: mt, backgroundColor: bg }]}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[S.card, getCardSpacing(spacing), { marginTop: mt }]}>
      {children}
    </View>
  );

export { Card };

const getCardSpacing = (spacing: Spacing) => {
  switch (spacing) {
    case 'vertical':
      return S.spacingVertical;
    case 'both':
      return S.spacingBoth;
  }
};
