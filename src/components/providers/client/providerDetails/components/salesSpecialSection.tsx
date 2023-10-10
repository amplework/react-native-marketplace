import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { styles } from '../style';

type Props = {
  salesSpecial: any;
};

const SalesSpecialSection: React.FC<Props> = ({ salesSpecial }) => {
  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {I18n.t('providers.salesSpecialDiscount')}
      </Paragraph>
      <View style={styles.card}>
        <Box mb={16} pr={24}>
          <Paragraph size="s" type="book" mb={4}>
            {I18n.t('common.maxDiscount')}
          </Paragraph>
          <Box row jc="space-between" ai="center">
            <Paragraph flex mr={12}>
              {salesSpecial?.discount && `Up to ${salesSpecial?.discount}% off on the services`}
            </Paragraph>
          </Box>
        </Box>
      </View>
    </>
  );
};

export { SalesSpecialSection };
