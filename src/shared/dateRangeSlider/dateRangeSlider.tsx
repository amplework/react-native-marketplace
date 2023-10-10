import React from 'react';
import { View } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { formatRangeDate } from 'utils/dates';

import { dateRangeSliderStyles as S } from './style';

type Props = {
  fromDate: any;
  toDate: any;
  nextRange: () => void;
  previousRange: () => void;
};

const DateRangeSlider: React.FC<Props> = ({
  fromDate,
  toDate,
  nextRange,
  previousRange,
}) => (
  <Box pv={16} ph={20} bc={COLORS.white}>
    <View style={S.slider}>
      <Box row>
        <Icon
          src={require('assets/global/sliderLeft.png')}
          onPress={previousRange}
        />
      </Box>
      <Paragraph size="s" color={COLORS.orange}>
        {formatRangeDate(fromDate, toDate)}
      </Paragraph>
      <Box row>
        <Icon
          src={require('assets/global/sliderRight.png')}
          onPress={nextRange}
        />
      </Box>
    </View>
  </Box>
);

export { DateRangeSlider };
