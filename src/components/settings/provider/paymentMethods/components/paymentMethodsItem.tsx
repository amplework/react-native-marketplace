import React from 'react';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { Toggle } from 'shared/toggle';
import { IPaymentMethod } from 'types/settings';

interface Props extends IPaymentMethod {
  onPress: () => void;
  onToggle: (value: boolean) => void;
}

const PaymentMethodsItem: React.FC<Props> = ({
  onPress,
  onToggle,
  isActive,
  shortName,
  description,
}) => (
  <Card onPress={onPress}>
    <CardBody row jc="space-between" ai="center">
      <Toggle checked={isActive} onChange={onToggle} />
      <Box flex ml={12}>
        <CardTitle>{shortName}</CardTitle>
        <CardSubTitle>{description}</CardSubTitle>
      </Box>
      <Icon src={require('assets/global/arrowRight.png')} />
    </CardBody>
  </Card>
);

export { PaymentMethodsItem };
