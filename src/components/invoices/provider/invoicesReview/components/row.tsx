import React, { ReactText } from 'react';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';

type Props = {
  name: any;
  value: any;
};

const Row: React.FC<Props> = ({ name, value }) => (
  <Box row jc="space-between" ai="center" pr={16} pv={12}>
    <Paragraph size="s" type="book">
      {name}
    </Paragraph>
    <Paragraph size="s">{value}</Paragraph>
  </Box>
);

export { Row };
