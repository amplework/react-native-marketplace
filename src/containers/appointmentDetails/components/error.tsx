import I18n from 'locales';
import React from 'react';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { styles } from './style';

const Error: React.FC<any> = () => (
  <SafeContainer containerStyle={styles.container}>
    <Icon src={require('assets/global/errorOutline.png')} size={80} mb={24} />
    <Paragraph mb={4}>{I18n.t('This appointment is rejected.')}</Paragraph>
    <Paragraph size="s" type="book" centered mb={16}>
      {I18n.t('common.errors.load')}
    </Paragraph>
  </SafeContainer>
);

export { Error };