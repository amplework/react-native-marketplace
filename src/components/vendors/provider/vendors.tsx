import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { AddButton } from 'shared/button/add';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import { getVendors, vendorsSelectors } from 'store/entities/vendors';
import COLORS from 'utils/colors';

import { VendorsList } from './components/vendorsList';
import { vendorsStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList, 'Vendors'>;

const Vendors: React.FC<Props> = ({ navigation, route }) => {
  const { hasExpensesThisMonth } = route.params || {};

  const vendors = useSelector(vendorsSelectors.vendors);
  const loading = useSelector(vendorsSelectors.loading);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const navigateToReviews = useCallback(
    () => Navigator.navigate('VendorsReview'),
    [],
  );

  const navigateToSearch = useCallback(
    () => Navigator.navigate('SearchVendors'),
    [],
  );

  const navigateToAddEditVendor = () => Navigator.navigate('AddEditVendor');

  useEffect(() => {
    dispatch(
      getVendors({ hasExpensesThisMonth: route.params?.hasExpensesThisMonth }),
    );
  }, [dispatch, route.params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () =>
        !hasExpensesThisMonth && (
          <View style={S.row}>
            <Icon
              src={require('assets/global/performance.png')}
              size={20}
              mr={20}
              onPress={navigateToReviews}
            />
            <Icon
              src={require('assets/global/searcn.png')}
              size={20}
              mr={24}
              onPress={navigateToSearch}
            />
          </View>
        ),
      headerLeft: () => <BackButton title="Vendors" />,
    });
  }, [navigation, navigateToSearch, navigateToReviews, hasExpensesThisMonth]);

  return (
    <MainPageTemplate loading={loading}>
      {hasExpensesThisMonth ? (
        <Box ph={22} pv={10} mb={22} bc={COLORS.white}>
          <Paragraph size="s" type="book">
            {t(translations.vendors.withExpenses)}
          </Paragraph>
        </Box>
      ) : (
        <AddButton
          title={t(translations.vendors.add)}
          onPress={navigateToAddEditVendor}
        />
      )}
      <VendorsList vendors={vendors} imagePlaceholder={!hasExpensesThisMonth} />
    </MainPageTemplate>
  );
};

export { Vendors };
