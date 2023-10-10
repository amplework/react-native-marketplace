import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { TasksApi } from 'api/tasks';
import I18n from 'locales';
import moment from 'moment';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import {
  DeleteTaskPayload,
  EditTaskPayload,
  RepeatFrequency,
  Task,
} from 'types/tasks';
import {
  GetTaskRequest,
  GetTasksRequest,
  PatchCompleteStatus,
  TaskValues,
} from 'types/tasks';
import { formatApiDate, formatApiTime } from 'utils/dates';
import { capitalize } from 'utils/strings';

import { tasksSelectors } from './selectors';
import {
  createTask,
  createTaskFailure,
  createTaskSuccess,
  deleteTask,
  deleteTaskFailure,
  deleteTaskSuccess,
  editTask,
  editTaskFailure,
  editTaskSuccess,
  getReviewTasks,
  getReviewTasksFailure,
  getReviewTasksSuccess,
  getTask,
  getTaskFailure,
  getTasks,
  getTasksFailure,
  getTasksReview,
  getTasksReviewFailure,
  getTasksReviewSuccess,
  getTasksSuccess,
  getTaskSuccess,
  searchTasks,
  searchTasksFailure,
  searchTasksSuccess,
  toggleComplete,
  toggleCompleteFailure,
} from './slice';

function* handleGetTasks({ payload }: PayloadAction<GetTasksRequest>) {
  
  try {
    const { data } = yield call(TasksApi.getTasks, payload);

    yield put(getTasksSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getTasksFailure());
  }
}

function* handleGetTask({ payload }: PayloadAction<GetTaskRequest>) {
  try {
    const { data } = yield call(TasksApi.getTask, payload);
    yield put(getTaskSuccess(data));
  } catch (error: any) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getTaskFailure(new Error(error.message)));
  }
}

function* handleToggleComplete({
  payload,
}: PayloadAction<PatchCompleteStatus>) {
  try {
    yield call(TasksApi.toggleComplete, payload);
  } catch (error) {
    yield put(toggleCompleteFailure(payload));
  }
}

