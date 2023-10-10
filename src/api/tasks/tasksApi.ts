import { Api } from 'api';
import { ApiResponse } from 'types/api';
import {
  CreateTaskRequest,
  EditTaskRequest,
  GetTaskRequest,
  GetTasksRequest,
  PatchCompleteStatus,
  Task,
  TasksReview,
} from 'types/tasks';

const getTasks = (params: GetTasksRequest): ApiResponse<Task[]> =>
  Api.get('/tasks', { params });

const getTask = ({ id, date }: GetTaskRequest): ApiResponse<Task> =>
  Api.get(`/task/${id}`, { params: { date } });

const toggleComplete = ({
  id,
  isCompleted,
  date,
}: PatchCompleteStatus): ApiResponse<void> =>
  Api.patch(`/task/${id}/is-completed`, { isCompleted, date });

const createTask = (data: CreateTaskRequest): ApiResponse<void> =>
  Api.post('/task', data);

const editTask = ({ id, ...data }: EditTaskRequest): ApiResponse<void> =>
  Api.put(`/task/${id}`, data);

const deleteTask = (id: number): ApiResponse<void> => Api.delete(`/task/${id}`);

const getTasksReview = (): ApiResponse<TasksReview> => Api.get('/tasks/review');

export const TasksApi = {
  getTasks,
  getTask,
  toggleComplete,
  createTask,
  editTask,
  getTasksReview,
  deleteTask,
};
