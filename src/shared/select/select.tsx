import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';

import { styles } from './style';

type Props = IMargin & {
  value: string;
  placeholder?: string;
  error?: string;
  flex?: boolean;
  w?: string | number;
  onPress: () => void;
};

const Select: React.FC<Props> = ({
  children,
  value,
  placeholder,
  error,
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  flex = false,
  w = '100%',
  onPress,
}) => (
  <Box flex={flex} w={w} mv={mv} mh={mh} mt={mt} mr={mr} mb={mb} ml={ml}>
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: error ? COLORS.orangeRed : COLORS.whiteGray,
      }}
      onPress={onPress}
    >
      {children || (
        <Paragraph
          size="s"
          type="book"
          color={error && !value ? COLORS.orangeRed : COLORS.black}
        >
          {value || placeholder}
        </Paragraph>
      )}
      <Icon src={require('assets/global/chevron.png')} size={20} />
    </TouchableOpacity>
    {!!error && (
      <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={4}>
        {error}
      </Paragraph>
    )}
  </Box>
);

export { Select };
