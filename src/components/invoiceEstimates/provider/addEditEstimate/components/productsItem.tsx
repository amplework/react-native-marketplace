import { calculateProductPrice } from 'components/invoices/helpers/utils';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { ProductSnapshot } from 'types/products';
import COLORS from 'utils/colors';

import { styles } from '../style';

interface Props {
  product: ProductSnapshot;
  onPress: () => void;
  onDelete: () => void;
}

const ProductsItem: React.FC<Props> = ({ product, onPress, onDelete }) => (
  <TouchableOpacity onPress={onPress} style={styles.productsItem}>
    <Box row ai="center">
      <Icon
        src={require('assets/global/deleteRed.png')}
        onPress={onDelete}
        size={20}
        mr={16}
      />
      <Box>
        <Paragraph size="s" type="book" color={COLORS.eerieBlack} mb={4}>
          {product.name}
        </Paragraph>
        <Paragraph size="s" type="book">
          {product.quantity} x ${product.price}
        </Paragraph>
      </Box>
    </Box>
    <Box row ai="center">
      <Paragraph size="s" mr={5}>
        ${calculateProductPrice(product)}
      </Paragraph>
      <Icon src={require('assets/global/arrowRight.png')} />
    </Box>
  </TouchableOpacity>
);

export { ProductsItem };
