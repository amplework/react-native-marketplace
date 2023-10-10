import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Paragraph } from 'shared/paragraph';

import { contactUsStyles as S } from '../style';

const ContactUsHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Image
        source={require('assets/global/contactUsPlaceholder.png')}
        style={S.image}
      />
      <Paragraph size="xl" type="bold">
        {t(translations.contactUs.title)}
      </Paragraph>
      <Paragraph size="s" type="book" mb={32}>
        {t(translations.contactUs.subtitle)}
      </Paragraph>
    </>
  );
};

export { ContactUsHeader };
