import { calculateProductPrice } from 'components/invoices/helpers/utils';
import React from 'react';
import { Description } from 'shared/description';
import { ProductSnapshot } from 'types/products';

type Props = {
  product: ProductSnapshot;
};

const ProductsItem: React.FC<Props> = ({ product }) => {
  const label = `${product.name} ${product.quantity} x $${product.price}`;
  const price = calculateProductPrice(product);

  return (
    <Description label={label} split size="s" mr={16} mb={12}>
      ${price}
    </Description>
  );
};

export { ProductsItem };
