import { localeCompare } from './strings';
import COLORS from './colors';

export const compareWith =
  <T extends Record<string, any>>(fn: (value: T) => string) =>
    (a: T, b: T) =>
      localeCompare(fn(a), fn(b));

export const compareBy = (key: string) => compareWith((x) => x[key]);

type Identifiable = {
  id: number;
};

export const findById =
  (id: number) =>
    <T extends Identifiable>(xs: T[]) =>
      xs.find((x) => x.id === id);

export const findIndexById =
  (id: number) =>
    <T extends Identifiable>(xs: T[]) =>
      xs.findIndex((x) => x.id === id);

export const splice =
  <T>(start: number, deleteCount = 1, ...items: T[]) =>
    (xs: T[]) =>
      [...xs.slice(0, start), ...items, ...xs.slice(start + deleteCount)];

export const findLastIndex =
  <T>(xs: T[]) =>
    (fn: (x: T) => boolean) =>
      xs.map(fn).lastIndexOf(true);

export const exclude =
  <T>(value: T) =>
    (xs: T[]) =>
      xs.filter((x) => x !== value);

export const liteSchedule = [{
  color: COLORS.clearBlue
}]

export const busySchedule = [{
  color: COLORS.orange
}]

export const normalSchedule = [{
  color: COLORS.greenblue
}]
