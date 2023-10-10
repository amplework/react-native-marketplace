import React from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './style';

export interface Props {
  safeStyle?: any;
  containerStyle?: any;
}

const SafeContainer: React.FC<Props> = (props) => {
  const { safeStyle, containerStyle } = props;
  return (
    <SafeAreaView style={[styles.safe, safeStyle]}>
      <View style={[styles.container, containerStyle]}>{props.children}</View>
    </SafeAreaView>
  );
};

export default SafeContainer;
