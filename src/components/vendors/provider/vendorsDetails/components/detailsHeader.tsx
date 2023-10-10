import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { vendorsSelectors } from 'store/entities/vendors';
import { currency } from 'utils/currency';

import { ContactButtons } from './contactButtons';

const DetailsHeader: React.FC = () => {
  const { name, phoneNumber, expensesTotal } =
    useSelector(vendorsSelectors.vendor) || {};

  const { t } = useTranslation();

  return (
    <Box row ai="center" jc="space-between" mb={32}>
      <Box>
        <Box row mb={7}>
          <Paragraph flex size="xl" type="bold" lines={1}>
            {name}
          </Paragraph>
        </Box>
        <Paragraph size="s" type="book">
          {t(translations.vendors.details.totalExpenses)}
          <Paragraph size="s" type="bold">
            {expensesTotal
              ? currency.format(expensesTotal)
              : ''}
          </Paragraph>
        </Paragraph>
      </Box>
      <ContactButtons phone={phoneNumber} />
    </Box>
  );
};

export { DetailsHeader };
