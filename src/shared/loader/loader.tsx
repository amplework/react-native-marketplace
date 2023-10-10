import React from 'react';
import Modal from 'react-native-modal';
import { Box } from 'shared/box';
import COLORS from 'utils/colors';

import { Spin } from './spin';

interface Props {
  loading?: boolean;
}

const Loader: React.FC<Props> = ({ loading = false }) => (
  <Modal
    isVisible={loading}
    useNativeDriver
    animationIn="fadeIn"
    animationOut="fadeOut"
    animationInTiming={400}
    animationOutTiming={400}
    backdropColor={COLORS.transparent}
  >
    <Box flex jc="center" bc={COLORS.transparent}>
      <Spin size="l" />
    </Box>
  </Modal>
);

export { Loader };
