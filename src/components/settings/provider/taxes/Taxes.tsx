import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { taxesSelectors } from 'store/entities/taxes';

import { EditTaxes } from '../editTaxes';
import { AddButton } from './components/addButton';
import { TaxesList } from './components/taxesList';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> {}

const Taxes: React.FC<Props> = ({ navigation }) => {
  const isModalOpened = useSelector(taxesSelectors.isModalOpened);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.taxesSettings')} />
      ),
    });
  }, [navigation]);

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <EditTaxes />}
      <AddButton />
      <TaxesList />
    </SafeContainer>
  );
};

export { Taxes };
