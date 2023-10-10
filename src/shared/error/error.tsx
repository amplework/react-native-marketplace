import I18n from 'locales';
import React from 'react';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { styles } from './style';

interface Props {
  onRetry: () => void;
}

const Error: React.FC<Props> = ({ onRetry }) => (
  <SafeContainer containerStyle={styles.container}>
    <Icon src={require('assets/global/errorOutline.png')} size={80} mb={24} />
    <Paragraph mb={4}>{I18n.t('error.somethingWentWrong')}</Paragraph>
    <Paragraph size="s" type="book" centered mb={16}>
      {I18n.t('common.errors.load')}
    </Paragraph>
    <Button
      text={I18n.t('error.tryAgain')}
      onPress={onRetry}
      buttonStyle={styles.button}
    />
  </SafeContainer>
);

export { Error };
