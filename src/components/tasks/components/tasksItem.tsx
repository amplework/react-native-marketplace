import I18n from 'locales';
import moment from 'moment-timezone';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box } from 'shared/box';
import CheckBox from 'shared/checkbox';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Task } from 'types/tasks';
import { dateWithoutTz, isToday } from 'utils/dates';

import { styles } from '../style';
import { useSelector } from 'react-redux';
import { userSelectors } from 'store/entities/user';
import { isIOS } from 'utils/device';

interface Props {
  task: Task;
  onPress: () => void;
  onCheck: (checked: boolean) => void;
}

const TasksItem: React.FC<Props> = ({ task, onPress, onCheck }) => {
  const userDetail = useSelector(userSelectors.user);
  const providerOffset = userDetail?.utcOffset;

  const taskDueDate = dateWithoutTz(task.date, providerOffset ? providerOffset : 0);

  return (
    <View style={styles.taskCard}>
      <CheckBox
        checked={task.isCompleted}
        onChange={onCheck}
        type="primary"
        styleLabel={styles.checkbox}
      />
      <TouchableOpacity onPress={onPress} style={styles.taskCardTouchable}>
        <Box flex ml={4}>
          <Paragraph mb={8}>{task.name}</Paragraph>
          <Paragraph size="s" type="book">
            {isToday(task.date)
              ? I18n.t('tasks.today')
              : I18n.t('tasks.date', {
                  date: moment(moment(task.date).toDate(), 'YYYY-MM-DD').format('Do MMM YYYY'),
                })}
            {I18n.t('tasks.time', {
              time: moment.utc(task.time, 'HH:mm').local().format('LT'),
              // time: formatTime(task.time, { format: DATE_FORMATS.apiTime }),
            })}
          </Paragraph>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </TouchableOpacity>
    </View>
  );
};

export { TasksItem };
