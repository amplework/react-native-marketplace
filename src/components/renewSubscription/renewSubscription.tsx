import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import { ModalComponent } from 'components/settings/client/addOnlinePaymentMethod/modalComponemt';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Subscription } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { InAppPurchaseContext } from 'service/inAppPurchase';
import { requestPurchase } from 'service/inAppPurchase';
import Button from 'shared/button';
import { ErrorMessage, Field } from 'shared/field';
import { IconComponent, LogoutIcon } from 'shared/icon/icons';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import { cardSelectors } from 'store/entities/card';
import { addCard, confirmStripeSubscriptionStatus, createStripeSubscription, getCards, hideAddCardModal, showAddCardModal } from 'store/entities/card/slice';
import {
  startVerifySubscription,
  subscriptionSelectors,
} from 'store/entities/subscription';
import { checkUserSubscription } from 'store/entities/subscription/slice';
import { logout } from 'store/entities/user';
import { STANDARD } from 'types/subscription';
import { BENIFIT_CHART } from 'utils/benifitChart';
import COLORS from 'utils/colors';
import { openUrl, PRIVACY_POLICY_URL } from 'utils/constants';
import { formatCurrency } from 'utils/currency';
import { isIOS } from 'utils/device';
import REGEX from 'utils/regex';
import { validationMessages } from 'utils/validation';
import { getSubscriptionType } from 'utils/subscription'

import { renewSubscriptionStyles as S } from './style';
import { capitalize } from 'utils/strings';

type Props = StackScreenProps<RootStackParamList>;

