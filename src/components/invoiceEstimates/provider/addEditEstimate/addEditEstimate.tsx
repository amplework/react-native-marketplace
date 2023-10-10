import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { EditProducts } from 'components/settings/provider/editProducts';
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import RNlocalize from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import { Navigator } from 'service/navigator';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import SafeContainer from 'shared/container';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Alpha, Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { PdfPreview } from 'shared/pdfPreview';
import { Pressable } from 'shared/pressable';
import SubClientsModal from 'shared/subClientsModal';
import { TaxesList } from 'shared/taxesList';
import { Toggle } from 'shared/toggle';
import { getProviderProfile } from 'store/actions/provider';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { getProducts, productsSelectors } from 'store/entities/products';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { getTaxes, taxesSelectors } from 'store/entities/taxes';
import { isCloudImage } from 'types/invoices';
import { IProduct, ProductSnapshot } from 'types/products';
import { ISubClient } from 'types/subClients';
import { ITax } from 'types/taxes';
import { IProviderUser } from 'types/users';
import { splice } from 'utils/array';
import COLORS from 'utils/colors';
import { INVOICE_NOTES_KEY } from 'utils/constants';
import { countryCodes } from 'utils/countryCodes';
import { dateFormatWithoutTz, dateWithoutTz, days } from 'utils/dates';
import { isActiveTax } from 'utils/taxes';

import { AddEditProduct } from './components/addEditProduct';
import { AddEditQuickPayment } from './components/addEditQuickPayment';
import { ImagesList } from './components/imagesList';
import { ProductsList } from './components/productsList';
import { styles } from './style';
import { toast } from 'shared/toast';
import moment from 'moment-timezone';
import { isIOS } from 'utils/device';
import { CountryPicker } from 'shared/countryPicker';
import { closeCountryModal, openCountryModal, userSelectors } from 'store/entities/user';
import { subscriptionSelectors } from 'store/entities/subscription';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';
import { closeEstimatePreview, createEstimate, editEstimate, estimatesSelectors, previewEstimate } from 'store/entities/estimates';
import { alert } from 'shared/alert';
import { adaptEstimate } from 'components/invoiceEstimates/helpers/adapters';
import { EstimateImage, EstimateValues } from 'types/estimates';
import { validateEstimate } from 'components/invoiceEstimates/helpers/validation';
import { MAX_ESTIMATE_IMAGES } from 'components/invoiceEstimates/helpers/constants';
import { calculateEstimateBalance, calculateEstimateIncludedPayment, calculateEstimateTotal } from 'components/invoiceEstimates/helpers/utils';

type State = {
  provider: {
    provider: IProviderUser;
  };
};

type Props = StackScreenProps<RootStackParamList, 'AddEditEstimate'>;

