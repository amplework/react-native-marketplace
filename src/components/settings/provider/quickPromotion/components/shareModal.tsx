import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import Button from 'shared/button';
import { styles } from '../style';

type Props = {
  show: boolean;
}

export const ShareModal: React.FC<Props> = ({ show }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {}}
    >
      <View style={styles.chooseModalView}>
        <View style={[styles.chooseView, styles.shadow]}>
        <>
          <TouchableOpacity
            style={{ alignItems: 'flex-end' }}
            onPress={() => {}}
          >
            <Image
              source={require('assets/global/close.png')}
              style={styles.closeImage}
            />
          </TouchableOpacity>
          {/* <Text style={styles.titleChooseModal}>
            Do you want to update the client profile from the client app?
          </Text> */}
          <Button
            text={'Cancel'}
            onPress={() => {}}
            buttonStyle={styles.cancelButton}
          />
          <Button
            text={'Confirm'}
            onPress={() => {}}
            buttonStyle={styles.confirmButton}
          />
        </>
        </View>
      </View>
    </Modal>
  );
};