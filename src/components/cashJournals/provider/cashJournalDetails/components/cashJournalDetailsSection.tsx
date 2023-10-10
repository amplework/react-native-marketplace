import { translations } from 'locales';
import React from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { theme } from 'theme';
import { CashJournal } from 'types/cashJournals';
import { dateFormatWithoutTz, dateWithoutTz, formatDate } from 'utils/dates';

type Props = {
  journal: CashJournal;
};

const CashJournalDetailsSection: React.FC<Props> = ({ journal }) => {
  const { t } = useTranslation();

  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;

  let date = dateWithoutTz(journal.date, providerOffset ? providerOffset : 0);

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.cashJournals.details.detail)}
      </Paragraph>
      <View style={theme.styles.section}>
        <Description
          label={t(translations.cashJournals.details.dateEntered)}
          size="s"
          split
          pr={16}
        >
          {dateFormatWithoutTz(date)}
        </Description>
        {journal.notes && (
          <>
            <Separator mv={12} />
            <Description
              label={t(translations.cashJournals.details.notes)}
              size="s"
              column
              pr={16}
            >
              {journal.notes}
            </Description>
          </>
        )}
      </View>
    </>
  );
};

export { CashJournalDetailsSection };
