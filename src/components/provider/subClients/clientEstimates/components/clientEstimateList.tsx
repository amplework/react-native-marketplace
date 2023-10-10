import { LIMIT } from 'api';
import { ALL_ESTIMATES_STATUSES } from 'components/invoices/helpers/constants';
import React, { useEffect } from 'react';
import { translations } from 'locales';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IProviderUser } from 'types/users';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { theme } from 'theme';
import { ISubClient } from 'types/subClients';
import COLORS from 'utils/colors';

import { ClientEstimateItem } from './clientEstimateItem';
import { estimatesSelectors, getEstimates, loadMoreEstimates, resetEstimates } from 'store/entities/estimates';
import { Estimate } from 'types/estimates';

type Props = {
  subClient?: ISubClient;
};

type State = {
  provider: {
    provider: IProviderUser;
  };
};

const ClientEstimateList: React.FC<Props> = ({ subClient }) => {
  const estimates = useSelector(estimatesSelectors.estimates);

  const loading = useSelector(estimatesSelectors.loading);
  const loadingMore = useSelector(estimatesSelectors.loadingMore);

  const offset = useSelector(estimatesSelectors.offset);
  const total = useSelector(estimatesSelectors.total);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchEstimates = useCallback(() => {
    dispatch(
      getEstimates({
        orderBy: 'date',
        status: ALL_ESTIMATES_STATUSES,
        clientSubprofileId: subClient?.id,
      }),
    );
  }, [dispatch, subClient?.id]);

  useEffect(() => {
    dispatch(resetEstimates());

    return () => {
      dispatch(resetEstimates());
    };
  }, [dispatch]);

  useEffect(() => {
    fetchEstimates();
  }, [fetchEstimates]);

  const loadMore = () => {
    if (estimates.length < total) {
      dispatch(
        loadMoreEstimates({
          offset: offset + LIMIT,
          orderBy: 'date',
          status: ALL_ESTIMATES_STATUSES,
          clientSubprofileId: subClient?.id,
        }),
      );
    }
  };

  // let pdfName = I18n.t('common.files.pdf.estimate', {
  //   number: estimate!.number,
  //   date: formatFileDate(estimate!.date),
  //   firstName: provider.firstName,
  //   lastName: provider.lastName,
  // })

  const navigateToDetails =
    ({ id }: Estimate) =>
      () =>
        // Navigator.navigate('InvoiceDetails', {
        //   id,
        //   onEdit: fetchInvoices,
        //   onDelete: fetchInvoices,
        //   onPay: fetchInvoices,
        // });
        Navigator.navigate('Estimates', {
          screen: 'EstimateDetails',
          params: { id }
        });

  return (
    <FlatList
      data={estimates}
      // keyExtractor={(estimate) => `${estimate.id}`}
      renderItem={({ item }: any) => (
        <ClientEstimateItem
          estimate={item}
          onPressDownload={() => {
            // ShareHelper.sharePdf({
            //   name: I18n.t('common.files.pdf.estimate', {
            //     number: item.number,
            //     date: formatFileDate(item.date),
            //     firstName: provider.firstName,
            //     lastName: provider.lastName,
            //   }), url: item?.pdfFile.url
            // });
            // downloadPdf();
          }}
          onPress={navigateToDetails(item)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchEstimates} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      contentContainerStyle={theme.styles.grow}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.estimates)}
          ph={24}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={theme.styles.listLoader}
        />
      )}
    />
  );
};

export { ClientEstimateList };
