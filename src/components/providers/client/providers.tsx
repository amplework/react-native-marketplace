import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import SafeContainer from 'shared/container';
import { Paragraph } from 'shared/paragraph';

import { AddButton } from './components/addButton';
import { ProvidersList } from './components/providersList';
import { styles } from './style';

interface Props {
  navigation: StackNavigationProp<any, 'Provider'>;
}

const Providers: React.FC<Props> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={16}>
          {I18n.t('providers.myProviders')}
        </Paragraph>
      ),
    });
  }, [navigation]);

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <AddButton />
      <ProvidersList />
    </SafeContainer>
  );
};

export { Providers };
