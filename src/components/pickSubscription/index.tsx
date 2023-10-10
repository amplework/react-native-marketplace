import { translations } from 'locales';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Subscription } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { InAppPurchaseContext } from 'service/inAppPurchase';
import { requestPurchase } from 'service/inAppPurchase';
import Button from 'shared/button';
import {
  startVerifySubscription,
  subscriptionSelectors,
} from 'store/entities/subscription';
import { formatCurrency } from 'utils/currency';

import styles from './style';
import { MainPageTemplate } from 'shared/templates';

type Props = StackScreenProps<RootStackParamList>;

const PickSubscription: React.FC<Props> = ({route}) => {
  const { purchases } = useContext(InAppPurchaseContext);
  const verifyLoading = useSelector(subscriptionSelectors.verifyLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubscribe = async () => {
    dispatch(startVerifySubscription());

    const productId = purchases && purchases[0].productId;

    if (productId) {
      await requestPurchase(productId);
    }
  };

  const renderBlock = (subscription: Subscription, active: boolean) => {    
    return (
      <TouchableOpacity
        style={[
          styles.subBlock,
          active && styles.subBlockActive,
          subscription?.title.trim().toLowerCase() === 'premium' && styles.spaceTop,
        ]}
      >
        <View
          style={[styles.subBlockBorder, active && styles.subBlockBorderActive]}
        >
          <View>
            <Text style={[styles.titleSub, active && styles.titleSubActive]}>
              {subscription?.title}
            </Text>
            <Text style={[styles.priceSub, active && styles.priceSubActive]}>
              <Text style={styles.priceCount}>
                {formatCurrency(subscription?.currency, subscription?.price)}
              </Text>
              {t(translations.subscription.mth)}
            </Text>
          </View>
          <Image
            source={
              active
                ? require('assets/global/checked.png')
                : require('assets/global/unChecked.png')
            }
            style={styles.circleImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (
    title: string,
    standard: boolean | string,
    premium: boolean | string,
    bg: boolean,
    text?: boolean,
  ) => {
    return (
      <View style={[styles.positionItems, bg && styles.bgItem]}>
        <Text style={styles.itemColumn}>{title}</Text>
        {!text && (
          <View style={styles.positionTariff}>
            {standard ? (
              <Image
                source={require('assets/global/check.png')}
                style={styles.iconCheck}
              />
            ) : (
              <Image
                source={require('assets/global/secure.png')}
                style={styles.iconCheck}
              />
            )}
            {/* <Image
              source={require('assets/global/check.png')}
              style={styles.iconCheck}
            /> */}
          </View>
        )}
        {text && (
          <View style={styles.positionTariff}>
            <View style={{ width: 20, marginHorizontal: 22 }}>
              <Text style={styles.textAlign}>{standard}</Text>
            </View>
            {/* <View style={{ width: 20, marginHorizontal: 22 }}>
              <Text style={styles.textAlign}>{premium}</Text>
            </View> */}
          </View>
        )}
      </View>
    );
  };

  return (
    <MainPageTemplate containerStyle={styles.container} bc="white">
      <Text style={styles.title}>{t(translations.subscription.title)}</Text>
      <Text style={styles.description}>
        {t(translations.subscription.description)}
      </Text>
      {purchases && renderBlock(purchases[0], true)}
      {/* {renderBlock('premium', subPlan === 'premium')} */}
      <View style={styles.separator} />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.positionColumn}>
          <Text style={styles.titleColumn}>
            {t(translations.subscription.titleColumn)}
          </Text>
          <View style={styles.positionTariff}>
            <Text style={styles.titleTariff}>
              {t(translations.subscription.standard)}
            </Text>
            {/* <Text style={styles.titleTariff}>
              {t(translations.subscription.premium')}
            </Text> */}
          </View>
        </View>
        {renderItem(t(translations.subscription.accessToApp), true, true, true)}
        {renderItem(
          t(translations.subscription.accessForYou),
          true,
          true,
          false,
        )}
        {renderItem(
          t(translations.subscription.messageClients),
          true,
          true,
          true,
        )}
        {renderItem(
          t(translations.subscription.menageAppointments),
          true,
          true,
          false,
        )}
        {renderItem(t(translations.subscription.clientsBook), true, true, true)}
        {renderItem(t(translations.subscription.trackSales), true, true, false)}
        {renderItem(
          t(translations.subscription.trackVendorsExpenses),
          true,
          true,
          true,
        )}
        {renderItem(
          t(translations.subscription.manageClients),
          true,
          true,
          false,
        )}
        {renderItem(t(translations.subscription.sendInvoice), true, true, true)}
        <View style={styles.extraSpace} />
      </ScrollView>
      <View style={styles.bottomBlock}>
        <Button
          text={t(translations.subscription.trial)}
          loading={verifyLoading}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
          onPress={handleSubscribe}
        />
      </View>
    </MainPageTemplate>
  );
};

export default PickSubscription;
