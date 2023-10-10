import I18n from 'locales';
import React from 'react';
import { Box } from 'shared/box';
import CheckBox from 'shared/checkbox';
import { Paragraph } from 'shared/paragraph';
import { ITax } from 'types/taxes';
import COLORS from 'utils/colors';
import { getTaxRate, isActiveTax } from 'utils/taxes';

import { taxesStyles as S } from '../style';

type Props = {
  tax: ITax;
  checked: boolean;
  onPress: (tax: ITax) => () => void;
};

const TaxesItem: React.FC<Props> = ({ tax, checked, onPress }) => {
  const active = isActiveTax(tax);
  const taxRate = getTaxRate(tax);

  return (
    <Box row jc="space-between" mr={16}>
      <CheckBox
        checked={checked}
        onChange={onPress(tax)}
        disabled={!active}
        label={tax.shortName}
        styleLabel={S.taxesItemText}
      />
      <Paragraph size="s" color={active ? COLORS.black : COLORS.warmGrey}>
        {taxRate ? `${taxRate}%` : ''}
      </Paragraph>
    </Box>
  );
};

export { TaxesItem };
