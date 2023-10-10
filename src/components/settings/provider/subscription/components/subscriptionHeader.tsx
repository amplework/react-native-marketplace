import { translations } from 'locales';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from 'shared/avatar';
import { Paragraph } from 'shared/paragraph';
import { subscriptionSelectors } from 'store/entities/subscription';
import { IProviderUser } from 'types/users';
import { capitalize, getFullName } from 'utils/strings';
import { getSubscriptionType } from 'utils/subscription';

import { getLeftNumbersOfSubscription } from '../helpers/utils';
import { subscriptionStyles as S } from '../style';

type State = {
  provider: {
    provider: IProviderUser;
    loading: boolean;
  };
};

const SubscriptionHeader: React.FC = () => {
  const subscription: any = useSelector(subscriptionSelectors.subscription);
  const provider = useSelector((state: State) => state.provider.provider);

  const { t } = useTranslation();

  const subscriptionType: any = getSubscriptionType(subscription)?.plan;

  const numOfDays: any = useMemo(
    () => getLeftNumbersOfSubscription(subscription),
    [subscription],
  );

  return (
    <View style={S.headerContainer}>
      <Avatar src={provider?.photo} size={70} mb={15} />
      {provider && <Paragraph type="bold">{getFullName(provider)}</Paragraph>}
      <Paragraph size="s" type="book">
        {(subscription?.subscriptionPlan || subscription?.subscriptionPlanId) ? (
          <>
            {`${capitalize(subscriptionType)} | ${t(translations.subscription.left, { count: numOfDays })}`}
          </>
        ) : ''}
      </Paragraph>
    </View>
  );
};

export { SubscriptionHeader };
