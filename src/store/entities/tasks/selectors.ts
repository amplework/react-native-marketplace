import { TasksState } from './types';

const all = (state: TasksState) => state.tasks;

const fromDate = (state: TasksState) => all(state).fromDate;

const toDate = (state: TasksState) => all(state).toDate;

const tasks = (state: TasksState) => all(state).tasks;

const loading = (state: TasksState) => all(state).loading;

const task = (state: TasksState) => all(state).task;

const taskLoading = (state: TasksState) => all(state).taskLoading;

const error = (state: TasksState) => all(state).error;

const addEditLoading = (state: TasksState) => all(state).addEditLoading;

const deleteLoading = (state: TasksState) => all(state).deleteLoading;

const review = (state: TasksState) => all(state).review;

const reviewLoading = (state: TasksState) => all(state).reviewLoading;

const reviewTasks = (state: TasksState) => all(state).reviewTasks;

const searchResults = (state: TasksState) => all(state).searchResults;

const searchLoading = (state: TasksState) => all(state).searchLoading;

export const tasksSelectors = {
  fromDate,
  toDate,
  tasks,
  loading,
  task,
  taskLoading,
  error,
  addEditLoading,
  deleteLoading,
  review,
  reviewLoading,
  reviewTasks,
  searchResults,
  searchLoading,
};
