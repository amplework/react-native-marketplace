import React, { useLayoutEffect } from 'react';
import { styles } from './style';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import I18n from 'locales';
import { AddButton } from './components/addButton';
import { SalesSpecialList } from './components/salesSpecialList';
import { useSelector } from 'react-redux';
import { salesSpecialSelectors } from 'store/entities/salesSpecial';
import { AddSalesSpecial } from '../addSalesSpecial';

const SalesSpecial: React.FC<any> = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.salesSpecial')} />
      ),
    });
  }, [navigation]);

  const isModalOpened = useSelector(salesSpecialSelectors.isModalOpened);

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <AddSalesSpecial />}
      <AddButton />
      <SalesSpecialList />
    </SafeContainer>
  );
};

export { SalesSpecial };
