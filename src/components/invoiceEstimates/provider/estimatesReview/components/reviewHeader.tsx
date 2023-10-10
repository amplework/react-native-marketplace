import I18n from 'locales';
import React from 'react';
import { Image, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

import { styles } from '../style';

const ReviewHeader: React.FC = () => (
  <View style={styles.header}>
    <Image
      source={require('assets/backgrounds/reviewBackground.png')}
      style={styles.headerImage}
    />
    <Paragraph size="l" type="bold" color={COLORS.white}>
      {I18n.t('estimates.estimateDetailsReview')}
    </Paragraph>
  </View>
);

export { ReviewHeader };