function* handleCreateTask({ payload }: PayloadAction<TaskValues>) {
  try {
    const fromDate: Date = yield select(tasksSelectors.fromDate);
    const toDate: Date = yield select(tasksSelectors.toDate);

    const frequency: RepeatFrequency[] = [
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'weekly',
    ];

    const repeatFrequency = frequency[payload.repeatOption];

    const repeatParams = {
      repeatFrequency: repeatFrequency,
      repeatMonth: payload.repeatMonth,
      repeatMonthDay: payload.repeatMonthDay,
      repeatWeekday: payload.repeatWeekday,
    };

    const noRepeat = {
      repeatFrequency: null,
      repeatMonth: null,
      repeatMonthDay: null,
      repeatWeekday: null,
    };    
        
    yield call(TasksApi.createTask, {
      name: payload.name,
      description: payload.description,
      dueDate: payload.repeat ? null : moment(payload?.dueDate).format('YYYY-MM-DD'),
      time: moment.utc(payload.time).format('HH:mm'),
      remindProvider: payload.remindProvider,
      ...(payload.repeat ? repeatParams : noRepeat),
    });

    toast.info(
      I18n.t('common.messages.creation', {
        entity: I18n.t('common.entities.task'),
      }),
    );

    yield put(createTaskSuccess());
    Navigator.goBack();

    yield put(
      getTasks({
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error: any) {   
    toast.info(error.message) 
    // toast.info(
    //   I18n.t('common.errors.process', {
    //     process: I18n.t('common.processes.create'),
    //     entity: I18n.t('common.entities.task'),
    //   }),
    // );

    yield put(createTaskFailure());
  }
}

function* handleEditTask({ payload }: PayloadAction<EditTaskPayload>) {
  try {
    const { id }: Task = yield select(tasksSelectors.task);
    const fromDate: Date = yield select(tasksSelectors.fromDate);
    const toDate: Date = yield select(tasksSelectors.toDate);

    const { values, onSuccess } = payload;

    const frequency: RepeatFrequency[] = [
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'weekly',
    ];

    const repeatFrequency = frequency[values.repeatOption];

    const repeatParams = {
      repeatFrequency: repeatFrequency,
      repeatMonth: values.repeatMonth,
      repeatMonthDay: values.repeatMonthDay,
      repeatWeekday: values.repeatWeekday,
    };

    const noRepeat = {
      repeatFrequency: null,
      repeatMonth: null,
      repeatMonthDay: null,
      repeatWeekday: null,
    };

    yield call(TasksApi.editTask, {
      id,
      name: values.name,
      description: values.description,
      dueDate: values.repeat ? null : moment(values?.dueDate).format('YYYY-MM-DD'),
      // time: formatApiTime(values.time, { utc: true }),
      time: moment.utc(values.time, 'HH:mm:ss').format('HH:mm'),
      remindProvider: values.remindProvider,
      ...(values.repeat ? repeatParams : noRepeat),
    });

    toast.info(
      I18n.t('common.messages.edition', {
        entity: capitalize(I18n.t('common.entities.task')),
      }),
    );

    yield put(editTaskSuccess());

    if (onSuccess) {
      yield onSuccess();
    }

    yield put(
      getTasks({
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error: any) {
    toast.info(error?.message);
    // toast.info(
    //   I18n.t('common.errors.process', {
    //     process: I18n.t('common.processes.edit'),
    //     entity: I18n.t('common.entities.task'),
    //   }),
    // );

    yield put(editTaskFailure());
  }
}

function* handleDeleteTask({ payload }: PayloadAction<DeleteTaskPayload>) {
  try {
    const fromDate: Date = yield select(tasksSelectors.fromDate);
    const toDate: Date = yield select(tasksSelectors.toDate);

    yield call(TasksApi.deleteTask, payload.id);

    toast.info(
      I18n.t('common.messages.deletion', {
        entity: capitalize(I18n.t('common.entities.task')),
      }),
    );

    yield put(deleteTaskSuccess());
    Navigator.goBack();

    if (payload.onSuccess) {
      yield payload.onSuccess();
    }

    yield put(
      getTasks({
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      }),
    );
  } catch (error) {
    toast.info(
      I18n.t('common.errors.process', {
        process: I18n.t('common.processes.delete'),
        entity: I18n.t('common.entities.task'),
      }),
    );

    yield put(deleteTaskFailure());
  }
}

function* handleGetTasksReview() {
  try {
    const { data } = yield call(TasksApi.getTasksReview);

    yield put(getTasksReviewSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getTasksReviewFailure());
  }
}

function* handleGetReviewTasks({ payload }: PayloadAction<GetTasksRequest>) {
  try {
    const { data } = yield call(TasksApi.getTasks, payload);

    yield put(getReviewTasksSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(getReviewTasksFailure());
  }
}

function* handleSearchTasks({ payload }: PayloadAction<GetTasksRequest>) {
  
  try {
    const { data } = yield call(TasksApi.getTasks, payload);
    yield put(searchTasksSuccess(data));
  } catch (error) {
    toast.info(I18n.t('common.errors.load'));

    yield put(searchTasksFailure());
  }
}

function* watchFetchRequests() {
  yield takeEvery(getTasks, handleGetTasks);
  yield takeEvery(getTask, handleGetTask);
  yield takeEvery(toggleComplete, handleToggleComplete);

  yield takeEvery(createTask, handleCreateTask);
  yield takeEvery(editTask, handleEditTask);
  yield takeEvery(deleteTask, handleDeleteTask);

  yield takeEvery(getTasksReview, handleGetTasksReview);
  yield takeEvery(getReviewTasks, handleGetReviewTasks);

  yield takeEvery(searchTasks, handleSearchTasks);
}

export function* tasksSaga() {
  yield all([fork(watchFetchRequests)]);
}
