import I18n from 'locales';
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { invoicesSelectors } from 'store/entities/invoices';
import COLORS from 'utils/colors';

import { invoiceDetailsStyle as S } from '../style';
import { ProductsItem } from './productsItem';

const ProductsList: React.FC = () => {
  const invoice = useSelector(invoicesSelectors.invoice)!;

  return (
    <>
      <Paragraph size="s" type="book" mb={12} mt={20}>
        {I18n.t('invoices.serviceDetails')}
      </Paragraph>
      <FlatList
        data={invoice.products}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item: product }) => <ProductsItem product={product} />}
        ItemSeparatorComponent={() => (
          <Separator color={COLORS.whiteTwo} mb={12} />
        )}
        style={S.productsList}
      />
    </>
  );
};

export { ProductsList };
