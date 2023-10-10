import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import ScrollContainer from 'shared/scrollContainer';
import { Icon } from 'shared/icon';

const ModalComponent: React.FC<any> = ({ visible, onClose, onDelete, title, children, modalHieght }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => { }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {height: modalHieght ? modalHieght : '80%'}]}>
          <View style={styles.posHeader}>
            <View style={styles.titleNewCenter}>
              <Text style={styles.titleNewService}>
                {title}
              </Text>
            </View>
            {onDelete && (
              <TouchableOpacity onPress={onDelete}>
                <Icon src={require('assets/global/delete.png')} mr={16} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require('assets/global/close.png')}
                style={styles.closeImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <ScrollContainer extraScroll={200}>
            {children}
          </ScrollContainer>
        </View>
      </View>
    </Modal>
  )
}

export { ModalComponent };