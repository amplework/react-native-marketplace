import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ProgressTile,
  ProgressTileSubtitle,
  ProgressTileTitle,
} from 'shared/progress';
import { invoicesSelectors } from 'store/entities/invoices';
import { currency } from 'utils/currency';

const CounterBar: React.FC = () => {
  const tab = useSelector(invoicesSelectors.tab);

  const invoices = useSelector(invoicesSelectors.invoices);
  const balance = useSelector(invoicesSelectors.balanceSum);
  const total = useSelector(invoicesSelectors.totalSum);

  const { t } = useTranslation();

  const progress = (balance / total) * 100;

  return invoices.length ? (
    <ProgressTile progress={progress} elevation mh={24} mb={20}>
      <ProgressTileTitle
        label={t(translations.invoices.balance)}
        value={currency.format(balance)}
      />
      <ProgressTileSubtitle
        label={t(translations.invoices.total[tab])}
        value={currency.format(total)}
      />
    </ProgressTile>
  ) : null;
};

export { CounterBar };
