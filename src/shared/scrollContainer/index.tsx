import React from 'react';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './style';

export interface Props {
  styleKeyboard?: any;
  styleExtra?: any;
  extraScroll?: number;
}

const ScrollContainer: React.FC<Props> = (props) => {
  const { styleExtra, styleKeyboard, extraScroll } = props;
  return (
    <KeyboardAwareScrollView
      style={[styles.keyboardStyle, styleKeyboard]}
      showsVerticalScrollIndicator={false}
      extraScrollHeight={extraScroll || 100}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.extraBottom, styleExtra]}
        style={styles.scrollStyle}
      >
        {props.children}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default ScrollContainer;
