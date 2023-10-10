import I18n from 'locales';
import React from 'react';
import { Text } from 'react-native';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { ITax } from 'types/taxes';
import COLORS from 'utils/colors';
import { getTaxRate, isActiveTax } from 'utils/taxes';

import { styles } from '../style';

interface Props {
  tax: ITax;
  onPress: () => void;
}

const TaxesItem: React.FC<Props> = ({ tax, onPress }) => {
  const isActive = isActiveTax(tax);
  const taxRate = getTaxRate(tax);

  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Box flex ml={12}>
          <Box row>
            <CardTitle>{tax.shortName}</CardTitle>
            <Box
              pv={2}
              ph={8}
              jc="center"
              ai="center"
              ml={4}
              r={15}
              bc={
                tax.shouldApplyToTransactions && isActive
                  ? COLORS.greenblue
                  : COLORS.orange
              }
            >
              <Text style={styles.statusText}>
                {tax.shouldApplyToTransactions && isActive
                  ? I18n.t('taxes.active')
                  : I18n.t('taxes.notActive')}
              </Text>
            </Box>
          </Box>
          {tax.description && <Paragraph size="s">{tax.description}</Paragraph>}
          <Box row>
            <CardSubTitle>{I18n.t('taxes.rate')}</CardSubTitle>
            <Paragraph size="s">
              {taxRate ? `${taxRate}%` : ''}
            </Paragraph>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
    </Card>
  );
};

export { TaxesItem };
