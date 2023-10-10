import React from 'react';
import { Avatar } from 'shared/avatar';
import { Card, CardBody } from 'shared/card';
import { Paragraph } from 'shared/paragraph';
import { ISubClient } from 'types/subClients';
import { getFullName } from 'utils/strings';

type Props = {
  client: ISubClient;
  onPress: (client: ISubClient) => () => void;
};

const SubClientsItem: React.FC<Props> = ({ client, onPress }) => (
  <Card onPress={onPress(client)} spacing="both">
    <CardBody row ai="center">
      <Avatar src={client.photo} size={30} mr={12} />
      <Paragraph mr={6}>{getFullName(client)}</Paragraph>
    </CardBody>
  </Card>
);

export { SubClientsItem };
