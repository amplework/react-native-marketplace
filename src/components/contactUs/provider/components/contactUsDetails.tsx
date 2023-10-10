import {
  SUPPORT_ADDRESS,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_WEBSITE,
} from 'components/contactUs/helpers/constants';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { Details, DetailsRow } from 'shared/details';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';

const ContactUsDetails: React.FC = () => {
  const { t } = useTranslation();

  const handleOpenWebsite = () => Linking.openURL(`https://${SUPPORT_WEBSITE}`);

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.contactUs.sectionTitle)}
      </Paragraph>
      <Details>
        <Pressable onPress={handleOpenWebsite}>
          <DetailsRow
            label={t(translations.contactUs.website)}
            value={SUPPORT_WEBSITE}
          />
        </Pressable>
        <DetailsRow
          label={t(translations.contactUs.email)}
          value={SUPPORT_EMAIL}
        />
        <DetailsRow
          label={t(translations.contactUs.phone)}
          value={SUPPORT_PHONE}
        />
        <DetailsRow
          label={t(translations.contactUs.address)}
          value={SUPPORT_ADDRESS}
          column
          isLast
        />
      </Details>
    </>
  );
};

export { ContactUsDetails };
