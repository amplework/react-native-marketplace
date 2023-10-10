import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import React, { useLayoutEffect } from 'react';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { useSelector } from 'react-redux';
import { NavigationList } from 'shared/navigationList/navigationList';
import { theme } from 'theme';

import { SETTINGS_LINKS_LITE, SETTINGS_LINKS_PREMIUM, SETTINGS_LINKS_STANDARD } from '../helpers/settingsLinks';
import { subscriptionSelectors } from 'store/entities/subscription';
import { getSubscriptionType } from 'utils/subscription';
import { Plan } from 'types/subscription';

type Props = StackScreenProps<RootStackParamList>;

const Settings: React.FC<Props> = ({ navigation }) => {
  const subscription = useSelector(subscriptionSelectors?.subscription);
  const subscriptionType = getSubscriptionType(subscription);   

  const getSettingsLink = (subscriptionType: any): any => {    
    if (subscriptionType?.plan === 'lite') {      
      return SETTINGS_LINKS_LITE;
    }
  
    if (subscriptionType?.plan === 'standard') {
      return SETTINGS_LINKS_STANDARD;
    }
  
    if (subscriptionType?.plan === 'premium') {
      return SETTINGS_LINKS_PREMIUM;
    }

    if (subscriptionType?.plan === 'Free Trial') {
      return SETTINGS_LINKS_STANDARD;
    }
    
    // return SETTINGS_LINKS_STANDARD;
  };  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title="Settings" onPress={Navigator.drawer.open} />
      ),
    });
  }, [navigation]);

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <NavigationList data={getSettingsLink(subscriptionType)} />
    </SafeContainer>
  );
};

export { Settings };
