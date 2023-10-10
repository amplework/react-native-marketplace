import { LIMIT } from 'api';
import { getQueryParams } from 'components/invoices/helpers/utils';
import { translations } from 'locales';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { InvoicesPlaceholder } from 'shared/icon/icons';
import {
  getInvoices,
  invoicesSelectors,
  loadMoreInvoices,
} from 'store/entities/invoices';
import { Invoice } from 'types/invoices';
import COLORS from 'utils/colors';

import { InvoicesItem } from '../../components/invoicesItem';
import { styles } from '../style';

const InvoicesList: React.FC = () => {
  const tab = useSelector(invoicesSelectors.tab);
  const invoices = useSelector(invoicesSelectors.invoices);

  const loading = useSelector(invoicesSelectors.loading);
  const loadingMore = useSelector(invoicesSelectors.loadingMore);

  const offset = useSelector(invoicesSelectors.offset);
  const total = useSelector(invoicesSelectors.total);

  const listRef = useRef<FlatList | null>(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });

    dispatch(getInvoices(getQueryParams(tab)));
  }, [dispatch, tab]);

  const refresh = () => dispatch(getInvoices(getQueryParams(tab)));

  const loadMore = () => {
    if (invoices.length < total) {
      dispatch(
        loadMoreInvoices({ offset: offset + LIMIT, ...getQueryParams(tab) }),
      );
    }
  };

  const navigateToDetails =
    ({ id }: Invoice) =>
    () =>
      Navigator.navigate('InvoiceDetails', { id });

  return (
    <FlatList
      ref={listRef}
      data={invoices}
      keyExtractor={(invoice) => `${invoice.id}`}
      renderItem={({ item }) => (
        <InvoicesItem invoice={item} onPress={navigateToDetails(item)} />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() => (
        <EmptyState
          type="image"
          image={<InvoicesPlaceholder />}
          header={t(translations.invoices.placeholder.header)}
          description={t(translations.invoices.placeholder.description)}
          ph={11}
        />
      )}
      ListFooterComponent={() => (
        <ActivityIndicator
          size="large"
          color={loadingMore ? COLORS.clearBlue : COLORS.transparent}
          style={styles.loader}
        />
      )}
    />
  );
};

export { InvoicesList };
