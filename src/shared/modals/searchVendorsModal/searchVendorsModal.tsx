import { VendorsList } from 'components/vendors/provider/components/vendorsList';
import I18n from 'locales';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import {
  resetSearchResults,
  searchVendors,
  vendorsSelectors,
} from 'store/entities/vendors';
import { IVendor } from 'types/vendors';
import COLORS from 'utils/colors';

import { styles } from './style';

type Props = {
  isOpen: boolean;
  onVendorPress: (vendor: IVendor) => void;
  closeModal: () => void;
};

const SearchVendorsModal: React.FC<Props> = ({
  isOpen,
  onVendorPress,
  closeModal,
}) => {
  const [query, setQuery] = useState('');

  const vendors = useSelector(vendorsSelectors.searchResults);

  const dispatch = useDispatch();

  const handleSearch = useCallback(
    () => dispatch(searchVendors({ query })),
    [dispatch, query],
  );

  const resetSearch = useCallback(() => {
    setQuery('');

    dispatch(resetSearchResults());
  }, [dispatch]);

  const onPress = (vendor: IVendor) => {
    resetSearch();
    onVendorPress(vendor);
  };

  useEffect(() => {
    resetSearch();
  }, [resetSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.posHeader}>
            <View style={styles.titleNewCenter}>
              <Paragraph size="l" color="black">
                {I18n.t('vendors.add')}
              </Paragraph>
            </View>
            <TouchableOpacity onPress={closeModal}>
              <Icon src={require('assets/global/close.png')} size={24} />
            </TouchableOpacity>
          </View>
          <Box pv={16} ph={24} bc={COLORS.white}>
            <Field
              value={query}
              onChange={setQuery}
              label={I18n.t('common.search')}
              endAdornment={
                <Icon src={require('assets/global/search.png')} size={18} />
              }
            />
          </Box>
          <VendorsList vendors={vendors} onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

export { SearchVendorsModal };
