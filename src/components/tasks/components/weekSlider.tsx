import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import {
  nextMonth,
  nextWeek,
  previousMonth,
  previousWeek,
  tasksSelectors,
} from 'store/entities/tasks';
import COLORS from 'utils/colors';

import { formatTasksRangeDate } from '../helpers/dates';
import { styles } from '../style';

const WeekSlider: React.FC = () => {
  const fromDate = useSelector(tasksSelectors.fromDate);
  const toDate = useSelector(tasksSelectors.toDate);

  const dispatch = useDispatch();

  const handleNextWeek = () => dispatch(nextWeek());

  const handlePreviousWeek = () => dispatch(previousWeek());

  const handleNextMonth = () => dispatch(nextMonth());

  const handlePreviousMonth = () => dispatch(previousMonth());

  return (
    <Box pv={16} ph={20} bc={COLORS.white}>
      <View style={styles.weekSlider}>
        <Box row>
          <TouchableOpacity
            onPress={handlePreviousMonth}
            style={styles.doubleArrow}
          >
            <Icon src={require('assets/global/sliderLeft.png')} mr={-16} />
            <Icon src={require('assets/global/sliderLeft.png')} />
          </TouchableOpacity>
          <Icon
            src={require('assets/global/sliderLeft.png')}
            onPress={handlePreviousWeek}
          />
        </Box>
        <Paragraph size="s" color={COLORS.orange}>
          {formatTasksRangeDate(fromDate, toDate)}
        </Paragraph>
        <Box row>
          <Icon
            src={require('assets/global/sliderRight.png')}
            onPress={handleNextWeek}
          />
          <TouchableOpacity
            onPress={handleNextMonth}
            style={styles.doubleArrow}
          >
            <Icon src={require('assets/global/sliderRight.png')} />
            <Icon src={require('assets/global/sliderRight.png')} ml={-16} />
          </TouchableOpacity>
        </Box>
      </View>
    </Box>
  );
};

export { WeekSlider };
