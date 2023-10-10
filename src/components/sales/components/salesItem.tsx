import { translations } from 'locales';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Card, CardBody, CardFooter } from 'shared/card';
import { Chip } from 'shared/chip';
import { Description } from 'shared/description';
import { Alpha, Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { userSelectors } from 'store/entities/user';
import { Sale } from 'types/sales';
import { IProviderPublicProfile } from 'types/users';
import { currency } from 'utils/currency';
import { dateFormatWithoutTz, dateWithoutTz, formatDate } from 'utils/dates';
import { getValueOrNA } from 'utils/fields';
import { getFullName } from 'utils/strings';
import { getSaleChip } from './utils';

type Props = {
  sale: Sale;
  provider?: IProviderPublicProfile;
  onPress: () => void;
};

const SalesItem: React.FC<Props> = ({ sale, provider, onPress }) => {
  const { t } = useTranslation();

  const user = provider || sale.clientSubprofile;
  const userDetails = useSelector(userSelectors.user);
  const userOffset = userDetails?.utcOffset;  
  const chip = getSaleChip(sale);

  let date = dateWithoutTz(sale.date, userOffset);

  return (
    <Card onPress={onPress}>
      <CardBody row ai="center">
        <Box flex ml={4}>
          <Box row ai="center">
            <Avatar src={user?.photo} size={40} mr={8} />
            <Box>
              <Box row ai="center">
                <Paragraph>
                  {user ? getFullName(user) : ''}
                </Paragraph>
                {user?.isConnected && <Alpha size={16} ml={8} />}
              </Box>
              <Description label={t(translations.sales.totalTitle)} size="s">
                {currency.format(sale.total)}
              </Description>
            </Box>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
      <CardFooter>
        <Box row>
          <Description label={t(translations.sales.salesOrder)} size="s">
            #{sale.number}
          </Description>
          <Paragraph type="book" size="s">
            {' '}
            |{' '}
          </Paragraph>
          <Description label={t(translations.sales.date)} size="s">
            {dateFormatWithoutTz(date)}
          </Description>
        </Box>
        <Box mt={10} row jc='space-between' >
          <Description label={t(translations.sales.method)} size="s">
            {getValueOrNA(sale.paymentMethod?.shortName)}
          </Description>
          {/* <Paragraph type="book" size="s">
            {' '}
            |{' '}
          </Paragraph> */}
          <Chip size="xs" type={chip?.type} pill>
            {chip?.text}
          </Chip>
        </Box>
      </CardFooter>
    </Card>
  );
};

export { SalesItem };
