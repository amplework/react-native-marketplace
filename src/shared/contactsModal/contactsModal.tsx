import I18n from 'locales';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { ContactValues } from 'types/contacts';
import COLORS from 'utils/colors';

import { ContactItem } from './components/contactItem';
import { styles } from './style';

interface Props {
  isOpen: boolean;
  toggleOpenModal: () => void;
  setDataFromContact: (contactData: ContactValues) => void;
}

const ContactsModal: React.FC<Props> = ({
  isOpen,
  toggleOpenModal,
  setDataFromContact,
}) => {
  const [search, setSearch] = useState('');
  const [phoneContacts, setPhoneContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedIdContact, setSelectedIdContact] = useState('');

  const moveToSettings = () => {
    Alert.alert(
      'We need access to your contacts!',
      'To load your contacts, we need you to give us Contacts permissions in your Settings.',
      [
        {
          text: 'Nevermind',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Ok, take me to Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false },
    );
  };

  const getContacts = () => {
    Contacts.getAll().then((contacts: any) => {
      const modifyArray = contacts.map((contact: any) => ({
        ...contact,
        givenName: contact?.givenName || 'No name',
      }));
      setPhoneContacts(modifyArray);
      setFilteredContacts(modifyArray);
    });
  };

  const getContactsWithRightPermission = useCallback((permission: string) => {
    if (permission === 'authorized') {
      getContacts();
    }

    if (permission === 'denied') {
      Alert.alert(I18n.t('contactsModal.accessDenied'));
    }
  }, []);

  const searchFilterFunction = (searchString: string) => {
    if (searchString) {
      const newData = phoneContacts?.filter((contact: Contact) => {
        const givenName = contact.givenName?.toLowerCase() || '';
        const familyName = contact.familyName?.toLowerCase() || '';
        const searchStringData = searchString.toLowerCase();

        return (
          givenName.includes(searchStringData) ||
          familyName.includes(searchStringData)
        );
      });
      setFilteredContacts(newData);
      setSearch(searchString);
    } else {
      setFilteredContacts(phoneContacts);
      setSearch(searchString);
    }
  };

  const takeContact = (id: any) => {
    const contactData: Contact | undefined = phoneContacts?.find(
      (contact: any) => contact?.recordID === id,
    );
    const {
      givenName,
      familyName,
      thumbnailPath,
      emailAddresses,
      phoneNumbers,
    } = contactData || {};

    setDataFromContact({
      givenName: givenName || '',
      familyName: familyName || '',
      email: emailAddresses ? emailAddresses[0]?.email : '',
      phone: phoneNumbers
        ? phoneNumbers[0]?.number.replace(/[^\d\+]/g, '')
        : '',
      alternatePhone: phoneNumbers
        ? phoneNumbers[1]?.number.replace(/[^\d\+]/g, '')
        : '',
      avatar: thumbnailPath ? { path: thumbnailPath } : '',
    });

    setSelectedIdContact('');
    toggleOpenModal();
  };

  useEffect(() => {
    if (isOpen) {
      if (Platform.OS === 'ios') {
        Contacts.checkPermission().then((permission) => {
          if (permission === 'undefined') {
            Contacts.requestPermission().then((newPermission) => {
              getContactsWithRightPermission(newPermission);
            });
          }
          getContactsWithRightPermission(permission);
        });
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'We need access to your contacts!',
            message:
              'To load your contacts, we need you to give us Contacts permissions in your Settings.',
            buttonNegative: 'Nevermind',
            buttonPositive: 'Ok, take me to Settings',
          },
        )
          .then((granted) => {
            if (granted === 'never_ask_again') {
              moveToSettings();
            }

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              getContacts();
            }
          })
          .catch((e) => console.log(e));
      }
    }
  }, [isOpen, getContactsWithRightPermission]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {}}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardStyle}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.posHeader}>
              <View style={styles.titleNewCenter}>
                <Text style={styles.titleNewService}>
                  {I18n.t('contactsModal.choseFromContacts')}
                </Text>
              </View>
              <TouchableOpacity onPress={toggleOpenModal}>
                <Image
                  source={require('assets/global/close.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.paddingContentScroll}>
              <View style={styles.textBoxContainer}>
                <TextInput
                  style={styles.inputSearch}
                  placeholder="Keyword..."
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
              <Text style={styles.yourTitle}>
                {I18n.t('contactsModal.yourList')}
              </Text>
              <View style={styles.paddingExtra}>
                <FlatList
                  data={filteredContacts || []}
                  renderItem={({ item }: { item: Contact }) => (
                    <ContactItem
                      key={item.recordID}
                      data={item}
                      takeContact={takeContact}
                    />
                  )}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={10}
                />
              </View>
            </View>
            {selectedIdContact ? (
              <TouchableOpacity
                style={styles.importButton}
                onPress={takeContact}
              >
                <Text style={styles.titleImport}>
                  {I18n.t('contactsModal.importContact')}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export { ContactsModal };
