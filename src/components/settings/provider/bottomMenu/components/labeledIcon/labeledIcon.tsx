import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

type Props = {
  src?: ImageSourcePropType;
  label?: string;
  color?: string;
};

const LabeledIcon: React.FC<Props> = ({ label, src, color, children }) => (
  <Box flex ai="center">
    {src && <Icon src={src} size={20} />}
    {children}
    {label && (
      <Paragraph size="xxs" type="book" mt={5} color={color}>
        {label.toUpperCase()}
      </Paragraph>
    )}
  </Box>
);

export { LabeledIcon };
