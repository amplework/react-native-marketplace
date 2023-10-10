import I18n from 'locales';
import React from 'react';
import { Box } from 'shared/box';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
type Props = {
  name: string;
  value: string;
  isLast?: boolean;
};

const VendorTopItem: React.FC<Props> = ({ name, value, isLast }) => (
  <Box>
    <Paragraph size="s" mb={3}>
      {name}
    </Paragraph>
    <Box row>
      <Description label={I18n.t('vendors.valueOfInvoices')}>
        {value}
      </Description>
    </Box>
    {!isLast && <Separator mv={15} />}
  </Box>
);

export { VendorTopItem };
