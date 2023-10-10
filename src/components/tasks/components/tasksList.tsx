import { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { EmptyState } from 'shared/emptyState';
import { TasksPlaceholder } from 'shared/icon/icons';
import { Separator } from 'shared/separator';
import { getTasks, tasksSelectors, toggleComplete } from 'store/entities/tasks';
import { Task } from 'types/tasks';
import COLORS from 'utils/colors';
import _ from 'lodash';
import { formatApiDate, isToday } from 'utils/dates';

import { styles } from '../style';
import { TasksItem } from './tasksItem';
import { TasksSection } from './tasksSection';

const TasksList: React.FC = () => {
  const fromDate = useSelector(tasksSelectors.fromDate);
  const toDate = useSelector(tasksSelectors.toDate);
  const tasks = useSelector(tasksSelectors.tasks);
  const todayTasks = tasks.filter((task) => isToday(moment(task.date, 'YYYY-MM-DD').format('YYYY-MM-DD')));   

  const non_duplidated_todayTasks = _.uniqBy(todayTasks, 'id');
  const weekTasks = tasks.filter((task) => !isToday(task.date));

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getTasks({
        fromDate: formatApiDate(fromDate),
        toDate: formatApiDate(toDate),
      }),
    );
  }, [dispatch, fromDate, toDate]);

  const handleEdit = () => Navigator.navigate('Tasks');

  const navigateToDetails =
    ({ id, date }: Task) =>
    () =>
      Navigator.navigate('TaskDetails', { id, date, onEdit: handleEdit });

  const toggleCompleteStatus =
    ({ id, date }: Task) =>
    (value: boolean) =>
      dispatch(toggleComplete({ id, isCompleted: value, date }));

  const isCurrentWeek = fromDate.isSame(moment().startOf('week'), 'isoWeek');

  if (!tasks.length) {
    return (
      <EmptyState
        type="image"
        image={<TasksPlaceholder />}
        header={t(translations.tasks.placeholder.header)}
        description={t(translations.tasks.placeholder.description)}
        ph={35}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {isCurrentWeek && (
        <TasksSection
          title={t(translations.tasks.sections.today)}
          data={non_duplidated_todayTasks}
          renderItem={(task) => (
            <TasksItem
              key={`${task.id}-${task.date}`}
              task={task}
              onPress={navigateToDetails(task)}
              onCheck={toggleCompleteStatus(task)}
            />
          )}
          ItemSeparatorComponent={() => (
            <Box pl={12}>
              <Separator color={COLORS.whiteTwo} />
            </Box>
          )}
        />
      )}
      <TasksSection
        title={t(translations.tasks.sections.thisWeek)}
        range="week"
        data={weekTasks}
        renderItem={(task) => (
          <TasksItem
            key={`${task.id}-${task.date}`}
            task={task}
            onPress={navigateToDetails(task)}
            onCheck={toggleCompleteStatus(task)}
          />
        )}
        ItemSeparatorComponent={() => (
          <Box pl={12}>
            <Separator color={COLORS.whiteTwo} />
          </Box>
        )}
      />
    </ScrollView>
  );
};

export { TasksList };
