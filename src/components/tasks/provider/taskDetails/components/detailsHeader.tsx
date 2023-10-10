import I18n from 'locales';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import CheckBox from 'shared/checkbox';
import { Paragraph } from 'shared/paragraph';
import { tasksSelectors, toggleComplete } from 'store/entities/tasks';

const DetailsHeader: React.FC = () => {
  const { id, date, isCompleted, name, description } = useSelector(
    tasksSelectors.task,
  )!;

  const dispatch = useDispatch();

  const toggleCompleteStatus = (value: boolean) =>
    dispatch(toggleComplete({ id, isCompleted: value, date }));

  return (
    <Box mb={32}>
      <Box row mb={7}>
        <CheckBox
          checked={isCompleted}
          onChange={toggleCompleteStatus}
          type="primary"
        />
        <Paragraph flex size="xl" type="bold" ml={4}>
          {name}
        </Paragraph>
      </Box>
      {description && (
        <Paragraph size="s" type="book">
          {I18n.t('tasks.notes', { description })}
        </Paragraph>
      )}
    </Box>
  );
};

export { DetailsHeader };
