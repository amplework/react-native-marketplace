import React from 'react';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';

type Props = {
  title: string;
};

const ListEmptyComponent: React.FC<Props> = ({ title }) => (
  <Box flex jc="center" ai="center" ph={24}>
    <Paragraph size="s" type="book">
      {title}
    </Paragraph>
  </Box>
);

export { ListEmptyComponent };
