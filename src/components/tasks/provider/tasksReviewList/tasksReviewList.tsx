import { StackScreenProps } from '@react-navigation/stack';
import { TasksItem } from 'components/tasks/components/tasksItem';
import { TasksSection } from 'components/tasks/components/tasksSection';
import { RootStackParamList } from 'index';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { Loader } from 'shared/loader';
import { Separator } from 'shared/separator';
import {
  getReviewTasks,
  tasksSelectors,
  toggleComplete,
} from 'store/entities/tasks';
import { getTasksReview } from 'store/entities/tasks/slice';
import { Task } from 'types/tasks';
import COLORS from 'utils/colors';

import { styles } from './styles';

interface Props
  extends StackScreenProps<RootStackParamList, 'TasksReviewList'> {}

const TasksReviewList: React.FC<Props> = ({ navigation, route }) => {
  const { title, range, fromDate, toDate } = route.params;

  const tasks = useSelector(tasksSelectors.reviewTasks);
  const loading = useSelector(tasksSelectors.reviewLoading);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={title} />,
    });
  }, [navigation, title]);

  const fetchReviewTasks = useCallback(() => {
    dispatch(getReviewTasks({ fromDate, toDate }));
  }, [dispatch, fromDate, toDate]);

  useEffect(() => {
    fetchReviewTasks();
  }, [fetchReviewTasks]);

  const toggleCompleteStatus =
    ({ id, date }: Task) =>
    (value: boolean) =>
      dispatch(toggleComplete({ id, date, isCompleted: value }));

  const handleEdit = () => {
    Navigator.navigate('TasksReviewList', route.params);

    fetchReviewTasks();
  };

  const handleDelete = () => {
    fetchReviewTasks();
    dispatch(getTasksReview());
  };

  const navigateToDetails =
    ({ id, date }: Task) =>
    () =>
      Navigator.navigate('TaskDetails', {
        id,
        date,
        onEdit: handleEdit,
        onDelete: handleDelete,
      });

  return loading ? (
    <Loader loading />
  ) : (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TasksSection
          data={tasks}
          range={range}
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
    </SafeContainer>
  );
};

export { TasksReviewList };
