import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { vendorsSelectors } from 'store/entities/vendors';
import { getValueOrNA } from 'utils/fields';

import { vendorStyles as S } from '../style';

const DetailsCard: React.FC = () => {
  const { email, phoneNumber, notes, address } =
    useSelector(vendorsSelectors.vendor) || {};

  const { t } = useTranslation();

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.vendors.details.title)}
      </Paragraph>
      <View style={S.detailsCard}>
        <Box row jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {t(translations.form.email)}
          </Paragraph>
          <Paragraph size="s">{getValueOrNA(email)}</Paragraph>
        </Box>
        <Separator />
        <Box row jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {t(translations.form.phoneNumber)}
          </Paragraph>
          <Paragraph size="s">{getValueOrNA(phoneNumber)}</Paragraph>
        </Box>
        <Separator />
        <Box row wrap jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book">
            {t(translations.form.notes)}
          </Paragraph>
          <Paragraph size="s">{getValueOrNA(notes)}</Paragraph>
        </Box>
        <Separator />
        <Box row wrap jc="space-between" pv={12} pr={16}>
          <Paragraph size="s" type="book" mr={10}>
            {t(translations.form.address)}
          </Paragraph>
          <Paragraph size="s">
            {getValueOrNA(address?.formattedAddress)}
          </Paragraph>
        </Box>
      </View>
    </>
  );
};

export { DetailsCard };
