import { translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from 'shared/button';
import { productsSelectors, openEditModal } from 'store/entities/products';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style';
import { MainPageTemplate } from 'shared/templates';
import COLORS from 'utils/colors';
import { BackButton } from 'shared/backButton';
import { IProduct } from 'types/products';
import { EditProducts } from 'components/settings/provider/editProducts';
import { updateProviderDetails } from 'store/actions/provider';

export interface Props {
  navigation: any
}

const Services: React.FC<Props> = ({
  navigation
}) => {

  const provider: any = useSelector((state: any) => state.provider.provider);
  const isModalOpened = useSelector(productsSelectors.isModalOpened);
  const services = useSelector(productsSelectors.products);
  const loading = useSelector(productsSelectors.loading);
  const productLoading = useSelector(productsSelectors.productLoading);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleGoBack = () => navigation.goBack();

  const handleSkip = () => dispatch(updateProviderDetails({ isServices: true }, true))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: null,
      headerLeft: () => <BackButton />,
    });
  }, [navigation, t]);

  const handlePressItem = (product: IProduct) => () =>
    dispatch(openEditModal(product));

  const handlePress = () => dispatch(openEditModal(null));

  return (
    <MainPageTemplate
      containerStyle={styles.container}
      bc={COLORS.white}
      loading={loading || productLoading}
    >
      <Text style={styles.title}>{t(translations.services.title)}</Text>
      <Text style={styles.description}>
        {t(translations.services.description)}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.scrollViewContainer}
      >
        {services?.length === 0 && (
          <View style={styles.centerOfScreen}>
            <Image
              source={require('assets/global/service.png')}
              style={styles.addLogo}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handlePress}
            >
              <Image
                source={require('assets/global/plus.png')}
                style={styles.plusImage}
              />
              <Text style={styles.addTitle}>
                {t(translations.services.addService)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {services?.length > 0 &&
          services.map((item: any, index: number) => {
            return (
              <>
                {index === 0 && <View style={styles.itemSeparator} />}
                <View style={styles.itemContainer}>
                  <View style={styles.serviceItemHeader}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <View style={styles.serviceItemIcons}>
                      <TouchableOpacity onPress={handlePressItem(item)}>
                        <Image
                          source={require('assets/global/bluePen.png')}
                          style={styles.editImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.serviceDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.servicePrice}>$ {item.price}</Text>
                </View>
                {services.length !== 0 && <View style={styles.itemSeparator} />}
              </>
            );
          })}
        {services?.length > 0 && (
          <TouchableOpacity
            style={[styles.buttonContainer, styles.spaceButton]}
            onPress={handlePress}
          >
            <Image
              source={require('assets/global/plus.png')}
              style={styles.plusImage}
            />
            <Text style={styles.addTitle}>
              {t(translations.services.addService)}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.rowButtons}>
        <Button
          onPress={handleSkip}
          text={t(translations.services.skip)}
          buttonStyle={styles.btnSkip}
          textStyle={styles.textSkip}
          disabled={loading}
        />
        <Button
          onPress={handleGoBack}
          text={t(translations.services.save)}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
          disabled={loading}
        />
      </View>
      {isModalOpened && <EditProducts />}
    </MainPageTemplate>
  );
};

export default Services;
