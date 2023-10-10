import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { alert } from 'shared/alert';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Alpha, Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { salesSelectors } from 'store/entities/sales';
import { IProviderPublicProfile } from 'types/users';
import { currency } from 'utils/currency';
import { getFullName } from 'utils/strings';

import { styles as S } from '../style';

type Props = {
  provider?: IProviderPublicProfile | null;
};

const UserSection: React.FC<Props> = ({ provider }) => {
  const sale = useSelector(salesSelectors.sale)!;

  const { t } = useTranslation();

  const user = provider || sale.clientSubprofile;

  const onCall = () => {
    if (user?.phoneNumber) {
      return LinkingHelper.telprompt(user.phoneNumber);
    }

    alert.info(t(translations.common.alerts.mobileWarning));
  };

  return (
    <View style={S.userSection}>
      <Box row ai="center">
        <Avatar src={user?.photo} size={40} mr={12} />
        <Box>
          <Box row ai="center">
            <Paragraph>
              {user ? getFullName(user) : ''}
            </Paragraph>
            {user?.isConnected && <Alpha />}
          </Box>
          <Box row>
            <Paragraph size="s" type="book" mr={4}>
              {t(translations.sales.totalTitle)}
            </Paragraph>
            <Paragraph size="s">{currency.format(sale.total)}</Paragraph>
          </Box>
        </Box>
      </Box>
      <Icon
        src={require('assets/global/callGrey.png')}
        onPress={onCall}
        size={20}
        mr={16}
      />
    </View>
  );
};

export { UserSection };
