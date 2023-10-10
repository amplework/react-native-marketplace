import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { IClosedDays } from 'types/settings';
import { formatServerDate } from 'utils/dates';

interface Props extends IClosedDays {
  onPress: () => void;
}

const ClosedDaysItem: React.FC<Props> = ({
  onPress,
  fromDate,
  toDate,
  reason,
}) => {

  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Box flex>
          <CardTitle mb={2}>
            {formatServerDate(fromDate) + (toDate ? ' - ' + formatServerDate(toDate) : '')}
            {/* {range(formatDate, { from: fromDate, to: toDate })} */}
          </CardTitle>
          <CardSubTitle capitalize>{reason}</CardSubTitle>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
    </Card>
  );
}

export { ClosedDaysItem };
