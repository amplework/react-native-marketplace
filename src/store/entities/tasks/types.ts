import { Moment } from 'moment-timezone';
import { Task, TasksReview } from 'types/tasks';

export type TasksState = {
  tasks: Tasks;
};

export type Tasks = {
  fromDate: Moment;
  toDate: Moment;
  tasks: Task[];
  loading: boolean;
  task: Task | null;
  taskLoading: boolean;
  error: Error | null;
  addEditLoading: boolean;
  deleteLoading: boolean;
  review: TasksReview;
  reviewLoading: boolean;
  reviewTasks: Task[];
  searchResults: Task[];
  searchLoading: boolean;
};