const AddEditEstimate: React.FC<Props> = ({ navigation, route }) => {
  const { params = {} }: any = route;
  const isEdit = !!params?.estimate;
  const provider = useSelector((state: any) => state.provider.provider);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const locales = RNlocalize.getLocales()[0];

  const deviceCountryCode = locales.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == (provider?.countryCode || deviceCountryCode))[0];

  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const providerTimezone = provider?.address?.utctimezone;
  const providerOffset = provider?.utcOffset;
  const paymentMethods = useSelector(paymentMethodsSelectors.methods);
  const methodList = paymentMethods.filter((e: any) =>
    e?.isActive != false &&
      (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName))))
  const taxes = useSelector(taxesSelectors.taxes);
  const isEditProductModalOpened = useSelector(productsSelectors.isModalOpened);

  const pdf = useSelector(estimatesSelectors.pdf);
  const previewLoading = useSelector(estimatesSelectors.previewLoading);

  const loading = useSelector(estimatesSelectors.createLoading);
  const productsLoading = useSelector(productsSelectors.loading);
  const taxesLoading = useSelector(taxesSelectors.loading);
  const methodsLoading = useSelector(paymentMethodsSelectors.loading);

  const isAddressExist = (provider?.address?.location?.lat == null
    && provider?.address?.location?.lat == null)
    ? false : true

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;

  const [state, setState] = useState({
    isSubClientsModalOpened: false,
    isProductModalOpened: false,
    isTaxesOpened: false,
    isQuickPaymentModalOpened: false,
    selectedProductIndex: -1,
    dialCode: filterCountry.phonecode,
    isoCode: provider?.countryCode || deviceCountryCode,
    maxLength: 10
  })

  const [quickPaymentEnabled, setQuickPaymentEnabled] = useState(false)

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<EstimateValues>({
      initialValues: isEdit
        ? adaptEstimate(taxes)(params.estimate!)
        : {
          isNewClient: false,
          subClient: params.subClient || null,
          firstName: '',
          lastName: '',
          phoneNumber: '',
          countryCode: '',
          date: moment().toDate(),
          expDate: moment().add(30, 'days').toDate(),
          expectedPaymentMethodId: null,
          products: [],
          selectedTaxes: [],
          comments: '',
          notes: '',
          imageFiles: [],
          isEmailReceipt: false,
          email: '',
          payment: null,
        },
      validate: validateEstimate(methodList),
      validateOnChange: false,
      onSubmit: (estimateValues) => {
        if (!isAddressExist) {
          toast.info(t(translations.estimates.errors.timezoneError));
          return;
        }

        const newEstimate = {
          isNewClient: estimateValues.isNewClient,
          subClient: params.subClient || null,
          firstName: estimateValues.firstName,
          lastName: estimateValues.lastName,
          phoneNumber: `+${state.dialCode}-${estimateValues.phoneNumber}`,
          countryCode: state.isoCode,
          date: estimateValues.date,
          expDate: estimateValues.expDate,
          expectedPaymentMethodId: estimateValues.expectedPaymentMethodId,
          products: estimateValues.products,
          selectedTaxes: estimateValues.selectedTaxes,
          comments: estimateValues.comments,
          notes: estimateValues.notes,
          imageFiles: estimateValues.imageFiles,
          isEmailReceipt: estimateValues.isEmailReceipt,
          email: estimateValues.email,
          payment: estimateValues.payment,
        }

        if (estimateValues.isNewClient) {
          if (estimateValues.phoneNumber.length >= 2) {
            var data: any = phoneUtil.getExampleNumberForType(
              state.isoCode,
              PhoneNumberType.MOBILE,
            );

            if (data) {
              const number = phoneUtil.parseAndKeepRawInput(`${newEstimate?.phoneNumber}`, state.isoCode)
              let isValid = phoneUtil.isValidNumberForRegion(number, state.isoCode);

              let exNum = data.values_[2];
              if (isValid == true) {
                console.log('valid');

                // toast.info('')
              } else {
                toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
                return;
              }
            } else {
              console.log('valid');
            }

          } else {
            toast.info('Phone number is not valid')
            return;
          }
          if (!(newEstimate.phoneNumber).includes('-')) {
            toast.info('please add country code again');
            return;
          }
        }

        if (isEdit) {
          dispatch(
            editEstimate({
              id: params.estimate!.id,
              estimate: estimateValues,
              onSuccess: params.onEdit,
            }),
          );
        } else {
          dispatch(
            createEstimate({
              estimate: estimateValues.isNewClient ? newEstimate : estimateValues,
              onSuccess: () => { },
              // onSuccess: params.onCreate,
            }),
          )
          // console.log("log 6666 =======route?.params?.fromClientDetail=====>>>>>>>>> ", route?.params?.fromClientDetail);
          // route?.params?.fromClientDetail ? dispatch(
          //   createInvoiceForClient({
          //     invoice: invoiceValues.isNewClient ? newInvoice : invoiceValues,
          //     onSuccess: params.onCreate,
          //   }),
          // ) :
          //   dispatch(
          //     createEstimate({
          //       estimate: invoiceValues.isNewClient ? newInvoice : invoiceValues,
          //       onSuccess: () => { },
          //       // onSuccess: params.onCreate,
          //     }),
          //   )
        }
      },
    });

  const selectedProduct = values.products[state.selectedProductIndex];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={20}>
          {t(translations.estimates.details)}
        </Paragraph>
      ),
      headerRight: () => (
        <Icon
          src={require('assets/global/close.png')}
          onPress={Navigator.goBack}
          mr={20}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getSubClients());
    dispatch(getProducts());
    dispatch(getTaxes());
    dispatch(getPaymentMethods());
    dispatch(getProviderProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      return;
    }

    const selectedTaxes = taxes.filter(
      (tax) => isActiveTax(tax) && tax.shouldApplyToTransactions,
    );

    setFieldValue('selectedTaxes', selectedTaxes);
  }, [setFieldValue, taxes, isEdit]);

  useEffect(() => {
    if (isEdit || !provider?.estimateNotes) {
      return;
    }

    setFieldValue('notes', provider.estimateNotes);
  }, [provider, isEdit, setFieldValue]);

  useEffect(() => {
    const email = values.isNewClient ? '' : values.subClient?.email || '';

    setFieldValue('email', email);
  }, [setFieldValue, values.isNewClient]);

  const handleChange =
    <F extends keyof EstimateValues>(field: F) =>
      (value: EstimateValues[F]) =>
        setFieldValue(field, value);

  const selectSubClient = (client: ISubClient) => {
    setFieldValue('subClient', client);
    setFieldValue('email', client.email || '');
  };

  const openSubClientsModal = () => setState(prev => ({ ...prev, isSubClientsModalOpened: true }));

  const openAddProductModal = () => setState(prev => ({ ...prev, isProductModalOpened: true }));

  const closeAddProductModal = () => {
    setState(prev => ({ ...prev, isProductModalOpened: false, selectedProductIndex: -1 }));
  };

  const toggleQuickPaymentModal = () => {
    if (quickPaymentEnabled) {
      toast.info('You cannot add quick payment if the online payment option is enabled');
    } else {
      setState(prev => ({ ...prev, isQuickPaymentModalOpened: !state.isQuickPaymentModalOpened }));
    }
  }

  const handleDateChange = (date: Date) => {
    setFieldValue('date', date);
    setFieldValue('expDate', moment(date).add(30, 'days').toDate());
  };

  const addProduct = (product: ProductSnapshot | any) =>
    setFieldValue('products', [...values.products, product]);

  const editProduct = (product: ProductSnapshot) => {
    const newProducts = splice(
      state.selectedProductIndex,
      1,
      product,
    )(values.products);

    setFieldValue('products', newProducts);
  };

  const handleProductPress = (index: number) => () => {
    openAddProductModal();
    setState(prev => ({ ...prev, selectedProductIndex: index }));
  };

  const handleRemoveProduct = (productIndex: number) => () => {
    const newProducts = values.products.filter(
      (_, index) => index !== productIndex,
    );

    setFieldValue('products', newProducts);
  };

  const selectTax = (tax: ITax) =>
    setFieldValue('selectedTaxes', [...values.selectedTaxes, tax]);

  const deselectTax = (tax: ITax) => {
    const newTaxes = values.selectedTaxes.filter(({ id }) => id !== tax.id);

    setFieldValue('selectedTaxes', newTaxes);
  };

  const toggleSelectTax = (tax: ITax) => () => {
    const selected = values.selectedTaxes.some(({ id }) => id === tax.id);

    return selected ? deselectTax(tax) : selectTax(tax);
  };

  const takeImage = async () => {
    const image = await ImagePicker.openCamera({ compressImageQuality: 0.3 });

    setFieldValue('imageFiles', [...values.imageFiles, image]);
  };

  const cancleImage = () => { };

  const pickImages = async () => {
    const pickedImages = await ImagePicker.openPicker({
      compressImageQuality: 0.3,
      multiple: true,
      maxFiles: MAX_ESTIMATE_IMAGES - values.imageFiles.length,
    });

    const imageFiles = [...values.imageFiles, ...pickedImages];

    if (imageFiles.length > MAX_ESTIMATE_IMAGES) {
      Alert.alert(
        t(translations.common.warning),
        t(translations.estimates.errors.maxImages),
      );
    }

    setFieldValue('imageFiles', imageFiles.slice(0, MAX_ESTIMATE_IMAGES));
  };

  const addImages = () => {
    Alert.alert(
      t(translations.estimates.chooseMethod),
      t(translations.estimates.chooseMethodMessage),
      [
        { text: t(translations.estimates.camera), onPress: takeImage },
        { text: t(translations.estimates.library), onPress: pickImages },
        { text: t(translations.estimates.cancle), onPress: cancleImage },
      ],
    );
  };

  const removeImage = (image: EstimateImage) => () => {
    const id = isCloudImage(image) ? image.id : image.path;
    const imageFiles = values.imageFiles.filter((file) =>
      isCloudImage(file) ? file.id !== id : file.path !== id,
    );

    setFieldValue('imageFiles', imageFiles);
  };

  const createProduct = ({ id, name, price, isActive }: IProduct) => {
    if (isActive) {
      addProduct({ id, name, price, quantity: 1 });
    }
  };

  const showNotesHint = async () => {
    const isHintShown = await AsyncStorage.getItem(INVOICE_NOTES_KEY);

    if (!isHintShown) {
      Alert.alert(t(translations.estimates.notesHint));

      await AsyncStorage.setItem(INVOICE_NOTES_KEY, 'true');
    }
  };

  const handlePreviewEstimate = () => dispatch(previewEstimate(values));

  const handleClosePreview = () => dispatch(closeEstimatePreview());

  const activeSubClients = subClients.filter((client) => client.isActive);
  const mappedSubClients = activeSubClients.map((client) => ({
    ...client,
    value: client.firstName,
  }));
  const includedPayment = calculateEstimateIncludedPayment(values);
  const balance = calculateEstimateBalance(values);

  const estimateDate = dateWithoutTz(values.date, providerOffset);
  const estimateExpDate = dateWithoutTz(values.expDate, providerOffset);

  return (
    <SafeContainer containerStyle={styles.container}>
      <Loader loading={productsLoading || taxesLoading || methodsLoading || subClientsLoading} />
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setState((prev: any) => ({ ...prev, isoCode: value.countryCode, dialCode: value.dialCode }))
              dispatch(closeCountryModal());
            }}
          />
        )
      }
      <PdfPreview
        visible={!!pdf}
        pdfUrl={pdf}
        title="Estimate preview"
        onClose={handleClosePreview}
      />
      <SubClientsModal
        subClients={mappedSubClients}
        onModalShow={() => setState(prev => ({ ...prev, isSubClientsModalOpened: false }))}
        showModal={state.isSubClientsModalOpened}
        onChangeSelectedClient={selectSubClient}
      />
      {state.isProductModalOpened && (
        <AddEditProduct
          product={selectedProduct}
          onSubmit={selectedProduct ? editProduct : addProduct}
          onClose={closeAddProductModal}
        />
      )}
      {state.isQuickPaymentModalOpened && (
        <AddEditQuickPayment
          payment={values.payment}
          estimateTotal={calculateEstimateTotal(values)}
          onSubmit={handleChange('payment')}
          onClose={toggleQuickPaymentModal}
        />
      )}
      {isEditProductModalOpened && <EditProducts onCreate={createProduct} />}
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.scrollView}
      >
        {!isEdit && (
          <View style={styles.section}>
            <Box row jc="space-between" ai="center">
              <Paragraph size="s" type="book">
                {t(translations.estimates.fields.newClient)}
              </Paragraph>
              <Toggle
                checked={values.isNewClient}
                onChange={handleChange('isNewClient')}
              />
            </Box>
          </View>
        )}
        {values.isNewClient ? (
          <Box mb={20}>
            <Box row jc="space-between" mb={20}>
              <Field
                value={values.firstName}
                label={t(translations.estimates.fields.firstName)}
                onChange={handleChange('firstName')}
                error={errors.firstName}
                required
                w="48%"
              />
              <Field
                value={values.lastName}
                label={t(translations.estimates.fields.lastName)}
                onChange={handleChange('lastName')}
                error={errors.lastName}
                required
                w="48%"
              />
            </Box>
            <Pressable mb={10} onPress={() => dispatch(openCountryModal())}>
              <Text numberOfLines={1} style={[styles.input, {
                color: 'black',
                borderColor: COLORS.whiteGray,
              }]}>
                {`${state.isoCode} (+${state.dialCode || filterCountry.phonecode})`}
              </Text>
            </Pressable>
            <Field
              value={values.phoneNumber}
              label={t(translations.estimates.fields.phoneNumber)}
              onChange={handleChange('phoneNumber')}
              mt={10}
              error={errors.phoneNumber}
              keyboardType="phone-pad"
              maxLength={13}
              required
            />
          </Box>
        ) : (
          <>
            <TouchableOpacity
              onPress={openSubClientsModal}
              style={styles.section}
              disabled={isEdit}
            >
              <Box row jc="space-between" ai="center">
                {values.subClient ? (
                  <Box row ai="center">
                    <Avatar src={values.subClient.photo} size={40} mr={12} />
                    <Paragraph>
                      {values.subClient.firstName} {values.subClient.lastName}
                    </Paragraph>
                    {values.subClient.isConnected && <Alpha />}
                  </Box>
                ) : (
                  <Paragraph size="s" type="book">
                    {t(translations.estimates.selectClient)}
                  </Paragraph>
                )}
                {!isEdit && (
                  <Icon
                    src={require('assets/global/arrowDown.png')}
                    size={20}
                  />
                )}
              </Box>
            </TouchableOpacity>
            {!!errors.subClient && (
              <Paragraph
                size="xs"
                type="book"
                color={COLORS.orangeRed}
                mt={-16}
                mb={20}
              >
                {errors.subClient}
              </Paragraph>
            )}
          </>
        )}
        {
          isEdit ? (
            <Box row jc="space-between" mb={20}>
              <Datepicker
                flex
                editable
                timeZoneOffset={0}
                title={isIOS ? dateFormatWithoutTz(estimateDate) :
                  moment(values.date, 'YYYY-MM-DD').format('Do MMM YYYY')}
                label={t(translations.estimates.fields.date)}
                required
                mode="date"
                date={moment(values.date).toDate()}
                onConfirm={handleDateChange}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
              <Datepicker
                flex
                editable
                timeZoneOffset={0}
                title={isIOS ? dateFormatWithoutTz(estimateExpDate) :
                  moment(values.expDate, 'YYYY-MM-DD').format('Do MMM YYYY')}
                label={t(translations.estimates.fields.expDate)}
                required
                mode="date"
                date={moment(values.expDate).toDate()}
                // minimumDate={values.date}
                onConfirm={handleChange('expDate')}
                icon={require('assets/global/calendar.png')}
              />
            </Box>
          ) : (
            <Box row jc="space-between" mb={20}>
              <Datepicker
                flex
                editable
                timeZoneOffset={providerOffset}
                title={moment.tz(values.date, providerTimezone).format('Do MMM YYYY')}
                label={t(translations.estimates.fields.date)}
                required
                mode="date"
                date={moment(values.date).toDate()}
                onConfirm={handleDateChange}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
              <Datepicker
                flex
                editable
                timeZoneOffset={providerOffset}
                title={moment.tz(values.expDate, providerTimezone).format('Do MMM YYYY')}
                label={t(translations.estimates.fields.expDate)}
                required
                mode="date"
                date={moment(values.expDate).toDate()}
                // minimumDate={values.date}
                onConfirm={handleChange('expDate')}
                icon={require('assets/global/calendar.png')}
              />
            </Box>
          )
        }
        <DropMenu
          items={methodList.map((method) => ({
            label: method.shortName,
            inputLabel: t(
              translations.estimates.fields.expectedPaymentMethod.label,
              {
                method: method.shortName,
              },
            ),
            value: method.id,
          }))}
          value={values.expectedPaymentMethodId}
          onChange={(value) => {
            let paymentMethod = methodList?.find((e) => e?.id == value)

            handleChange('expectedPaymentMethodId')(value)

            if (isOnlinePaymentOption(paymentMethod?.description!) || isOnlinePaymentOption(paymentMethod?.shortName!)) {
              setQuickPaymentEnabled(true)
              handleChange('payment')(null)
            } else {
              setQuickPaymentEnabled(false)
            }
          }}
          placeholder={t(
            translations.estimates.fields.expectedPaymentMethod.placeholder,
          )}
          mt={-16}
          mb={20}
          error={errors.expectedPaymentMethodId}
        />
        <Paragraph size="s" type="book" mb={12}>
          {t(translations.estimates.serviceDetails)}
        </Paragraph>
        {!!values.products.length && (
          <ProductsList
            data={values.products}
            onPress={handleProductPress}
            onDelete={handleRemoveProduct}
          />
        )}
        <Button
          text={t(translations.estimates.addService)}
          image={require('assets/global/plus.png')}
          onPress={openAddProductModal}
          buttonStyle={styles.addButton}
          textStyle={styles.buttonText}
        />
        {!!errors.products && (
          <Paragraph
            size="xs"
            type="book"
            color={COLORS.orangeRed}
            mt={-16}
            mb={20}
          >
            {errors.products}
          </Paragraph>
        )}
        {!!taxes.length && (
          <TouchableOpacity
            onPress={() => setState(prev => ({ ...prev, isTaxesOpened: !state.isTaxesOpened }))}
            style={styles.setupTaxesButton}
          >
            <Paragraph size="s" color={COLORS.clearBlue}>
              {t(translations.estimates.setupTaxes)}
            </Paragraph>
          </TouchableOpacity>
        )}
        {state.isTaxesOpened && (
          <>
            <Paragraph size="s" type="book" mb={20}>
              {t(translations.estimates.taxesLegend)}
            </Paragraph>
            <TaxesList
              data={taxes}
              selectedTaxes={values.selectedTaxes}
              onPress={toggleSelectTax}
            />
          </>
        )}
        <Field
          value={values.comments}
          label={t(translations.estimates.fields.comments)}
          onChange={handleChange('comments')}
          error={errors.comments}
          size="xl"
          multiline
          mb={20}
        />
        <Field
          value={values.notes}
          label={t(translations.estimates.fields.notes)}
          onChange={handleChange('notes')}
          onFocus={showNotesHint}
          error={errors.notes}
          size="xl"
          multiline
          mb={20}
        />
        <ImagesList
          data={values.imageFiles}
          onPick={addImages}
          onRemove={removeImage}
        />
        <CheckBox
          checked={values.isEmailReceipt}
          onChange={handleChange('isEmailReceipt')}
          label={t(translations.estimates.fields.sendEstimate)}
          styleContainer={styles.checkbox}
          styleLabel={styles.textPrimary}
        />
        {values.isEmailReceipt && (
          <>
            {(!(values.subClient?.isConnected && !values.subClient?.isDisconnect) || values.isNewClient) && (
              <Field
                value={values.email}
                label={t(translations.estimates.fields.email)}
                onChange={handleChange('email')}
                error={errors.email}
                keyboardType="email-address"
                required
                mb={12}
              />
            )}
            <Pressable row onPress={handlePreviewEstimate} ai="center" mb={20}>
              <Paragraph size="s" color={COLORS.clearBlue} mr={8}>
                {t(translations.estimates.previewEstimate)}
              </Paragraph>
              {previewLoading && (
                <ActivityIndicator color={COLORS.clearBlue} />
              )}
            </Pressable>
          </>
        )}
        {!isEdit && (
          <Button
            text={t(translations.estimates.depositPayment)}
            onPress={toggleQuickPaymentModal}
            buttonStyle={styles.addButton}
            textStyle={styles.buttonText}
          />
        )}
        {!!errors.payment && (
          <Paragraph
            size="xs"
            type="book"
            color={COLORS.orangeRed}
            mt={-16}
            mb={20}
          >
            {errors.payment}
          </Paragraph>
        )}
        <TwinCounter bordered>
          <TwinCounterBar
            label={t(translations.estimates.includedPayment)}
            adornment={<Sign>$</Sign>}
          >
            {includedPayment.toFixed(2)}
          </TwinCounterBar>
          <TwinCounterBar
            label={t(translations.estimates.estimateBalance)}
            adornment={<Sign>$</Sign>}
          >
            {balance.toFixed(2)}
          </TwinCounterBar>
        </TwinCounter>
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Button
          text={t(translations.estimates.save)}

          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeContainer>
  );
};

export { AddEditEstimate };