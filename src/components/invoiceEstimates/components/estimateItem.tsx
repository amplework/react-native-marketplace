import I18n from 'locales';
import React from 'react';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Card, CardBody, CardFooter, CardTitle } from 'shared/card';
import { Chip } from 'shared/chip';
import { Description } from 'shared/description';
import { Alpha, Icon } from 'shared/icon';
import { IProviderPublicProfile } from 'types/users';
import { currency } from 'utils/currency';
import { dateWithoutTz, formatDate, dateFormatWithoutTz } from 'utils/dates';
import { getFullName } from 'utils/strings';
import { useSelector } from 'react-redux';
import { Estimate } from 'types/estimates';
import { getEstimateChip } from '../helpers/utils';

type Props = {
  estimate: Estimate;
  provider?: IProviderPublicProfile;
  onPress: () => void;
};

const EstimateItem: React.FC<Props> = ({ estimate, provider, onPress }) => {
  const chip = getEstimateChip(estimate);
  const user = provider || estimate.clientSubprofile;
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;

  let date = dateWithoutTz(estimate.expDate, providerOffset ? providerOffset : 0);

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
            <Description label={I18n.t('estimates.estimateBalance')} size="s">
              {currency.format(estimate.balance)}
            </Description>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
      <CardFooter>
        <Description label={I18n.t('estimates.estimateNumber')} size="xs" mb={2}>
          #{estimate.number}
        </Description>
        <Box row jc="space-between" ai="center" mt={-4}>
          <Description label={I18n.t('estimates.expDate')} size="xs">
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

export { EstimateItem };
