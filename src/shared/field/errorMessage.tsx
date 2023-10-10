import React from 'react';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { IMargin } from 'utils/styles';

type Props = IMargin & {
  error?: string;
};

const ErrorMessage: React.FC<Props> = ({ error, mt, mb }) =>
  error ? (
    <Paragraph size="xs" type="book" color={COLORS.orangeRed} mt={mt} mb={mb}>
      {error}
    </Paragraph>
  ) : null;

export { ErrorMessage };
