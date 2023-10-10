import { calculateInvoiceSubtotal } from 'components/invoices/helpers/utils';
import I18n from 'locales';
import React from 'react';
import { FlatList } from 'react-native';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { ProductSnapshot } from 'types/products';
import COLORS from 'utils/colors';

import { styles } from '../style';
import { ProductsItem } from './productsItem';

interface Props {
  data: ProductSnapshot[];
  onPress: (index: number) => () => void;
  onDelete: (index: number) => () => void;
}

const ProductsList: React.FC<Props> = ({ data, onPress, onDelete }) => (
  <FlatList
    data={data}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item, index }) => (
      <ProductsItem
        product={item}
        onPress={onPress(index)}
        onDelete={onDelete(index)}
      />
    )}
    ItemSeparatorComponent={() => <Separator color={COLORS.whiteTwo} mv={12} />}
    ListFooterComponent={() => (
      <>
        <Separator color={COLORS.whiteTwo} mv={12} />
        <Box row jc="flex-end" mb={12} pr={16}>
          <Paragraph>
            {I18n.t('invoices.subtotal', {
              price: calculateInvoiceSubtotal(data),
            })}
          </Paragraph>
        </Box>
      </>
    )}
    style={styles.productsList}
  />
);

export { ProductsList };
