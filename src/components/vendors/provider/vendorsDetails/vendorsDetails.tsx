import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Error } from 'shared/error';
import { Icon } from 'shared/icon';
import { MainPageTemplate } from 'shared/templates';
import {
  deleteVendor,
  getVendor,
  vendorsSelectors,
} from 'store/entities/vendors';
import COLORS from 'utils/colors';

import { DetailsCard } from './components/detailsCard';
import { DetailsHeader } from './components/detailsHeader';
import { vendorStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList, 'VendorsDetails'>;

const VendorsDetails: React.FC<Props> = ({ navigation, route }) => {
  const { id, onEdit, onDelete } = route.params;

  const loading = useSelector(vendorsSelectors.vendorLoading);
  const vendor = useSelector(vendorsSelectors.vendor);
  const error = useSelector(vendorsSelectors.error);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const confirmDelete = useCallback(
    () =>
      alert.deletion({
        entity: t(translations.common.entities.vendor),
        onDelete: () => dispatch(deleteVendor({ id, onSuccess: onDelete })),
      }),
    [dispatch, id, onDelete],
  );

  const fetchVendor = useCallback(() => {
    dispatch(getVendor({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    fetchVendor();
  }, [fetchVendor]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <Icon
          src={require('assets/global/deleteGray.png')}
          size={20}
          mr={24}
          onPress={confirmDelete}
        />
      ),
      headerLeft: () => <BackButton />,
    });
  }, [navigation, loading, confirmDelete]);

  const navigateToEditVendor = () =>
    Navigator.navigate('AddEditVendor', { vendor, onEdit });

  if (error) {
    return <Error onRetry={fetchVendor} />;
  }

  return (
    <MainPageTemplate
      loading={loading}
      bc={COLORS.white}
      containerStyle={S.container}
    >
      <Box>
        <DetailsHeader />
        <DetailsCard />
      </Box>
      <Button
        text={t(translations.vendors.edit)}
        onPress={navigateToEditVendor}
        disabled={false}
        image={require('assets/global/pencilFill.png')}
      />
    </MainPageTemplate>
  );
};

export { VendorsDetails };
