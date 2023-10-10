import I18n from 'locales';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import {
  Card,
  CardBody,
  CardFooter,
  CardSubTitle,
  CardTitle,
} from 'shared/card';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { DetailedInvoice } from 'types/invoices';
import { Payment } from 'types/payments';
import { currency } from 'utils/currency';
import { dateFormatWithoutTz, dateWithoutTz, formatDate } from 'utils/dates';
import { getFullName } from 'utils/strings';
import { userSelectors } from 'store/entities/user';

type Props = {
  payment: Payment;
  invoice: DetailedInvoice;
  onPress: () => void;
};

const PaymentsItem: React.FC<Props> = ({ payment, invoice, onPress }) => {

  const user = useSelector(userSelectors.user);
  const providerOffset = user?.utcOffset;
  let paymentDate = dateWithoutTz(payment?.date, providerOffset ? providerOffset : 0);

  return (
    (
      <Card onPress={onPress}>
        <CardBody row jc="space-between" ai="center">
          <Box row ai="center">
            <Avatar src={invoice.clientSubprofile.photo} size={40} mr={12} />
            <Box>
              <Box row ai="center">
                <CardTitle>{getFullName(invoice.clientSubprofile)}</CardTitle>
                {invoice.clientSubprofile.isConnected && (
                  <Icon
                    src={require('assets/onBoarding/alpha.png')}
                    size={16}
                    ml={4}
                  />
                )}
              </Box>
              <Box row>
                <CardSubTitle>{I18n.t('invoices.paymentTotal')}</CardSubTitle>
                <Paragraph size="s" ml={4}>
                  {currency.format(payment.total)}
                </Paragraph>
              </Box>
            </Box>
          </Box>
          <Icon src={require('assets/global/arrowRight.png')} />
        </CardBody>
        <CardFooter>
          <Box row>
            <Paragraph size="xs" type="book" mr={4}>
              {I18n.t('invoices.paymentReceiptNumber')}
            </Paragraph>
            <Paragraph size="xs" mb={2}>
              #{payment.number}
            </Paragraph>
          </Box>
          <Box row>
            <Paragraph size="xs" type="book" mr={4}>
              {I18n.t('invoices.paymentDate')}
            </Paragraph>
            <Paragraph size="xs">{dateFormatWithoutTz(paymentDate)}</Paragraph>
          </Box>
        </CardFooter>
      </Card>
    )
  )
};

export { PaymentsItem };
