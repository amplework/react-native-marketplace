import { StackScreenProps } from '@react-navigation/stack';
import { TasksItem } from 'components/tasks/components/tasksItem';
import { TasksSection } from 'components/tasks/components/tasksSection';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Datepicker } from 'shared/datepicker';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import {
  resetSearchResults,
  searchTasks,
  tasksSelectors,
  toggleComplete,
} from 'store/entities/tasks';
import { Task } from 'types/tasks';
import COLORS from 'utils/colors';
import _ from 'lodash';
import { days, formatDate, parseDate } from 'utils/dates';

import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const SearchTasks: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [fromDate, setFromDate] = useState(parseDate());
  const [toDate, setToDate] = useState(parseDate());

  const tasks = useSelector(tasksSelectors.searchResults);
  
  const non_duplidated_tasks = _.uniqBy(tasks, 'date');

  const loading = useSelector(tasksSelectors.searchLoading);

  const dispatch = useDispatch();

  const resetSearch = useCallback(() => {
    setQuery('');
    setFromDate(parseDate());
    setToDate(parseDate());

    dispatch(resetSearchResults());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={I18n.t('tasks.searchTasks')} />,
      headerRight: () => (
        <TouchableOpacity onPress={resetSearch} style={styles.resetButton}>
          <Paragraph size="s" type="book">
            {I18n.t('tasks.resetSearch')}
          </Paragraph>
        </TouchableOpacity>
      ),
    });
  }, [navigation, resetSearch]);

  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  useEffect(() => {
    if (toDate && days.isSameOrAfter(fromDate, toDate)) {
      setToDate(fromDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate]);

  const handleSearch = () =>
    dispatch(
      searchTasks({
        query,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );

  const toggleCompleteStatus =
    ({ id, date }: Task) =>
    (value: boolean) =>
      dispatch(toggleComplete({ id, date, isCompleted: value }));

  const handleEdit = () => {
    Navigator.navigate('SearchTasks');

    handleSearch();
  };

  const navigateToDetails =
    ({ id, date }: Task) =>
    () =>
      Navigator.navigate('TaskDetails', {
        id,
        date,
        onEdit: handleEdit,
        onDelete: handleSearch,
      });

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <Box pv={20} ph={24} bc={COLORS.white}>
        <Field
          value={query}
          onChange={setQuery}
          label={I18n.t('tasks.fields.search')}
          endAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          mb={16}
        />
        <Box row jc="space-between" mb={20}>
          <Datepicker
            flex
            title={formatDate(fromDate, { utc: false })}
            label={I18n.t('tasks.startDate')}
            required
            date={fromDate}
            onConfirm={setFromDate}
            icon={require('assets/global/calendar.png')}
            mr={15}
          />
          <Datepicker
            flex
            title={formatDate(toDate, { utc: false })}
            label={I18n.t('tasks.endDate')}
            required
            date={toDate}
            minimumDate={fromDate}
            onConfirm={setToDate}
            icon={require('assets/global/calendar.png')}
          />
        </Box>
        <Button
          text={I18n.t('tasks.search')}
          onPress={handleSearch}
          loading={loading}
          buttonStyle={styles.searchButton}
        />
      </Box>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <TasksSection
          data={non_duplidated_tasks}
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

export { SearchTasks };
