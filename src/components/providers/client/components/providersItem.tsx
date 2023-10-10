import {
  checkWorkStatus,
  parseWorkingTime,
} from 'components/providers/helpers/dates';
import I18n, { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import {
  Card,
  CardBody,
  CardFooter,
  CardSubTitle,
} from 'shared/card';
import { Description } from 'shared/description';
import { Alpha, Icon } from 'shared/icon';
import { IProvider } from 'types/users';
import { getValueOrNA } from 'utils/fields';
import { getFullName } from 'utils/strings';
import {
  SpecialOfferClientIcon,
  IconComponent,
  ClientRewardIcon,
} from 'shared/icon/icons';

import { HouseCallBadge } from './houseCallBadge';
import { WorkingHours } from './workingHours';
import COLORS from 'utils/colors';
import { Paragraph } from 'shared/paragraph';

type Props = {
  provider: IProvider;
  onPress: () => void;
  onFavouritePress?: () => void;
  showStar?: boolean;
  disabled?: boolean;
};

const ProvidersItem: React.FC<Props> = ({
  provider: {
    firstName,
    lastName,
    phoneNumber,
    photo,
    closedDays,
    calendarSettings,
    isHouseCallAllowed,
    isShortlisted,
    isConnected,
    businessName,
    service,
    offer,
    isLoyaltyReward,
  },
  showStar = true,
  disabled = false,
  onPress,
  onFavouritePress,
}) => {
  const { t } = useTranslation();

  const { dayStart, dayEnd, utcOffset } = calendarSettings;

  const parsedDayStart = parseWorkingTime(dayStart, utcOffset);
  const parsedDayEnd = parseWorkingTime(dayEnd, utcOffset);
  const isOpened = checkWorkStatus({ calendarSettings, closedDays });  

  return (
    <Card onPress={onPress}>
      <CardBody>
        <Box w={'100%'} row jc="space-between" ai="center">
          <Box w={'15%'}>
            <Avatar src={photo} size={40} mr={12} />
          </Box>
          <Box w={'75%'}>
            <Box w={'100%'} wrap row ai="center">
              <Paragraph lines={1}>
                {getFullName({ firstName, lastName })}
              </Paragraph>
              {isConnected && <Alpha />}
            </Box>
            <CardSubTitle>{phoneNumber}</CardSubTitle>
          </Box>
          <Box w={'10%'}>
            <Icon src={require('assets/global/arrowRight.png')} />
          </Box>
        </Box>
      </CardBody>
      <CardFooter>
        <Box row jc="space-between">
          <WorkingHours
            closed={!isOpened}
            dayStart={parsedDayStart}
            dayEnd={parsedDayEnd}
          />
          {showStar && (
            <Icon
              src={
                isShortlisted
                  ? require('assets/global/starActive.png')
                  : require('assets/global/star.png')
              }
              onPress={onFavouritePress}
              disabled={disabled}
              size={20}
            />
          )}
        </Box>
        {isHouseCallAllowed && <HouseCallBadge />}
        {offer && (
          <Box row ai="center" mt={6}>
            <IconComponent
              Component={SpecialOfferClientIcon}
              size={18}
              color={COLORS.black70}
              mr={8}
              ml={1}
            />
            <Paragraph size="xs" type="book">
              {I18n.t('providers.serviceOffer', {
                offer: offer
              })}
            </Paragraph>
          </Box>
        )}
        <Description
          label={t(translations.personalInfo.fields.shopName)}
          size="xs"
          mt={5}
        >
          {getValueOrNA(businessName)}
        </Description>
        <Box row jc="space-between">
          <Description
            label={t(translations.basicInfo.titleField)}
            size="xs"
            mt={5}
          >
            {getValueOrNA(service?.name)}
          </Description>
          {isLoyaltyReward && (
            <IconComponent
              size={20}
              Component={ClientRewardIcon}
            />
          )}
        </Box>
      </CardFooter>
    </Card>
  );
};

export { ProvidersItem };
