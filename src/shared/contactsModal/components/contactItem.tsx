import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Contact } from 'react-native-contacts';

import { styles } from '../style';

interface Props {
  data: Contact;
  takeContact: (id: string) => void;
}

const ContactItem: React.FC<Props> = ({ data, takeContact }) => {
  return (
    <TouchableOpacity
      key={data?.recordID}
      style={styles.paddingItem}
      onPress={() => takeContact(data.recordID)}
    >
      <View style={styles.listItemContainer}>
        <View style={styles.rowSpace}>
          <View style={styles.row}>
            <Image
              source={
                data.thumbnailPath
                  ? { uri: data.thumbnailPath }
                  : require('assets/global/defaultAvatar.jpg')
              }
              style={styles.userAvatar}
            />
            <View>
              <Text style={styles.userName}>
                {`${data.givenName || ''} ${data.familyName || ''}`}
              </Text>
              <Text style={styles.userPhone}>
                {data?.phoneNumbers[0]?.number}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { ContactItem };
