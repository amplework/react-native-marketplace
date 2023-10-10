import I18n from 'locales';
import React from 'react';
import { Text, View } from 'react-native';
import Button from 'shared/button';

import styles from './style';

export interface Props {
  onContinue: () => void;
}

const SuccessReset: React.FC<Props> = (props) => {
  const { onContinue } = props;
  return (
    <>
      <Text style={styles.title}>{I18n.t('successReset.title')}</Text>
      <Text style={styles.description}>
        {I18n.t('successReset.description')}
      </Text>
      <View style={styles.rowButtons}>
        <Button
          onPress={onContinue}
          text={I18n.t('successReset.continue')}
          buttonStyle={styles.btnSend}
          textStyle={styles.textSend}
        />
      </View>
    </>
  );
};

export default SuccessReset;
