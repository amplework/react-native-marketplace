import I18n from 'locales';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import RNCheckBox from '@react-native-community/checkbox';
import SafeContainer from 'shared/container';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { styles } from './style';
import COLORS from 'utils/colors';
import { useSelector, useDispatch } from 'react-redux';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { translations } from 'locales';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/icon';
import { filterSubClients, subClientsSelectors } from 'store/entities/subClients';
import { Separator } from 'shared/separator';
import {
  closeClientModal, setClientBlastList,
} from 'store/entities/clientConnect/slice';
import { BottomSheet } from 'shared/bottomSheet';
import { Card } from 'shared/card';
import { clientConnectSelectors } from 'store/entities/clientConnect';
import ScrollContainer from 'shared/scrollContainer';
import { ClientFilter } from 'types/subClients';
import { Loader } from 'shared/loader';
interface ListType {
  id: number;
  title: string;
  checked: boolean;
  value: ClientFilter;
}

export const ClientList: ListType[] = [
  {
    id: 1,
    title: I18n.t('clientGroups.options.all'),
    checked: false,
    value: '',
  },
  {
    id: 2,
    title: I18n.t('clientGroups.options.new'),
    checked: false,
    value: 'new-clients',
  },
  {
    id: 3,
    title: I18n.t('clientGroups.options.notActive'),
    checked: false,
    value: 'no-activity',
  },
  {
    id: 4,
    title: I18n.t('clientGroups.options.withReward'),
    checked: false,
    value: 'rewards',
  },
  {
    id: 5,
    title: I18n.t('clientGroups.options.clientsUsingApp'),
    checked: false,
    value: 'using-app',
  },
  {
    id: 6,
    title: I18n.t('clientGroups.options.notUsingApp'),
    checked: true,
    value: 'not-using-app',
  },
];

type Type = 'default' | 'primary';

function ClientBottomSheet() {
  const subClients = useSelector(subClientsSelectors.subClients);
  const selectedClients = useSelector(clientConnectSelectors.clientChecked);
  const filterLoading = useSelector(subClientsSelectors.filterLoading);
  const filterClientsList = useSelector(subClientsSelectors.filteredClients);

  const [query, setQuery] = useState('');
  const [selectedClientGroup, setSelectedClientGroup] = useState<any>(null);
  // const [clientGroupSet, setClientGroupSet] = useState(ClientList);
  const [selectedClientsList, setSelectedClientsList] = useState<any>(selectedClients);
  const subclientWithEmail = subClients?.filter((client: any) => client?.email !== null);
  const [filteredContacts, setFilteredContacts] = useState(subclientWithEmail);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activeSubClients = (subclientWithEmail).filter((client) => client.isActive);
  const mappedSubClients = activeSubClients.map((client) => ({
    ...client,
    value: client.firstName,
  }));

  let clients = subclientWithEmail;

  useEffect(() => {
    const clientsWithEmail = filterClientsList?.filter((client: any) => client?.email !== null);
    setSelectedClientsList(clientsWithEmail);
  }, [filterClientsList]);

  useEffect(() => {
    setSelectedClientsList(selectedClients);
  }, []);

  const handlePressContinue = () => dispatch(setClientBlastList(selectedClientsList));

  function searchFilterFunction(text: string) {
    if (text) {
      let newData = (subclientWithEmail)?.filter((item: any) => {
        return item.firstName?.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredContacts(newData);
      setSearch(text);
    } else {
      setFilteredContacts(clients);
      setSearch(text);
    }
  }

  const ClientGroups = ({ item }: any) => {

    const isSelected = item?.id === selectedClientGroup?.id;
    const toggleCheck = (item: any) => {
      setSelectedClientGroup(item);
      dispatch(filterSubClients(item?.value))
    }

    return (
      <>
        <Box row jc="space-between" ai="center" mh={22} mv={5}>
          <Paragraph size="s">{item.title}</Paragraph>
          <RNCheckBox
            value={isSelected}
            onChange={() => toggleCheck(item)}
            boxType={'square'}
            style={styles.checkbox}
            animationDuration={0}
            onTintColor={isSelected ? COLORS.clearBlue : COLORS.warmGrey}
            onFillColor={isSelected ? COLORS.clearBlue : COLORS.warmGrey}
            onCheckColor={COLORS.white}
          // onFillColor={COLORS.clearBlue}
          />
        </Box>
        {item.id == 6 ? null : <Separator mv={10} />}
      </>
    );
  };

  const clientDetailsRender = (item: any) => {
    const isExist = selectedClientsList.some((element: any) => element.id === item.id);
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.paddingItem}
        activeOpacity={1}
        onPress={() => {
          if (isExist) {
            setSelectedClientsList(selectedClientsList.filter((listItem: any) => listItem?.id !== item?.id));
          } else {
            setSelectedClientsList([...selectedClientsList, item]);
          }
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
                <View>
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
            <RNCheckBox
              boxType={'square'}
              value={isExist}
              style={styles.checkbox}
              animationDuration={0}
              onCheckColor={COLORS.white}
              onFillColor={COLORS.clearBlue}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <BottomSheet size="l">
        <Loader loading={filterLoading} />
        <Card isClickable={false}>
          <Box row jc="space-between" mh={15} mv={25}>
            <Paragraph ml={2} size="l">
              {I18n.t('clientGroups.title')}
            </Paragraph>
            <TouchableOpacity onPress={handlePressContinue}>
              <Paragraph size="l" color={COLORS.clearBlue}>
                {I18n.t('clientGroups.rightHeader')}
              </Paragraph>
            </TouchableOpacity>
          </Box>
        </Card>
        <ScrollContainer>
          <>
            {ClientList.map((item) => (
              <ClientGroups item={item} />
            ))}
            <Box mt={30}>
              <Paragraph ml={22} size="s" type="book">
                {'Find clients'}
              </Paragraph>
            </Box>
            <View style={styles.textBoxContainer}>
              <TextInput
                style={styles.inputSearch}
                placeholder={'Keyword...'}
                onChangeText={(text: string) => {
                  console.log('text =>', text);
                  searchFilterFunction(text);
                }}
                placeholderTextColor={COLORS.black}
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
          </>
          <FlatList
            data={filteredContacts || subclientWithEmail}
            renderItem={({ item }) => clientDetailsRender(item)}
            keyExtractor={(item: any) => item.id}
          />
        </ScrollContainer>
      </BottomSheet>
    </SafeContainer>
  );
}

export default ClientBottomSheet;
