import I18n from 'locales';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle, CardFooter } from 'shared/card';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

import { styles } from '../style';
import { Chip } from 'shared/chip';

const QuickPromotionItem: React.FC<any> = ({ salesSpecial, onPress, onPressShare }) => {
  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Box flex ml={12}>
          <Box row>
            <CardTitle>{salesSpecial.title}</CardTitle>
          </Box>
          <Box row ai='center' >
            <CardSubTitle>{I18n.t('salesSpecial.service')}</CardSubTitle>
            <Paragraph size="xs" type='bold' >{salesSpecial?.isAllService ? 'All services' : salesSpecial?.service?.name}</Paragraph>
          </Box>
          <Box row>
            <CardSubTitle>{I18n.t('quickPromotion.discount')}</CardSubTitle>
            <Paragraph size="s">
              {salesSpecial.discount ? ` ${salesSpecial.discount}%` : ''}
            </Paragraph>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
      <CardFooter>
        <Box row jc="space-between" ai="center" mt={-4}>
          <Chip size="s" type={salesSpecial.active ? 'success' : 'secondary'} pill>
            {salesSpecial.active
              ? I18n.t<string>('salesSpecial.active')
              : I18n.t<string>('salesSpecial.notActive')}
          </Chip>
          {salesSpecial.active && (
            <TouchableOpacity onPress={onPressShare} style={styles.shareButton} >
              <Paragraph size='s' color='white'>{salesSpecial?.isSocial ? 'Repost' : 'Share'}</Paragraph>
            </TouchableOpacity>
          )}
        </Box>
      </CardFooter>
    </Card>
  );
};

export { QuickPromotionItem };