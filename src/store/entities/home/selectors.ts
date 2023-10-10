import { HomeState } from './types';

const all = (state: HomeState) => state.home;

const isModalOpened = (state: HomeState) => all(state).isModalOpened;

const isProgressModalOpened = (state: HomeState) => all(state).showProgressModal;

const selectedDate = (state: HomeState) => all(state).selectedDate;

const performancePreview = (state: HomeState) => all(state).performancePreview;

const performancePreviewLoading = (state: HomeState) =>
  all(state).performancePreviewLoading;

const period = (state: HomeState) => all(state).period;

const isPeriodModalOpened = (state: HomeState) =>
  all(state).isPeriodModalOpened;

const performanceReview = (state: HomeState) => all(state).performanceReview;

const managedSlots = (state: HomeState) => all(state).managedSlots;

const performanceReviewLoading = (state: HomeState) =>
  all(state).performanceReviewLoading;

export const homeSelectors = {
  isModalOpened,
  selectedDate,
  performancePreview,
  performancePreviewLoading,
  period,
  isPeriodModalOpened,
  performanceReview,
  performanceReviewLoading,
  isProgressModalOpened,
  managedSlots
};
