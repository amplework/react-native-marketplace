import { translations } from 'locales';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Subscription } from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { InAppPurchaseContext } from 'service/inAppPurchase';
import { requestPurchase } from 'service/inAppPurchase';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import { MainPageTemplate } from 'shared/templates';
import {
  startVerifySubscription,
  subscriptionSelectors,
} from 'store/entities/subscription';
import { checkUserSubscription } from 'store/entities/subscription/slice';
import { STANDARD } from 'types/subscription';
import { BENIFIT_CHART } from 'utils/benifitChart';
import COLORS from 'utils/colors';
import { formatCurrency } from 'utils/currency';
import styles from './style';
import { Paragraph } from 'shared/paragraph';
import {
  addCard,
  getCards,
  cardSelectors,
  hideAddCardModal,
  showAddCardModal,
} from 'store/entities/card';
import { alert } from 'shared/alert';
import { ModalComponent } from 'components/settings/client/addOnlinePaymentMethod/modalComponemt';
import { ErrorMessage, Field } from 'shared/field';
import { validationMessages } from 'utils/validation';
import REGEX from 'utils/regex';
import { confirmStripeSubscriptionStatus, createStripeSubscription } from 'store/entities/card/slice';
import { isIOS } from 'utils/device';
import { openUrl, PRIVACY_POLICY_URL } from 'utils/constants';
import { Pressable } from 'shared/pressable';
import { IconComponent, LogoutIcon } from 'shared/icon/icons';
import { logout } from 'store/entities/user';
import { getProviderProfile } from 'store/actions/provider';
import { capitalize } from 'utils/strings';

export interface Props {
  onContinue?: () => void;
  navigation?: any;
  route?: any
}

