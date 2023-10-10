import I18n from 'locales';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Navigator } from 'service/navigator';
import { useSelector } from 'react-redux';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { subscriptionSelectors } from 'store/entities/subscription';
import { LITE } from 'types/subscription';

const AbilityModal = () => {
  const subscription = useSelector(subscriptionSelectors.subscription);
  const [modalVisible, setModalVisible] = useState(false);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const renderCategory = (
    title: string,
    image: ImageSourcePropType,
    onPress: () => void,
  ) => {
    return (
      <TouchableOpacity
        style={styles.positionCategory}
        onPress={() => {
          setModalVisible(false);
          setTimeout(() => onPress(), 500);
        }}
      >
        <View style={styles.categoryContainer}>
          <Image source={image} style={styles.centralPlus} />
        </View>
        <Text style={styles.categoryTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.positionButton}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        disabled={subscription == null ? true : false}
        style={[styles.containerBlue, modalVisible && styles.containerRed]}
      >
        <View style={[styles.buttonBlue, modalVisible && styles.buttonRed]}>
          <Image
            source={
              modalVisible
                ? require('assets/global/closeWhite.png')
                : require('assets/global/plusPlus.png')
            }
            style={[styles.centralPlus, modalVisible && styles.centralClose]}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.content}>
        {!liteSubcription && renderCategory(
            I18n.t('addCategory.newInvoice'),
            require('assets/bottomBar/addTask.png'),
            () =>
              Navigator.navigate('MoreStackNavigator', {
                screen: 'AddEditInvoice',
              }),
          )}
          {!liteSubcription &&  renderCategory(
            I18n.t('addCategory.newTask'),
            require('assets/bottomBar/addTask.png'),
            () =>
              Navigator.navigate('MoreStackNavigator', {
                screen: 'AddEditTask',
              }),
          )}
          {renderCategory(
            I18n.t('addCategory.newClient'),
            require('assets/bottomBar/addReport.png'),
            () =>
              Navigator.navigate('MoreStackNavigator', {
                screen: 'Clients',
                params: { screen: 'AddClient' },
              }),
          )}
          {!liteSubcription && renderCategory(
            I18n.t('addCategory.newSale'),
            require('assets/bottomBar/addSale.png'),
            () =>
              Navigator.navigate('AddSale'),
          )}
          {renderCategory(
            I18n.t('addCategory.newAppointment'),
            require('assets/bottomBar/addAppointments.png'),
            () => Navigator.navigate('AddAppointment'),
          )}
        </View>
        <TouchableOpacity
          style={styles.contentBottom}
          onPress={() => setModalVisible(!modalVisible)}
        />
        <SafeAreaView />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  positionButton: { justifyContent: 'center', alignItems: 'center' },
  content: {
    flex: 1,
    backgroundColor: COLORS.black50,
    justifyContent: 'flex-end',
    paddingBottom: 24,
    alignItems: 'center',
  },
  contentBottom: {
    height: 50,
    backgroundColor: COLORS.transparent,
  },
  centralPlus: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  centralClose: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  containerBlue: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.clearBlue20,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRed: {
    backgroundColor: COLORS.orangeRed20,
  },
  buttonBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 40,
  },
  buttonRed: {
    backgroundColor: COLORS.orangeRed,
  },
  categoryContainer: {
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  categoryTitle: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  positionCategory: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AbilityModal;
