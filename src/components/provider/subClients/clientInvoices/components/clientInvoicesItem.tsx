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
import { Invoice } from 'types/invoices';
import { formatDate } from 'utils/dates';

type Props = {
  invoice: Invoice;
  onPress: () => void;
  onPressDownload: () => void;
};

const ClientInvoicesItem: React.FC<Props> = ({ invoice, onPress, onPressDownload }) => {
  const { t } = useTranslation();

  const chip = getInvoiceChip(invoice);

  return (
    <Card onPress={onPress} spacing="both">
      <CardHeader row jc="space-between" size="l">
        <Box row ai="center">
          <Icon src={require('assets/global/invoices.png')} size={16} mr={8} />
          <Paragraph>
            {t(translations.invoices.clientInvoice, { id: invoice.number })}
          </Paragraph>
        </Box>
        <Box row>
          <Chip mr={10} size="xs" type={chip.type} pill>
            {chip.text}
          </Chip>
          <Icon
            size={24}
            onPress={onPressDownload}
            src={require('assets/global/cloudDownload.png')}
            hitSlop={{ top: 15, bottom: 15, right: 15 }}
          />
        </Box>
      </CardHeader>
      <CardBody size="l">
        <Description label={t(translations.invoices.invoiceTotal)} split mb={8}>
          ${invoice.total}
        </Description>
        <Description
          label={t(translations.invoices.invoiceBalance)}
          split
          mb={8}
        >
          ${invoice.balance}
        </Description>
        <Description label={t(translations.invoices.date)} split mb={8}>
          {formatDate(invoice.date)}
        </Description>
        <Description label={t(translations.invoices.dueDate)} split>
          {formatDate(invoice.dueDate)}
        </Description>
      </CardBody>
    </Card>
  );
};

export { ClientInvoicesItem };
