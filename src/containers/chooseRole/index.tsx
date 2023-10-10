import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';

import styles from './style';

type Props = StackScreenProps<RootStackParamList>;

const ChooseRole: React.FC<Props> = ({ navigation }) => {
  const [role, setRole] = useState('provider');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  return (
    <SafeContainer containerStyle={styles.container}>
      <Image style={styles.logo} source={require('assets/global/alpha.png')} />
      <Text style={styles.title}>{I18n.t('chooseRole.title')}</Text>
      <Text style={styles.description}>{I18n.t('chooseRole.description')}</Text>
      <TouchableOpacity
        style={[styles.circle, role === 'provider' && styles.circleActive]}
        onPress={() => setRole('provider')}
      >
        <Image
          source={require('assets/global/providers.png')}
          style={styles.circleImage}
        />
      </TouchableOpacity>
      <Text style={styles.titleRole}>{I18n.t('chooseRole.provider')}</Text>
      <TouchableOpacity
        style={[styles.circle, role === 'client' && styles.circleActive]}
        onPress={() => setRole('client')}
      >
        <Image
          source={require('assets/global/client.png')}
          style={styles.circleImage}
        />
      </TouchableOpacity>
      <Text style={styles.titleRole}>{I18n.t('chooseRole.client')}</Text>
      <View style={styles.rowButtons}>
        <Button
          onPress={() =>
            navigation.push(
              role === 'provider' ? 'OnBoardingProvider' : 'OnBoardingClient',
            )
          }
          text={I18n.t('chooseRole.continue')}
        />
      </View>
    </SafeContainer>
  );
};

export default ChooseRole;
