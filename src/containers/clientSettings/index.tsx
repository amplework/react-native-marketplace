import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import styles from './style';
import { theme } from 'theme';
import COLORS from 'utils/colors';

const ClientSettings: React.FC<any> = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('inviteToAlpha.title')} />
      ),
    });
  }, [navigation]);

  const handleDeleteUserAccount = () => navigation.navigate('DeleteAccount');

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <View style={styles.containerWithButton}>
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('OnlinePaymentMethods')}
        >
          <Text style={styles.titleItemMenu}>Online Payment Methods</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => navigation.push('NotificationSettings')}
          style={styles.containerFlex}
        >
          <Text style={styles.titleItemMenu}>Notification Setup</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('ResetPassword')}
        >
          <Text style={styles.titleItemMenu}>Reset Password</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('Blacklist')}
        >
          <Text style={styles.titleItemMenu}>Black List</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerLogout}>
        <TouchableOpacity
          style={styles.containerPosition}
          onPress={handleDeleteUserAccount}
        >
          <Image
            source={require('assets/global/delete.png')}
            style={styles.logout}
          />
          <Text style={[styles.titleItemMenu, { color: COLORS.red }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeContainer>
  );
};

export default ClientSettings;