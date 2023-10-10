import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from 'theme';
import { ClientBirthdayRewardStyles as S } from './style';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import SafeContainer from 'shared/container';
import DropMenu from 'shared/dropMenu';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { Field } from 'shared/field';
import { Toggle } from 'shared/toggle';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import I18n, { translations } from 'locales';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { validateClientBirthdayReward } from 'components/settings/helpers/validation';
import {
  formatClientBirthdayRewardParameters,
  adaptClientBirthdayReward,
} from 'components/settings/helpers/adapters';
import {
  REWARD_TYPE_DATA,
  REWARD_FOR_DATA,
} from 'components/settings/helpers/options';
import {
  getProducts,
  productsSelectors,
} from 'store/entities/products';
import {
  clientRewardSelectors,
  getClientReward,
  addClientReward,
  updateClientReward,
} from 'store/entities/clientReward';
import { isIOS } from 'utils/device';

const ClientBirthdayReward: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const clientBirthdayReward = useSelector(clientRewardSelectors.clientBirthdayReward);
  const loading = useSelector(clientRewardSelectors.loading);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.loyaltyOptionsLinks.editBirthdayReward)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getClientReward({ type: 'birthday' }));
  }, [dispatch]);

  const [myProducts, setMyProducts] = useState<any>({
    services: [],
    items: []
  })

  const products = useSelector(productsSelectors.products);

  useEffect(() => {
    if (products) {
      setMyProducts((prev: any) => ({
        ...prev,
        services: products?.filter((item: any) => item.type == 'service' && item.isActive == true) ?? [],
        items: products?.filter((item: any) => item.type == 'item' && item.isActive == true) ?? []
      }))
    }
  }, [products]);

  const socialLoading = useSelector((state: any) => state.social.loading);
  const [showModal, setShowModal] = useState(false);
  const [feed, setFeed] = useState('');
  const openSocialModal = () => setShowModal(true);

  const closeSocialModal = () => setShowModal(false);

  const {
    values,
    setValues,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      active: false,
      description: '',
      rewardType: null,
      rewardFor: null,
      isAnyServices: false,
      services: [],
      isAnyItems: false,
      sItems: [],
      discountAmount: '',
      discountRate: '',
      moreDescription: '',
      onlyOnBirthday: true,
      noCombination: true,
    },
    validate: validateClientBirthdayReward(myProducts),
    validateOnChange: false,
    onSubmit: (clientBirthdayRewardVal: any) => {
      if (clientBirthdayReward) {
        alert.editing({
          entity: t(translations.common.entities.clientBirthdayReward),
          onEdit: () => dispatch(updateClientReward(formatClientBirthdayRewardParameters({ ...clientBirthdayRewardVal, id: clientBirthdayReward.id, type: 'birthday' }))),
        });
      } else {
        alert.creation({
          entity: t(translations.common.entities.clientBirthdayReward),
          onCreate: () => dispatch(addClientReward(formatClientBirthdayRewardParameters({ ...clientBirthdayRewardVal, type: 'birthday' }))),
        });
      }
    },
  });

  useEffect(() => {
    if (clientBirthdayReward) {
      setValues(adaptClientBirthdayReward(clientBirthdayReward));
    }
  }, [clientBirthdayReward, setValues]);

  useEffect(() => {
    if (clientBirthdayReward && myProducts) {
      clientBirthdayReward.services?.length == myProducts.services?.length && handleToggle('isAnyServices')(true)
      clientBirthdayReward.items?.length == myProducts.items?.length && handleToggle('isAnyItems')(true)
    }
  }, [clientBirthdayReward, myProducts]);

  const handleFieldChange = (field: any) => (value: any) =>
    setFieldValue(field, value);

  const handleToggle = (field: any) => (checked: boolean) =>
    setFieldValue(field, checked);

  const handleServiceSelect = (field: any) => (service: any) => {
    let newArr: any = [...values.services];
    const index = newArr.findIndex((e: any) => e.id == service.id);
    if (index === -1) {
      newArr.push(service);
    } else {
      newArr.splice(index, 1)
    }
    setFieldValue(field, newArr);
  }

  const handleSItemSelect = (field: any) => (sItem: any) => {
    let newArr: any = [...values.sItems];
    const index = newArr.findIndex((e: any) => e.id == sItem.id);
    if (index === -1) {
      newArr.push(sItem);
    } else {
      newArr.splice(index, 1)
    }
    setFieldValue(field, newArr);
  }

  const onChangeRewardType = (val: any) => {
    handleFieldChange('rewardType')(val)
    if (clientBirthdayReward && (clientBirthdayReward?.rewardType == val?.name)) {
      handleFieldChange('discountAmount')(clientBirthdayReward?.discount?.toString() ?? '')
      handleFieldChange('discountRate')(clientBirthdayReward?.discountRate?.toString() ?? '')
    } else {
      handleFieldChange('discountAmount')('')
      handleFieldChange('discountRate')('')
    }
  }

  const onChangeRewardFor = (val: any) => {
    handleFieldChange('rewardFor')(val)
    if (clientBirthdayReward && (clientBirthdayReward?.rewardFor == val?.name)) {
      if (clientBirthdayReward?.rewardFor == "services") {
        handleToggle('isAnyItems')(false)
        handleFieldChange('sItems')([])
        handleToggle('isAnyServices')(clientBirthdayReward?.services?.length == myProducts?.services?.length)
        handleFieldChange('services')([...clientBirthdayReward?.services])
      } else {
        handleToggle('isAnyServices')(false)
        handleFieldChange('services')([])
        handleToggle('isAnyItems')(clientBirthdayReward?.items?.length == myProducts?.items?.length)
        handleFieldChange('sItems')([...clientBirthdayReward?.items])
      }
    } else {
      handleToggle('isAnyServices')(false)
      handleFieldChange('services')([])
      handleToggle('isAnyItems')(false)
      handleFieldChange('sItems')([])
    }
  }

  function renderModal(show: boolean, content: any) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={S.keyboardStyle}
        >
          <View style={S.chooseModalView}>
            <View style={[S.chooseView, S.shadow]}>{content}</View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <Loader loading={loading} />
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={S.content} style={S.scrollView}>
          <Box flex pr={32} pl={32}>
            <View style={S.activeContainer}>
              <Paragraph size="s" type="book">
                {I18n.t('clientBirthdayReward.placeholders.active')}
              </Paragraph>
              <Toggle
                checked={values.active}
                onChange={handleToggle('active')}
              />
            </View>
            <Field
              value={values.description}
              onChange={handleFieldChange('description')}
              error={errors.description}
              label={I18n.t('clientBirthdayReward.placeholders.description')}
              multiline
              numberOfLines={5}
              size="l"
              mt={16}
            />
            <DropMenu
              items={REWARD_TYPE_DATA}
              value={values.rewardType}
              onChange={(val: any) => onChangeRewardType(val)}
              placeholder={I18n.t('clientBirthdayReward.placeholders.rewardType')}
              placeholderValue={null}
              error={errors.rewardType}
            />
            <DropMenu
              items={REWARD_FOR_DATA}
              value={values.rewardFor}
              onChange={(val: any) => onChangeRewardFor(val)}
              placeholder={I18n.t('clientBirthdayReward.placeholders.rewardFor')}
              placeholderValue={null}
              error={errors.rewardFor}
            />
            {(values.rewardFor && !_.isEmpty(values.rewardFor)) && values.rewardFor?.['id'] == '1' ? (
              <>
                {myProducts.services?.length > 0 && (
                  <CheckBox
                    checked={values.isAnyServices}
                    onChange={(checked: boolean) => {
                      handleToggle('isAnyServices')(checked)
                      checked ? handleFieldChange('services')(myProducts.services) : handleFieldChange('services')([])
                    }}
                    label={'Any'}
                    styleLabel={[S.textPrimary, S.textSecondary]}
                    styleContainer={[S.checkBoxPosition, { flex: 1 }]}
                  />
                )}
                <FlatList
                  data={myProducts.services}
                  keyExtractor={(item) => `${item.id}`}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'center' }}
                  renderItem={({ item: service }) => {
                    const isChecked = values.services.some((e: any) => { return e.id == service.id });
                    return (
                      <CheckBox
                        checked={isChecked}
                        onChange={(checked: boolean) => {
                          ((checked ? values.services?.length + 1 : values.services?.length - 1) < myProducts?.services?.length)
                            ? handleToggle('isAnyServices')(false)
                            : handleToggle('isAnyServices')(true)
                          handleServiceSelect('services')(service)
                        }}
                        label={service.name}
                        styleLabel={[S.textPrimary, S.textSecondary]}
                        styleContainer={[S.checkBoxPosition, { flex: 1 }]}
                      />
                    )
                  }}
                  style={(myProducts.services.length > 0) && S.servicesList}
                />
              </>
            ) : values.rewardFor?.['id'] == '2' && (
              <>
                {myProducts.items?.length > 0 && (
                  <CheckBox
                    checked={values.isAnyItems}
                    onChange={(checked: boolean) => {
                      handleToggle('isAnyItems')(checked)
                      checked ? handleFieldChange('sItems')(myProducts.items) : handleFieldChange('sItems')([])
                    }}
                    label={'Any'}
                    styleLabel={[S.textPrimary, S.textSecondary]}
                    styleContainer={[S.checkBoxPosition, { flex: 1 }]}
                  />
                )}
                <FlatList
                  data={myProducts.items}
                  keyExtractor={(item) => `${item.id}`}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'center' }}
                  renderItem={({ item: sItem }) => {
                    const isChecked = values.sItems.some((e: any) => { return e.id == sItem.id });
                    return (
                      <CheckBox
                        checked={isChecked}
                        onChange={(checked: boolean) => {
                          ((checked ? values.sItems?.length + 1 : values.sItems?.length - 1) < myProducts?.items?.length)
                            ? handleToggle('isAnyItems')(false)
                            : handleToggle('isAnyItems')(true)
                          handleSItemSelect('sItems')(sItem)
                        }}
                        label={sItem.name}
                        styleLabel={[S.textPrimary, S.textSecondary]}
                        styleContainer={[S.checkBoxPosition, { flex: 1 }]}
                      />
                    )
                  }}
                  style={(myProducts.items.length > 0) && S.servicesList}
                />
              </>
            )}
            {(values.rewardType && !_.isEmpty(values.rewardType)) && values.rewardType?.['id'] == '1' ? (
              <Field
                value={values.discountAmount.toString()}
                onChange={handleFieldChange('discountAmount')}
                error={errors.discountAmount}
                label={I18n.t('clientBirthdayReward.placeholders.discountAmount')}
                keyboardType="numeric"
                mt={16}
              />
            ) : values.rewardType?.['id'] == '2' && (
              <Field
                value={values.discountRate.toString()}
                onChange={handleFieldChange('discountRate')}
                error={errors.discountRate}
                label={I18n.t('clientBirthdayReward.placeholders.discountRate')}
                keyboardType="numeric"
                mt={16}
              />
            )}
            <Field
              value={values.moreDescription}
              onChange={handleFieldChange('moreDescription')}
              error={errors.moreDescription}
              label={I18n.t('clientBirthdayReward.placeholders.moreDescription')}
              multiline
              numberOfLines={5}
              size="xl"
              mt={16}
            />
            <CheckBox
              disabled
              checked={values.onlyOnBirthday}
              onChange={handleToggle('onlyOnBirthday')}
              label={I18n.t('clientBirthdayReward.placeholders.onlyOnBirthday')}
              styleLabel={S.textPrimary}
              styleContainer={S.checkBoxPosition}
            />
            <CheckBox
              checked={values.noCombination}
              onChange={handleToggle('noCombination')}
              label={I18n.t('clientBirthdayReward.placeholders.noCombination')}
              styleLabel={S.textPrimary}
              styleContainer={S.checkBoxPosition}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={S.saveButtonContainer}>
        <Button
          text={t(translations.common.saveChanges)}
          onPress={handleSubmit}
          buttonStyle={{ width: '100%' }}
        />
      </View>
      {/* <View style={S.saveButtonContainer}>
        <Button
          text={t(translations.common.saveChanges)}
          onPress={handleSubmit}
          buttonStyle={{ width: '48%' }}
        />
        <Button
          text={t(translations.common.share)}
          onPress={openSocialModal}
          buttonStyle={{ width: '48%', backgroundColor: COLORS.orange }}
        />
      </View> */}
      {/* {renderModal(
        showModal,
        <>
          <View style={S.upperContainer}>
            <Paragraph type='bold' size='l' >{'Create Post'}</Paragraph>
            <TouchableOpacity onPress={closeSocialModal}>
              <Image
                source={require('assets/global/close.png')}
                style={S.closeImage}
              />
            </TouchableOpacity>
          </View>
          <Separator />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Field
              value={feed}
              label={'Feed'}
              onChange={setFeed}
              // maxLength={255}
              size='xl'
              multiline
              mv={20}
            />
            {socialLoading ? (
              <Loader loading={socialLoading} />
            ) : (
              <View style={S.socialView}>
                <Button
                  image={require('assets/global/fblogo.jpg')}
                  imageStyle={{ mr: 0 }}
                  size={80}
                  onPress={() => { }}
                  buttonStyle={S.fbButton}
                />
                <Button
                  image={require('assets/global/instalogo.png')}
                  onPress={() => { }}
                  imageStyle={{ mr: 0 }}
                  size={55}
                  buttonStyle={S.instaButton}
                />
                <Button
                  image={require('assets/global/twitterlogo.jpg')}
                  onPress={() => { }}
                  imageStyle={{ mr: 0 }}
                  size={70}
                  buttonStyle={S.twitterButton}
                />
                <Button
                  onPress={() => { }}
                  text={'All'}
                  textStyle={{ color: 'white', textAlign: 'center', fontSize: 11, fontFamily: FONTS.bold }}
                  buttonStyle={S.allButton}
                />
              </View>
            )}
          </View>
        </>
      )} */}
    </SafeContainer>
  );
};

export { ClientBirthdayReward };
