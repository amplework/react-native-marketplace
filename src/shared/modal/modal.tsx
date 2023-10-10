import React from 'react';
import { Modal as RNModal, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { modalSelectors } from 'store/entities/modal';
import COLORS from 'utils/colors';

import { modalStyles as S } from './style';

const Modal: React.FC = ({ children }) => {
  const isOpened = useSelector(modalSelectors.isOpened);

  return isOpened ? (
    <RNModal transparent animationType="fade">
      <View style={S.overlay}>
        <Box w="100%" r={10} bc={COLORS.white}>
          {children}
        </Box>
      </View>
    </RNModal>
  ) : null;
};

export { Modal };
