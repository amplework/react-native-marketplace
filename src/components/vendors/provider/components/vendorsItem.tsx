import React from 'react';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { IVendor } from 'types/vendors';

type Props = {
  data: IVendor;
  onPress: (vendor: IVendor) => () => void;
};

const VendorsItem: React.FC<Props> = ({ data, onPress }) => (
  <Card onPress={onPress(data)}>
    <CardBody row jc="space-between" ai="center">
      <Box>
        <CardTitle>{data.name}</CardTitle>
        <CardSubTitle>{data.phoneNumber}</CardSubTitle>
      </Box>
      <Icon src={require('assets/global/arrowRight.png')} size={24} />
    </CardBody>
  </Card>
);

export { VendorsItem };
