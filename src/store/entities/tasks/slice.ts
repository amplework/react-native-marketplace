import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import {
  DeleteTaskPayload,
  EditTaskPayload,
  GetTaskRequest,
  GetTasksRequest,
  PatchCompleteStatus,
  Task,
  TasksReview,
  TaskValues,
} from 'types/tasks';

import { Tasks } from './types';

const findTask = (list: Task[]) => (id: number, date: string) =>
  list.find((task) => task.id === id && task.date === date);

const initialState: Tasks = {
  fromDate: moment().startOf('week'),
  toDate: moment().endOf('week'),
  tasks: [],
  loading: false,
  task: null,
  taskLoading: true,
  error: null,
  addEditLoading: false,
  deleteLoading: false,
  review: {
    tasks: {
      currentMonthCount: 0,
      currentWeekCount: 0,
    },
  },
  reviewLoading: false,
  reviewTasks: [],
  searchResults: [],
  searchLoading: false,
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    nextWeek: (state) => {
      state.fromDate = moment(state.fromDate).add(1, 'week');
      state.toDate = moment(state.toDate).add(1, 'week');
    },
    previousWeek: (state) => {
      state.fromDate = moment(state.fromDate).add(-1, 'week');
      state.toDate = moment(state.toDate).add(-1, 'week');
    },
    nextMonth: (state) => {
      state.fromDate = moment(state.fromDate).add(1, 'month');
      state.toDate = moment(state.toDate).add(1, 'month');
    },
    previousMonth: (state) => {
      state.fromDate = moment(state.fromDate).add(-1, 'month');
      state.toDate = moment(state.toDate).add(-1, 'month');
    },
    getTasks: (state, _action: PayloadAction<GetTasksRequest>) => {
      state.loading = true;
    },
    getTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    getTasksFailure: (state) => {
      state.loading = false;
    },
    getTask: (state, _action: PayloadAction<GetTaskRequest>) => {
      state.taskLoading = true;
      state.error = null;
    },
    getTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.taskLoading = false;
      state.task = action.payload;
    },
    getTaskFailure: (state, action: PayloadAction<Error>) => {
      state.taskLoading = false;
      state.error = action.payload;
    },
    toggleComplete: (state, action: PayloadAction<PatchCompleteStatus>) => {
      const { id, date, isCompleted } = action.payload;

      const task = findTask(state.tasks)(id, date);
      const reviewTask = findTask(state.reviewTasks)(id, date);
      const searchTask = findTask(state.searchResults)(id, date);

      if (task) {
        task.isCompleted = isCompleted;
      }

      if (reviewTask) {
        reviewTask.isCompleted = isCompleted;
      }

      if (searchTask) {
        searchTask.isCompleted = isCompleted;
      }

      if (state.task) {
        state.task.isCompleted = isCompleted;
      }
    },
    toggleCompleteFailure: (
      state,
      action: PayloadAction<PatchCompleteStatus>,
    ) => {
      const { id, date, isCompleted } = action.payload;

      const task = findTask(state.tasks)(id, date);
      const reviewTask = findTask(state.reviewTasks)(id, date);
      const searchTask = findTask(state.searchResults)(id, date);

      if (task) {
        task.isCompleted = !isCompleted;
      }

      if (reviewTask) {
        reviewTask.isCompleted = !isCompleted;
      }

      if (searchTask) {
        searchTask.isCompleted = !isCompleted;
      }

      if (state.task) {
        state.task.isCompleted = !isCompleted;
      }
    },
    createTask: (state, _action: PayloadAction<TaskValues>) => {
      state.addEditLoading = true;
    },
    createTaskSuccess: (state) => {
      state.addEditLoading = false;
    },
    createTaskFailure: (state) => {
      state.addEditLoading = false;
    },
    editTask: (state, _action: PayloadAction<EditTaskPayload>) => {
      state.addEditLoading = true;
    },
    editTaskSuccess: (state) => {
      state.addEditLoading = false;
    },
    editTaskFailure: (state) => {
      state.addEditLoading = false;
    },
    deleteTask: (state, _action: PayloadAction<DeleteTaskPayload>) => {
      state.deleteLoading = true;
    },
    deleteTaskSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteTaskFailure: (state) => {
      state.deleteLoading = false;
    },
    getTasksReview: (state) => {
      state.reviewLoading = true;
    },
    getTasksReviewSuccess: (state, action: PayloadAction<TasksReview>) => {
      state.reviewLoading = false;
      state.review = action.payload;
    },
    getTasksReviewFailure: (state) => {
      state.reviewLoading = false;
    },
    getReviewTasks: (state, _action: PayloadAction<GetTasksRequest>) => {
      state.reviewLoading = true;
    },
    getReviewTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.reviewLoading = false;
      state.reviewTasks = action.payload;
    },
    getReviewTasksFailure: (state) => {
      state.reviewLoading = false;
    },
    searchTasks: (state, _action: PayloadAction<GetTasksRequest>) => {
      state.searchLoading = true;
    },
    searchTasksSuccess: (state, { payload }: PayloadAction<Task[]>) => {
      state.searchLoading = false;
      state.searchResults = payload;
    },
    searchTasksFailure: (state) => {
      state.searchLoading = false;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  actions: {
    nextWeek,
    previousWeek,
    nextMonth,
    previousMonth,
    getTasks,
    getTasksFailure,
    getTasksSuccess,
    getTask,
    getTaskFailure,
    getTaskSuccess,
    toggleComplete,
    toggleCompleteFailure,
    createTask,
    createTaskFailure,
    createTaskSuccess,
    editTask,
    editTaskFailure,
    editTaskSuccess,
    deleteTask,
    deleteTaskFailure,
    deleteTaskSuccess,
    getTasksReview,
    getTasksReviewFailure,
    getTasksReviewSuccess,
    getReviewTasks,
    getReviewTasksFailure,
    getReviewTasksSuccess,
    searchTasks,
    searchTasksFailure,
    searchTasksSuccess,
    resetSearchResults,
  },
  reducer: tasksReducer,
} = tasks;
