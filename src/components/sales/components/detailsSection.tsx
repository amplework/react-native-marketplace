import { translations } from 'locales';
import moment from 'moment-timezone';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Chip } from 'shared/chip';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { salesSelectors } from 'store/entities/sales';
import { commonStyles as S } from 'theme/styles';
import { IProviderUser, isProvider } from 'types/users';
import { currency } from 'utils/currency';
import { dateWithoutTz, formatDate, dateFormatWithoutTz } from 'utils/dates';
import { getValueOrNA } from 'utils/fields';
import { getSaleChip } from './utils';
import COLORS from 'utils/colors';
import { userSelectors } from 'store/entities/user';

type State = {
  provider: { provider: IProviderUser };
};

const DetailsSection: React.FC = () => {
  const sale = useSelector(salesSelectors.sale)!;
  const provider = useSelector((state: State) => state.provider.provider);
  const providerOffset = provider?.utcOffset;
  const chip = getSaleChip(sale);
  const user = useSelector(userSelectors.user);

  let date = dateWithoutTz(sale.date, providerOffset ? providerOffset : 0);


  const { t } = useTranslation();
  const isUserProvider = isProvider(user);

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.sales.details)}
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
          label={t(translations.sales.number)}
          split
          size="s"
          pr={16}
        >
          #{sale.number}
        </Description>
        <Separator mv={12} />
        <Description label={t(translations.sales.date)} split size="s" pr={16}>
          {dateFormatWithoutTz(date)}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.sales.method)}
          split
          size="s"
          pr={16}
        >
          {getValueOrNA(sale.paymentMethod?.shortName)}
        </Description>
        <Separator mv={12} />
        <Description
          label={t(translations.sales.paymentReceived)}
          split
          size="s"
          pr={16}
        >
          {sale.isPaymentReceived
            ? t(translations.common.yes)
            : t(translations.common.no)}
        </Description>
        {(sale?.discountAmount > 0) && (
          <>
            <Separator mv={12} />
            <Description label={t(translations.sales.discount)} split size="s" pr={16}>
              {`$${String(sale.discountAmount)}`}
            </Description>
          </>
        )}
        {(!isUserProvider) && (sale?.tipAmount > 0) && (
          <Paragraph mt={20} mr={10} size='xxs' color={COLORS.orange}>{`You can add a tip amount of $${sale?.tipAmount} if you are satisfied with the service.`}</Paragraph>
        )}
      </View>
      <Paragraph size="s" type="book" mb={12} mt={20}>
        {t(translations.sales.lines)}
      </Paragraph>
      {sale.entitiesSnapshot?.products ? (
        <View style={S.section}>
          {sale.entitiesSnapshot.products.map((product, index) => (
            <View key={`${product.name}-${product.id}`}>
              <Description
                label={`${product.name} x ${product.quantity}`}
                split
                size="s"
                pr={16}
              >
                {currency.format(product.price * product.quantity)}
              </Description>
              {sale.entitiesSnapshot.products.length - 1 > index && (
                <Separator mv={12} />
              )}
            </View>
          ))}
        </View>
      ) : (
        <Paragraph size="s" type="book">
          {t(translations.sales.noProducts)}
        </Paragraph>
      )}
    </>
  );
};

export { DetailsSection };
