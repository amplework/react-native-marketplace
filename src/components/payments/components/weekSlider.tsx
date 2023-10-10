import React from 'react';
import { View } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

import { formatTasksRangeDate } from '../helpers/dates';
import { styles } from '../style';

interface Props {
  start: Date;
  end: Date;
  onNext: () => void;
  onPrevious: () => void;
}

const WeekSlider: React.FC<Props> = ({ start, end, onNext, onPrevious }) => (
  <Box pv={16} ph={20} bc={COLORS.white}>
    <View style={styles.weekSlider}>
      <Icon
        src={require('assets/global/sliderLeft.png')}
        onPress={onPrevious}
        mh={8}
      />
      <Paragraph size="s" color={COLORS.orange}>
        {formatTasksRangeDate(start, end)}
      </Paragraph>
      <Icon
        src={require('assets/global/sliderRight.png')}
        onPress={onNext}
        mh={8}
      />
    </View>
  </Box>
);

export { WeekSlider };
