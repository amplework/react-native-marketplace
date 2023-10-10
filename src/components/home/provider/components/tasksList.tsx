import { TasksItem } from 'components/tasks/components/tasksItem';
import { TasksSection } from 'components/tasks/components/tasksSection';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { Spin } from 'shared/loader';
import { Separator } from 'shared/separator';
import { homeSelectors } from 'store/entities/home';
import { tasksSelectors, toggleComplete } from 'store/entities/tasks';
import { Task } from 'types/tasks';
import COLORS from 'utils/colors';
import { todayOrDate } from 'utils/dates';
import _ from 'lodash';

const TasksList: React.FC = () => {
  const selectedDate = useSelector(homeSelectors.selectedDate);
  const tasks = useSelector(tasksSelectors.tasks);
  const loading = useSelector(tasksSelectors.loading);

  const non_duplidated_tasks = _.uniqBy(tasks, 'id');  

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleEdit = () => Navigator.navigate('Home');

  const navigateToAddTask = () =>
    Navigator.navigate('MoreStackNavigator', { screen: 'AddEditTask' });

  const navigateToDetails =
    ({ id, date }: Task) =>
    () =>
      Navigator.navigate('MoreStackNavigator', {
        screen: 'TaskDetails',
        params: { id, date, onEdit: handleEdit },
      });

  const toggleCompleteStatus =
    ({ id, date }: Task) =>
    (value: boolean) =>
      dispatch(toggleComplete({ id, isCompleted: value, date }));

  return (
    <Box ph={24}>
      {loading ? (
        <Spin size="l" />
      ) : (
        <TasksSection
          title={t(translations.home.nextTasks, {
            //@ts-ignore
            date: todayOrDate(selectedDate),
          })}
          range="short"
          data={non_duplidated_tasks}
          collapsible
          renderItem={(task) => (
            <TasksItem
              key={`${task.id}-${task.date}`}
              task={task}
              onPress={navigateToDetails(task)}
              onCheck={toggleCompleteStatus(task)}
            />
          )}
          addable
          onAdd={navigateToAddTask}
          ItemSeparatorComponent={() => (
            <Box pl={12}>
              <Separator color={COLORS.whiteTwo} />
            </Box>
          )}
        />
      )}
    </Box>
  );
};

export { TasksList };
