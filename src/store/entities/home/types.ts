import moment from 'moment-timezone';
import { PerformancePreview, PerformanceReview } from 'types/home';
import { LargeDateRange } from 'utils/dates';

export type HomeState = {
  home: HomeSlice;
};

export type HomeSlice = {
  isModalOpened: boolean;
  showProgressModal: boolean;
  selectedDate: moment.Moment | null;
  performancePreview: PerformancePreview;
  performancePreviewLoading: boolean;
  period: LargeDateRange;
  isPeriodModalOpened: boolean;
  performanceReview: PerformanceReview;
  performanceReviewLoading: boolean;
  managedSlots: any;
};
