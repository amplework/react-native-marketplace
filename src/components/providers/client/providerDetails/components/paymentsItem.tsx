import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Card, CardBody, CardFooter } from 'shared/card';
import { Description } from 'shared/description';
import { Alpha, Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { PaymentPreview } from 'types/payments';
import { IProviderPublicProfile } from 'types/users';
import { currency } from 'utils/currency';
import { formatDate } from 'utils/dates';
import { getFullName } from 'utils/strings';

type Props = {
  payment: PaymentPreview;
  provider: IProviderPublicProfile;
  onPress: () => void;
};

const PaymentsItem: React.FC<Props> = ({ onPress, payment, provider }) => {
  const { t } = useTranslation();

  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Box row ai="center">
          <Avatar src={provider.photo} size={40} mr={12} />
          <Box>
            <Box row ai="center">
              <Paragraph>{getFullName(provider)}</Paragraph>
              <Alpha />
            </Box>
            <Description
              label={t(translations.providers.payments.total)}
              size="s"
            >
              {currency.format(payment.total)}
            </Description>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
      <CardFooter>
        <Description label={t(translations.providers.payments.id)} size="s">
          #{payment.number}
        </Description>
        <Description label={t(translations.providers.payments.date)} size="s">
          {formatDate(payment.date)}
        </Description>
      </CardFooter>
    </Card>
  );
};

export { PaymentsItem };
