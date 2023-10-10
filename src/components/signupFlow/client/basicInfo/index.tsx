import I18n from 'locales';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from 'shared/button';
import { Field } from 'shared/field';
import REGEX from 'utils/regex';

import styles from './style';

export interface Props {
  email: string;
  password: string;
  social?: boolean;
  emailDisabled?: boolean;
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  onContinue: () => void;
}

const BasicInfo: React.FC<Props> = (props) => {
  const {
    email,
    onChangeEmail,
    onContinue,
    password,
    onChangePassword,
    social,
    emailDisabled,
  } = props;
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const validate = () => {
    if (social) {    
      if(!email) {        
        setEmailError('Email is a required field');
        return;
      } else {
        onContinue();
      }
    } else {
      if (password.trim().length == 0) {
        setPasswordError('Password is a required field');
        return;
      } else if (REGEX.password.test(password)) {
        setPasswordError('');
      } else {
        setPasswordError(
          'Password must include 1 uppercase, 1 lowercase and 1 digit and must consist of 8-32 character in total',
        );
        return;
      }
      onContinue();
    }
  };
  return (
    <>
      <Text style={styles.title}>{I18n.t('basicInfoClient.title')}</Text>
      <Text style={styles.description}>
        {I18n.t('basicInfoClient.description')}
      </Text>
      <Field
        autoCapitalize="none"
        error={emailError}
        value={email}
        disabled={emailDisabled}
        onChange={(text) => {
          setEmailError('');
          onChangeEmail(text);
        }}
        label={I18n.t('basicInfoClient.emailField')}
        keyboardType="email-address"
        mt={16}
      />
      {!social && (
        <Field
          secure
          error={passwordError}
          autoCapitalize="none"
          value={password}
          onChange={(text) => {
            setPasswordError('');
            onChangePassword(text);
          }}
          label={I18n.t('basicInfoClient.passwordField')}
          mt={16}
        />
      )}
      <View style={styles.rowButtons}>
        <Button
          onPress={validate}
          text={I18n.t('basicInfoClient.continue')}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default BasicInfo;