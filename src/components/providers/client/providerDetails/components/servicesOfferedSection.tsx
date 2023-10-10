import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { productsSelectors } from 'store/entities/products';
import { currency } from 'utils/currency';

import { styles } from '../style';

const ServicesOfferedSection: React.FC = () => {
  const products = useSelector(productsSelectors.products);

  const { t } = useTranslation();

  return products.length ? (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.providers.servicesOffered)}
      </Paragraph>
      <View style={styles.card}>
        {products.map((product, index) => {
          const last = index === products.length - 1;

          return (
            <>
              <Box
                row
                jc="space-between"
                ai="center"
                pr={24}
                mb={last ? 0 : 16}
              >
                <Box flex mr={20}>
                  <Paragraph mb={4}>{product.name}</Paragraph>
                  <Paragraph size="s" type="book" mb={4}>
                    {product.time
                      ? t(translations.providers.time, { count: product.time })
                      : ''}
                  </Paragraph>
                </Box>
                <Paragraph>{currency.format(product.price)}</Paragraph>
              </Box>
              {!last && <Separator mb={16} />}
            </>
          );
        })}
      </View>
    </>
  ) : null;
};

export { ServicesOfferedSection };
