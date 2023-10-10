import I18n from 'locales';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { invoicesSelectors } from 'store/entities/invoices';
import { formatNumber } from 'utils/numbers';

import { styles } from '../style';

const CounterBar: React.FC = () => {
  const review = useSelector(invoicesSelectors.review);
  const { currentYearTotal, currentMonthTotal } = review.invoices;

  return (
    <View style={styles.counterBar}>
      <Box flex>
        <Paragraph size="s" type="book" mb={4}>
          {I18n.t('invoices.invoiceThisYear')}
        </Paragraph>
        <Box row ai="flex-end">
          <Text style={styles.sign}>$</Text>
          <Paragraph size="xxl">{formatNumber(currentYearTotal, 2)}</Paragraph>
        </Box>
      </Box>
      <Separator vertical mh={20} />
      <Box flex>
        <Paragraph size="s" type="book" mb={4}>
          {I18n.t('invoices.invoiceThisMonth')}
        </Paragraph>
        <Box row ai="flex-end">
          <Text style={styles.sign}>$</Text>
          <Paragraph size="xxl">{formatNumber(currentMonthTotal, 2)}</Paragraph>
        </Box>
      </Box>
    </View>
  );
};

export { CounterBar };
