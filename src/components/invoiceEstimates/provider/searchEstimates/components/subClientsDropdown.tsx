import I18n from 'locales';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { ISubClient } from 'types/subClients';

import { styles } from '../style';

type Props = {
  onPress: () => void;
  subClient: ISubClient | null;
};

const SubClientsDropdown: React.FC<Props> = ({ onPress, subClient }) => (
  <TouchableOpacity onPress={onPress} style={styles.section}>
    <Box row jc="space-between" ai="center">
      {subClient ? (
        <Box row ai="center">
          <Avatar src={subClient.photo} size={40} mr={12} />
          <Paragraph>
            {subClient.firstName} {subClient.lastName}
          </Paragraph>
          {subClient.isConnected && (
            <Icon
              src={require('assets/onBoarding/alpha.png')}
              size={16}
              ml={4}
            />
          )}
        </Box>
      ) : (
        <Paragraph size="s" type="book">
          {I18n.t('invoices.fields.clientName')}
        </Paragraph>
      )}
      <Icon src={require('assets/global/arrowDown.png')} size={20} />
    </Box>
  </TouchableOpacity>
);

export { SubClientsDropdown };
