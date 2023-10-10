import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'shared/box';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { CashJournal } from 'types/cashJournals';
import { currency } from 'utils/currency';

type Props = {
  journal: CashJournal;
};

const CashJournalDetailsHeader: React.FC<Props> = ({ journal }) => {
  const { t } = useTranslation();

  const total = currency.format(journal.total);

  return (
    <Box mb={32}>
      <Paragraph size="xl" type="bold" mb={7}>
        {t(translations.cashJournals.details.totalCash, { total })}
      </Paragraph>
      <Description
        label={t(translations.cashJournals.description)}
        size="s"
        flex
      >
        {journal.description}
      </Description>
    </Box>
  );
};

export { CashJournalDetailsHeader };
