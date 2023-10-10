import I18n from 'locales';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Toggle } from 'shared/toggle';
import { IProduct } from 'types/products';
import COLORS from 'utils/colors';
import { currency } from 'utils/currency';

interface Props extends IProduct {
  onPress: () => void;
  onToggle: (checked: boolean) => void;
  onSalePress: () => void;
}

const PackageItem: React.FC<Props> = ({
  onPress,
  onToggle,
  onSalePress,
  isActive,
  name,
  price,
  saleSpecial,
}) => (
  <Card onPress={onPress}>
    <CardBody row jc="space-between" ai="center">
      <Toggle checked={isActive} onChange={onToggle} />
      <Box flex ml={12}>
        <CardTitle>{name}</CardTitle>
        <Box row>
          <CardSubTitle>{I18n.t('products.price')}</CardSubTitle>
          <Paragraph size="s">{currency.format(price)}</Paragraph>
        </Box>
      </Box>
      {(saleSpecial?.length > 0) && (
        <TouchableOpacity
          hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
          onPress={onSalePress}>
          <Box pv={2} ph={8} jc="center" ai="center" r={15} bc={COLORS.greenblue}>
            <Paragraph color={COLORS.white} type='book' size='xs'>
              {(saleSpecial?.length == 1)
                ? I18n.t<string>('products.saleBadge', { salePrice: `$${saleSpecial?.[0]?.salePrice?.toString()}` })
                : I18n.t<string>('products.saleBadge', { salePrice: '' })
              }
            </Paragraph>
          </Box>
        </TouchableOpacity>
      )}
      <Icon src={require('assets/global/arrowRight.png')} />
    </CardBody>
  </Card>
);

export { PackageItem };
