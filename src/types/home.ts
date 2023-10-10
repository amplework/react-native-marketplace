import { LargeDateRange } from 'utils/dates';

export type PerformanceRequest = {
  date: string;
  period: LargeDateRange;
};

export type PerformancePreview = {
  busySchedule: number;
  wantedToEarn: number;
  totalIncome: number;
};

export type PerformanceReview = {
  netIncome: number;
  goalCompleted: number;
  totalIncome: number;
  totalExpenses: number;
  wantedToEarn: number;
  busySchedule: number;
  weekAlreadyBooked: number;
  newClients: number;
  activeClients: number;
  appointmentEntered: number;
  pastDueInvoices: number;
  totalCashCollected: number;
};
