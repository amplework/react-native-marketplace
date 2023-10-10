import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from 'theme';
import { ClientLoyaltyRewardStyles as S } from './style';
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
import { DaysPicker } from 'shared/datepicker';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import I18n, { translations } from 'locales';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { validateClientLoyaltyReward } from 'components/settings/helpers/validation';
import {
  formatClientLoyaltyRewardParameters,
  adaptClientLoyaltyReward,
} from 'components/settings/helpers/adapters';
import {
  REWARD_TYPE_DATA,
  REWARD_FOR_DATA,
  REWARD_REASON_DATA,
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
import COLORS from 'utils/colors';
import { Separator } from 'shared/separator';
import FONTS from 'utils/fonts';
import { isIOS } from 'utils/device';
import { toast } from 'shared/toast';

const ClientLoyaltyReward: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const clientLoyaltyReward = useSelector(clientRewardSelectors.clientLoyaltyReward);
  const socialLoading = useSelector((state: any) => state.social.loading);
  const loading = useSelector(clientRewardSelectors.loading);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.loyaltyOptionsLinks.editLoyaltyReward)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    handleFieldChange('rewardReason')({ id: 1, name: 'total money spent' })
  }, []);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getClientReward({ type: 'loyalty' }));
  }, [dispatch]);

  const [myProducts, setMyProducts] = useState<any>({
    services: [],
    items: []
  });

  const [showModal, setShowModal] = useState(false);
  const [feed, setFeed] = useState('');

  const products = useSelector(productsSelectors.products);

  const openSocialModal = () => setShowModal(true);

  const closeSocialModal = () => setShowModal(false);

  const weekDays = ["saturday", "sunday", "monday", "tuesday", "friday", "thursday", "wednesday"];

  useEffect(() => {
    if (products) {
      setMyProducts((prev: any) => ({
        ...prev,
        services: products?.filter((item: any) => item.type == 'service' && item.isActive == true) ?? [],
        items: products?.filter((item: any) => item.type == 'item' && item.isActive == true) ?? []
      }))
    }
  }, [products]);

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
      rewardReason: null,
      rewardAfterSpending: '',
      rewardAfterCompleting: '',
      rewardType: null,
      rewardFor: null,
      isAnyServices: false,
      services: [],
      isAnyItems: false,
      sItems: [],
      discountAmount: '',
      discountRate: '',
      cannotUseWithOtherSpecial: true,
      dayRestriction: true,
      restrictedDays: [],
    },
    validate: validateClientLoyaltyReward(myProducts),
    validateOnChange: false,

    onSubmit: (clientLoyaltyRewardVal: any) => {
      if (clientLoyaltyRewardVal.dayRestriction && !clientLoyaltyRewardVal.restrictedDays.length) {
        toast.info('Please select atleast a week day if you have enabled the day restriction field.');
        return;
      }

      if (clientLoyaltyReward) {
        alert.editing({
          entity: t(translations.common.entities.clientLoyaltyReward),
          onEdit: () => dispatch(updateClientReward(formatClientLoyaltyRewardParameters({ ...clientLoyaltyRewardVal, id: clientLoyaltyReward.id, type: 'loyalty' }))),
        });
      } else {
        alert.creation({
          entity: t(translations.common.entities.clientLoyaltyReward),
          onCreate: () => dispatch(addClientReward(formatClientLoyaltyRewardParameters({ ...clientLoyaltyRewardVal, type: 'loyalty' })))
        });
      }
    },
  });

  useEffect(() => {
    if (clientLoyaltyReward) {
      setValues(adaptClientLoyaltyReward(clientLoyaltyReward));
    }
  }, [clientLoyaltyReward, setValues]);

  useEffect(() => {
    if (clientLoyaltyReward && myProducts) {
      clientLoyaltyReward.services?.length == myProducts.services?.length && handleToggle('isAnyServices')(true)
      clientLoyaltyReward.items?.length == myProducts.items?.length && handleToggle('isAnyItems')(true)
    }
  }, [clientLoyaltyReward, myProducts]);

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

  const onChangeRewardReason = (val: any) => {
    handleFieldChange('rewardReason')(val)
    if (clientLoyaltyReward && (clientLoyaltyReward?.rewardReason == val?.name)) {
      handleFieldChange('rewardAfterSpending')(clientLoyaltyReward?.rewardSpending?.toString() ?? '')
      handleFieldChange('rewardAfterCompleting')(clientLoyaltyReward?.rewardAfterCompleting?.toString() ?? '')
    } else {
      handleFieldChange('rewardAfterSpending')('')
      handleFieldChange('rewardAfterCompleting')('')
    }
  }

  const onChangeRewardType = (val: any) => {
    handleFieldChange('rewardType')(val)
    if (clientLoyaltyReward && (clientLoyaltyReward?.rewardType == val?.name)) {
      handleFieldChange('discountAmount')(clientLoyaltyReward?.discount?.toString() ?? '')
      handleFieldChange('discountRate')(clientLoyaltyReward?.discountRate?.toString() ?? '')
    } else {
      handleFieldChange('discountAmount')('')
      handleFieldChange('discountRate')('')
    }
  }

  const onChangeRewardFor = (val: any) => {
    handleFieldChange('rewardFor')(val)
    if (clientLoyaltyReward && (clientLoyaltyReward?.rewardFor == val?.name)) {
      if (clientLoyaltyReward?.rewardFor == "services") {
        handleToggle('isAnyItems')(false)
        handleFieldChange('sItems')([])
        handleToggle('isAnyServices')(clientLoyaltyReward?.services?.length == myProducts?.services?.length)
        handleFieldChange('services')([...clientLoyaltyReward?.services])
      } else {
        handleToggle('isAnyServices')(false)
        handleFieldChange('services')([])
        handleToggle('isAnyItems')(clientLoyaltyReward?.items?.length == myProducts?.items?.length)
        handleFieldChange('sItems')([...clientLoyaltyReward?.items])
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
      <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={isIOS ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={S.content} style={S.scrollView}>
          <Box flex pr={32} pl={32}>
            <View style={S.activeContainer}>
              <Paragraph size="s" type="book">
                {I18n.t('clientLoyaltyReward.placeholders.active')}
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
              label={I18n.t('clientLoyaltyReward.placeholders.description')}
              multiline
              numberOfLines={5}
              size="xl"
              mt={16}
            />
            <DropMenu
              items={REWARD_REASON_DATA}
              value={values.rewardReason}
              onChange={(val: any) => onChangeRewardReason(val)}
              placeholder={I18n.t('clientLoyaltyReward.placeholders.rewardReason')}
              placeholderValue={null}
              error={errors.rewardReason}
            />
            {values.rewardReason?.['id'] == 1 ? (
              <Field
                value={values.rewardAfterSpending}
                onChange={handleFieldChange('rewardAfterSpending')}
                error={errors.rewardAfterSpending}
                label={I18n.t('clientLoyaltyReward.placeholders.rewardAfterSpending')}
                keyboardType="numeric"
                mt={16}
              />
            ) : values.rewardReason?.['id'] == 2 && (
              <Field
                value={values.rewardAfterCompleting}
                onChange={handleFieldChange('rewardAfterCompleting')}
                error={errors.rewardAfterCompleting}
                label={I18n.t('clientLoyaltyReward.placeholders.rewardAfterCompleting')}
                keyboardType="numeric"
                mt={16}
              />
            )}
            <DropMenu
              items={REWARD_TYPE_DATA}
              value={values.rewardType}
              onChange={(val: any) => onChangeRewardType(val)}
              placeholder={I18n.t('clientLoyaltyReward.placeholders.rewardType')}
              placeholderValue={null}
              error={errors.rewardType}
            />
            <DropMenu
              items={REWARD_FOR_DATA}
              value={values.rewardFor}
              onChange={(val: any) => onChangeRewardFor(val)}
              placeholder={I18n.t('clientLoyaltyReward.placeholders.rewardFor')}
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
                  numColumns={2}
                  data={myProducts.services}
                  keyExtractor={(item) => `${item.id}`}
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
            {(values.rewardType?.['id'] && !_.isEmpty(values.rewardType)) && values.rewardType?.['id'] == '1' ? (
              <Field
                value={values.discountAmount.toString()}
                onChange={handleFieldChange('discountAmount')}
                error={errors.discountAmount}
                label={I18n.t('clientLoyaltyReward.placeholders.discountAmount')}
                keyboardType="numeric"
                mt={16}
              />
            ) : values.rewardType?.['id'] == '2' && (
              <Field
                value={values.discountRate.toString()}
                onChange={handleFieldChange('discountRate')}
                error={errors.discountRate}
                label={I18n.t('clientLoyaltyReward.placeholders.discountRate')}
                keyboardType="numeric"
                mt={16}
              />
            )}
            <CheckBox
              checked={values.cannotUseWithOtherSpecial}
              onChange={handleToggle('cannotUseWithOtherSpecial')}
              label={I18n.t('clientLoyaltyReward.placeholders.cannotUseWithOtherSpecial')}
              styleLabel={S.textPrimary}
              styleContainer={S.checkBoxPosition}
            />
            <CheckBox
              checked={values.dayRestriction}
              onChange={(checked: boolean) => {
                handleToggle('dayRestriction')(checked)
                handleFieldChange('restrictedDays')(checked ? weekDays : [])
              }}
              label={I18n.t('clientLoyaltyReward.placeholders.dayRestriction')}
              styleLabel={S.textPrimary}
              styleContainer={S.checkBoxPosition}
            />
          </Box>
          {values.dayRestriction && (
            <Box mv={16}>
              <DaysPicker
                days={values.restrictedDays}
                onChange={handleFieldChange('restrictedDays')}
              />
            </Box>
          )}
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

export { ClientLoyaltyReward };
