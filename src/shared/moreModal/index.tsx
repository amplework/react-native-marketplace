import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { bottomMenuSelectors } from 'store/entities/bottomMenu';
import { subscriptionSelectors } from 'store/entities/subscription';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

import { getCategories, getCategoriesLite, ICategory } from './helpers/categories';
import { isSmallDevice } from 'utils/device';

export interface Props {
  modalVisible: boolean;
  onPress: () => void;
}

const MoreModal: React.FC<Props> = ({ modalVisible, onPress }) => {
  const settings = useSelector(bottomMenuSelectors.settings);
  const subscription = useSelector(subscriptionSelectors.subscription);

  const renderCategory = ({
    title,
    icon,
    Icon,
    routePath,
    route,
  }: ICategory) => {
    const handlePress = () => {
      onPress();

      route && Navigator.navigate(route.name, route.params);

      routePath &&
        setTimeout(
          () => Navigator.navigate('MoreStackNavigator', { screen: routePath }),
          500,
        );
    };

    const getIconSize = () => {
      switch (routePath) {
        case 'Estimates':
          return 30;
        case 'ClientConnect':
          return 35;
        default:
          return 24;
      }
    };

    const getIconSizeSmallDevice = () => {
      switch (routePath) {
        case 'Estimates':
          return 26;
        case 'ClientConnect':
          return 30;
        default:
          return 20;
      }
    };

    const iconSize = isSmallDevice ? getIconSizeSmallDevice() : getIconSize();
    const isConnect = routePath == "ClientConnect";

    return (
      <TouchableOpacity
        key={title}
        onPress={handlePress}
        style={[styles.positionCategory]}
      >
        {Icon && <Icon width={iconSize} height={iconSize} color={COLORS.black70} />}
        {icon && <Image source={icon} style={styles.centralPlus} />}
        <Text style={[styles.categoryTitle, isConnect && { marginBottom: 8 }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const categories = subscription?.subscriptionPlan?.includes('lite') ?
    getCategoriesLite(settings.bottomMenuSettings) : getCategories(settings.bottomMenuSettings);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPress}
    >
      <View style={styles.content}>
        <View>
          <View style={styles.contentWhite}>
            {categories.map((category, index) => {
              return (
                <View key={index}>{renderCategory(category)}</View>
              )
            })}
          </View>
          <View style={styles.talkBubbleTriangle} />
        </View>
      </View>
      <TouchableOpacity style={styles.contentBottom} onPress={onPress} />
      <SafeAreaView />
    </Modal>
  );
};

const styles = StyleSheet.create({
  talkBubbleTriangle: {
    position: 'absolute',
    right: 20,
    bottom: -6,
    width: 0,
    height: 0,
    backgroundColor: COLORS.transparent,
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 6,
    borderLeftColor: COLORS.transparent,
    borderRightColor: COLORS.transparent,
    borderTopColor: COLORS.white,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.black50,
    justifyContent: 'flex-end',
    padding: isSmallDevice ? 14 : 24,
  },
  contentWhite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderRadius: 6,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  contentBottom: {
    height: 49,
    backgroundColor: COLORS.transparent,
  },
  centralPlus: {
    width: isSmallDevice ? 20 : 24,
    height: isSmallDevice ? 20 : 24,
    resizeMode: 'contain',
  },
  categoryTitle: {
    marginTop: isSmallDevice ? 6 : 8,
    fontSize: isSmallDevice ? 11 : 12,
    fontFamily: FONTS.medium,
    color: COLORS.brownishGrey,
  },
  positionCategory: {
    justifyContent: 'center',
    alignItems: 'center',
    width: isSmallDevice ? 78 : 98,
    height: isSmallDevice ? 62 : 82,
    borderRadius: 6,
  },
});

export default MoreModal;
