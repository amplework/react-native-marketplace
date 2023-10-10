import { FormikErrors } from 'formik';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import Button from 'shared/button';
import { Field } from 'shared/field';
import { SignUpProviderValues } from 'types/signUpFlow';

import styles from './style';

type Props = {
  values: SignUpProviderValues;
  disabled: boolean;
  errors?: FormikErrors<SignUpProviderValues>;
  onChange: <F extends keyof SignUpProviderValues>(
    field: F,
  ) => (value: SignUpProviderValues[F]) => void;
  onContinue: () => void;
};

const BasicInfo: React.FC<Props> = ({
  values: {
    email,
    password,
    social,
  },
  disabled,
  onContinue,
  onChange,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(translations.basicInfo.title)}</Text>
      <Text style={styles.description}>
        {t(translations.basicInfo.description)}
      </Text>
      <Field
        disabled={disabled}
        autoCapitalize="none"
        value={email}
        onChange={onChange('email')}
        label={t(translations.basicInfo.emailField)}
        keyboardType="email-address"
        mt={16}
      />
      {!social && (
        <Field
          secure
          autoCapitalize="none"
          value={password}
          error={errors?.password}
          onChange={onChange('password')}
          label={t(translations.basicInfo.passwordField)}
          mt={16}
        />
      )}
      <View style={styles.rowButtons}>
        <Button
          text={t(translations.signup.signup)}
          onPress={onContinue}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </View>
  );
};

export { BasicInfo };
