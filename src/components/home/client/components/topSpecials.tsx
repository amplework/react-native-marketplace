import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Spin } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { CarouselSlider } from 'shared/carousel';
import _ from 'lodash';
import {
  salesSpecialSelectors
} from 'store/entities/salesSpecial';
import COLORS from 'utils/colors';

const TopSpecials: React.FC = () => {
  const clientSalesSpecialsLoading = useSelector(salesSpecialSelectors.clientSalesSpecialsLoading);
  const clientSalesSpecialsTopFive = useSelector(salesSpecialSelectors.clientSalesSpecialsTopFive);

  return (clientSalesSpecialsLoading) ? (
    <Box pv={20} ph={20}>
      <Spin size="l" />
    </Box>
  ) : (
    <Box mt={12} pt={12} bc={COLORS.white}>
      <Paragraph type="bold" size="xs" mh={24}>
        {'My Specials'}
      </Paragraph>
      <Box h={300} w={'100%'} ai='center'>
        <CarouselSlider data={clientSalesSpecialsTopFive} />
      </Box>
    </Box>
  );
};

export { TopSpecials };
