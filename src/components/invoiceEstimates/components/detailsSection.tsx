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
import { getEstimateApprovalStatus, getEstimateChip } from '../helpers/utils';
import { commonStyles as S } from 'theme/styles';
import { DetailedInvoice } from 'types/invoices';
import { dateWithoutTz, dateFormatWithoutTz } from 'utils/dates';
import { estimatesSelectors } from 'store/entities/estimates';

const DetailsSection: React.FC = () => {
  const estimate = useSelector(estimatesSelectors.estimate)!;
  //@ts-ignore
  const chip = getEstimateChip(estimate);
  //@ts-ignore
  const approval = getEstimateApprovalStatus(estimate);
  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;

  let date = dateWithoutTz(estimate.date, providerOffset ? providerOffset : 0);
  let expDate = dateWithoutTz(estimate.expDate, providerOffset ? providerOffset : 0);

  const { t } = useTranslation();

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.estimates.details)}
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
          label={t(translations.estimates.approvalStatus)}
          split
          size="s"
          pr={16}
        >
          {approval}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.estimates.estimateNumber)}
          split
          size="s"
          pr={16}
        >
          #{estimate.number}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.estimates.estimateBalance)}
          split
          size="s"
          pr={16}
        >
          ${estimate.balance}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.estimates.expectedPaymentMethod)}
          split
          size="s"
          pr={16}
        >
          {estimate?.expectedPaymentMethod?.shortName}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.estimates.emailed)}
          split
          size="s"
          pr={16}
        >
          {estimate.emailRecipient
            ? t(translations.common.yes)
            : t(translations.common.no)}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.estimates.date)}
          split
          size="s"
          pr={16}
        >
          {dateFormatWithoutTz(date)}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.estimates.expDate)}
          split
          size="s"
          pr={16}
        >
          {dateFormatWithoutTz(expDate)}
        </Description>
        {estimate.comments && (
          <>
            <Separator mv={12} />
            <Description
              label={t(translations.estimates.comments)}
              column
              size="s"
              pr={16}
            >
              {estimate.comments}
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
