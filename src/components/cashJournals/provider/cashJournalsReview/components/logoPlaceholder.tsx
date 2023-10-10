import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

const LogoPlaceholder: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box row jc="center" ai="center" mb={50}>
      <Icon src={require('assets/global/logoInactive.png')} size={30} mr={8} />
      <Paragraph size="s" type="book" color={COLORS.warmGrey}>
        {t(translations.common.workSmarter)}
      </Paragraph>
    </Box>
  );
};

export { LogoPlaceholder };
