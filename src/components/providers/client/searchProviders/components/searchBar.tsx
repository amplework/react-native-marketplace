import I18n from 'locales';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { industriesSelectors } from 'store/entities/industries';
import { openFiltersModal, providersSelectors } from 'store/entities/providers';
import COLORS from 'utils/colors';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  const searchLoading = useSelector(providersSelectors.searchLoading);
  const industriesLoading = useSelector(industriesSelectors.loading);

  const dispatch = useDispatch();

  const handleTune = () => dispatch(openFiltersModal());

  return (
    <Box row ai="center" pv={20} ph={24} bc={COLORS.white}>
      <Box flex mr={12}>
        <Field
          value={value}
          onChange={onChange}
          label={I18n.t('search.placeholder')}
          pill
          staticLabel
          startAdornment={
            <Icon src={require('assets/global/search.png')} size={18} />
          }
          endAdornment={
            searchLoading && (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            )
          }
        />
      </Box>
      <Icon
        src={require('assets/global/tune.png')}
        onPress={handleTune}
        disabled={industriesLoading}
        size={20}
      />
    </Box>
  );
};

export { SearchBar };
