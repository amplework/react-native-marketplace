import React from 'react';
import { HomeIconGroup } from 'components/home/components/homeIconGroup';
import { translations } from 'locales';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { homeSelectors, openDatepickerModal } from 'store/entities/home';
import { userSelectors } from 'store/entities/user';
import COLORS from 'utils/colors';

const HomeHeader: React.FC = () => {
  const user = useSelector(userSelectors.user);
  const selectedDate = useSelector(homeSelectors.selectedDate);
  const { provider } = useSelector((state: any) => state.provider);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenModal = () => dispatch(openDatepickerModal());
 
  return (
    <Box row jc="space-around" mb={20}>
      <Box row ai="center">
        <Pressable onPress={Navigator.drawer.open}>
          <Avatar
            src={provider?.photo ? provider?.photo : user?.photo}
            size={50}
            mr={12}
          />
        </Pressable>
        <Box>
          <Box row={true}>
          <Paragraph lines={1} flex size="l" mb={2}>
            {t(translations.home.greetings, { name: provider?.firstName || user?.firstName || '...' })}
          </Paragraph> 
          </Box>
        
          <Box row ai="flex-end">
            <Paragraph size="xs" type="book">
              {t(translations.home.yourSchedule)}
            </Paragraph>
            <Pressable row onPress={handleOpenModal}>
              <Paragraph size="s" type="bold" color={COLORS.orange} mr={2}>
                {moment(selectedDate).format('DD MMM YYYY')}
              </Paragraph>
              <Icon src={require('assets/global/arrowDown.png')} size={20} />
            </Pressable>
          </Box>
        </Box>
      </Box>
      <HomeIconGroup />
    </Box>
  );
};

export { HomeHeader };
