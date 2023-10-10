import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Details, DetailsRow } from 'shared/details';
import { homeSelectors } from 'store/entities/home';
import { subscriptionSelectors } from 'store/entities/subscription';
import { LITE } from 'types/subscription';

const PerformanceReviewDetails: React.FC = () => {
  const period = useSelector(homeSelectors.period);
  const review = useSelector(homeSelectors.performanceReview);
  const subscription = useSelector(subscriptionSelectors.subscription);

  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const { t } = useTranslation();

  return (
    <Details mh={24} mb={50} mt={liteSubcription ? 30 : 0}>
      <DetailsRow
        label={t(translations.home.review.details.goalCompleted)}
        value={`${review.goalCompleted}%`}
      />
      <DetailsRow
        label={t(translations.home.review.details.totalExpenses)}
        value={`$${review.totalExpenses}`}
      />
      <DetailsRow
        label={t(translations.home.review.details.wantedToEarn)}
        value={`$${review.wantedToEarn}`}
      />
      {period === 'week' && (
        <DetailsRow
          label={t(translations.home.review.details.weekAlreadyBooked)}
          value={`${review.weekAlreadyBooked}%`}
        />
      )}
      <DetailsRow
        label={t(translations.home.review.details.newClients, {
          period: t(translations.home.review.periods[period]),
        })}
        value={review.newClients}
      />
      <DetailsRow
        label={t(translations.home.review.details.activeClients, {
          period: t(translations.home.review.periods[period]),
        })}
        value={review.activeClients}
      />
      <DetailsRow
        label={t(translations.home.review.details.appointmentEntered)}
        value={review.appointmentEntered}
        isLast={liteSubcription ? true : false}
      />
      {!liteSubcription && <DetailsRow
        label={t(translations.home.review.details.pastDueInvoices)}
        value={review.pastDueInvoices}
      />}
      {!liteSubcription && <DetailsRow
        label={t(translations.home.review.details.totalCashCollected)}
        value={`$${review.totalCashCollected}`}
        isLast
      />}
    </Details>
  );
};

export { PerformanceReviewDetails };
