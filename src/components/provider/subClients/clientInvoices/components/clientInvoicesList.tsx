import { LIMIT } from 'api';
import { ALL_INVOICE_STATUSES } from 'components/invoices/helpers/constants';
import React, { useEffect } from 'react';
import I18n, { translations } from 'locales';
import { useCallback } from 'react';
import { ShareHelper } from 'service/shareHelper';
import { useTranslation } from 'react-i18next';
import { IProviderUser } from 'types/users';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { formatFileDate } from 'utils/dates';
import {
  getInvoice,
  getInvoices,
  invoicesSelectors,
  loadMoreInvoices,
  resetInvoices,
} from 'store/entities/invoices';
import { theme } from 'theme';
import { Invoice } from 'types/invoices';
import { ISubClient } from 'types/subClients';
import COLORS from 'utils/colors';

import { ClientInvoicesItem } from './clientInvoicesItem';

type Props = {
  subClient?: ISubClient;
};

type State = {
  provider: {
    provider: IProviderUser;
  };
};

const ClientInvoicesList: React.FC<Props> = ({ subClient }) => {
  const invoices = useSelector(invoicesSelectors.invoices);
  const invoice = useSelector(invoicesSelectors.invoice);

  const provider = useSelector((state: State) => state.provider.provider);

  const loading = useSelector(invoicesSelectors.loading);
  const loadingMore = useSelector(invoicesSelectors.loadingMore);

  const offset = useSelector(invoicesSelectors.offset);
  const total = useSelector(invoicesSelectors.total);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchInvoices = useCallback(() => {
    dispatch(
      getInvoices({
        orderBy: 'date',
        status: ALL_INVOICE_STATUSES,
        clientSubprofileId: subClient?.id,
      }),
    );
  }, [dispatch, subClient?.id]);

  useEffect(() => {
    dispatch(resetInvoices());

    return () => {
      dispatch(resetInvoices());
    };
  }, [dispatch]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const loadMore = () => {
    if (invoices.length < total) {
      dispatch(
        loadMoreInvoices({
          offset: offset + LIMIT,
          orderBy: 'date',
          status: ALL_INVOICE_STATUSES,
          clientSubprofileId: subClient?.id,
        }),
      );
    }
  };

  // let pdfName = I18n.t('common.files.pdf.invoice', {
  //   number: invoice!.number,
  //   date: formatFileDate(invoice!.date),
  //   firstName: provider.firstName,
  //   lastName: provider.lastName,
  // })

  const navigateToDetails =
    ({ id }: Invoice) =>
    () =>
      // Navigator.navigate('InvoiceDetails', {
      //   id,
      //   onEdit: fetchInvoices,
      //   onDelete: fetchInvoices,
      //   onPay: fetchInvoices,
      // });
      Navigator.navigate('Invoices', {
        screen: 'InvoiceDetails',
        params: { id }
      });      

  return (
    <FlatList
      data={invoices}
      keyExtractor={(invoice) => `${invoice.id}`}
      renderItem={({ item }: any) => (
        <ClientInvoicesItem
          invoice={item}
          onPressDownload={() => {
            ShareHelper.sharePdf({ name: I18n.t('common.files.pdf.invoice', {
              number: item.number,
              date: formatFileDate(item.date),
              firstName: provider.firstName,
              lastName: provider.lastName,
            }), url: item?.pdfFile.url });
            // downloadPdf();
          }}
          onPress={navigateToDetails(item)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchInvoices} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      contentContainerStyle={theme.styles.grow}
      ListEmptyComponent={() => (
        <EmptyState
          entities={t(translations.common.entities.invoices)}
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

export { ClientInvoicesList };
