import { t, translations } from 'locales';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Paragraph } from 'shared/paragraph';
import { subscriptionSelectors } from 'store/entities/subscription';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { getLeftNumbersOfSubscription } from 'components/settings/provider/subscription/helpers/utils';

type Props = {
  onContinue: () => void;
};

const SubscriptionSetupBox: React.FC<Props> = ({ onContinue }) => {

  const subscription: any = useSelector(subscriptionSelectors.subscription);
  // var currentDate = moment();
  // var createdDate = moment(subscription?.createdDate);
  // var diff = currentDate.diff(createdDate, 'days');

  // var expirationDate = moment(subscription?.createdDate).add(6, 'day');
  // var totalDayLeftCount = expirationDate.diff(currentDate, 'days');

  const numOfDays: any = useMemo(
    () => getLeftNumbersOfSubscription(subscription),
    [subscription],
  );

  const totalDaysLeftPercent: any = getProgress(7 - numOfDays);

  return (
    <Box elevation bc={COLORS.white} mv={20} pv={20} mh={10} r={10}>
      <Box row ph={20} mb={15} ai='center' jc='space-between' >
        <Box>
          <Paragraph size='l' color={COLORS.black} type='medium' >{'Select a plan'}</Paragraph>
          <Paragraph size='xs' type='book' >{t(translations.subscription.freePlanLeft, { count: numOfDays })}</Paragraph>
        </Box>
        <Button
          text='Continue'
          onPress={onContinue}
          textStyle={{ fontSize: 12, fontFamily: FONTS.medium }}
          buttonStyle={{ height: 30, width: '25%', padding: 0, backgroundColor: COLORS.orange }}
        />
      </Box>
      <Box h={7} w={'90%'} r={5} bc={COLORS.orange30} as='center'>
        <Box h={7} w={totalDaysLeftPercent} r={5} bc={COLORS.orange} />
      </Box>
    </Box>
  );
};

export { SubscriptionSetupBox };

export const getProgress = (diff: number) => {
  switch (diff) {
    case 0:
      return '0%';
    case 1:
      return '14.28%';
    case 2:
      return '28.56%';
    case 3:
      return '42.44%';
    case 4:
      return '57.12%';
    case 5:
      return '71.40%';
    case 6:
      return '85.68%';
    case 7:
    default:
      return '100%';
  }
};