import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';

import { SocialMediaList } from './components/socialMediaList';
import { styles } from './style';

interface Props extends StackScreenProps<RootStackParamList> { }

const SocialMedia: React.FC<Props> = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.socialMedia')} />
      ),
    });
  }, [navigation]);

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <SocialMediaList />
    </SafeContainer>
  );
};

export { SocialMedia };
