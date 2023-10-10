import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Alpha, Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { IProviderPublicProfile } from 'types/users';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';

import { invoiceDetailsStyle as S } from '../style';
import { estimatesSelectors } from 'store/entities/estimates';

type Props = {
  provider?: IProviderPublicProfile | null;
};

const UserSection: React.FC<Props> = ({ provider }) => {
  const estimate = useSelector(estimatesSelectors.estimate)!;

  const user = provider || estimate.clientSubprofile;

  return (
    <View style={S.userSection}>
      <Box w={'90%'} row ai="center">
        <Avatar src={user.photo} size={40} mr={12} />
        <Box w={'60%'}>
          <Box row ai="center">
            <Paragraph lines={1} >{getFullName(user)}</Paragraph>
            {user?.isConnected && <Alpha />}
          </Box>
          <Box row>
            <Paragraph size="s" type="book" mr={4}>
              {I18n.t('estimates.estimateTotal')}
            </Paragraph>
            <Paragraph size="s" color={COLORS.greenblue}>
              ${estimate.total}
            </Paragraph>
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export { UserSection };
