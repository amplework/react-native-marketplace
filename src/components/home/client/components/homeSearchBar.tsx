import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Navigator } from 'service/navigator';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

import { homeStyles as S } from '../style';

const HomeSearchBar: React.FC = () => {
  const { t } = useTranslation();

  const navigateToSearchProviders = () => Navigator.navigate('SearchProviders');

  return (
    <TouchableOpacity onPress={navigateToSearchProviders} style={S.searchBar}>
      <Icon src={require('assets/global/search.png')} size={18} mr={8} />
      <Paragraph size="s" type="book" color={COLORS.warmGrey}>
        {t(translations.search.placeholder)}
      </Paragraph>
    </TouchableOpacity>
  );
};

export { HomeSearchBar };
