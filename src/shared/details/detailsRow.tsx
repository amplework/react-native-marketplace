import React from 'react';
import { Box } from 'shared/box';
import { Description } from 'shared/description';
import { Separator } from 'shared/separator';
import { getValueOrNA } from 'utils/fields';

type Props = {
  label: string;
  value?: string | number;
  column?: boolean;
  isLast?: boolean;
};

const DetailsRow: React.FC<Props> = ({
  label,
  value,
  column,
  isLast = false,
}) => (
  <Box pl={16}>
    <Description label={label} column={column} size="s" split pr={16}>
      {getValueOrNA(value)}
    </Description>
    {!isLast && <Separator mv={12} />}
  </Box>
);

export { DetailsRow };
