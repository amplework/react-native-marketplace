import React from 'react';
import I18n from 'locales';
import { View, Text } from 'react-native';
import Button from 'shared/button';
import { Paragraph } from 'shared/paragraph';
import { styles } from '../style';

type Props = {
  pressBlock?: () => void;
  isBlocked?: boolean;
};

const ChatStatusSection: React.FC<Props> = ({pressBlock, isBlocked}) => {
  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {'In-app chat status'}
      </Paragraph>
      <View style={styles.card}>
        <View style={[styles.rowSpace, { marginTop: 0 }]}>
          <Text style={styles.titleValue}>Status in Chat</Text>
          <Button
            buttonStyle={[
              styles.buttonBlock,
              isBlocked && styles.buttonBlocked
            ]}
            textStyle={styles.textStatus}
            text={isBlocked ? 'Blocked' : 'Block'}
            disabled={isBlocked}
            onPress={pressBlock}
          />
        </View>
      </View>
    </>
  );
};

export { ChatStatusSection };