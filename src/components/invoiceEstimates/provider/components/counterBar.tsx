import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ProgressTile,
  ProgressTileSubtitle,
  ProgressTileTitle,
} from 'shared/progress';
import { estimatesSelectors } from 'store/entities/estimates';
import { invoicesSelectors } from 'store/entities/invoices';
import { currency } from 'utils/currency';

const CounterBar: React.FC = () => {
  const tab = useSelector(estimatesSelectors.tab);

  const estimates = useSelector(estimatesSelectors.estimates);
  const balance = useSelector(estimatesSelectors.balanceSum);
  const total = useSelector(estimatesSelectors.totalSum);

  const { t } = useTranslation();

  const progress = (balance / total) * 100;

  return estimates.length ? (
    <ProgressTile progress={progress} elevation mh={24} mb={20}>
      <ProgressTileTitle
        label={t(translations.estimates.balance)}
        value={currency.format(balance)}
      />
      <ProgressTileSubtitle
        label={t(translations.estimates.total[tab])}
        value={currency.format(total)}
      />
    </ProgressTile>
  ) : null;
};

export { CounterBar };