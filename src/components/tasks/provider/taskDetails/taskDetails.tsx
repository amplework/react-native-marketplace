import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Error } from 'shared/error';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { deleteTask, getTask, tasksSelectors } from 'store/entities/tasks';

import { DetailsCard } from './components/detailsCard';
import { DetailsHeader } from './components/detailsHeader';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList, 'TaskDetails'> {}

const TaskDetails: React.FC<Props> = ({ navigation, route }) => {
  const { id, date, onEdit, onDelete } = route.params;

  const task = useSelector(tasksSelectors.task);
  const loading = useSelector(tasksSelectors.taskLoading);
  const deleteLoading = useSelector(tasksSelectors.deleteLoading);
  const error = useSelector(tasksSelectors.error);

  const dispatch = useDispatch();

  const confirmDelete = useCallback(() => {
    alert.deletion({
      entity: I18n.t('common.entities.task'),
      message: task?.repeatFrequency ? I18n.t('tasks.deleteMessage') : null,
      onDelete: () => dispatch(deleteTask({ id, onSuccess: onDelete })),
    });
  }, [dispatch, task, id, onDelete]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () =>
        loading ? null : (
          <Icon
            src={require('assets/global/deleteGray.png')}
            onPress={confirmDelete}
            size={20}
            mr={24}
          />
        ),
    });
  }, [navigation, loading, confirmDelete]);

  const fetchTask = useCallback(() => {
    dispatch(getTask({ id, date }));
  }, [dispatch, id, date]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const navigateToEditTask = () =>
    Navigator.navigate('AddEditTask', { task, onEdit });

  const editable = !task?.isCompleted || !!task.repeatFrequency;

  if (error) {
    return <Error onRetry={fetchTask} />;
  }

  return loading ? (
    <SafeContainer containerStyle={styles.container}>
      <Loader loading />
    </SafeContainer>
  ) : (
    <SafeContainer containerStyle={styles.container}>
      <Loader loading={deleteLoading} />
      <Box>
        <DetailsHeader />
        <DetailsCard />
      </Box>
      <Button
        text={I18n.t('tasks.edit')}
        onPress={navigateToEditTask}
        disabled={!editable}
        image={require('assets/global/pencilFill.png')}
        buttonStyle={!editable && styles.disabled}
      />
    </SafeContainer>
  );
};

export { TaskDetails };
