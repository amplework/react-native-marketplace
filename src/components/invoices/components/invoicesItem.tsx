import { getInvoiceChip } from 'components/invoices/helpers/utils';
import I18n from 'locales';
import React from 'react';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import moment from 'moment-timezone';
import { Card, CardBody, CardFooter, CardTitle } from 'shared/card';
import { Chip } from 'shared/chip';
import { Description } from 'shared/description';
import { Alpha, Icon } from 'shared/icon';
import { Invoice } from 'types/invoices';
import { IProviderPublicProfile } from 'types/users';
import { currency } from 'utils/currency';
import { dateWithoutTz, formatDate, dateFormatWithoutTz } from 'utils/dates';
import { getFullName } from 'utils/strings';
import { useSelector } from 'react-redux';

type Props = {
  invoice: Invoice;
  provider?: IProviderPublicProfile;
  onPress: () => void;
};

const InvoicesItem: React.FC<Props> = ({ invoice, provider, onPress }) => {
  const chip = getInvoiceChip(invoice);
  const user = provider || invoice.clientSubprofile;
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;

  let date = dateWithoutTz(invoice.dueDate, providerOffset ? providerOffset : 0);

  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Box row ai="center">
          <Avatar src={user?.photo} size={40} mr={12} />
          <Box>
            <Box row ai="center">
              <CardTitle>{getFullName(user)}</CardTitle>
              {user?.isConnected && <Alpha />}
            </Box>
            <Description label={I18n.t('invoices.invoiceBalance')} size="s">
              {currency.format(invoice.balance)}
            </Description>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
      <CardFooter>
        <Description label={I18n.t('invoices.invoiceNumber')} size="xs" mb={2}>
          #{invoice.number}
        </Description>
        <Box row jc="space-between" ai="center" mt={-4}>
          <Description label={I18n.t('invoices.dueDate')} size="xs">
            {dateFormatWithoutTz(date)}
          </Description>
          <Chip size="xs" type={chip.type} pill>
            {chip.text}
          </Chip>
        </Box>
      </CardFooter>
    </Card>
  );
};

export { InvoicesItem };
