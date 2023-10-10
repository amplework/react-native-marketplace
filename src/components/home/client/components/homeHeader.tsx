import { HomeIconGroup } from 'components/home/components/homeIconGroup';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { userSelectors } from 'store/entities/user';
import COLORS from 'utils/colors';

const HomeHeader: React.FC = () => {
  const user = useSelector(userSelectors.user);
  const client = useSelector((state: any) => state.client.client);

  const { t } = useTranslation();

  const navigateToProfile = () => Navigator.navigate('MyProfile');

  // const city = user?.address?.formattedAddress.split(',')[0];
  const city = client?.address?.formattedAddress.split(',')[0];

  return (
    <Box>
      <Box w={'100%'} ai='center' row mb={20}>
        <Box w={'80%'} row ai="center">
          <Box w={'20%'}>
            <Pressable onPress={navigateToProfile}>
              <Avatar src={client?.photo} size={50} mr={12} />
            </Pressable>
          </Box>
          <Box w={'80%'} ph={10}>
            <Box>
              <Paragraph lines={1} size="l" mb={2}>
                {t(translations.home.greetings, { name: user?.firstName })}
              </Paragraph>
            </Box>

            <Box row ai="center">
              <Paragraph size="s" type="book" color={COLORS.warmGrey}>
                {city?.substring(0, 26)}
              </Paragraph>
              <Icon
                src={require('assets/global/mapsPlace.png')}
                size={16}
                ml={4}
              />
            </Box>
          </Box>
        </Box>
        <Box w={'20%'}>
          <HomeIconGroup />
        </Box>
      </Box>
    </Box>
  );
};

export { HomeHeader };

