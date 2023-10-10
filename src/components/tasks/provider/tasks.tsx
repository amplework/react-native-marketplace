import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useCallback, useLayoutEffect } from 'react';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { AddButton } from 'shared/button/add';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';

import { TasksList } from '../components/tasksList';
import { WeekSlider } from '../components/weekSlider';
import { styles } from '../style';

interface Props extends StackScreenProps<RootStackParamList> {}

const Tasks: React.FC<Props> = ({ navigation }) => {
  const navigateToReview = useCallback(
    () => Navigator.navigate('TasksReview'),
    [],
  );

  const navigateToSearch = useCallback(
    () => Navigator.navigate('SearchTasks'),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={I18n.t('tasks.header')} />,
      headerRight: () => (
        <Box row mr={24}>
          <Icon
            src={require('assets/global/performance.png')}
            onPress={navigateToReview}
            size={20}
            mr={20}
          />
          <Icon
            src={require('assets/global/search.png')}
            onPress={navigateToSearch}
            size={20}
          />
        </Box>
      ),
    });
  }, [navigation, navigateToReview, navigateToSearch]);

  const navigateToAddTask = () => Navigator.navigate('AddEditTask');

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <WeekSlider />
      <AddButton title={I18n.t('tasks.addTasks')} onPress={navigateToAddTask} />
      <TasksList />
    </SafeContainer>
  );
};

export { Tasks };
