import React from 'react';
import { KeyboardAvoidingView, Modal, View, Dimensions } from 'react-native';
import { isIOS } from 'utils/device';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { styles } from './style';

type Size = 'xs' | 's' | 'm' | 'l';

type Props = {
  size?: Size;
  modalStyle?: any;
  containerStyle?: any;
  behavior?: any;
  keyboardVerticalOffset?: any;
};

const BottomSheet: React.FC<Props> = ({ size = 'm', children, modalStyle, containerStyle, behavior, keyboardVerticalOffset }) => (
  <Modal animationType="slide" transparent statusBarTranslucent={true}>
    <KeyboardAvoidingView
      behavior={behavior ?? (isIOS ? 'padding' : 'height')}
      style={styles.keyboardView}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={[styles.modal, modalStyle]}>
        <View style={[styles.container, { height: getHeight(size) }, containerStyle]}>
          {children}
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export { BottomSheet };

const getHeight = (size: Size) => {
  switch (size) {
    case 'xs':
      return '33%';
    case 's':
      return '50%';
    case 'm':
      return '80%';
    case 'l':
      return '92%';
  }
};
