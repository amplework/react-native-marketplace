import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import Button from 'shared/button';
import { Field } from 'shared/field';

import styles from './style';

type Props = {
  email: string;
  error?: string;
  onChangeEmail: (text: string) => void;
  onLogin: () => void;
  onSignIn: () => void;
  onFacebook: () => void;
  onGoogle: () => void;
  onApple: () => void;
};

const EnterEmail: React.FC<Props> = ({
  email,
  error,
  onChangeEmail,
  onLogin,
  onSignIn,
  onFacebook,
  onGoogle,
  onApple
}) => {
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.logoPositions}>
        <Image
          style={styles.logo}
          source={require('assets/global/alpha.png')}
        />
        <View>
          <Text style={styles.appName}>{t(translations.signup.appName)}</Text>
          <Text style={styles.underName}>
            {t(translations.common.workSmarter)}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{t(translations.signup.title)}</Text>
      <Text style={styles.description}>
        {t(translations.signup.description)}
      </Text>
      <Field
        autoCapitalize="none"
        value={email}
        onChange={onChangeEmail}
        label={t(translations.signup.fields.email)}
        required
        error={error}
        keyboardType="email-address"
        mt={16}
      />
      <Button
        buttonStyle={styles.buttonPosition}
        onPress={onLogin}
        text={t(translations.signup.signUp)}
      />
      <View style={styles.rowNewUser}>
        <Text style={styles.getStartTitle}>
          {t(translations.signup.existingUser)}
        </Text>
        <TouchableOpacity onPress={onSignIn}>
          <Text style={[styles.getStartTitle, styles.getStartActive]}>
            {t(translations.signup.signIn)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowButtons}>
        {Platform.OS === "ios" && (
          <Button
            image={require('assets/global/apple.png')}
            onPress={onApple}
            text={'Signup with Apple'}
            textStyle={styles.textGoogle}
            buttonStyle={styles.btnApple}
          />
        )}
        <Button
          image={require('assets/global/google.png')}
          onPress={onGoogle}
          text={'Signup with Google'}
          textStyle={styles.textGoogle}
          buttonStyle={styles.btnGoogle}
        />
        <Button
          image={require('assets/global/facebook.png')}
          onPress={onFacebook}
          text={'Signup with Facebook'}
          buttonStyle={styles.btnFacebook}
        />
      </View>
    </>
  );
};

export { EnterEmail };
