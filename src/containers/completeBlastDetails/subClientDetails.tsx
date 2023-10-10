import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlphabetList } from 'react-native-section-alphabet-list';
import { useSelector } from 'react-redux';
import { Loader } from 'shared/loader';
import { subClientsSelectors } from 'store/entities/subClients';
import COLORS from 'utils/colors';

import { styles } from './style';

export interface Props {
  subClients: any;
  onChangeSelectedClient: (client: any) => void;
}

const SubClientDetails = (props: Props) => {
  const { subClients, onChangeSelectedClient } = props;
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(subClients);
  useEffect(() => {
    setFilteredContacts(subClients);
  }, [subClients]);
  const clients = subClients;
  const renderListItem = (item: any) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.paddingItem}
        onPress={() => {
          onChangeSelectedClient(
            clients.find((client: any) => client.id === item.id),
          );
        }}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.rowSpace}>
            <View style={styles.row}>
              <Image
                source={
                  item?.photo
                    ? { uri: item?.photo }
                    : require('assets/global/defaultAvatar.jpg')
                }
                style={styles.userAvatar}
              />
              <View>
                <View style={styles.row}>
                  <Text style={styles.userName}>
                    {(item?.firstName || '') + ' ' + (item?.lastName || '')}
                  </Text>
                  {item?.isConnected ? (
                    item?.isDisconnect == false ? (
                      <Image
                        source={require('assets/onBoarding/alpha.png')}
                        style={styles.imageConnected}
                      />
                    ) : null
                  ) : null}
                </View>
                <Text style={styles.userPhone}>{item?.phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = clients?.filter((item: any) => {
        return item.firstName?.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredContacts(newData);
      setSearch(text);
    } else {
      setFilteredContacts(clients);
      setSearch(text);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardStyle}
    >
      <View style={styles.paddingContentScroll}>
        <View style={styles.textBoxContainer}>
          <TextInput
            style={styles.inputSearch}
            placeholder={'Search...'}
            onChangeText={(text: string) => searchFilterFunction(text)}
            placeholderTextColor={COLORS.warmGrey}
            underlineColorAndroid="transparent"
            defaultValue={search}
          />
          <View style={styles.searchPosition}>
            <Image
              source={require('assets/global/searcn.png')}
              style={styles.arrow}
            />
          </View>
        </View>
        <Text style={styles.yourTitle}>Your contact list</Text>
        <View style={styles.paddingExtra}>
          <AlphabetList
            // dataKey={JSON.stringify(filteredContacts)}
            style={styles.itemsContainer}
            key={JSON.stringify(filteredContacts)}
            data={filteredContacts || []}
            // renderItem={renderListItem}
            renderCustomItem={renderListItem}
            // @ts-ignore
            renderSectionHeader={() => null}
            getItemHeight={() => 16 + 64}
            sectionHeaderHeight={0}
            showsVerticalScrollIndicator={false}
            // @ts-ignore
            renderCustomSectionHeader={() => {
              return null;
            }}
            indexLetterContainerStyle={styles.letterStyle}
            indexLetterStyle={{ fontSize: 12, color: COLORS.eerieBlack }}
          />
        </View>
      </View>
      <Loader loading={subClientsLoading} />
    </KeyboardAvoidingView>
  );
};

export default SubClientDetails;
