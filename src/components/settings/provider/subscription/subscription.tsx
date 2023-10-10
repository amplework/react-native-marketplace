import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import { getProviderProfile } from 'store/actions/provider';
import { cancelStripeSubscription, cardSelectors } from 'store/entities/card';
import {
  getUserSubscriptionDetails,
  subscriptionSelectors,
} from 'store/entities/subscription';
import { PREMIUM } from 'types/subscription';
import { IProviderUser } from 'types/users';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';

import { SubscriptionCard } from './components/subscriptionCard';
import { SubscriptionHeader } from './components/subscriptionHeader';
import { isMatchSubscriptionPlatform } from './helpers/utils';
import { subscriptionStyles as S } from './style';
import ScrollContainer from 'shared/scrollContainer';

type Props = StackScreenProps<RootStackParamList>;

type State = {
  provider: {
    provider: IProviderUser;
    loading: boolean;
  };
};

const Subscription: React.FC<Props> = ({ navigation }: any) => {
  const subscription: any = useSelector(subscriptionSelectors.subscription);
  const loading = useSelector(subscriptionSelectors.loading);
  const cancelSubscriptionLoading = useSelector(cardSelectors.loading);
  const providerLoading = useSelector((state: State) => state.provider.loading);
  const isPremiumPlan = subscription?.subscriptionPlanId.includes('premium');
  const isStripeSubscription: boolean = subscription?.subscriptionPlanId.includes('stripe');
  const isCancelledAlready: any = subscription?.cancellationDateMs;  

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.subscription.details)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    dispatch(getUserSubscriptionDetails());
    dispatch(getProviderProfile());
  }, []);

  const navigateToUpgrade = () => navigation.navigate('UpgradeSubscription');

  const handlePlatformMismatch = () => {
    if (subscription?.platform == 'web' && isIOS) {
      return t(translations.subscription.platformMismatchWeb);
    }
    if (subscription?.platform == 'web' && !isIOS) {
      return t(translations.subscription.platformMismatchWeb);
    }
    if (subscription?.platform == 'admin-web' && isIOS) {
      return t(translations.subscription.platformMismatchAdmin);
    }
    if (subscription?.platform == 'admin-web' && !isIOS) {
      return t(translations.subscription.platformMismatchAdmin);
    }
    if (subscription?.platform == 'google' && isIOS) {
      return t(translations.subscription.platformMismatch, {
        platform: 'IOS'
      });
    }
  }  

  const handleCancelSubscription = () => {
    if (isStripeSubscription) {
      isCancelledAlready
        ? toast.info('This subscription has already been canceled.')
        : alert.confirmation({
          message: 'Are you sure that you want to cancel this subscription?. However, you can take advantage of this subscription until the subscription expires completely.',
          onConfirm: () => dispatch(cancelStripeSubscription())
        })
    } else {
      LinkingHelper.subscriptionSettings();
    }
  }

  return (
    <MainPageTemplate
      loading={loading || providerLoading}
      containerStyle={S.container}
      bc={COLORS.white}
    >
      <ScrollContainer>
        <SubscriptionHeader />
        <SubscriptionCard />
      </ScrollContainer>
      {!isPremiumPlan && (
        <Button
          text={t(translations.subscription.upgrade)}
          buttonStyle={S.upgrade}
          textStyle={S.upgradeText}
          onPress={navigateToUpgrade}
        />
      )}
      {isMatchSubscriptionPlatform(subscription) ? (
        <Button
          text={t(translations.subscription.cancel)}
          buttonStyle={S.cancel}
          textStyle={S.cancelText}
          loadingColor={COLORS.red}
          loading={cancelSubscriptionLoading}
          onPress={handleCancelSubscription}
        />
      ) : (
        (subscription?.subscriptionPlanId == 'free') ? null : (
          <Paragraph type="book" size="s" mt={10}>
            {handlePlatformMismatch()}
          </Paragraph>
        )
      )}
    </MainPageTemplate>
  );
};

export { Subscription };