const PickSubscription: React.FC<Props> = ({
  onContinue,
  navigation,
  route
}) => {
  const isSubscriptionExist = route?.params?.isSubscriptionExist;
  const dispatch = useDispatch();
  const { purchases } = useContext(InAppPurchaseContext);
  const sortedSubscriptions = purchases?.sort((a: any, b: any) => {
    return a.price - b.price;
  });
  const addCardModalVisible = useSelector(cardSelectors.addCardModalVisible);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Subscription>();
  const [selectedStripePlan, setSelectedStripePlan] = useState<any>();

  const cards = useSelector(cardSelectors.cards);
  const subscriptionLoading = useSelector(cardSelectors.loading);
  const verifyLoading = useSelector(subscriptionSelectors.verifyLoading);
  const provider: any = useSelector((state: any) => state.provider.provider);
  const stripeSubscriptionList = useSelector(subscriptionSelectors.stripeSubscriptions);

  const isOfferApplicableOnSubscription = (provider?.promotion?.planType == selectedStripePlan?.name) && provider?.promotion?.isAvailable && provider?.promotion?.isActive;

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

  const handleLogout = useCallback(() => dispatch(logout()), []);

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
    // console.log("clientSecret  ====== >>> ", clientSecret);
    // console.log("subscriptionId  ====== >>> ", subscriptionId);
    // console.log("subscriptionData  ====== >>> ", subscriptionData);
    await confirmPayment(clientSecret).then((response: any) => {
      // console.log("confirm initializtion payment response ====== >>> ", response);
      dispatch(confirmStripeSubscriptionStatus({
        id: subscriptionId,
        data: subscriptionData
      }));
    }).catch((error: any) => {
      console.log("confirm payment error ====== >>> ", error);
      // dispatch(getUserSubscriptionDetails());
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
  }

  useEffect(() => {
    dispatch(getProviderProfile());
    dispatch(getCards());
  }, [dispatch]);

  useEffect(() => {
    if (provider?.referralCode) {
      const isObjectPresent = stripeSubscriptionList?.find((e: any) => (e.name == 'standard'));
      isObjectPresent && setSelectedStripePlan(isObjectPresent);
    } else {
      const isObjectPresent = purchases?.find((e) => (e.productId == STANDARD));
      isObjectPresent && setSelectedPlan(isObjectPresent)
    }
  }, [purchases])

  const { t } = useTranslation();

  const goBack = () => {
    if (isSubscriptionExist) {
      navigation.goBack();
    } else {
      return;
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton onPress={goBack} />,
      headerRight: !isSubscriptionExist ? () => (
        <IconComponent
          Component={LogoutIcon}
          size={20}
          mr={24}
          isClickable
          onPress={handleLogout}
        />
      ) : null,
    });
  }, [navigation, handleLogout]);

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
        <View style={styles.chooseModalView}>
          <View style={[styles.chooseView, styles.shadow]}>{content}</View>
        </View>
      </Modal>
    );
  };

  const handleSubscribe = async () => {
    setShowModal(false);
    if (provider?.referralCode) {
      if (!cards?.length) {
        dispatch(showAddCardModal())
      } else {
        isOfferApplicableOnSubscription
          ? dispatch(createStripeSubscription({
            data: {
              priceId: selectedStripePlan?.default_price,
              couponCode: provider?.referralCode,
              platform: isIOS ? 'apple' : 'google',
              planType: selectedStripePlan?.name
            },
            onSuccess: initializeConfirmPayment
          }))
          : dispatch(createStripeSubscription({
            data: {
              priceId: selectedStripePlan?.default_price,
              platform: isIOS ? 'apple' : 'google',
              planType: selectedStripePlan?.name
            },
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

  const onPressInfo = () => {
    alert.info(`You will pay only $${provider?.promotion?.planPrice} for this subscription through this offer.`);
  }

  const renderStripSubBlock = (subscription: any, onSelect: any) => {
    const active = subscription?.id == selectedStripePlan?.id;
    const isOfferApplicable = provider?.promotion?.planType == subscription?.name && provider?.promotion?.isAvailable && provider?.promotion?.isActive;
    return (
      <TouchableOpacity
        style={[
          styles.subBlock,
          (subscription?.id == selectedStripePlan?.id) && styles.subBlockActive
        ]}
        onPress={() => onSelect(subscription)}
      >
        <View
          style={[styles.subBlockBorder, active && styles.subBlockBorderActive]}
        >
          <View style={{ flex: 1 }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
              <Text style={[styles.titleSub, active && styles.titleSubActive]}>
                {`${capitalize(subscription?.name)} (Alpha Pro)`}
              </Text>
              {isOfferApplicable ? (
                <TouchableOpacity onPress={onPressInfo} style={styles.offerInfoContainer} >
                  <MaterialIcons
                    size={14}
                    style={active ? styles.infoIconActive : styles.infoIconInactive}
                    name={'info-outline'}
                  />
                  <Text style={active ? styles.offerAppliedActive : styles.offerAppliedInactive} >
                    {'Offer Applied'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              {isOfferApplicable ? (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={[styles.priceSub, active && styles.priceSubActive]}>
                      <Text style={styles.priceCount}>
                        {`$${provider?.promotion?.planPrice}`}
                      </Text>
                      {t(translations.subscription.mth)}
                    </Text>
                  </View>
                  <Text style={[styles.crossedPriceSub, active && styles.priceSubActive]}>
                    <Text style={styles.crossedPriceCount}>
                      {`$${subscription?.amount / 100}`}
                    </Text>
                    {t(translations.subscription.mth)}
                  </Text>
                </View>
              ) : (
                <Text style={[styles.priceSub, active && styles.priceSubActive]}>
                  <Text style={styles.priceCount}>
                    {`$${subscription?.amount / 100}`}
                  </Text>
                  {t(translations.subscription.mth)}
                </Text>
              )}
              {subscription?.name == 'standard' ? (
                <View style={[styles.mostPopularBox,
                !active && styles.mostPopularBoxActive]} >
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
            style={styles.circleImage}
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
          styles.subBlock,
          (subscription?.productId == selectedPlan?.productId) && styles.subBlockActive,
          subscription?.title.trim().toLowerCase() === 'premium' && styles.spaceTop,
        ]}
        onPress={() => onSelect(subscription)}
      >
        <View
          style={[styles.subBlockBorder, active && styles.subBlockBorderActive]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.titleSub, active && styles.titleSubActive]}>
              {subscription?.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Text style={[styles.priceSub, active && styles.priceSubActive]}>
                <Text style={styles.priceCount}>
                  {formatCurrency(subscription?.currency, subscription?.price)}
                </Text>
                {t(translations.subscription.mth)}
              </Text>
              {subscription?.productId.includes('standard') ? (
                <View style={[styles.mostPopularBox,
                !active && styles.mostPopularBoxActive]} >
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
    lite: boolean | string,
    bg: boolean,
  ) => {
    return (
      <View style={[styles.positionItems, bg && styles.bgItem]}>
        <Text style={styles.itemColumn}>{title}</Text>
        <View style={styles.positionTariff}>
          {(lite == true) ? (
            <Image
              source={require('assets/global/check.png')}
              style={styles.iconCheck}
            />
          ) : ((lite == false) ? (
            <Image
              source={require('assets/global/secure.png')}
              style={styles.iconCheck}
            />
          ) : (
            <View style={{ width: 60, marginHorizontal: 2 }}>
              <Text style={styles.textAlign}>{lite}</Text>
            </View>
          )
          )}
          {(standard == true) ? (
            <Image
              source={require('assets/global/check.png')}
              style={styles.iconCheck}
            />
          ) : ((standard == false) ? (
            <Image
              source={require('assets/global/secure.png')}
              style={styles.iconCheck}
            />
          ) : (
            <View style={{ width: 60, marginHorizontal: 2 }}>
              <Text style={styles.textAlign}>{standard}</Text>
            </View>
          )
          )}
          {(premium == true) ? (
            <Image
              source={require('assets/global/check.png')}
              style={styles.iconCheck}
            />
          ) : ((premium == false) ? (
            <Image
              source={require('assets/global/secure.png')}
              style={styles.iconCheck}
            />
          ) : (
            <View style={{ width: 60, marginHorizontal: 2 }}>
              <Text style={styles.textAlign}>{premium}</Text>
            </View>
          )
          )}
        </View>
      </View>
    );
  };

  return (
    <MainPageTemplate containerStyle={styles.container} bc={COLORS.white} loading={verifyLoading || subscriptionLoading}>
      <Text style={styles.title}>{t(translations.subscription.title)}</Text>
      <Text style={styles.description}>
        {t(translations.subscription.description)}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer}>
        {provider?.referralCode ? (
          stripeSubscriptionList && stripeSubscriptionList.map((item: any) => renderStripSubBlock(item, setSelectedStripePlan))
        ) : (
          sortedSubscriptions && sortedSubscriptions.map((item, index) => renderBlock(item, setSelectedPlan))
        )}
        <View style={styles.separator} />
        <View style={styles.positionColumn}>
          <Text style={styles.titleColumn}>
            {t(translations.subscription.titleColumn)}
          </Text>
          <View style={styles.positionTariff}>
            <Text style={styles.titleTariff}>
              {t(translations.subscription.lite)}
            </Text>
            <Text style={styles.titleTariff}>
              {t(translations.subscription.standard)}
            </Text>
            <Text style={styles.titleTariff}>
              {t(translations.subscription.premium)}
            </Text>
          </View>
        </View>
        {BENIFIT_CHART?.map((item, index) => renderItem(t(item.title), item.standard, item.premium, item.lite, item.bg))}
        <View style={styles.extraSpace} />
      </ScrollView>
      {renderModal(
        showModal,
        <>
          <ScrollView>
            <Text style={styles.headingPolicy}>
              {'Subscription Policy\n'}
            </Text>
            <Text style={styles.titleChooseModal}>
              {t(translations.common.alerts.subscription)}
            </Text>
            <Pressable onPress={handlePrivacyPolicy}>
              <Text style={styles.link}>{`• https://goalphapro.com/privacy-policy`}</Text>
            </Pressable>
          </ScrollView>
          <Button
            text={'Confirm'}
            onPress={handleSubscribe}
            buttonStyle={styles.connectClient}
          />
        </>,
      )}
      <ModalComponent
        visible={addCardModalVisible}
        onClose={closeCardModal}
        modalHieght={'70%'}
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
              ? [styles.btnContinueService, styles.btnAlign]
              : [styles.btnContinueServiceInactive, styles.btnAlign]
          }
          textStyle={styles.textContinueService}
        />
      </ModalComponent>
      <View style={styles.bottomBlock}>
        <Button
          text={t(translations.subscription.title)}
          // loading={verifyLoading || subscriptionLoading}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
          onPress={openSubscriptionPolicyModal}
        />
      </View>
    </MainPageTemplate>
  );
};

export default PickSubscription;
