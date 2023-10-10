import { translations } from 'locales';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Details, DetailsRow } from 'shared/details';
import { subscriptionSelectors } from 'store/entities/subscription';
import { formatDate } from 'utils/dates';
import { getValueOrNA } from 'utils/fields';
import { getSubscriptionType } from 'utils/subscription';

import { getPaymentMethod, getPrice } from '../helpers/utils';

const SubscriptionCard: React.FC = () => {
  const { t } = useTranslation();

  const subscription: any = useSelector(subscriptionSelectors.subscription);
  const subscriptionType: any = getSubscriptionType(subscription)?.plan;
  const isStripeSubscription: boolean = subscription?.subscriptionPlanId.includes('stripe');
  const subscriptionLength = subscription?.subscriptionPlanId == 'free' ? '7 Days' : 'Month';

  const getExpirationDate = () => getValueOrNA(formatDate(+subscription.expirationDateMs));

  const purchaseDate = () => getValueOrNA(formatDate(+subscription.purchaseDateMs));

  return subscription ? (
    <Details mt={24}>
      <DetailsRow
        label={t(translations.subscription.paymentMethod)}
        value={getPaymentMethod(subscription)}
      />
      <DetailsRow
        label={t(translations.subscription.subscriptionType)}
        value={subscriptionType.charAt(0).toUpperCase() + subscriptionType?.slice(1)}
      />
      <DetailsRow
        label={t(translations.subscription.subscriptionLength)}
        value={subscriptionLength}
      />
      {subscription?.subscriptionPlanId !== 'free' ? (
        <>
          <DetailsRow
            label={t(translations.subscription.nextPayment)}
            value={getExpirationDate()}
          />
          <DetailsRow
            label={t(translations.subscription.lastPayment)}
            value={purchaseDate()}
          />
        </>
      ) : null}
      {isStripeSubscription && subscription?.cancellationDateMs && (
        <DetailsRow
          label={t(translations.subscription.cancelDate)}
          value={moment.unix(subscription?.cancellationDateMs).format('Do MMM YYYY')}
        />
      )}
      <DetailsRow
        label={t(translations.subscription.expireDate)}
        value={getExpirationDate()}
      />
      <DetailsRow
        label={t(translations.subscription.perMonth)}
        value={subscription?.subscriptionPlanId == 'free' ? 'Free' : getPrice(subscription)}
        isLast
      />
    </Details>
  ) : null;
};

export { SubscriptionCard };
