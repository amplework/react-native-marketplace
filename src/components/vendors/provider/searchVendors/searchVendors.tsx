import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import {
  resetSearchResults,
  searchVendors,
  vendorsSelectors,
} from 'store/entities/vendors';
import COLORS from 'utils/colors';

import { VendorsList } from '../components/vendorsList';
import { styles } from './style';

type Props = StackScreenProps<RootStackParamList>;

const SearchVendors: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const vendors = useSelector(vendorsSelectors.searchResults);
  const loading = useSelector(vendorsSelectors.searchLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSearch = useCallback(
    () => dispatch(searchVendors({ query })),
    [dispatch, query],
  );

  const resetSearch = useCallback(() => {
    setQuery('');

    dispatch(resetSearchResults());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.vendors.search.title)} />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={resetSearch} style={styles.resetButton}>
          <Paragraph size="s" type="book">
            {t(translations.common.resetSearch)}
          </Paragraph>
        </TouchableOpacity>
      ),
    });
  }, [navigation, resetSearch]);

  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <MainPageTemplate>
      <Box pv={16} ph={24} bc={COLORS.white}>
        <Field
          value={query}
          onChange={setQuery}
          label={t(translations.common.search)}
          endAdornment={
            loading ? (
              <ActivityIndicator size="small" color={COLORS.clearBlue} />
            ) : (
              <Icon src={require('assets/global/search.png')} size={18} />
            )
          }
        />
      </Box>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <VendorsList vendors={vendors} />
      </ScrollView>
    </MainPageTemplate>
  );
};

export { SearchVendors };
