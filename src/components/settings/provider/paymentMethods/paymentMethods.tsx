import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { paymentMethodsSelectors } from 'store/entities/paymentMethods';

import { EditPaymentMethods } from '../editPaymentMethods';
import { AddButton } from './components/addButton';
import { PaymentMethodsList } from './components/paymentMethodsList';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const PaymentMethods: React.FC<Props> = ({ navigation }) => {
  const isModalOpened = useSelector(paymentMethodsSelectors.isModalOpened);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.paymentMethods')} />
      ),
    });
  }, [navigation]);

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <EditPaymentMethods />}
      <AddButton />
      <PaymentMethodsList />
    </SafeContainer>
  );
};

export { PaymentMethods };
