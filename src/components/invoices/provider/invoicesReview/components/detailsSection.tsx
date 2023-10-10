import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Separator } from 'shared/separator';
import { invoicesSelectors } from 'store/entities/invoices';

import { styles } from '../style';
import { Row } from './row';

const DetailsSection: React.FC = () => {
  const review = useSelector(invoicesSelectors.review);
  const {
    currentMonthCount,
    openCount,
    overdueCount,
    openBalanceTotal,
    overdueBalanceTotal,
  } = review.invoices;

  return (
    <View style={styles.section}>
      <Row
        name={I18n.t('invoices.currentMonthCount')}
        value={currentMonthCount}
      />
      <Separator />
      <Row name={I18n.t('invoices.openCount')} value={openCount} />
      <Separator />
      <Row name={I18n.t('invoices.overdueCount')} value={overdueCount} />
      <Separator />
      <Row
        name={I18n.t('invoices.openBalanceTotal')}
        value={`$${openBalanceTotal}`}
      />
      <Separator />
      <Row
        name={I18n.t('invoices.overdueBalanceTotal')}
        value={`$${overdueBalanceTotal}`}
      />
    </View>
  );
};

export { DetailsSection };
