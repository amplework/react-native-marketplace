import React from 'react';
import { Paragraph } from 'shared/paragraph';
import { IMargin } from 'utils/styles';

type CardTitleProps = IMargin;

const CardTitle: React.FC<CardTitleProps> = ({
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  color,
  children,
}) => (
  <Paragraph color={color} mh={mh} mv={mv} mt={mt} mr={mr} mb={mb} ml={ml}>
    {children}
  </Paragraph>
);

export { CardTitle };

type CardSubTitleProps = {
  capitalize?: boolean;
};

const CardSubTitle: React.FC<CardSubTitleProps> = ({
  capitalize,
  children,
}) => (
  <Paragraph size="s" type="book" capitalize={capitalize}>
    {children}
  </Paragraph>
);

export { CardSubTitle };
