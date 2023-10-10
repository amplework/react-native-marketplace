import { FormikErrors } from 'formik';
import I18n from 'locales';
import { RepeatValues, Task, TaskValues } from 'types/tasks';
import { SHORT_FIELD_MAX_LENGTH } from 'utils/constants';
import {
  isBefore,
  isToday,
  minutes,
  parseApiTime,
  parseDate,
} from 'utils/dates';
import REGEX from 'utils/regex';

export const validateTask = (initialTask?: Task) => (values: TaskValues) => {
  const NAME = I18n.t('tasks.fields.name');
  const DESCRIPTION = I18n.t('tasks.fields.description');

  const errors = {} as FormikErrors<TaskValues>;

  if (!REGEX.title.test(values.name)) {
    errors.name = I18n.t('common.errors.forbiddenSymbols', { field: NAME });
  }

  if (!values.name.trim()) {
    errors.name = I18n.t('common.errors.required', { field: NAME });
  }

  if (values.name.trim().length > SHORT_FIELD_MAX_LENGTH) {
    errors.name = I18n.t('common.errors.maxLength', {
      field: NAME,
      length: SHORT_FIELD_MAX_LENGTH,
    });
  }

  if (values.description.trim().length > SHORT_FIELD_MAX_LENGTH) {
    errors.description = I18n.t('common.errors.maxLength', {
      field: DESCRIPTION,
      length: SHORT_FIELD_MAX_LENGTH,
    });
  }

  // const canUsePastTime =
  //   initialTask && minutes.isSame(parseApiTime(initialTask.time), values.time);
  // const outOfTimeRange =
  //   isToday(values.dueDate) &&
  //   isBefore(minutes.increment(values.time), parseDate());

  // if (!canUsePastTime && !values.repeat && outOfTimeRange) {
  //   errors.time = I18n.t('tasks.errors.time');
  // }

  return errors;
};

export const validateRepeatOptions = (values: RepeatValues) => {
  const errors = {} as FormikErrors<RepeatValues>;

  if (values.repeatOption === 4 && values.weekly.days.length === 0) {
    errors.weekly = I18n.t('tasks.errors.noWeekdays');
  }

  return errors;
};
