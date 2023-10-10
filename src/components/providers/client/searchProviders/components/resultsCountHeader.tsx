import I18n from 'locales';
import React from 'react';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';

interface Props {
  count: number;
}

const ResultsCountHeader: React.FC<Props> = ({ count }) => (
  <Box pv={20} ph={24}>
    <Paragraph size="s">{I18n.t('search.resultsCount', { count })}</Paragraph>
  </Box>
);

export { ResultsCountHeader };
