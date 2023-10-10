import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import SafeContainer from 'shared/container';
import { Loader } from 'shared/loader';
import COLORS from 'utils/colors';

import { mainPageTemplateStyles as S } from './style';

type MainPageTemplateProps = {
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  safeStyle?: StyleProp<ViewStyle>;
  bc?: string;
};

const MainPageTemplate: React.FC<MainPageTemplateProps> = ({
  loading,
  containerStyle,
  safeStyle,
  bc = COLORS.whiteFour,
  children,
}) => {
  return (
    <SafeContainer
      containerStyle={[S.container, { backgroundColor: bc }, containerStyle]}
      safeStyle={[{ backgroundColor: bc }, safeStyle]}
    >
      <Loader loading={loading} />
      {children}
    </SafeContainer>
  );
};

export { MainPageTemplate };
