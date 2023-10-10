import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

type Props = {
  progress: number;
  size: number;
  round?: boolean;
};

const CircularProgress: React.FC<Props> = ({
  progress,
  size,
  round = false,
}) => (
  <AnimatedCircularProgress
    fill={progress}
    size={size}
    width={3}
    tintColor={COLORS.orange}
    backgroundColor={COLORS.orange30}
  >
    {() => (
      <Paragraph size="l" type="bold">
        {round ? Math.round(progress) : progress}%
      </Paragraph>
    )}
  </AnimatedCircularProgress>
);

export { CircularProgress };
