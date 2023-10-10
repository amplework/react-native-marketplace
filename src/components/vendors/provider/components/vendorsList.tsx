import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AlphabetList } from "react-native-section-alphabet-list";
import { Navigator } from 'service/navigator';
import { Empty } from 'shared/empty';
import { EmptyState } from 'shared/emptyState';
import { VendorsPlaceholder } from 'shared/icon/icons';
import { IVendor } from 'types/vendors';
import COLORS from 'utils/colors';

import { vendorsStyles as S } from '../style';
import { VendorsItem } from './vendorsItem';

type Props = {
  vendors: IVendor[];
  onPress?: (vendor: IVendor) => void;
  imagePlaceholder?: boolean;
};

const VendorsList: React.FC<Props> = ({
  vendors,
  onPress,
  imagePlaceholder = false,
}) => {
  const { t } = useTranslation();

  const onEdit = () => Navigator.navigate('Vendors', {});

  const navigateToVendorsDetails = (id: number) =>
    Navigator.navigate('VendorsDetails', { id, onDelete: () => { }, onEdit });

  const onVendorPress = (vendor: IVendor) => () => {
    if (onPress) {
      onPress(vendor);
    } else {
      navigateToVendorsDetails(vendor.id);
    }
  };

  return vendors.length ? (
    <View style={{
      width: '100%',
      paddingBottom: 50,
      paddingRight: 10,
      backgroundColor: COLORS.transparent
    }}>
      <AlphabetList
        // dataKey={JSON.stringify(filteredContacts)}
        style={S.itemsContainer}
        key={JSON.stringify(vendors)}
        data={vendors.map((vendor) => ({
          ...vendor,
          key: vendor.id.toString(),
          value: vendor.name,
        }))}
        // renderItem={renderListItem}
        renderCustomItem={(vendor: any) => (
          <VendorsItem onPress={onVendorPress} data={vendor} />
        )}
        // @ts-ignore
        renderSectionHeader={() => null}
        getItemHeight={() => (16 + 64)}
        sectionHeaderHeight={0}
        showsVerticalScrollIndicator={false}
        // @ts-ignore
        renderCustomSectionHeader={() => {
          return null
        }}
        indexLetterContainerStyle={S.styleLetter}
        indexLetterStyle={{ fontSize: 12, color: COLORS.eerieBlack }}
      />
    </View>
  ) : (
    <EmptyState
      type={imagePlaceholder ? 'image' : 'default'}
      entities={t(translations.common.entities.vendor)}
      image={<VendorsPlaceholder />}
      header={t(translations.vendors.placeholder.header)}
      description={t(translations.vendors.placeholder.description)}
      ph={35}
    />
  );
};

export { VendorsList };
