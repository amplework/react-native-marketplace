import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Subscription } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { InAppPurchaseContext } from 'service/inAppPurchase';
import { requestUpgrade } from 'service/inAppPurchase';
import Button from 'shared/button';
import { Icon } from 'shared/icon';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import {
  startVerifySubscription,
  subscriptionSelectors,
} from 'store/entities/subscription';
import { checkUserSubscription } from 'store/entities/subscription/slice';
import { logout } from 'store/entities/user';
import { LITE } from 'types/subscription';
import { BENIFIT_CHART } from 'utils/benifitChart';
import COLORS from 'utils/colors';
import { formatCurrency } from 'utils/currency';

import { renewSubscriptionStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const UpgradeSubscription: React.FC<Props> = ({ navigation }) => {
  const { purchases } = useContext(InAppPurchaseContext);
  const verifyLoading = useSelector(subscriptionSelectors.verifyLoading);
  const currentSubscription = useSelector(subscriptionSelectors.subscription);

  const productArray: any = purchases?.filter((product: Subscription) =>
    product?.productId !== currentSubscription?.subscriptionPlan &&
    product?.productId !== LITE);

  const [selectedPlan, setSelectedPlan] = useState<Subscription>(productArray[0]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => dispatch(logout()), []);

  const goBack = () => navigation.goBack();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Icon
          src={require('assets/global/back.png')}
          ml={20}
          size={26}
          onPress={goBack}
        />
      ),
    });
  }, [navigation, handleLogout]);

  useFocusEffect(
    useCallback(() => {
      const onHardwareBackPress = () => true;

      BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onHardwareBackPress,
        );
      };
    }, []),
  );

  const handleSubscribe = async () => {
    // purchase token required for upgradation of the current plan
    
    dispatch(startVerifySubscription());
    const productId = productArray && selectedPlan?.productId;

    if (productId) {
      dispatch(checkUserSubscription(false));
      await requestUpgrade(productId, currentSubscription?.receipt?.purchaseToken, 2);
    }
  };

  const renderBlock = (subscription: Subscription, onSelect: any) => {
    const active = subscription?.productId == selectedPlan?.productId;
    return (
      <TouchableOpacity
        style={[
          S.subBlock,
          (subscription?.productId == selectedPlan?.productId) && S.subBlockActive,
          subscription?.title.trim().toLowerCase() === 'premium' && S.spaceTop,
        ]}
        onPress={() => onSelect(subscription)}
      >
        <View
          style={[S.subBlockBorder, active && S.subBlockBorderActive]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[S.titleSub, active && S.titleSubActive]}>
              {subscription?.title}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[S.priceSub, active && S.priceSubActive]}>
                <Text style={S.priceCount}>
                  {formatCurrency(subscription?.currency, subscription?.price)}
                </Text>
                {t(translations.subscription.mth)}
              </Text>
            </View>
          </View>
          <Image
            source={
              active
                ? require('assets/global/checked.png')
                : require('assets/global/unChecked.png')
            }
            style={S.circleImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = (
    title: string,
    standard: boolean | string,
    premium: boolean | string,
    lite: boolean | string,
    bg: boolean,
  ) => {
    return (
      <View style={[S.positionItems, bg && S.bgItem]}>
        <Text style={S.itemColumn}>{title}</Text>
        <View style={S.positionTariff}>
          {(lite == true) ? (
            <Image
              source={require('assets/global/check.png')}
              style={S.iconCheck}
            />
          ) : ((lite == false) ? (
            <Image
              source={require('assets/global/secure.png')}
              style={S.iconCheck}
            />
          ) : (
            <View style={{ width: 60, marginHorizontal: 2 }}>
              <Text style={S.textAlign}>{lite}</Text>
            </View>
          )
          )}
          {(standard == true) ? (
            <Image
              source={require('assets/global/check.png')}
              style={S.iconCheck}
            />
          ) : ((standard == false) ? (
            <Image
              source={require('assets/global/secure.png')}
              style={S.iconCheck}
            />
          ) : (
            <View style={{ width: 60, marginHorizontal: 2 }}>
              <Text style={S.textAlign}>{standard}</Text>
            </View>
          )
          )}
          {(premium == true) ? (
            <Image
              source={require('assets/global/check.png')}
              style={S.iconCheck}
            />
          ) : ((premium == false) ? (
            <Image
              source={require('assets/global/secure.png')}
              style={S.iconCheck}
            />
          ) : (
            <View style={{ width: 60, marginHorizontal: 2 }}>
              <Text style={S.textAlign}>{premium}</Text>
            </View>
          )
          )}
        </View>
      </View>
    );
  };

  return (
    <MainPageTemplate bc={COLORS.white}>
      <View style={S.container}>
        <Text style={S.title}>{t(translations.subscription.title)}</Text>
        <Text style={S.description}>
          {t(translations.subscription.description)}
        </Text>
      </View>
      <ScrollView style={S.scrollViewContainer}>
        {productArray && productArray.map((item, index) => renderBlock(item, setSelectedPlan))}
        <Separator mv={32} />
        {/* <View style={S.separator} /> */}
        <View style={S.positionColumn}>
          <Text style={S.titleColumn}>
            {t(translations.subscription.titleColumn)}
          </Text>
          <View style={S.positionTariff}>
            <Text style={S.titleTariff}>
              {t(translations.subscription.lite)}
            </Text>
            <Text style={S.titleTariff}>
              {t(translations.subscription.standard)}
            </Text>
            <Text style={S.titleTariff}>
              {t(translations.subscription.premium)}
            </Text>
          </View>
        </View>
        {BENIFIT_CHART?.map((item, index) => renderItem(t(item.title), item.standard, item.premium, item.lite, item.bg))}
        <View style={S.extraSpace} />
      </ScrollView>
      <View style={S.bottomBlock}>
        <Button
          text={t(translations.subscription.upgrade)}
          loading={verifyLoading}
          buttonStyle={S.btnRenew}
          textStyle={S.textRenew}
          onPress={handleSubscribe}
        />
      </View>
    </MainPageTemplate>
  );
};

export { UpgradeSubscription };