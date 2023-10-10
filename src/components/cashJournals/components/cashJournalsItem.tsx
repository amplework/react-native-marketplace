import { translations } from 'locales';
import React from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Card, CardBody } from 'shared/card';
import { Description } from 'shared/description';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { CashJournal } from 'types/cashJournals';
import { currency } from 'utils/currency';
import { dateFormatWithoutTz, dateWithoutTz } from 'utils/dates';

type Props = {
  journal: CashJournal;
  onPress: () => void;
};

const CashJournalsItem: React.FC<Props> = ({ journal, onPress }) => {
  const { t } = useTranslation();
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;

  let date = dateWithoutTz(journal.date, providerOffset ? providerOffset : 0);

  return (
    <Card onPress={onPress} spacing="both">
      <CardBody row jc="space-between" ai="center">
        <Box flex>
          <Paragraph mb={2}>{dateFormatWithoutTz(date)}</Paragraph>
          <Description
            label={t(translations.cashJournals.cashTotal)}
            size="s"
            mb={4}
          >
            {currency.format(journal.total)}
          </Description>
          <Description
            label={t(translations.cashJournals.description)}
            size="s"
            flex
            lines={1}
          >
            {journal.description}
          </Description>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
    </Card>
  );
};

export { CashJournalsItem };
