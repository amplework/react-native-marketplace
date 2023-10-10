import I18n from 'locales';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import Button from 'shared/button';
import { Field } from 'shared/field';
import REGEX from 'utils/regex';

import styles from './style';

export interface Props {
  email: string;
  onChangeEmail: (text: string) => void;
  onLogin: () => void;
  onSignIn: () => void;
  onFacebook: () => void;
  onGoogle: () => void;
  onApple: () => void;
}

const EnterEmail: React.FC<Props> = (props) => {
  const { email, onChangeEmail, onLogin, onSignIn, onFacebook, onGoogle, onApple } =
    props;
  const [emailError, setEmailError] = useState('');
  let emailStr = email && email.split('@')[0]; 
  const validate = () => {
    if (emailStr.trim().length <= 2) {
      setEmailError('Please enter Email using standard format: xyz@sub.domain');
    }
    else if (REGEX.email.test(String(email).trim().toLowerCase())) {
      setEmailError('');
      onLogin();
    } else {
      setEmailError('Email is not valid');
    }
  };
  return (
    <>
      <View style={styles.logoPositions}>
        <Image
          style={styles.logo}
          source={require('assets/global/logoClient.png')}
        />
        <Text style={styles.appName}>{I18n.t('signup.appName')}</Text>
      </View>
      <Text style={styles.title}>{I18n.t('signup.title')}</Text>
      <Text style={styles.description}>
        Sign up to schedule appointments directly and connect with service
        providers
      </Text>
      <Field
        autoCapitalize="none"
        value={email}
        onChange={(text) => {
          setEmailError('');
          onChangeEmail(text);
        }}
        label={I18n.t('signup.fields.email')}
        required
        keyboardType="email-address"
        error={emailError}
        mt={16}
      />
      <Button
        buttonStyle={styles.buttonPosition}
        onPress={validate}
        text={I18n.t('signup.signUp')}
      />
      <View style={styles.rowNewUser}>
        <Text style={styles.getStartTitle}>
          {I18n.t('signup.existingUser')}
        </Text>
        <TouchableOpacity onPress={onSignIn}>
          <Text style={[styles.getStartTitle, styles.getStartActive]}>
            {I18n.t('signup.signIn')}
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

export default EnterEmail;
