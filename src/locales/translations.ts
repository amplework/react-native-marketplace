import { isObject } from 'utils/object';

import en from './en';

const composePath = (...paths: string[]) => paths.filter(Boolean).join('.');

function getTranslations(
  scope: Record<string, string | Record<string, any>>,
  path = '',
): any {
  return Object.entries(scope).reduce(
    (translations, [key, value]) => ({
      ...translations,
      [key]: isObject(value)
        ? getTranslations(value, composePath(path, key))
        : composePath(path, key),
    }),
    {},
  );
}

export const translations: typeof en = getTranslations(en);
