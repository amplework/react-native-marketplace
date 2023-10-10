import { t, translations } from 'locales';
import { Item } from 'react-native-picker-select';

import { isNumber } from './numbers';
import { capitalize, isString } from './strings';

export const formatArrayToSelectItems = (
  values: any[],
  valueFieldName: string,
  labelFieldName: string,
  inputLabel?: string,
): Item[] =>
  values.map((value) => ({
    value: value[valueFieldName],
    label: value[labelFieldName],
    inputLabel: inputLabel
      ? `${capitalize(inputLabel)}: ${value[labelFieldName]}`
      : undefined,
  }));

export const getValueOrNA = (value?: string | number | null) =>
  isNumber(value) || isString(value) ? value : '';
