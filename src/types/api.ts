import { AxiosResponse } from 'axios';

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export type Meta = {
  limit: number;
  offset: number;
  count: number;
  totalCount: number;
};

export type Pagination<T> = {
  result: T;
  meta: Meta;
};

export type PageableApiResponse<T> = ApiResponse<Pagination<T>>;

type KeysetMeta = {
  limit: number;
  beforeKey: number;
  lastKey: number;
  count: number;
  totalCount: number;
};

export type KeysetPagination<T> = {
  result: T;
  meta: KeysetMeta;
};

export type KeysetApiResponse<T> = ApiResponse<KeysetPagination<T>>;

export type PaginationListRequest = {
  limit?: number;
  offset: number;
};

export type PaginationRequest = {
  id: number;
  offset: number;
};

export type ShareEmailRequest = {
  id: number;
  email: string;
};

export type EditRequest<T> = {
  id: number;
  data: T;
};
