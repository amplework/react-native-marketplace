import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import COLORS from 'utils/colors';

import styles from './style';
import I18n from 'locales';
import { estimatesSelectors, getFilteredEstimates } from 'store/entities/estimates';
import { getQueryParams } from 'components/invoiceEstimates/helpers/utils';
import { EstimateItem } from 'components/invoiceEstimates/components/estimateItem';
import { padding } from 'utils/styles';
import { Estimate } from 'types/estimates';
import { Navigator } from 'service/navigator';
import moment from 'moment';
import { formatApiDate, getEndOfMonth } from 'utils/dates';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const EstimatesFilter: React.FC<Props> = ({ route }) => {
  const filteredEstimates = useSelector(estimatesSelectors.filteredEstimates);
  const loading = useSelector(estimatesSelectors.loading);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // dispatch(getFilteredEstimates({}));
      switch (route?.params?.filter) {
        case 'current_month_count':
          dispatch(getFilteredEstimates(getQueryParams('month')));
          break;
        case 'open_count':
          dispatch(getFilteredEstimates(getQueryParams('open')));
          break;
        case 'expired_count':
          dispatch(getFilteredEstimates({
            fromDate: formatApiDate(moment().toDate()),
            toDate: formatApiDate(getEndOfMonth()),
          }));
          break;
        case 'pending_count':
          dispatch(getFilteredEstimates({}));
          break;
        case 'to_be_sent':
          dispatch(getFilteredEstimates({}));
          break;
        case 'approved_this_month':
          dispatch(getFilteredEstimates(getQueryParams('month')));
          break;
        default:
          break;
      }
    }
  }, [isFocused]);

  const currentArray = () => {
    switch (route?.params?.filter) {
      case 'current_month_count':
        return filteredEstimates;
      case 'open_count':
        return filteredEstimates;
      case 'expired_count':
        const expiringEstimates = filteredEstimates?.filter((est: Estimate) => moment(moment(est.expDate).toDate()).isBetween(moment().toDate(), moment().endOf('month').toDate()));
        return expiringEstimates;
      case 'pending_count':
        const pendingApproval = filteredEstimates?.filter((est: Estimate) => est.approveStatus == null);
        return pendingApproval;
      case 'to_be_sent':
        const tobeSent = filteredEstimates?.filter((est: Estimate) => est.emailRecipient == null);
        return tobeSent;
      case 'approved_this_month':
        const approved = filteredEstimates?.filter((est: Estimate) => est.approveStatus == 'approved');
        return approved;
      default:
        return [];
    }
  };

  const currentHeader = () => {
    switch (route?.params?.filter) {
      case 'current_month_count':
        return I18n.t('estimates.currentMonthCount');
      case 'open_count':
        return I18n.t('estimates.openCount');
      case 'expired_count':
        return I18n.t('estimates.overdueCount');
      case 'pending_count':
        return I18n.t('estimates.pendingApprovalCount');
      case 'to_be_sent':
        return I18n.t('estimates.tobeSent');
      case 'approved_this_month':
        return I18n.t('estimates.approvedThisMonthCount');
      default:
        return '';
    }
  };

  const navigateToDetails =
    ({ id }: Estimate) =>
      () =>
        Navigator.navigate('EstimateDetails', { id });

  return (
    <MainPageTemplate
      loading={loading}
      bc={COLORS.whiteTwo}
    >
      <View style={styles.header}>
        <Text style={styles.titleHeader}>{currentHeader()}</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          // ref={listRef}
          data={currentArray()}
          keyExtractor={(estimate) => `${estimate.id}`}
          renderItem={({ item }) => (
            <EstimateItem estimate={item} onPress={navigateToDetails(item)} />
          )}
          // refreshControl={
          //   <RefreshControl refreshing={loading} onRefresh={refresh} />
          // }
          // onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          style={{
            ...padding(0, 24, 24, 24),
          }}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </MainPageTemplate>
  );
};

export default EstimatesFilter;
