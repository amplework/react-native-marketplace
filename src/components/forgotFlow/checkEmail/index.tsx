import I18n from 'locales';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Button from 'shared/button';

import styles from './style';

export interface Props {
  onContinue: (code: string) => void;
  onResend: () => void;
  backToLogin?: () => void;
  isWebUser: boolean;
}

const CheckEmail: React.FC<Props> = (props) => {
  const { onContinue, onResend, isWebUser, backToLogin } = props;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [propsField, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: number;
    isFocused: boolean;
  }) => {
    let textChild = null;

    if (symbol) {
      textChild = symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };
  return (
    <>
      <Text style={styles.title}>{isWebUser ? I18n.t('verification.title') : I18n.t('checkEmail.title')}</Text>
      <Text style={styles.description}>{isWebUser ? I18n.t('verification.description') : I18n.t('checkEmail.description')}</Text>
      <View style={styles.fieldRow}>
        <CodeField
          ref={ref}
          {...propsField}
          value={value}
          onChangeText={(text: string) => setValue(text.toUpperCase())}
          cellCount={4}
          textContentType="oneTimeCode"
          // @ts-ignore
          renderCell={renderCell}
        />
      </View>
      <Button
        onPress={() => value.length > 3 && onContinue(value)}
        text={I18n.t('checkEmail.verify')}
        buttonStyle={styles.btnSend}
        textStyle={styles.textSend}
      />
      <Text style={styles.expireText}>{I18n.t('checkEmail.expire')}</Text>
      {
        isWebUser ? (
          <>
            <View style={styles.rowButtons}>
              <Button
                onPress={backToLogin}
                text={I18n.t('forgot.back')}
                buttonStyle={styles.btnContinue}
                textStyle={styles.textContinue}
              />
            </View>
            <View style={[styles.rowNewUser, { marginTop: 10 }]}>
              <Text style={styles.getStartTitle}>
                {I18n.t('checkEmail.notGet')}
              </Text>
              <TouchableOpacity onPress={onResend}>
                <Text style={[styles.getStartTitle, styles.getStartActive]}>
                  {I18n.t('checkEmail.resend')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.getStartTitle}>{I18n.t('checkEmail.spam')}</Text>
          </>
        ) : (
          <View style={styles.rowButtons}>
            <View style={styles.rowNewUser}>
              <Text style={styles.getStartTitle}>
                {I18n.t('checkEmail.notGet')}
              </Text>
              <TouchableOpacity onPress={onResend}>
                <Text style={[styles.getStartTitle, styles.getStartActive]}>
                  {I18n.t('checkEmail.resend')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.getStartTitle}>{I18n.t('checkEmail.spam')}</Text>
          </View>
        )
      }
    </>
  );
};

export default CheckEmail;