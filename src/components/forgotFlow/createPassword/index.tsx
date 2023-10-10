import I18n from 'locales';
import React, { useState } from 'react';
import { Text } from 'react-native';
import Button from 'shared/button';
import { Field } from 'shared/field';
import REGEX from 'utils/regex';

import styles from './style';

export interface Props {
  password: string;
  confirmPassword: string;
  onChangePassword: (text: string) => void;
  onChangeConfirmPassword: (text: string) => void;
  onContinue: () => void;
}

const CreatePassword: React.FC<Props> = (props) => {
  const {
    password,
    confirmPassword,
    onChangePassword,
    onChangeConfirmPassword,
    onContinue,
  } = props;
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const validate = () => {
    if(password.trim().length == 0) {
      setPasswordError('Password is a required field');
    }
    else if (REGEX.password.test(password)) {
      setPasswordError('');
    } else {
      setPasswordError(
        'Password must include 1 uppercase, 1 lowercase and 1 digit and must consist of 8-32 character in total',
      );
      return;
    }
    if (password === confirmPassword) {
      setConfirmError('');
    } else {
      setConfirmError('Password must match');
      return;
    }
    onContinue();
  };
  return (
    <>
      <Text style={styles.title}>{I18n.t('changePassword.title')}</Text>
      <Text style={styles.description}>
        {I18n.t('changePassword.description')}
      </Text>
      <Field
        secure
        error={passwordError}
        autoCapitalize="none"
        value={password}
        onChange={(text) => {
          setPasswordError('');
          onChangePassword(text);
        }}
        label={I18n.t('changePassword.passwordField')}
        mt={16}
      />
      <Field
        secure
        error={confirmError}
        autoCapitalize="none"
        value={confirmPassword}
        onChange={(text) => {
          setConfirmError('');
          onChangeConfirmPassword(text);
        }}
        label={I18n.t('changePassword.confirmPasswordField')}
        mt={16}
      />
      <Button
        onPress={validate}
        text={I18n.t('changePassword.reset')}
        buttonStyle={styles.btnSend}
        textStyle={styles.textSend}
      />
    </>
  );
};

export default CreatePassword;
