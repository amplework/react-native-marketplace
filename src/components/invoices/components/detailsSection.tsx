import I18n, { translations } from 'locales';
import React from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Chip } from 'shared/chip';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { invoicesSelectors } from 'store/entities/invoices';
import { getInvoiceChip } from '../helpers/utils';
import { commonStyles as S } from 'theme/styles';
import { DetailedInvoice } from 'types/invoices';
import { dateWithoutTz, dateFormatWithoutTz } from 'utils/dates';

const DetailsSection: React.FC = () => {
  const invoice = useSelector(invoicesSelectors.invoice)!;
  const chip = getInvoiceChip(invoice);
  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;

  let date = dateWithoutTz(invoice.date, providerOffset ? providerOffset : 0);
  let dueDate = dateWithoutTz(invoice.dueDate, providerOffset ? providerOffset : 0);

  const { t } = useTranslation();

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.invoices.details)}
      </Paragraph>
      <View style={S.section}>
        <Box row jc="space-between" ai="center" pr={16}>
          <Paragraph size="s" type="book">
            {t(translations.invoices.invoiceStatus)}
          </Paragraph>
          <Chip size="s" type={chip.type} outline pill>
            {t(chip.text)}
          </Chip>
        </Box>
        <Separator mv={12} />
        <Description
          label={t(translations.invoices.invoiceNumber)}
          split
          size="s"
          pr={16}
        >
          #{invoice.number}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.invoices.invoiceBalance)}
          split
          size="s"
          pr={16}
        >
          ${invoice.balance}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.invoices.expectedPaymentMethod)}
          split
          size="s"
          pr={16}
        >
          {invoice?.expectedPaymentMethod?.shortName}
        </Description>
        {invoice?.payments?.length > 0 && <Separator mv={12} />}
        {invoice?.payments?.length > 0 && <Description
          label={t(translations.invoices.paymentMethod)}
          split
          size="s"
          pr={16}
        >
          {getPaymentMethod(invoice)}
        </Description>}
        <Separator mv={12} />
        <Description
          label={t(translations.invoices.emailed)}
          split
          size="s"
          pr={16}
        >
          {invoice.emailRecipient
            ? t(translations.common.yes)
            : t(translations.common.no)}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.invoices.date)}
          split
          size="s"
          pr={16}
        >
          {dateFormatWithoutTz(date)}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.invoices.dueDate)}
          split
          size="s"
          pr={16}
        >
          {dateFormatWithoutTz(dueDate)}
        </Description>
        {invoice.comments && (
          <>
            <Separator mv={12} />
            <Description
              label={t(translations.invoices.comments)}
              column
              size="s"
              pr={16}
            >
              {invoice.comments}
            </Description>
          </>
        )}
      </View>
    </>
  );
};

export { DetailsSection };

const getPaymentMethod = ({
  payments,
  expectedPaymentMethod,
}: DetailedInvoice) => {
  const methods = payments.map(({ paymentMethod }) => paymentMethod.shortName);

  if (!methods.length) {
    return expectedPaymentMethod?.shortName || '';
  }

  const isSinglePaymentMethod = new Set(methods).size === 1;

  return isSinglePaymentMethod
    ? methods[0]
    : I18n.t(translations.invoices.multiple);
};

// const getChipType = (invoice: DetailedInvoice): ChipType => {
//   switch (invoice.status) {
//     case 'open':
//       return 'primary';
//     case 'paid':
//       return 'success';
//     case 'overdue':
//       return 'danger';
//   }
// };
