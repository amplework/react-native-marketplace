import React from 'react';
import { FlatList } from 'react-native';
import { Separator } from 'shared/separator';
import { ITax } from 'types/taxes';
import COLORS from 'utils/colors';

import { TaxesItem } from './components/taxesItem';
import { taxesStyles as S } from './style';

type Props = {
  data: ITax[];
  selectedTaxes: ITax[];
  onPress: (tax: ITax) => () => void;
};

const TaxesList: React.FC<Props> = ({ data, selectedTaxes, onPress }) => (
  <FlatList
    data={data}
    keyExtractor={(tax) => `${tax.id}`}
    renderItem={({ item: tax }) => (
      <TaxesItem
        tax={tax}
        checked={selectedTaxes.some(({ id }) => id === tax.id)}
        onPress={onPress}
      />
    )}
    ItemSeparatorComponent={() => <Separator color={COLORS.whiteTwo} mv={12} />}
    style={S.taxesList}
  />
);

export { TaxesList };
