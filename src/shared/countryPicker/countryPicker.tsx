import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { BottomSheet } from 'shared/bottomSheet';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { closeCountryModal } from 'store/entities/user';
import { countryCodes } from 'utils/countryCodes';

import { Header } from './component/header';

import { Pressable } from 'shared/pressable';
import { Field } from 'shared/field';

export interface Props {
  onPress: (value: any) => void;
}

const CountryPicker: React.FC<Props> = ({onPress}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<any>('');
  const [selectedCode, setSelectedCode] = useState<any>('');
  const [filteredData, setFilteredData] = useState<any>('')  

  const closeModal = () => dispatch(closeCountryModal());

  const renderItem = ({ item }: any) => {
    const handlePressAddress = () => {      
      onPress({
        countryCode: item.sortname,
        dialCode: item.phonecode
      });
    }
    return (
      <>
        <Pressable onPress={handlePressAddress} pv={15} row ai='center' >
          <Paragraph ml={20} >{`${item.sortname} - `}</Paragraph>
          <Paragraph>{item.name}</Paragraph>
          <Paragraph>{`(+${item.phonecode})`}</Paragraph>
        </Pressable>
        <Separator />
      </>
    )
  }

  const searchFilter = (searchText: string) => {
    setSearch(searchText);
    let filterData: any = [];
    if (searchText) {
      filterData = countryCodes.filter(function (item) {
        let text = String(item.name).trim().toLowerCase();    
        return text.includes(String(searchText).toLowerCase());
      });
    }
    setFilteredData(filterData);
  }

  return (
    <BottomSheet size='m'>
      <Header onClose={closeModal} />
      <Field
        value={search}
        mt={15}
        ml={10}
        w={'95%'}
        label='Search Country Code'
        onChange={(text: any) => searchFilter(text)}
      />
      <FlatList
        data={String(search)?.trim().length > 0 ? filteredData : countryCodes}
        renderItem={renderItem}
        initialNumToRender={15}
        maxToRenderPerBatch={30}
        removeClippedSubviews={true}
        keyExtractor={(item) => item.sortname}
        extraData={selectedCode}
      />
    </BottomSheet>
  );
};

export { CountryPicker };