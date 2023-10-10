import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'shared/button';
import { Field } from 'shared/field';
import { MainPageTemplate } from 'shared/templates';
import { updateProviderPassword } from 'store/actions/provider';
import COLORS from 'utils/colors';
import REGEX from 'utils/regex';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const ResetPassword: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const provider = useSelector((state: any) => state.provider.provider);
  const providerLoading = useSelector((state: any) => state.provider.loading);
  const client = useSelector((state: any) => state.client.client);
  const { isPasswordSet } =
    user?.role === 'client' ? client || false : provider || false;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const validate = () => {
    if (!isPasswordSet || REGEX.password.test(currentPassword)) {
      setCurrentPasswordError('');
    } else {
      setCurrentPasswordError(
        'Password must include 1 uppercase, 1 lowercase and 1 digit and must consist of 8-32 character in total',
      );
      return;
    }
    if (REGEX.password.test(password)) {
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
      setConfirmError('Both password must match');
      return;
    }
    if (password !== currentPassword) {
      setConfirmError('');
    } else {
      setConfirmError(
        'New password must be different from previous used password',
      );
      return;
    }
    const updateInfo = isPasswordSet
      ? {
          currentPassword,
          password,
        }
      : {
          password,
        };
    dispatch(updateProviderPassword(updateInfo, navigation));
  };
  const renderTextField = (
    label: string,
    error: string,
    value: string,
    onChange: (text: string) => void,
  ) => (
    <Field
      secure
      error={error}
      autoCapitalize="none"
      value={value}
      onChange={onChange}
      label={label}
      mb={16}
    />
  );
  return (
    <MainPageTemplate
      loading={providerLoading}
      containerStyle={styles.container}
      bc={COLORS.white}
    >
      <Text style={styles.title}>
        {I18n.t(`${isPasswordSet ? 'resetPassword' : 'createPassword'}.title`)}
      </Text>
      <Text style={styles.description}>
        {I18n.t(
          `${isPasswordSet ? 'resetPassword' : 'createPassword'}.description`,
        )}
      </Text>
      {isPasswordSet &&
        renderTextField(
          I18n.t('resetPassword.currentPassword'),
          currentPasswordError,
          currentPassword,
          (text: string) => {
            setCurrentPasswordError('');
            setCurrentPassword(text);
          },
        )}
      {renderTextField(
        I18n.t(
          isPasswordSet
            ? 'resetPassword.newPassword'
            : 'createPassword.password',
        ),
        passwordError,
        password,
        (text: string) => {
          setPasswordError('');
          setPassword(text);
        },
      )}
      {renderTextField(
        I18n.t(
          isPasswordSet
            ? 'resetPassword.confirmPassword'
            : 'createPassword.confirmPassword',
        ),
        confirmError,
        confirmPassword,
        (text: string) => {
          setConfirmError('');
          setConfirmPassword(text);
        },
      )}
      <View style={styles.rowButtons}>
        <Button
          onPress={validate}
          text={I18n.t(
            isPasswordSet ? 'resetPassword.button' : 'createPassword.button',
          )}
        />
      </View>
    </MainPageTemplate>
  );
};

export default ResetPassword;
