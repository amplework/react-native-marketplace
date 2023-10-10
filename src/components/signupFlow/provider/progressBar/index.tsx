import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import COLORS from 'utils/colors';

import styles from './style';

export interface Props {
  step: number;
  onBack: () => void;
  hideProgress?: boolean | undefined;
  shortProgress?: boolean | undefined;
  hideBackButtom?: boolean | undefined;
}

const ProgressBar: React.FC<Props> = (props) => {
  const { step, onBack, hideProgress, shortProgress, hideBackButtom } = props;
  const value = shortProgress
    ? step === 1
      ? 0.20
      : step === 2
      ? 0.40
      : step === 3
      ? 0.60
      : step === 4
      ? 0.80
      : 1
    : step === 1
    ? 0.16
    : step === 2
    ? 0.33
    : step === 3
    ? 0.50
    : step === 4
    ? 0.66
    : step === 5
    ? 0.83
    : 1;
  return (
    <View style={[styles.positionBar, hideProgress && styles.positionStart]}>
      {!hideBackButtom && (
        <TouchableOpacity style={styles.positionImage} onPress={onBack}>
        <Image
          source={require('assets/global/back.png')}
          style={styles.backImage}
        />
      </TouchableOpacity>
      )}
      {!hideProgress && (
        <View style={styles.positionProgress}>
          <Progress.Bar
            borderRadius={10}
            progress={value}
            width={200}
            borderColor={COLORS.white}
            color={COLORS.clearBlue}
            unfilledColor={COLORS.clearBlueOpacity}
          />
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
