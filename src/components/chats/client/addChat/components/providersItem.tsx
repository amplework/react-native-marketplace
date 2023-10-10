import React from 'react';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Card, CardBody } from 'shared/card';
import { Paragraph } from 'shared/paragraph';
import { IProvider } from 'types/users';
import { getValueOrNA } from 'utils/fields';
import { getFullName } from 'utils/strings';

type Props = {
  provider: IProvider;
  onPress: () => void;
};

const ProvidersItem: React.FC<Props> = ({ provider, onPress }) => (
  <Card spacing="both" onPress={onPress}>
    <CardBody row ai="center">
      <Avatar src={provider.photo} size={40} mr={8} />
      <Box>
        <Paragraph>{getFullName(provider)}</Paragraph>
        <Paragraph size="s" type="book">
          {getValueOrNA(provider.service?.name)}
        </Paragraph>
      </Box>
    </CardBody>
  </Card>
);

export { ProvidersItem };
