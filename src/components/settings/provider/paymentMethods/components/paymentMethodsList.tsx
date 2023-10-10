import I18n from 'locales';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyState } from 'shared/emptyState';
import {
  getPaymentMethods,
  openEditModal,
  paymentMethodsSelectors,
  toggleActive,
} from 'store/entities/paymentMethods';
import { subscriptionSelectors } from 'store/entities/subscription';
import { IPaymentMethod } from 'types/settings';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';

import { styles } from '../style';
import { PaymentMethodsItem } from './paymentMethodsItem';

const PaymentMethodsList: React.FC = () => {
  const methods = useSelector(paymentMethodsSelectors.methods);
  const loading = useSelector(paymentMethodsSelectors.loading);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');

  const dispatch = useDispatch();

  const methodList = methods.filter((e: any) => (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName))))

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  const handlePress = (method: IPaymentMethod) => () =>
    dispatch(openEditModal(method));

  const handleToggle = (method: IPaymentMethod) => (value: boolean) =>
    dispatch(toggleActive({ ...method, isActive: value }));

  return (
    <FlatList
      data={methodList}
      keyExtractor={(method) => `${method.id}`}
      renderItem={({ item: method }) => (
        <PaymentMethodsItem
          onPress={handlePress(method)}
          onToggle={handleToggle(method)}
          {...method}
        />
      )}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={() =>
        loading ? null : (
          <EmptyState entities={I18n.t('common.entities.paymentMethods')} />
        )
      }
    />
  );
};

export { PaymentMethodsList };
