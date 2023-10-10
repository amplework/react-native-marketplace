import I18n from 'locales';
import React from 'react';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

const LogoPlaceholder: React.FC = () => (
  <Box row jc="center" ai="center" mv={50}>
    <Icon src={require('assets/global/logoInactive.png')} size={30} mr={8} />
    <Paragraph size="s" type="book" color={COLORS.warmGrey}>
      {I18n.t('common.workSmarter')}
    </Paragraph>
  </Box>
);

export { LogoPlaceholder };