import { StackNavigationProp } from '@react-navigation/stack';
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
  navigation?: StackNavigationProp<any, any>;
  onContinue: (code: string) => void;
  onResendCode: () => void;
}
const CELL_COUNT = 4;
const Verification: React.FC<Props> = (props) => {
  const [value, setValue] = useState('');
  const { onContinue, onResendCode } = props;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
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
      <Text style={styles.title}>{I18n.t('verification.title')}</Text>
      <Text style={styles.description}>
        {I18n.t('verification.description')}
      </Text>
      <View style={styles.fieldRow}>
        <CodeField
          ref={ref}
          {...propsField}
          value={value}
          onChangeText={(text: string) => setValue(text.toUpperCase())}
          cellCount={CELL_COUNT}
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </View>
      <View style={styles.rowNewUser}>
        <Text style={styles.getStartTitle}>
          {I18n.t('verification.notGet')}
        </Text>
        <TouchableOpacity onPress={onResendCode}>
          <Text style={[styles.getStartTitle, styles.getStartActive]}>
            {I18n.t('verification.resend')}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.getStartTitle}>{I18n.t('checkEmail.spam')}</Text>
      <View style={styles.rowButtons}>
        <Button
          onPress={() => value.length > 3 && onContinue(value)}
          text={I18n.t('verification.continue')}
          buttonStyle={[
            styles.btnContinue,
            value.length < 4 && styles.btnContinueDisabled,
          ]}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default Verification;
