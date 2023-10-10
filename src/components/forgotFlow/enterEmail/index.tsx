import I18n from 'locales';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Button from 'shared/button';
import { Field } from 'shared/field';
import REGEX from 'utils/regex';

import styles from './style';

export interface Props {
  email: string;
  onChangeEmail: (text: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const EnterEmail: React.FC<Props> = (props) => {
  const { email, onChangeEmail, onContinue, onBack } = props;
  const [emailError, setEmailError] = useState('');
  const validate = () => {
    if (email.trim().length == 0) {
      setEmailError('Email is a required field');
    }
    else if (REGEX.email.test(String(email).trim().toLowerCase())) {
      setEmailError('');
      onContinue();
    } else {
      setEmailError('Email is not valid');
    }
  };
  return (
    <>
      <Text style={styles.title}>{I18n.t('forgot.title')}</Text>
      <Text style={styles.description}>{I18n.t('forgot.description')}</Text>
      <Field
        autoCapitalize="none"
        value={email}
        error={emailError}
        onChange={(text) => {
          setEmailError('');
          onChangeEmail(text);
        }}
        label={I18n.t('forgot.emailField')}
        keyboardType="email-address"
        mt={16}
      />
      <Button
        onPress={validate}
        text={I18n.t('forgot.send')}
        buttonStyle={styles.btnSend}
        textStyle={styles.textSend}
      />
      <View style={styles.rowButtons}>
        <Button
          onPress={onBack}
          text={I18n.t('forgot.back')}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default EnterEmail;
