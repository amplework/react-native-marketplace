import React, { useEffect, useState } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './style';
import I18n, { translations } from 'locales';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CardField } from '@stripe/stripe-react-native';
import REGEX from 'utils/regex';
import { validationMessages } from 'utils/validation';
import {
  getCards,
  addCard,
  editCard,
  deleteCard,
  cardSelectors,
  showAddCardModal,
  hideAddCardModal,
  showEditCardModal,
  hideEditCardModal,
} from 'store/entities/card';
import ScrollContainer from 'shared/scrollContainer';
import Button from 'shared/button';
import { ErrorMessage, Field } from 'shared/field';
import { Loader } from 'shared/loader';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { toast } from 'shared/toast';
import { alert } from 'shared/alert';
import { updateClientProfile } from 'store/actions/client';

const AddPaymentMethodSetup: React.FC<any> = ({ onSignIn }) => {

  const dispatch = useDispatch();

  const loading = useSelector(cardSelectors.loading);
  const addCardModalVisible = useSelector(cardSelectors.addCardModalVisible);
  const editCardModalVisible = useSelector(cardSelectors.editCardModalVisible);
  const cards = useSelector(cardSelectors.cards);
  const selectedCard = useSelector(cardSelectors.selectedCard);

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
  })

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  useEffect(() => {
    setState((prev: any) => ({
      ...prev,
      expMonth: selectedCard?.expMonth?.toString(),
      expYear: selectedCard?.expYear?.toString(),
      isDefault: selectedCard?.isDefault,
      lastFour: selectedCard?.lastFour
    }))
  }, [dispatch, selectedCard]);

  const { t } = useTranslation();

  const resetState = () => {
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

  const validateEditCard = () => {
    let currentYear = new Date().getFullYear() % 100
    let currentMonth = new Date().getMonth() + 1
    let valid = true;

    if (!state.expMonth) {
      setValidationState((prev: any) => ({ ...prev, expMonthError: validationMessages.required('Expiration Month') }))
      valid = false;
    } else if (state.expMonth.length == 2 && state.expMonth <= 12 && state.expMonth > 0) {
      setValidationState((prev: any) => ({ ...prev, expMonthError: '' }))
    } else {
      setValidationState((prev: any) => ({ ...prev, expMonthError: validationMessages.wrongFormat('Expiration Month, Month should be in MM format') }))
      valid = false;
    }
    if (state.expYear == currentYear) {
      if (state.expMonth <= currentMonth) {
        setValidationState((prev: any) => ({ ...prev, expMonthError: validationMessages.wrongFormat('Expiration Month, Month can not be a previous month') }))
        valid = false;
      }
    }
    if (!state.expYear) {
      setValidationState((prev: any) => ({ ...prev, expYearError: validationMessages.required('Expiration Year') }))
      valid = false;
    } else if (state.expYear.length == 2 && state.expYear <= 99 && state.expYear >= currentYear) {
      setValidationState((prev: any) => ({ ...prev, expDateError: '' }))
    } else {
      setValidationState((prev: any) => ({ ...prev, expDateError: validationMessages.wrongFormat('Expiration Year, Year should be in YY format & can not be a previous year') }))
      valid = false;
    }

    return (valid)
  };

  const onPressContinue = () => {
    if (cards?.length > 0) {
      onSignIn()
    } else {
      alert.info("You should add at least 1 payment method if you want to use the Online payments option");
    }
  }

  const onAddCard = () => dispatch(showAddCardModal())

  const onEditCard = (card: any) => {
    dispatch(showEditCardModal(card))
    setState((prev: any) => ({
      ...prev,
      expMonth: selectedCard?.expMonth?.toString(),
      expYear: selectedCard?.expYear?.toString(),
      isDefault: selectedCard?.isDefault,
      lastFour: selectedCard?.lastFour
    }))
  }

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

  const handleEditPress = () => {
    let isValidCard = validateEditCard();
    if (!isValidCard) {
      return;
    }
    dispatch(editCard({
      card: {
        cardId: selectedCard?.cardId,
        expMonth: Number(state.expMonth),
        expYear: Number(state.expYear),
        isDefault: state.isDefault
      }
    }))
  }

  const handleDefaultPress = () => {
    if (selectedCard?.isDefault != true) {
      dispatch(editCard({ card: { cardId: selectedCard.cardId, isDefault: true } }))
    } else {
      toast.info(I18n.t('addPaymentMethodSetupClient.errors.uniqCard'))
    }
  }

  const handleDeletePress = () => dispatch(deleteCard(selectedCard?.cardId))

  const onAddClose = () => {
    dispatch(hideAddCardModal())
    resetState()
  }

  const onEditClose = () => {
    dispatch(hideEditCardModal())
    resetState()
  }

  const getCardImage = (cardType: any) => {
    if (cardType === 'American Express') {
      return require('assets/global/americanExpress.png')
    } else if (cardType === 'JCB') {
      return require('assets/global/jcb.png')
    } else if (cardType === 'MasterCard') {
      return require('assets/global/masterCard.png')
    } else if (cardType === 'Discover') {
      return require('assets/global/discover.png')
    } else if (cardType === 'Diners Club') {
      return require('assets/global/dinersClub.png')
    } else if (cardType === 'Visa') {
      return require('assets/global/visa.png')
    } else {
      return require('assets/global/defaultCard.png')
    }
  }

  const CardItem = ({ card, onPress }: {
    card: any;
    onPress: any;
  }) => {
    let cardImage = getCardImage(card?.cardType)
    return (
      <TouchableOpacity
        style={[
          styles.cardContainer,
          styles.shadow,
          card?.isDefault && styles.blockedContainer,
        ]}
        onPress={onPress}
      >
        <View style={styles.rowSpace}>
          <View style={styles.row}>
            <Image
              source={cardImage}
              style={styles.avatar}
            />
            <Box row ai="center">
              <Text style={styles.cardNumber}>{'**** **** **** '}{card?.lastFour}</Text>
              {card?.isDefault && <Text style={styles.defaultText}>{'Default'}</Text>}
            </Box>
          </View>
          {card?.isDefault && (
            <View style={styles.defaultCheckContainer}>
              <Image
                source={require('assets/global/check.png')}
                style={styles.defaultCheck}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Loader loading={loading} />
      <Text style={styles.title}>
        {I18n.t<string>('addPaymentMethodSetupClient.title')}
      </Text>
      <Text style={styles.description}>
        {I18n.t<string>('addPaymentMethodSetupClient.description')}
      </Text>
      <ScrollContainer>
        <FlatList
          data={cards ?? []}
          keyExtractor={(item) => `${item?.cardId}`}
          renderItem={({ item: card }) => (
            <CardItem
              card={card}
              onPress={() => onEditCard(card)}
            />
          )}
          style={styles.listContainer}
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponent={
            <TouchableOpacity
              style={[styles.buttonContainer, styles.spaceButton]}
              onPress={onAddCard}
            >
              <Image
                source={require('assets/global/plus.png')}
                style={styles.plusImage}
              />
              <Text style={styles.addTitle}>
                {I18n.t<string>('addPaymentMethodSetupClient.addPaymentMethodButton')}
              </Text>
            </TouchableOpacity>
          }
        />
      </ScrollContainer>


      <Modal
        animationType="slide"
        transparent={true}
        visible={addCardModalVisible}
        onRequestClose={onAddClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.posHeader}>
              <View style={styles.titleNewCenter}>
                <Text style={styles.titleNewService}>
                  {I18n.t<string>('addPaymentMethodSetupClient.addPaymentMethod')}
                </Text>
              </View>
              <TouchableOpacity onPress={onAddClose}>
                <Image
                  source={require('assets/global/close.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <ScrollContainer extraScroll={200}>
              <Field
                value={state.cardHolderName}
                error={validationState.nameError}
                onChange={(text: string) => {
                  setState((prev: any) => ({ ...prev, cardHolderName: text }))
                  setValidationState((prev: any) => ({ ...prev, nameError: '' }))
                }}
                label={
                  I18n.t('addPaymentMethodSetupClient.cardHolderName')
                }
                required
                mt={16}
              />
              <>
                <CardField
                  postalCodeEnabled={false}
                  //@ts-ignore
                  placeholder={{
                    number: '4242 4242 4242 4242',
                  }}
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
                text={I18n.t('addPaymentMethodSetupClient.addCard')}
                buttonStyle={
                  (validationState.nameError == '' && state.cardHolderName != '' && validationState.complete == true && validationState.validCVC == 'Valid' && validationState.validExpiryDate == 'Valid' && validationState.validNumber == 'Valid')
                    ? [styles.btnContinueService, styles.btnAlign]
                    : [styles.btnContinueServiceInactive, styles.btnAlign]
                }
                textStyle={styles.textContinueService}
              />
            </ScrollContainer>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editCardModalVisible}
        onRequestClose={onEditClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.posHeader}>
              <View style={styles.titleNewCenter}>
                <Text style={styles.titleNewService}>
                  {I18n.t<string>('addPaymentMethodSetupClient.editPaymentMethod')}
                </Text>
              </View>
              <TouchableOpacity onPress={handleDeletePress}>
                <Icon src={require('assets/global/delete.png')} mr={16} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onEditClose}>
                <Image
                  source={require('assets/global/close.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <ScrollContainer extraScroll={200}>
              <Field
                disabled={true}
                value={`**** **** **** ${state?.lastFour}`}
                label={`Number`}
                mt={16}
              />
              <Field
                value={state.expMonth?.toString()}
                error={validationState.expMonthError}
                label={`Expiration Month`}
                mt={16}
                maxLength={2}
                keyboardType={'numeric'}
                onChange={(text) => setState((prev: any) => ({ ...prev, expMonth: text }))}
              />
              <Field
                value={state.expYear?.toString()}
                error={validationState.expDateError}
                label={`Expiration Year`}
                mt={16}
                maxLength={2}
                keyboardType={'numeric'}
                onChange={(text) => setState((prev: any) => ({ ...prev, expYear: text }))}
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  onPress={handleDefaultPress}
                  text={I18n.t('addPaymentMethodSetupClient.makeDefault')}
                  buttonStyle={[styles.btnContinueService, styles.btnMakeDefault]}
                  textStyle={styles.textContinueService}
                />
                <Button
                  onPress={handleEditPress}
                  text={I18n.t('addPaymentMethodSetupClient.editCard')}
                  buttonStyle={
                    (state.expMonth?.length == 2, state.expYear?.length == 2)
                      ? styles.btnContinueService
                      : styles.btnContinueServiceInactive
                  }
                  textStyle={styles.textContinueService}
                />
              </View>
            </ScrollContainer>
          </View>
        </View>
      </Modal>

      <View style={styles.rowButtons}>
        <Button
          onPress={onPressContinue}
          text={I18n.t('addPaymentMethodSetupClient.continue')}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default AddPaymentMethodSetup;
