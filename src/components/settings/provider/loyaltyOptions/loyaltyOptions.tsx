import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { NavigationList } from 'shared/navigationList/navigationList';
import { theme } from 'theme';

import { LOYALTY_OPTIONS_LINKS } from '../../helpers/settingsLinks';

type Props = StackScreenProps<RootStackParamList>;

const LoyaltyOptions: React.FC<Props> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('loyaltyOptionsLinks.clientReward')} />
      ),
    });
  }, [navigation]);

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <NavigationList data={LOYALTY_OPTIONS_LINKS} />
    </SafeContainer>
  );
};

export { LoyaltyOptions };
