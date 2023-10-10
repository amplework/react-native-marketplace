import React from 'react';
import { View } from 'react-native';
import { Box } from 'shared/box';
import CheckBox from 'shared/checkbox';
import { DAYS } from 'utils/constants';
import { Weekday } from 'utils/dates';

import { styles } from './styles';

interface Props {
  days: Weekday[];
  onChange: (days: Weekday[]) => void;
  styleDaysContainer?: any;
}

const DaysPicker: React.FC<Props> = ({ days, onChange, styleDaysContainer }) => {
  const selectDay = (day: Weekday) => onChange([...days, day]);

  const deselectDay = (pickedDay: string) =>
    onChange(days.filter((day) => day !== pickedDay));

  const toggleWorkingDay = (value: Weekday) => (checked: boolean) =>
    checked ? selectDay(value) : deselectDay(value);

  return (
    <View style={[styles.daysSection, styleDaysContainer]}>
      {[DAYS.slice(0, 4), DAYS.slice(4)].map((daysColumn, index) => (
        <Box key={index} flex>
          {daysColumn.map(({ name, value }) => (
            <CheckBox
              key={value}
              checked={days.includes(value)}
              onChange={toggleWorkingDay(value)}
              label={name}
              styleContainer={styles.dayCheckbox}
              styleLabel={styles.textBook}
            />
          ))}
        </Box>
      ))}
    </View>
  );
};

export { DaysPicker };