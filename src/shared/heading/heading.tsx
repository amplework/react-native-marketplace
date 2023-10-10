import React from 'react';
import { BackButton, BackButtonProps } from 'shared/backButton';
import { Paragraph } from 'shared/paragraph';

type Props = BackButtonProps & {
  back?: boolean;
};

const Heading: React.FC<Props> = ({ back, ...props }) =>
  back ? (
    <BackButton {...props} />
  ) : (
    <Paragraph size="l" type="bold" ml={16}>
      {props.title}
    </Paragraph>
  );

export { Heading };
