import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { expensesSelectors } from 'store/entities/expenses';
import { getValueOrNA } from 'utils/fields';

const DetailsHeader: React.FC = () => {
  const expense = useSelector(expensesSelectors.expense)!;

  const { t } = useTranslation();

  return (
    <Box mb={32}>
      <Paragraph size="xl" type="bold" mb={7}>
        {expense.description}
      </Paragraph>
      <Description label={t(translations.expenses.details.vendor)}>
        {getValueOrNA(expense.vendor?.name) || expense?.vendorName}
      </Description>
    </Box>
  );
};

export { DetailsHeader };