const RenewSubscription: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { purchases } = useContext(InAppPurchaseContext);
  const sortedSubscriptions = purchases?.sort((a: any, b: any) => {
    return a.price - b.price;
  });
  const [selectedPlan, setSelectedPlan] = useState<Subscription>();
  const [showModal, setShowModal] = useState(false);
  const [selectedStripePlan, setSelectedStripePlan] = useState<any>();
  const isFirstSubscription = useSelector(subscriptionSelectors.isFirstSubscription);
  const verifyLoading = useSelector(subscriptionSelectors.verifyLoading);
  const addCardModalVisible = useSelector(cardSelectors.addCardModalVisible);
  const cards = useSelector(cardSelectors.cards);
  const subscriptionLoading = useSelector(cardSelectors.loading);
  const provider: any = useSelector((state: any) => state.provider.provider);
  const stripeSubscriptionList = useSelector(subscriptionSelectors.stripeSubscriptions);
  const subscription: any = useSelector(subscriptionSelectors.subscription);

  const isPreviousPlanFromStripe = subscription?.subscriptionPlanId.includes('stripe');

  const isOfferApplicableOnSubscription = (provider?.promotion?.planType == selectedStripePlan?.name)
    && provider?.promotion?.isAvailable
    && provider?.promotion?.isActive
    && (isPreviousPlanFromStripe);

  const [state, setState] = useState<any>({
    cardHolderName: '',
    brand: '',
    expMonth: '',
    expYear: '',
    number: '',
    lastFour: '',
  });

  const [validationState, setValidationState] = useState<any>({
    nameError: '',
    complete: false,
    validCVC: 'Invalid',
    validExpiryDate: 'Invalid',
    validNumber: 'Invalid',
    expMonthError: '',
    expDateError: '',
    cardError: '',
  });

  const emptyState = () => {
    setState((prev: any) => ({
      ...prev,
      cardHolderName: '',
      brand: '',
      expMonth: '',
      expYear: '',
      number: '',
      lastFour: ''
    }))
    setValidationState((prev: any) => ({
      ...prev,
      nameError: '',
      complete: false,
      validCVC: 'Invalid',
      validExpiryDate: 'Invalid',
      validNumber: 'Invalid',
      expMonthError: '',
      expDateError: ''
    }))
  }

  const initializeConfirmPayment = async (confirmKeys: any, subscriptionData: any) => {
    const clientSecret = confirmKeys?.latest_invoice?.payment_intent?.client_secret;
    const subscriptionId = confirmKeys?.id;
    await confirmPayment(clientSecret).then((response: any) => {
      dispatch(confirmStripeSubscriptionStatus({
        id: subscriptionId,
        data: subscriptionData
      }));
    }).catch((error: any) => {
      console.log("confirm payment error ====== >>> ", error);
      //@ts-ignore
      navigation.navigate('Home');
      emptyState();
    })
  }

  const resetState = () => {
    if (isOfferApplicableOnSubscription) {
      dispatch(createStripeSubscription({
        data: {
          priceId: selectedStripePlan?.default_price,
          couponCode: provider?.referralCode,
          platform: isIOS ? 'apple' : 'google',
          planType: selectedStripePlan?.name
        },
        onSuccess: initializeConfirmPayment
      }))
    } else {
      dispatch(createStripeSubscription({
        data: {
          priceId: selectedStripePlan?.default_price,
          platform: isIOS ? 'apple' : 'google',
          planType: selectedStripePlan?.name
        },
        onSuccess: initializeConfirmPayment
      }))
    }
    setState((prev: any) => ({
      ...prev,
      cardHolderName: '',
      brand: '',
      expMonth: '',
      expYear: '',
      number: '',
      lastFour: ''
    }))
    setValidationState((prev: any) => ({
      ...prev,
      nameError: '',
      complete: false,
      validCVC: 'Invalid',
      validExpiryDate: 'Invalid',
      validNumber: 'Invalid',
      expMonthError: '',
      expDateError: ''
    }))
  }

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  useEffect(() => {
    const previousPlan = getSubscriptionType(subscription)?.plan;
    if (previousPlan) {
      if (subscription?.subscriptionPlanId.includes('stripe')) {
        const isObjectPresent = stripeSubscriptionList?.find((e: any) => e.name?.includes(previousPlan));
        isObjectPresent && setSelectedStripePlan(isObjectPresent);
      } else {
        const isObjectPresent = purchases?.find((e) => e.productId?.includes(previousPlan));
        isObjectPresent && setSelectedPlan(isObjectPresent)
      }
    } else {
      if (subscription?.subscriptionPlanId.includes('stripe')) {
        const isObjectPresent = stripeSubscriptionList?.find((e: any) => (e.name == 'standard'));
        isObjectPresent && setSelectedStripePlan(isObjectPresent);
      } else {
        const isObjectPresent = purchases?.find((e) => (e.productId == STANDARD));
        isObjectPresent && setSelectedPlan(isObjectPresent)
      }
    }
  }, [purchases]);

  const handleLogout = useCallback(() => dispatch(logout()), []);

  const closeCardModal = () => dispatch(hideAddCardModal());

  const openSubscriptionPolicyModal = () => setShowModal(true);

  const handlePrivacyPolicy = useCallback(async () => openUrl(PRIVACY_POLICY_URL), [PRIVACY_POLICY_URL]);

  const renderModal = (show: boolean, content: any) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => { }}
      >
        <View style={S.chooseModalView}>
          <View style={[S.chooseView, S.shadow]}>{content}</View>
        </View>
      </Modal>
    );
  };


  const handleSubscribe = async () => {
    setShowModal(false);
    if (subscription?.subscriptionPlanId.includes('stripe')) {
      if (!cards?.length) {
        dispatch(showAddCardModal())
      } else {
        let subscriptionData = {
          priceId: selectedStripePlan?.default_price,
          platform: isIOS ? 'apple' : 'google',
          planType: selectedStripePlan?.name
        }
        dispatch(isOfferApplicableOnSubscription
          ? createStripeSubscription({
            data: {
              ...subscriptionData,
              couponCode: provider?.referralCode,
            },
            onSuccess: initializeConfirmPayment
          })
          : createStripeSubscription({
            data: subscriptionData,
            onSuccess: initializeConfirmPayment
          }))
      }
    } else {
      dispatch(startVerifySubscription());

      const productId = selectedPlan?.productId;

      if (productId) {
        dispatch(checkUserSubscription(true));
        await requestPurchase(productId);
      }
    }
  };

  const validateAddCard = () => {
    const NAME = t(translations.addPaymentMethodSetup.cardHolderName);
    let valid = true;

    if (!state.cardHolderName.trim().length) {
      setValidationState((prev: any) => ({ ...prev, nameError: validationMessages.required(NAME) }))
      valid = false;
    } else if (REGEX.strictName.test(state.cardHolderName) == false) {
      setValidationState((prev: any) => ({ ...prev, nameError: validationMessages.wrongFormat(NAME) }));
      valid = false;
    } else {
      setValidationState((prev: any) => ({ ...prev, nameError: '' }))
    }
    if (validationState.complete == false || validationState.validCVC == 'Inalid' || validationState.validExpiryDate == 'Inalid' || validationState.validNumber == 'Inalid') {
      setValidationState((prev: any) => ({ ...prev, cardError: 'The entered payment method information is not valid. Please check your card details and try again or try another card.' }))
      valid = false;
    }

    return (valid)
  };


  const handleAddPress = () => {
    let isValidCard = validateAddCard();
    if (!isValidCard) {
      return;
    }
    let card = {
      ...state,
      number: Number(state.number),
      isDefault: (cards?.length > 0) ? false : true
    }
    dispatch(addCard({ card, onSuccess: resetState }))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <IconComponent
          Component={LogoutIcon}
          size={20}
          mr={24}
          isClickable
          onPress={handleLogout}
        />
      ),
      headerLeft: () => null,
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

  const renderStripSubBlock = (subscription: any, onSelect: any) => {
    const active = subscription?.id == selectedStripePlan?.id;
    return (
      <TouchableOpacity
        style={[
          S.subBlock,
          (subscription?.id == selectedStripePlan?.id) && S.subBlockActive
        ]}
        onPress={() => onSelect(subscription)}
      >
        <View
          style={[S.subBlockBorder, active && S.subBlockBorderActive]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[S.titleSub, active && S.titleSubActive]}>
              {`${capitalize(subscription?.name)} (Alpha Pro)`}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Text style={[S.priceSub, active && S.priceSubActive]}>
                <Text style={S.priceCount}>
                  {`$${subscription?.amount / 100}`}
                </Text>
                {t(translations.subscription.mth)}
              </Text>
              {subscription?.name == 'standard' ? (
                <View style={[S.mostPopularBox,
                !active && S.mostPopularBoxActive]} >
                  <Paragraph color={active ? COLORS.black : COLORS.white} type='bold' size='s' >{'Most Popular'}</Paragraph>
                </View>
              ) : null}
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Text style={[S.priceSub, active && S.priceSubActive]}>
                <Text style={S.priceCount}>
                  {formatCurrency(subscription?.currency, subscription?.price)}
                </Text>
                {t(translations.subscription.mth)}
              </Text>
              {subscription?.productId.includes('standard') ? (
                <View style={[S.mostPopularBox,
                !active && S.mostPopularBoxActive]} >
                  <Paragraph color={active ? COLORS.black : COLORS.white} type='bold' size='s' >{'Most Popular'}</Paragraph>
                </View>
              ) : null}
            </View>
            {/* <Text style={[S.priceSub, active && S.priceSubActive]}>
              <Text style={S.priceCount}>
                {formatCurrency(subscription?.currency, subscription?.price)}
              </Text>
              {t(translations.subscription.mth)}
            </Text> */}
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
        {subscription?.subscriptionPlanId.includes('stripe') ? (
          stripeSubscriptionList && stripeSubscriptionList.map((item: any) => renderStripSubBlock(item, setSelectedStripePlan))
        ) : (
          sortedSubscriptions && sortedSubscriptions.map((item, index) => renderBlock(item, setSelectedPlan))
        )}
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
      {renderModal(
        showModal,
        <>
          <ScrollView>
            <Text style={S.headingPolicy}>
              {'Subscription Policy\n'}
            </Text>
            <Text style={S.titleChooseModal}>
              {t(translations.common.alerts.subscription)}
            </Text>
            <Pressable onPress={handlePrivacyPolicy}>
              <Text style={S.link}>{`• https://goalphapro.com/privacy-policy`}</Text>
            </Pressable>
          </ScrollView>
          <Button
            text={'Confirm'}
            onPress={handleSubscribe}
            buttonStyle={S.connectClient}
          />
        </>,
      )}
      <ModalComponent
        visible={addCardModalVisible}
        onClose={closeCardModal}
        modalHieght={'50%'}
        title={t(translations.addPaymentMethodSetup.addPaymentMethod)}
      >
        <Field
          value={state.cardHolderName}
          error={validationState.nameError}
          onChange={(text: string) => {
            setState((prev: any) => ({ ...prev, cardHolderName: text }))
            setValidationState((prev: any) => ({ ...prev, nameError: '' }))
          }}
          label={
            t(translations.addPaymentMethodSetup.cardHolderName)
          }
          required
          mt={16}
        />
        <>
          <CardField
            postalCodeEnabled={false}
            // placeholder={{
            //   number: '4242 4242 4242 4242',
            // }}
            cardStyle={validationState.cardError == '' ? {
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            } : {
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'red'
            }}
            style={{
              width: '100%',
              height: 50,
              marginTop: 32,
            }}
            onCardChange={(cardDetails) => {
              setState((prev: any) => ({
                ...prev,
                brand: cardDetails.brand,
                expMonth: cardDetails.expiryMonth,
                expYear: cardDetails.expiryYear,
                number: cardDetails.number,
                lastFour: cardDetails.last4
              }))
              setValidationState((prev: any) => ({
                ...prev,
                complete: cardDetails.complete,
                validCVC: cardDetails.validCVC,
                validExpiryDate: cardDetails.validExpiryDate,
                validNumber: cardDetails.validNumber,
                cardError: '',
              }))
            }}
            dangerouslyGetFullCardDetails={true}
          />
          <ErrorMessage error={validationState.cardError} mt={4} />
        </>
        <Button
          onPress={handleAddPress}
          text={t(translations.addPaymentMethodSetup.addCard)}
          buttonStyle={
            (validationState.nameError == '' && state.cardHolderName != '' && validationState.complete == true && validationState.validCVC == 'Valid' && validationState.validExpiryDate == 'Valid' && validationState.validNumber == 'Valid')
              ? [S.btnContinueService, S.btnAlign]
              : [S.btnContinueServiceInactive, S.btnAlign]
          }
          textStyle={S.textContinueService}
        />
      </ModalComponent>
      <View style={S.bottomBlock}>
        <Button
          text={isFirstSubscription ? t(translations.subscription.title) : t(translations.subscription.renew)}
          loading={verifyLoading || subscriptionLoading}
          buttonStyle={S.btnRenew}
          textStyle={S.textRenew}
          onPress={openSubscriptionPolicyModal}
        />
      </View>
    </MainPageTemplate>
  );
};

export { RenewSubscription };