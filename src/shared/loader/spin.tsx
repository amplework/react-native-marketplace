import React from 'react';
import { ActivityIndicator } from 'react-native';
import COLORS from 'utils/colors';

type Size = 's' | 'l';

type Props = {
  loading?: boolean;
  size?: Size;
};

const Spin: React.FC<Props> = ({ loading = true, size = 's' }) =>
  loading ? (
    <ActivityIndicator size={getSize(size)} color={COLORS.clearBlue} />
  ) : null;

export { Spin };

const getSize = (size: Size) => {
  switch (size) {
    case 'l':
      return 'large';
    case 's':
      return 'small';
  }
};
