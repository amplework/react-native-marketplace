import { getEstimateChip } from 'components/invoiceEstimates/helpers/utils';
import { getInvoiceChip } from 'components/invoices/helpers/utils';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { Box } from 'shared/box';
import { Card, CardBody, CardHeader } from 'shared/card';
import { Chip } from 'shared/chip';
import { Description } from 'shared/description';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Estimate } from 'types/estimates';
import { Invoice } from 'types/invoices';
import { formatDate } from 'utils/dates';

type Props = {
  estimate: Estimate;
  onPress: () => void;
  onPressDownload: () => void;
};

const ClientEstimateItem: React.FC<Props> = ({ estimate, onPress, onPressDownload }) => {
  const { t } = useTranslation();

  const chip = getEstimateChip(estimate);

  return (
    <Card onPress={onPress} spacing="both">
      <CardHeader row jc="space-between" size="l">
        <Box row ai="center">
          <Icon src={require('assets/global/invoices.png')} size={16} mr={8} />
          <Paragraph>
            {t(translations.estimates.clientEstimate, { id: estimate.number })}
          </Paragraph>
        </Box>
        <Box row>
          <Chip mr={10} size="xs" type={chip.type} pill>
            {chip.text}
          </Chip>
          {/* <Icon
            size={24}
            onPress={onPressDownload}
            src={require('assets/global/cloudDownload.png')}
            hitSlop={{ top: 15, bottom: 15, right: 15 }}
          /> */}
        </Box>
      </CardHeader>
      <CardBody size="l">
        <Description label={t(translations.estimates.estimateTotal)} split mb={8}>
          ${estimate.total}
        </Description>
        <Description
          label={t(translations.estimates.estimateBalance)}
          split
          mb={8}
        >
          ${estimate.balance}
        </Description>
        <Description label={t(translations.estimates.date)} split mb={8}>
          {formatDate(estimate.date)}
        </Description>
        <Description label={t(translations.estimates.expDate)} split>
          {formatDate(estimate.expDate)}
        </Description>
      </CardBody>
    </Card>
  );
};

export { ClientEstimateItem };
