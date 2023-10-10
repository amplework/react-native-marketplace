import I18n from 'locales';
import React from 'react';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

const HouseCallBadge: React.FC = () => (
  <Box row ai="center" mt={6}>
    <Icon src={require('assets/global/homeGrey.png')} size={18} mr={8} ml={1} />
    <Paragraph size="xs" type="book">
      {I18n.t('providers.serviceAtClientsLocation')}
    </Paragraph>
  </Box>
);

export { HouseCallBadge };
