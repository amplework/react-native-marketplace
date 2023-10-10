import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheet } from 'shared/bottomSheet';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { closeSalesDetailModal, salesSpecialSelectors } from 'store/entities/salesSpecial';
import { theme } from 'theme';
import { styles } from '../../style';
import { SalesSpecialItem } from './SalesSpecialItem';

const SalesSpecialList: React.FC = () => {
  const salesSpecialsDetailsList = useSelector(salesSpecialSelectors.salesSpecialsDetailsList);
  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;

  const dispatch = useDispatch();

  const handleCloseModal = () =>
    dispatch(closeSalesDetailModal())

  return (
    <BottomSheet
      modalStyle={styles.modalStyle}
      containerStyle={styles.containerStyle}>
      <View style={styles.header}>
        <Paragraph ml={40} flex centered size="l" type="bold">
          {'Sales Special'}
        </Paragraph>
        <TouchableOpacity onPress={handleCloseModal}>
          <Icon src={require('assets/global/close.png')} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={salesSpecialsDetailsList}
        keyExtractor={(item: any) => `${item?.id}`}
        renderItem={({ item }) => (
          <SalesSpecialItem item={item} userOffset={providerOffset} />
        )}
        style={theme.spacing.pb(24)}
        contentContainerStyle={theme.styles.grow}
      />
    </BottomSheet>
  );
};

export { SalesSpecialList };
