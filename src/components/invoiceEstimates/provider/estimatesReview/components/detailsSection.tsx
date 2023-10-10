import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Separator } from 'shared/separator';
import { estimatesSelectors } from 'store/entities/estimates';

import { styles } from '../style';
import { Row } from './row';
import { Navigator } from 'service/navigator';
import { Estimate } from 'types/estimates';
import moment from 'moment';

const DetailsSection: React.FC = () => {
  const review = useSelector(estimatesSelectors.review);
  const filteredEstimates = useSelector(estimatesSelectors.filteredEstimates);
  const expiringCount = filteredEstimates?.filter((est: Estimate) => moment(moment(est.expDate).toDate()).isBetween(moment().toDate(), moment().endOf('month').toDate())).length;

  return (
    <View style={styles.section}>
      <Row
        name={I18n.t('estimates.currentMonthCount')}
        value={review?.estimates?.currentMonthCount}
        touchable={true}
        onPress={() => Navigator.navigate('EstimatesFilter', { filter: 'current_month_count' })}
      />
      <Separator />
      <Row
        touchable
        name={I18n.t('estimates.openCount')}
        value={review?.estimates?.openCount}
        onPress={() => Navigator.navigate('EstimatesFilter', { filter: 'open_count' })}
      />
      <Separator />
      <Row
        touchable
        name={I18n.t('estimates.overdueCount')}
        value={expiringCount}
        onPress={() => Navigator.navigate('EstimatesFilter', { filter: 'expired_count' })}
      />
      <Separator />
      <Row
        name={I18n.t('estimates.pendingApprovalCount')}
        value={review?.estimates?.pendingApproval}
        touchable={true}
        onPress={() => Navigator.navigate('EstimatesFilter', { filter: 'pending_count' })}
      />
      <Separator />
      <Row
        name={I18n.t('estimates.tobeSent')}
        value={review?.estimates?.toBeSent}
        touchable={true}
        onPress={() => Navigator.navigate('EstimatesFilter', { filter: 'to_be_sent' })}
      />
      <Separator />
      <Row
        name={I18n.t('estimates.approvedThisMonthCount')}
        value={review?.estimates?.approvedMonthCount}
        touchable={true}
        onPress={() => Navigator.navigate('EstimatesFilter', { filter: 'approved_this_month' })}
      />
      <Separator />
      <Row
        name={I18n.t('estimates.openBalanceTotal')}
        value={`$${review?.estimates?.openBalanceTotal}`}
      />
      <Separator />
      <Row
        name={I18n.t('estimates.expiredBalanceTotal')}
        value={`$${review?.estimates?.overdueBalanceTotal}`}
      />
    </View>
  );
};

export { DetailsSection };
