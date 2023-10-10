import React from 'react';
import { Image, View } from 'react-native';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import COLORS from 'utils/colors';

import { reviewStyles as S } from './style';

type Props = {
  title: string;
  pressable?: boolean;
  onPress?: () => void;
};

const ReviewHeader: React.FC<Props> = ({
  title,
  pressable = false,
  onPress,
  children,
}) => (
  <View style={S.header}>
    <Image
      source={require('assets/backgrounds/reviewBackground.png')}
      style={S.headerImage}
    />
    {pressable ? (
      <>
        <Pressable onPress={onPress} row ai="center">
          <Paragraph size="l" type="bold" color={COLORS.white}>
            {title}
          </Paragraph>
          <Icon src={require('assets/global/arrowDownLight.png')} size={20} />
        </Pressable>
        {children}
      </>
    ) : (
      <>
        <Paragraph size="l" type="bold" color={COLORS.white}>
          {title}
        </Paragraph>
        {children}
      </>
    )}
  </View>
);

export { ReviewHeader };
