import I18n from 'locales';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { formatNumber } from 'utils/numbers';

import { styles } from '../style';
import { estimatesSelectors } from 'store/entities/estimates';
import { isSmallDevice } from 'utils/device';

const CounterBar: React.FC = () => {
  const review = useSelector(estimatesSelectors.review);
  const { approveBalanceTotal, currentMonthTotal } = review.estimates;

  return (
    <View style={styles.counterBar}>
      <Box flex>
        <Paragraph size="s" type="book" mb={4}>
          {I18n.t('estimates.estimateThisMonth')}
        </Paragraph>
        <Box row ai="flex-end">
          <Text style={styles.sign}>$</Text>
          <Paragraph size={isSmallDevice ? "xl" : "xxl"}>{formatNumber(currentMonthTotal, 2)}</Paragraph>
        </Box>
      </Box>
      <Separator vertical mh={20} />
      <Box flex>
        <Paragraph lines={2} size="s" type="book" mb={4}>
          {I18n.t('estimates.approvedThisMonth')}
        </Paragraph>
        <Box row ai="flex-end">
          <Text style={styles.sign}>$</Text>
          <Paragraph size={isSmallDevice ? "xl" : "xxl"}>{formatNumber(approveBalanceTotal, 2)}</Paragraph>
        </Box>
      </Box>
    </View>
  );
};

export { CounterBar };
