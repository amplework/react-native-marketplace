import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsApi } from 'api/products';
import { SalesApi } from 'api/sales';
import { EditProducts } from 'components/settings/provider/editProducts';
import I18n, { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import RNlocalize from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import { alert } from 'shared/alert';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker } from 'shared/datepicker';
import { Description } from 'shared/description';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { PdfPreview } from 'shared/pdfPreview';
import ScrollContainer from 'shared/scrollContainer';
import SubClientsModal from 'shared/subClientsModal';
import { TaxesList } from 'shared/taxesList';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import { closeEditModal, openEditModal } from 'store/entities/products';
import { getProducts, productsSelectors } from 'store/entities/products';
import { createSale, salesSelectors, updateSale } from 'store/entities/sales';
import { getSubClients, getSubClient, subClientsSelectors } from 'store/entities/subClients';
import { getTaxes, taxesSelectors } from 'store/entities/taxes';
import { ProductValues } from 'types/products';
import { ITax } from 'types/taxes';
import COLORS from 'utils/colors';
import { dateWithoutTz, dateFormatWithoutTz } from 'utils/dates';
import REGEX from 'utils/regex';
import { isActiveTax } from 'utils/taxes';

import { LABELS } from './helpers/labels';
import { DiscountType, TIP_DISCOUNT, getSaleTotal, getSaleTotalWithDiscount, getSaleTotalWithReward, hasProduct } from './helpers/utils';
import styles from './style';
import { countryCodes } from 'utils/countryCodes';
import moment from 'moment-timezone';
import { CountryPicker } from 'shared/countryPicker';
import { closeCountryModal, userSelectors, openCountryModal } from 'store/entities/user';
import { Pressable } from 'shared/pressable';
import { Box } from 'shared/box';

import {
  openSalesDetailModal,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  ProviderSalesSpecialDetails,
} from 'components/salesSpecialDetails/provider/salesSpecialDetails';
import { Paragraph } from 'shared/paragraph';
import _ from 'lodash';
import { subscriptionSelectors } from 'store/entities/subscription';
import { getPaymentIcon, isOnlinePaymentOption } from 'utils/onlinePaymentOptions';
import { digitsAfterDecimal } from 'utils/numbers';
import { Radio } from 'shared/radio';
import { isSmallDevice } from 'utils/device';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const AddSale: React.FC<Props> = ({ navigation, route }) => {
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const isDetailsModalOpened = useSelector(salesSpecialSelectors.isSalesDetailModalOpened);
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const providerOffset = providerDetails?.utcOffset;
  const providerTimezone = providerDetails?.address?.utctimezone;
  const methods = useSelector(paymentMethodsSelectors.methods);
  const methodList = methods.filter((e: any) =>
    e.isActive != false &&
      (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName))));
  const subClient = useSelector(subClientsSelectors.subClient);
  const subClients = useSelector(subClientsSelectors.subClients);
  const subClientsLoading = useSelector(subClientsSelectors.loading);
  const products: any = useSelector(productsSelectors.products);
  const methodsLoading = useSelector(paymentMethodsSelectors.loading);
  const productsLoading = useSelector(productsSelectors.loading);
  const taxes = useSelector(taxesSelectors.taxes);
  const taxesLoading = useSelector(taxesSelectors.loading);
  const isModalOpened = useSelector(productsSelectors.isModalOpened);
  const sale = useSelector(salesSelectors.sale);
  const loading = useSelector(salesSelectors.loading);
  const locales = RNlocalize.getLocales()[0];

  const isAddressExist = (providerDetails?.address?.location?.lat == null
    && providerDetails?.address?.location?.lat == null)
    ? false : true;

  const deviceCountryCode = locales.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == (providerDetails?.countryCode || deviceCountryCode))[0];

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isEditSale = route?.params?.saleId;
  const isFromAppointment = route?.params?.isFromAppointment;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.imageSearch}
            source={require('assets/global/close.png')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Text style={styles.titleLeftStyle}>{LABELS.backTitle}</Text>
      ),
    });
  }, [navigation]);

  const [rewardModalState, setRewardModalState] = useState<any>({
    allAvailableRewards: [],
    applicableRewards: [],
    isVisible: false,
    saleData: null,
    rewardData: null,
  });

  const [state, setState] = useState<any>({
    salesSpecial: [],
    noClientDetails: !!(isEditSale && !sale?.clientSubprofile),
    newClient: false,
    paymentReceived: isEditSale ? sale?.isPaymentReceived : true,
    showModal: false,
    showModalService: false,
    paymentMethodId: isEditSale ? sale?.paymentMethod?.id : undefined,
    firstName: '',
    lastName: '',
    clientEmail: isEditSale
      ? sale?.emailRecipient || sale?.clientSubprofile?.email || ''
      : route?.params?.client?.email || '',
    clientEmailError: '',
    dialCode: filterCountry.phonecode,
    countryCode: providerDetails?.countryCode || deviceCountryCode,
    phoneNumber: '',
    editSaleDate: isEditSale ? dateWithoutTz(sale?.date, providerOffset) : moment().toDate(),
    date: isFromAppointment ?
      moment(route?.params?.fromDate).toDate() :
      moment().toDate(),
    firstNameError: '',
    lastNameError: '',
    phoneError: '',
    priceError: '',
    price: '',
    quantitySold: '1',
    isEdit: false,
    isEditIndex: 0,
    activeTypeService: 'service',
    selectedServiceId: undefined,
    clients: subClients,
    servicesArray: isEditSale
      ? sale?.entitiesSnapshot?.products
        ?.filter((item: any) => !item.isQuickSection)
        ?.map((item: any) => ({
          productId: item?.id,
          price: item?.price,
          quantity: item?.quantity,
          name: item?.name,
          type: item?.type || 'service',
        }))
      : (isFromAppointment ? route?.params?.productArray : []),
    quickItemsArray: [],
    selectedClient: isEditSale ? sale?.clientSubprofile : route?.params?.client || undefined,
    nameQuickItem: '',
    quantityQuickItem: '1',
    isEditQuickItem: false,
    isEditQuickItemIndex: 0,
    showModalQuickItem: false,
    priceQuickItem: '',
    showAllTaxes: false,
    selectedTaxes: [],
    enableEmailReceipt: (isEditSale && sale?.emailRecipient) || false,
    saleTotal: sale?.total || 0,
    showPDF: false,
    pdfURL: '',
    maxLength: 10,
    allAvailableRewards: [],
    applicableRewards: [],
    isVisible: false,
    saleData: null,
    rewardData: null,
    hidePaymentReceived: false,
    enablePackage: false,
    extended: false,
    tipAmount: sale?.tipAmount || 0,
    discountAmount: sale?.discountAmount || 0,
    selectedDiscount: null,
    customDiscount: 0,
    selectedTip: null,
    customTip: 0,
    extendedPayment: false,
  })

  const { salesSpecial, noClientDetails, newClient, paymentReceived, showModal, showModalService, paymentMethodId,
    firstName, lastName, clientEmail, clientEmailError, dialCode, countryCode, phoneNumber, editSaleDate,
    date, firstNameError, lastNameError, phoneError, priceError, price, quantitySold, isEdit, isEditIndex,
    activeTypeService, selectedServiceId, clients, servicesArray, quickItemsArray, selectedClient, discountAmount, customDiscount, customTip,
    quantityQuickItem, isEditQuickItemIndex, showModalQuickItem, priceQuickItem, showAllTaxes, selectedTaxes, extendedPayment, tipAmount,
    enableEmailReceipt, saleTotal, showPDF, pdfURL, hidePaymentReceived, extended, selectedDiscount, selectedTip
  } = state;

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;

  useEffect(() => {
    const modifyArray = subClients
      ?.filter((client: any) => client?.isActive)
      ?.map((contact: any) => ({
        ...contact,
        value: contact?.firstName || LABELS.noName,
      }));
    setState((prev: any) => ({
      ...prev, clients: modifyArray
    }))
  }, [subClients]);

  const findProduct = (item: any) =>
    sale?.entitiesSnapshot?.products
      ?.filter((aService: any) => aService.isQuickSection)
      ?.find((quickItem: any) => quickItem.id === item.id);

  const findSelected = (item: any) =>
    quickItemsArray?.find((quickItem: any) => quickItem.id === item.id);

  const onAddTip = (item: DiscountType) => {
    const isQuickItemSelected = quickItemsArray?.find((e: any) => e.isSelected);
    if (servicesArray?.length || isQuickItemSelected) {
      setState((prev: any) => ({
        ...prev,
        selectedTip: item,
      }));
    } else {
      alert.info('Please select atleast one service or item first.');
      return;
    }
  };

  const onLessDicount = (item: DiscountType) => {
    const isQuickItemSelected = quickItemsArray?.find((e: any) => e.isSelected);
    if (servicesArray?.length || isQuickItemSelected) {
      setState((prev: any) => ({
        ...prev,
        selectedDiscount: item,
      }));
    } else {
      alert.info('Please select atleast one service or item first.');
      return;
    }
  };

  useEffect(() => {
    const filter = products
      ?.filter((service: any) => service.isQuickSale && service.isActive)
      ?.map((item: any) => ({
        ...item,
        price: isEditSale
          ? findSelected(item)?.price || findProduct(item)?.price || item.price
          : findSelected(item)?.price || item.price,
        quantity: isEditSale
          ? findSelected(item)?.quantity || findProduct(item)?.quantity || 1
          : findSelected(item)?.quantity || 1,
        isSelected: isEditSale
          ? findSelected(item)?.isSelected || findProduct(item) || false
          : findSelected(item)?.isSelected || false,
      }));

    setState((prev: any) => ({
      ...prev,
      quickItemsArray: filter
    }))
  }, [products]);

  useEffect(() => {
    setState((prev: any) => ({
      ...prev,
      noClientDetails: route?.params?.noClient ? true : false
    }));
  }, [route?.params]);

  useEffect(() => {
    const defaultSelectedTaxes = taxes.filter((tax) =>
      isEditSale
        ? sale?.entitiesSnapshot?.taxes?.find(
          (saleTax) => tax.id === saleTax.id,
        )
        : isActiveTax(tax) && tax.shouldApplyToTransactions,
    );

    setState((prev: any) => ({
      ...prev,
      selectedTaxes: defaultSelectedTaxes
    }))
  }, [taxes]);

  useEffect(() => {
    const newSaleTotal: any = getSaleTotal(
      selectedDiscount?.value,
      selectedTaxes,
      servicesArray,
      quickItemsArray,
    );

    setState((prev: any) => ({
      ...prev,
      saleTotal: newSaleTotal?.newTotal,
      discountAmount: newSaleTotal?.totalDiscount
    }));
  }, [selectedTaxes, quickItemsArray, servicesArray, selectedDiscount]);

  useEffect(() => {
    const newSaleTotal: any = getSaleTotalWithDiscount(
      customDiscount,
      selectedTaxes,
      servicesArray,
      quickItemsArray,
    );

    setState((prev: any) => ({
      ...prev,
      saleTotal: newSaleTotal,
      discountAmount: customDiscount,
    }));
  }, [selectedTaxes, quickItemsArray, servicesArray, customDiscount]);

  useEffect(() => {
    const newSaleTotal = getSaleTotalWithReward(
      selectedTaxes,
      servicesArray,
      quickItemsArray,
      rewardModalState?.rewardData?.rewardsId,
      rewardModalState?.rewardData,
    );

    setState((prev: any) => ({
      ...prev,
      saleTotal: newSaleTotal
    }));
  }, [selectedTaxes, quickItemsArray, servicesArray, rewardModalState?.rewardData]);

  useEffect(() => {
    //@ts-ignore
    dispatch(getSubClients({ query: '' }));
    dispatch(getProducts());
    dispatch(getTaxes());
    dispatch(getPaymentMethods({ isActive: true }));
  }, [dispatch]);

  useEffect(() => {
    if (isEditSale || !methods.length) {
      return;
    }

    const cash = methods.find((method) => method.shortName === 'Cash');

    setState((prev: any) => ({
      ...prev,
      paymentMethodId: cash ? cash.id : methods[0].id
    }))
  }, [isEditSale, methods]);

  useEffect(() => {
    if (selectedClient) {
      dispatch(getSubClient(selectedClient?.id))
    }
  }, [selectedClient])

  useEffect(() => {
    if (subClient) {
      setRewardModalState((prev: any) => ({
        ...prev,
        allAvailableRewards: subClient?.rewards?.filter((val: any) => (val?.type == "birthday" || val?.type == "loyalty")) ?? []
      }))
    }
  }, [subClient])

  const renderToggle = (
    title: string,
    value: boolean,
    onPress: () => void,
    disabled?: boolean,
  ) => {
    return (
      <View style={styles.rowSpace}>
        <Text style={styles.switchTitle}>{title}</Text>
        <Switch
          trackColor={{
            false: COLORS.battleshipGrey32,
            true: COLORS.coolGreen,
          }}
          thumbColor={COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onPress}
          value={value}
          disabled={disabled}
        />
      </View>
    );
  };

  const addServiceToArray = () => {
    if (!selectedServiceId) {
      toast.info(LABELS.selectService);
      return;
    }
    if (!price) {
      toast.info(LABELS.selectPrice);
      return;
    }
    if (digitsAfterDecimal(price) > 0) {
      toast.info('Please enter a valid Price')
      return;
    }
    if (!quantitySold) {
      toast.info(LABELS.selectQuantity);
      return;
    }

    const service = {
      productId: selectedServiceId,
      price,
      quantity: quantitySold,
      name: products?.find((item: any) => item.id === selectedServiceId)?.name,
      type: activeTypeService,
    };

    if (isEdit) {
      const filteredServices = servicesArray.filter(
        (serv: any, index: number) => index !== isEditIndex,
      );
      setState((prev: any) => ({
        ...prev,
        servicesArray: [...filteredServices, service]
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        servicesArray: [...servicesArray, service]
      }));
    }

    setState((prev: any) => ({
      ...prev,
      price: '',
      selectedServiceId: undefined,
      quantitySold: '1',
      isEdit: false,
      isEditIndex: 0,
      showModalService: false,
    }));
  };

  const addQuickItemToArray = () => {
    if (!priceQuickItem) {
      toast.info(LABELS.selectPrice);
      return;
    }

    if (!quantityQuickItem) {
      toast.info(LABELS.selectQuantity);
      return;
    }

    const findServ = quickItemsArray?.find(
      (item: any) => item.id === isEditQuickItemIndex,
    );
    const quickItem = {
      ...findServ,
      price: priceQuickItem,
      quantity: quantityQuickItem,
    };
    const filteredQuickItems = quickItemsArray.filter(
      (serv: any) => serv.id !== isEditQuickItemIndex,
    );

    setState((prev: any) => ({
      ...prev,
      quickItemsArray: [...filteredQuickItems, quickItem],
      priceQuickItem: '',
      quantityQuickItem: '1',
      isEditQuickItem: false,
      isEditQuickItemIndex: 0,
      showModalQuickItem: false
    }));
  };

  const deleteServiceFromArray = (indexItem?: number) => {
    const filteredServices = servicesArray.filter(
      (_serv: any, index: number) => index !== indexItem,
    );
    setState((prev: any) => ({
      ...prev,
      servicesArray: filteredServices,
      price: '',
      selectedServiceId: undefined,
      quantitySold: '1',
      isEdit: false,
      isEditIndex: 0,
      showModalService: false,
    }));
  };

  const createSaleAction = (goalPdf: boolean) => {

    if (!isAddressExist) {
      toast.info(t(translations.createSale.error.timezoneError));
      return;
    }

    if (!newClient || REGEX.fname.test(firstName)) {
      setState((prev: any) => ({
        ...prev,
        firstNameError: ''
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        firstNameError: LABELS.notValidFirstName
      }))
      return;
    }


    if (!newClient || REGEX.lname.test(lastName)) {
      setState((prev: any) => ({
        ...prev,
        firstNameError: ''
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        lastNameError: LABELS.notValidLastName
      }))
      return;
    }


    if (!newClient && !noClientDetails && !selectedClient) {
      toast.info(LABELS.selectClient);
      return;
    }

    if (!date) {
      toast.info(LABELS.selectDate);
      return;
    }
    if (isFromAppointment && moment(route?.params?.fromDate).unix() > moment().unix()) {
      toast.info('You can not create sale for upcoming appointments');
      return;
    }
    if (newClient) {
      if (phoneNumber.length >= 2) {
        var data: any = phoneUtil.getExampleNumberForType(
          countryCode,
          PhoneNumberType.MOBILE,
        );
        if (data) {
          const number = phoneUtil.parseAndKeepRawInput(`${dialCode + phoneNumber}`, countryCode)
          let isValid = phoneUtil.isValidNumberForRegion(number, countryCode);
          let exNum = data.values_[2];
          if (countryCode == 'IN' && phoneNumber.trim().length < 10) {
            setState((prev: any) => ({ ...prev, phoneError: 'Phone number is not valid' }));
            toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
            return;
          }
          if (isValid == true) {
            setState((prev: any) => ({
              ...prev,
              phoneError: ''
            }));
          } else {
            setState((prev: any) => ({
              ...prev,
              phoneError: 'phone number is not valid'
            }));
            toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
            return;
          }
        } else {
          setState((prev: any) => ({
            ...prev,
            phoneError: ''
          }));
        }
      } else {
        setState((prev: any) => ({
          ...prev,
          phoneError: 'phone number is not valid'
        }));
        return;
      }
    }

    if (!paymentMethodId) {
      toast.info(LABELS.selectMethod);
      return;
    } else {
      let paymentMethod = methodList?.find((e: any) => e?.id == paymentMethodId)
      if (isOnlinePaymentOption(paymentMethod?.description!) || isOnlinePaymentOption(paymentMethod?.shortName!)) {
        if (newClient || noClientDetails || selectedClient?.isDisconnect || (!selectedClient?.isConnected)) {
          toast.info('Online payment option can be enabled only if client is a connected client');
          return;
        } else if (!selectedClient?.isPaymentEnabled) {
          toast.info('Client may not have Online payment option enabled, please sync client details to get updated client info.');
          return;
        }
      }
    }

    if (enableEmailReceipt) {
      if (REGEX.email2.test(String(clientEmail).trim().toLowerCase())) {
        setState((prev: any) => ({
          ...prev,
          clientEmailError: ''
        }));
      } else {
        setState((prev: any) => ({
          ...prev,
          clientEmailError: 'Email address is invalid'
        }))
        return
      }
    } else {
      setState((prev: any) => ({
        ...prev,
        clientEmailError: ''
      }));
    }

    if (!hasProduct(servicesArray, quickItemsArray)) {
      toast.info(LABELS.selectServiceOrQuickItem);
      return;
    }

    const latestTipAmount = selectedTip?.label == 'Custom'
      ? customTip
      : (saleTotal * (selectedTip?.value / 100)).toFixed(0);

    let newSale: any = {
      isPaymentReceived: paymentReceived,
      paymentMethodId: paymentMethodId,
      date: isEditSale ? moment(editSaleDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      entitiesSnapshot: {
        products: [
          ...servicesArray?.map((service: any) => ({
            id: service.productId,
            quantity: Number(service.quantity),
            price: Number(service.price),
            isQuickSection: false,
          })),
          ...quickItemsArray
            ?.filter((item: any) => item.isSelected)
            ?.map((item: any) => ({
              id: item.id,
              quantity: Number(item.quantity),
              price: Number(item.price),
              isQuickSection: true,
            })),
        ],
        taxIds: selectedTaxes?.map((item: any) => item.id),
      },
    };
    if (!noClientDetails) {
      newSale = {
        ...newSale,
        emailRecipient:
          enableEmailReceipt && !selectedClient?.isConnected
            ? clientEmail
            : null,
      };
    }
    if (discountAmount > 0) {
      newSale = {
        ...newSale,
        discountAmount: discountAmount,
      };
    }
    if (latestTipAmount > 0) {
      newSale = {
        ...newSale,
        tipAmount: Number(latestTipAmount),
      };
    }
    if (newClient) {
      newSale = {
        ...newSale,
        newClient: {
          firstName,
          lastName,
          phoneNumber: `+${dialCode}-${phoneNumber}`,
          countryCode: countryCode,
        },
      };
    }
    if (!newClient && !noClientDetails) {
      newSale = {
        ...newSale,
        clientSubprofileId: selectedClient?.id,
      };
    }

    if (goalPdf) {
      return getPDFUrl(newSale);
    }

    console.log("newSale ===========>>> ", newSale);


    if (isEditSale) {
      if (sale && sale.isPaymentReceived && !paymentReceived) {
        return alert.editing({
          message:
            "You disabled the 'Payment received' option and it will result in deleting an existing Payment record related to this sale. Do you confirm saving?",
          onEdit: () =>
            dispatch(updateSale({ ...newSale, id: route?.params?.saleId })),
        });
      }

      return dispatch(updateSale({ ...newSale, id: route?.params?.saleId }));
    }



    if (route?.params?.appliedSaleSpecialData?.noCombination) {
      dispatch(createSale(newSale));
    } else if (rewardModalState?.allAvailableRewards?.length > 0) {
      let myApplicableRewards = getApplicableRewards()

      if (myApplicableRewards?.length > 0) {
        setRewardModalState((prev: any) => ({ ...prev, saleData: { ...newSale }, applicableRewards: myApplicableRewards, rewardData: myApplicableRewards?.[0], isVisible: true }))
      } else {
        dispatch(createSale(newSale));
      }
    } else {
      dispatch(createSale(newSale));
    }
  };

  const getApplicableRewards = () => {
    if (!isPremiumProvider) {
      return []
    }

    let rewardsApplicable = []
    let myProductsIds = _.uniq([...servicesArray, ...quickItemsArray?.filter((e: any) => e?.isSelected)]?.map((e: any) => (e?.productId ?? e?.id)))
    let loyaltyRewardData: any = rewardModalState?.allAvailableRewards?.find((e: any) => (e?.type == 'loyalty'));
    let birthdayRewardData: any = rewardModalState?.allAvailableRewards?.find((e: any) => (e?.type == 'birthday'));
    let applicableBirthdayRewards = isRewardApplicable(birthdayRewardData, myProductsIds)
    let applicableLoyaltyRewards = isRewardApplicable(loyaltyRewardData, myProductsIds)

    if (applicableBirthdayRewards && applicableBirthdayRewards.length > 0) {
      rewardsApplicable.push({ ...birthdayRewardData, rewardsId: [...applicableBirthdayRewards] });
    }
    if (applicableLoyaltyRewards && applicableLoyaltyRewards.length > 0) {
      rewardsApplicable.push({ ...loyaltyRewardData, rewardsId: [...applicableLoyaltyRewards] });
    }

    return rewardsApplicable
  }

  const isRewardApplicable = (e: any, myProductsIds: any) => {
    let IDs = [];

    if (e?.isCombination && route?.params?.appliedSaleSpecialData) {
      return false
    } else if (e?.cannotUseWithOtherSpecial && route?.params?.appliedSaleSpecialData) {
      return false
    }
    if (e?.isDayRestrication && e?.restricationDay?.length > 0) {
      if (!e?.restricationDay?.includes(moment.tz(providerTimezone?.toString()).format('dddd')?.toLowerCase())) {
        return false
      }
    }
    if (e?.rewardFor == "services") {
      IDs = e?.serviceIds?.filter((ele: any) => myProductsIds?.includes(ele));
      if (IDs?.length > 0) {
        return [...IDs]
      } else {
        return false
      }
    } else if (e?.rewardFor == "items") {
      IDs = e?.itemIds?.filter((ele: any) => myProductsIds?.includes(ele));
      if (IDs?.length > 0) {
        return [...IDs]
      } else {
        return false
      }
    }
    return false
  }

  const getPDFUrl = async (dataSale: any) => {
    try {
      const { data }: any = await SalesApi.salePreviewReceipt(dataSale);
      setState((prev: any) => ({
        ...prev,
        pdfURL: data.pdf,
        showPDF: true
      }));
    } catch (error: any) {
      toast.info(error?.message);
    }
  };

  const renderClient = () => {
    const { photo, firstName, lastName, isConnected } = selectedClient || {};

    return selectedClient ? (
      <View style={styles.row}>
        <Image
          source={
            photo ? { uri: photo } : require('assets/global/defaultAvatar.jpg')
          }
          style={styles.avatar}
        />
        <View>
          <View style={styles.row}>
            <Text style={styles.firstName}>
              {(firstName || '') + ' ' + (lastName || '')}
            </Text>
            {isConnected && (
              <Image
                source={require('assets/onBoarding/alpha.png')}
                style={styles.imageConnected}
              />
            )}
          </View>
          <Description label={LABELS.saleTotal}>$ {saleTotal}</Description>
        </View>
      </View>
    ) : (
      <Text style={styles.textSelect}>{LABELS.selectAClient}</Text>
    );
  };

  const createService = async (product: ProductValues) => {
    dispatch(closeEditModal());
    try {
      const { data } = await ProductsApi.createProduct(product);
      const service = {
        productId: data.id,
        price: data.price,
        quantity: 1,
        name: data.name,
        type: data.type,
      };
      data.isActive && setState((prev: any) => ({
        ...prev, servicesArray: [...servicesArray, service]
      }));
      setTimeout(() => dispatch(getProducts()), 500);
    } catch (error: any) {
      toast.info(error?.message);
    }
  };

  const selectTax = (tax: ITax) => setState((prev: any) => ({
    ...prev,
    selectedTaxes: [...selectedTaxes, tax]
  }));

  const deselectTax = (tax: ITax) => {
    const newTaxes = selectedTaxes.filter(({ id }: any) => id !== tax.id);

    setState((prev: any) => ({
      ...prev,
      selectedTaxes: newTaxes
    }));
  };

  const toggleSelectTax = (tax: ITax) => () => {
    const selected = selectedTaxes.some(({ id }: ITax) => id === tax.id);

    return selected ? deselectTax(tax) : selectTax(tax);
  };

  const onPaymentReceivedPress = () => {
    setState((prev: any) => ({
      ...prev,
      paymentReceived: !paymentReceived,
    }));
    if (paymentReceived) {
      setState((prev: any) => ({
        ...prev,
        enableEmailReceipt: false,
        clientEmail: ''
      }));
    }
  };

  const onSalePress = () => {
    dispatch(openSalesDetailModal(salesSpecial))
  }

  const handleChangeService = (value: string) => {
    setState((prev: any) => ({
      ...prev,
      selectedServiceId: products?.find((item: any) => item.name === value)?.id,
      price: products?.find((item: any) => item.name === value)?.price,
      quantitySold: '1'
    }))
    if (isPremiumProvider) {
      setState((prev: any) => ({
        ...prev,
        salesSpecial: products?.find((item: any) => item.name == value)?.saleSpecial,
      }))
    }
  }

  const saleAmountAfterReward = getSaleTotalWithReward(
    selectedTaxes,
    servicesArray,
    quickItemsArray,
    rewardModalState?.rewardData?.rewardsId,
    rewardModalState?.rewardData,
  )

  const onPressPaymentMethod = (item: any) => {
    let paymentMethod = methodList?.find((e) => e?.id == item?.id)

    if (isOnlinePaymentOption(paymentMethod?.shortName!) || isOnlinePaymentOption(paymentMethod?.description!)) {
      if (!hidePaymentReceived) {
        if (paymentReceived) {
          setState((prev: any) => ({
            ...prev,
            enableEmailReceipt: false,
            clientEmail: '',
          }));
        }
        setState((prev: any) => ({
          ...prev,
          paymentReceived: false,
          newClient: false,
          hidePaymentReceived: true,
        }));
      }
    } else if (hidePaymentReceived) {
      if (paymentReceived) {
        setState((prev: any) => ({
          ...prev,
          enableEmailReceipt: false,
          clientEmail: '',
        }));
      }
      setState((prev: any) => ({
        ...prev,
        paymentReceived: true,
        newClient: false,
        hidePaymentReceived: false,
      }));
    }
    setState((prev: any) => ({
      ...prev,
      paymentMethodId: item?.id,
    }));
  }

  return (
    <MainPageTemplate
      loading={loading || methodsLoading || productsLoading || taxesLoading || subClientsLoading}
      bc={COLORS.white}
    >
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setState((prev: any) => ({
                ...prev,
                countryCode: value.countryCode,
                dialCode: value.dialCode
              }));
              dispatch(closeCountryModal());
            }}
          />
        )
      }
      <ScrollContainer styleExtra={styles.scrollContainer}>
        {!isEditSale || (isEditSale && !sale?.clientSubprofile) ? (
          <View style={styles.notifyContainer}>
            {renderToggle(
              LABELS.noClientDetails,
              noClientDetails,
              () => {
                setState((prev: any) => ({
                  ...prev,
                  clientEmail: !noClientDetails ? '' : selectedClient?.email || '',
                  noClientDetails: !noClientDetails,
                  newClient: false,
                }));
              },
              isEditSale &&
              (sale?.clientSubprofile?.isConnected === false ||
                sale?.clientSubprofile?.isConnected),
            )}
            <View style={styles.separator} />
            {renderToggle(
              LABELS.newClient,
              newClient,
              () => {
                setState((prev: any) => ({
                  ...prev,
                  clientEmail: !newClient ? '' : selectedClient?.email || '',
                  noClientDetails: false,
                  newClient: !newClient,
                }));
              },
              isEditSale &&
              (sale?.clientSubprofile?.isConnected === false ||
                sale?.clientSubprofile?.isConnected),
            )}
          </View>
        ) : null}

        {newClient ? (
          <>
            <View style={styles.rowInput}>
              <Field
                value={firstName}
                error={firstNameError}
                onChange={(text: string) => {
                  setState((prev: any) => ({
                    ...prev,
                    firstNameError: '',
                    firstName: text
                  }));
                }}
                label={LABELS.firstName}
                w="48%"
                mt={16}
              />
              <Field
                value={lastName}
                error={lastNameError}
                onChange={(text: string) => {
                  setState((prev: any) => ({
                    ...prev,
                    lastNameError: '',
                    lastName: text
                  }))
                }}
                label={LABELS.lastName}
                w="48%"
                mt={16}
              />
            </View>
            <Pressable mt={20} onPress={() => dispatch(openCountryModal())}>
              <Text numberOfLines={1} style={[styles.input, {
                color: 'black',
                borderColor: COLORS.whiteGray,
              }]}>
                {`${countryCode} (+${dialCode || filterCountry.phonecode})`}
              </Text>
            </Pressable>
            <Field
              keyboardType="phone-pad"
              value={phoneNumber}
              error={phoneError}
              maxLength={13}
              onChange={(text: string) => {
                const re = /^[0-9\b]+$/;
                if (text == '' || re.test(text)) {
                  setState((prev: any) => ({
                    ...prev,
                    phoneNumber: text,
                    phoneError: ''
                  }))
                }
              }}
              label={LABELS.telephone}
              mt={16}
            />
          </>
        ) : noClientDetails ? null : isEditSale && sale?.clientSubprofile ? (
          <View style={[styles.notifyContainer, styles.rowSpace]}>
            {renderClient()}
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.notifyContainer, styles.rowSpace]}
            onPress={() => {
              if (!isFromAppointment) {
                setState((prev: any) => ({
                  ...prev,
                  showModal: true
                }));
              }
            }}
          >
            {renderClient()}
            {(!isFromAppointment) && (
              <Image
                source={require('assets/global/chevron.png')}
                style={styles.arrowDown}
              />
            )}
          </TouchableOpacity>
        )}
        {
          isEditSale ? (
            <Datepicker
              editable
              title={`${LABELS.saleDate}${dateFormatWithoutTz(editSaleDate)}`}
              timeZoneOffset={0}
              date={moment(editSaleDate).toDate()}
              mt={16}
              onConfirm={(value) => {
                setState((prev: any) => ({
                  ...prev,
                  editSaleDate: moment(value).toDate()
                }))
              }}
            />
          ) : (
            <Datepicker
              editable
              title={`${LABELS.saleDate}${moment.tz(date, providerTimezone).format('Do MMM YYYY')}`}
              date={date}
              mt={16}
              timeZoneOffset={providerOffset}
              // maximumDate={parseDate()}
              onConfirm={(value) => {
                setState((prev: any) => ({
                  ...prev,
                  date: moment(value).toDate(),
                }))
              }}
            />
          )
        }
        {(!hidePaymentReceived) && (
          <View style={styles.notifyContainer}>
            {renderToggle(
              LABELS.paymentReceived,
              paymentReceived,
              onPaymentReceivedPress,
            )}
          </View>
        )}
        <TouchableOpacity onPress={() => setState((prev: any) => ({ ...prev, extendedPayment: !extendedPayment }))} >
          <Paragraph color={COLORS.orange} size='xs' mt={15}>
            {
              extendedPayment ? t(translations.appAppointments.hidePayments) :
                t(translations.appAppointments.showMorePayments)
            }
          </Paragraph>
        </TouchableOpacity>
        <View style={styles.notifyContainer}>
          {extendedPayment ? (
            methodList.map((item, index) => {
              const lastIndex = index == (methodList?.length - 1);
              return (
                <>
                  <TouchableOpacity onPress={() => onPressPaymentMethod(item)} key={item.id} style={styles.radioButtons}>
                    <View style={styles.paymentText}>
                      <Icon src={getPaymentIcon(item)} />
                      <Text style={styles.radioText}>{item.shortName}</Text>
                    </View>
                    <View>
                      <Radio
                        checked={item?.id == paymentMethodId}
                        onChange={() => onPressPaymentMethod(item)}
                      />
                    </View>
                  </TouchableOpacity>
                  {(!lastIndex) && <View style={styles.separator}></View>}
                </>
              );
            })
          ) : (
            methodList.filter((est: any) => est.id == paymentMethodId).map((item, index) => {
              return (
                <>
                  <TouchableOpacity onPress={() => onPressPaymentMethod(item)} key={item.id} style={styles.radioButtons}>
                    <View style={styles.paymentText}>
                      <Icon src={getPaymentIcon(item)} />
                      <Text style={styles.radioText}>{item.shortName}</Text>
                    </View>
                    <View>
                      <Radio
                        checked={item?.id == paymentMethodId}
                        onChange={() => onPressPaymentMethod(item)}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* {(!lastIndex) && <View style={styles.separator}></View>} */}
                </>
              );
            })
          )}
        </View>
        {quickItemsArray?.length ? (
          <>
            <Text style={styles.serviceDetailsTitle}>{LABELS.quickItems}</Text>
            <View style={styles.notifyContainer}>
              {quickItemsArray?.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <View style={styles.rowSpace}>
                      <CheckBox
                        checked={item.isSelected}
                        onChange={() =>
                          setState((prev: any) => ({
                            ...prev,
                            quickItemsArray: quickItemsArray.map((service: any) =>
                              item.id === service.id
                                ? {
                                  ...service,
                                  isSelected: !service.isSelected,
                                }
                                : service,
                            )
                          }))
                        }
                        label={item.name + ' x ' + item.quantity}
                        styleLabel={styles.serviceNameSelected}
                      />
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() => {
                          setState((prev: any) => ({
                            ...prev,
                            isEditQuickItem: true,
                            isEditQuickItemIndex: item.id,
                            nameQuickItem: item.name,
                            priceQuickItem: item.price,
                            quantityQuickItem: item.quantity.toString(),
                            showModalQuickItem: true,
                          }));
                        }}
                      >
                        <Text style={styles.servicePriceSelected}>
                          ${item.price * item.quantity}
                        </Text>
                        <Image
                          source={require('assets/global/arrowRight.png')}
                          style={styles.arrow}
                        />
                      </TouchableOpacity>
                    </View>
                    {quickItemsArray.length - 1 > index && (
                      <View style={styles.separator} />
                    )}
                  </View>
                );
              })}
            </View>
          </>
        ) : null}
        {/* <CheckBox
          styleContainer={styles.positionCheckBox}
          checked={enablePackage}
          onChange={() => setState((prev: any) => ({
            ...prev,
            enablePackage: !enablePackage
          }))}
          label={LABELS.showPackages}
          styleLabel={styles.emailReceiptTitle}
        />
        {enablePackage ? (
          <>
            <Text style={styles.serviceDetailsTitle}>{LABELS.packageTitle}</Text>
            <View style={styles.notifyContainer}>
              <TouchableOpacity
                style={styles.rowCenter}
                onPress={() => {}}
              >
                <Image
                  source={require('assets/global/plus.png')}
                  style={styles.addImage}
                />
                <Text style={styles.addServiceText}>{LABELS.addPackage}</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null} */}
        <>
          <Text style={styles.serviceDetailsTitle}>{LABELS.serviceTitle}</Text>
          <View style={styles.notifyContainer}>
            {servicesArray?.map((item: any, index: number) => {
              let itemName = item.name
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.rowSpace}
                    onPress={() => {
                      setState((prev: any) => ({
                        ...prev,
                        isEdit: true,
                        isEditIndex: index,
                        selectedServiceId: item.productId,
                        price: item.price,
                        quantitySold: item.quantity.toString(),
                        activeTypeService: item.type,
                        salesSpecial: products?.find((item: any) => item.name == itemName)?.saleSpecial,
                        showModalService: true,
                      }))
                    }}
                  >
                    <View style={styles.row}>
                      <TouchableOpacity
                        onPress={() => deleteServiceFromArray(index)}
                      >
                        <Image
                          source={require('assets/global/deleteRed.png')}
                          style={styles.imageDelete}
                        />
                      </TouchableOpacity>
                      <Text style={styles.serviceNameSelected}>
                        {item.name + ' x ' + item.quantity}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.servicePriceSelected}>
                        ${item.price * item.quantity}
                      </Text>
                      <Image
                        source={require('assets/global/arrowRight.png')}
                        style={styles.arrow}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.rowCenter}
              onPress={() => setState((prev: any) => ({
                ...prev,
                showModalService: true,
              }))}
            >
              <Image
                source={require('assets/global/plus.png')}
                style={styles.addImage}
              />
              <Text style={styles.addServiceText}>{LABELS.moreServices}</Text>
            </TouchableOpacity>
          </View>
        </>
        {taxes?.length ? (
          <TouchableOpacity onPress={() => setState((prev: any) => ({ ...prev, showAllTaxes: !showAllTaxes }))}>
            <Text style={styles.setUpTaxesText}>{LABELS.setUpTaxes}</Text>
          </TouchableOpacity>
        ) : null}
        {showAllTaxes ? (
          <>
            <Text style={styles.textLegend}>
              Taxes highlighted in grey cannot be selected as they don’t have a
              tax rate for the Sale date
            </Text>
            <View style={[styles.notifyContainer, { marginTop: 8 }]}>
              <TaxesList
                data={taxes}
                selectedTaxes={selectedTaxes}
                onPress={toggleSelectTax}
              />
            </View>
          </>
        ) : null}
        {!noClientDetails && paymentReceived && (
          <>
            <CheckBox
              styleContainer={styles.positionCheckBox}
              checked={enableEmailReceipt}
              onChange={() => setState((prev: any) => ({
                ...prev,
                enableEmailReceipt: !enableEmailReceipt
              }))}
              label={LABELS.sendReceipt}
              styleLabel={styles.emailReceiptTitle}
            />
            {enableEmailReceipt &&
              ((isEditSale && sale?.emailRecipient) ||
                !selectedClient?.isConnected) && (
                <>
                  <Field
                    value={clientEmail}
                    label={LABELS.email}
                    error={clientEmailError}
                    onChange={(text: string) => setState((prev: any) => ({
                      ...prev,
                      clientEmail: text
                    }))}
                    mt={16}
                  />
                  <TouchableOpacity onPress={() => createSaleAction(true)}>
                    <Text style={styles.setUpTaxesText}>{LABELS.preview}</Text>
                  </TouchableOpacity>
                </>
              )}
          </>
        )}
        <TouchableOpacity onPress={() => setState((prev: any) => ({ ...prev, extended: !extended }))} style={styles.showMore}>
          <Box row jc="space-between" ai="center">
            <Paragraph size="xs" color={COLORS.orange}>
              {extended ? t(translations.appAppointments.hide) : t(translations.appAppointments.showDetails)}
            </Paragraph>
            <Icon src={extended ? require('assets/global/arrowUp.png') : require('assets/global/arrowDown.png')} size={20} />
          </Box>
        </TouchableOpacity>
        {extended ? (
          <>
            <Box>
              <Paragraph type="book" size="s" mt={5}>
                {'Add Tip'}
              </Paragraph>
              <Box mv={10} row jc="space-between">
                {TIP_DISCOUNT.map((item: DiscountType) => {
                  const isSelected = item.label === selectedTip?.label;
                  return (
                    <TouchableOpacity
                      style={
                        // item == tipSelected
                        isSelected
                          ? styles.addTipSelected
                          : styles.addTip
                      }
                      onPress={() => onAddTip(item)}
                    >
                      <Paragraph type="book" size={isSmallDevice ? "s" : "m"}>
                        {item.label}
                      </Paragraph>
                    </TouchableOpacity>
                  );
                })}
              </Box>
            </Box>
            {(selectedTip?.label == 'Custom') && (
              <Field
                size='l'
                mt={16}
                value={customTip == 0 ? '' : String(customTip)}
                bg={COLORS.whiteTwo}
                color={COLORS.orange}
                keyboardType='number-pad'
                onChange={(value) => {
                  setState((prev: any) => ({
                    ...prev,
                    customTip: Number(value),
                  }));
                }}
                label='Tip'
                startAdornment={
                  <Icon src={require('assets/global/dollar.png')} size={18} />
                }
              />
            )}
            <Paragraph type="book" size="s" mt={20}>
              {'Less discount'}
            </Paragraph>
            <Box mv={10} row jc="space-between">
              {TIP_DISCOUNT.map((item: DiscountType) => {
                const isSelected = item.label === selectedDiscount?.label;
                return (
                  <>
                    <TouchableOpacity
                      style={
                        isSelected
                          ? styles.addTipSelected
                          : styles.addTip
                      }
                      onPress={() => onLessDicount(item)}
                    >
                      <Paragraph type="book" size={isSmallDevice ? "s" : "m"}>
                        {item.label}
                      </Paragraph>
                    </TouchableOpacity>
                  </>
                );
              })}
            </Box>
            {(selectedDiscount?.label == 'Custom') && (
              <Field
                size='l'
                mt={16}
                value={customDiscount == 0 ? '' : String(customDiscount)}
                bg={COLORS.whiteTwo}
                color={COLORS.orange}
                keyboardType='number-pad'
                onChange={(value) => {
                  setState((prev: any) => ({
                    ...prev,
                    customDiscount: Number(value)
                  }))
                }}
                label='Discount'
                startAdornment={
                  <Icon src={require('assets/global/dollar.png')} size={18} />
                }
              />
            )}
          </>
        ) : null}
      </ScrollContainer>
      <PdfPreview
        visible={showPDF}
        pdfUrl={pdfURL}
        title="Receipt preview"
        onClose={() => setState((prev: any) => ({
          ...prev,
          showPDF: false
        }))}
      />
      <SubClientsModal
        subClients={clients}
        onModalShow={(show: boolean) =>
          setState((prev: any) => ({
            ...prev,
            showModal: show
          }))}
        showModal={showModal}
        onChangeSelectedClient={(client: any) => {
          setState((prev: any) => ({
            ...prev,
            selectedClient: client,
            clientEmail: client?.email || '',
          }))
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalQuickItem}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardStyle}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.posHeader}>
                <View style={styles.titleNewCenter}>
                  <Text style={styles.titleNewService}>{LABELS.editSale}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setState((prev: any) => ({
                      ...prev,
                      isEditQuickItem: false,
                      isEditQuickItemIndex: 0,
                      priceQuickItem: '',
                      quantityQuickItem: '1',
                      showModalQuickItem: false,
                    }));
                  }}
                >
                  <Image
                    source={require('assets/global/close.png')}
                    style={styles.closeImage}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.paddingContentScroll}>
                  <Field
                    value={quantityQuickItem}
                    label={LABELS.quantitySold}
                    keyboardType="numeric"
                    onChange={(value: any) =>
                      setState((prev: any) => ({
                        ...prev,
                        quantityQuickItem: value
                      }))}
                    mt={16}
                  />
                  <Field
                    startAdornment={
                      <Icon
                        src={require('assets/global/dollar.png')}
                        size={18}
                      />
                    }
                    error={priceError}
                    keyboardType="numeric"
                    value={priceQuickItem?.toString()}
                    onChange={(text: string) => {
                      setState((prev: any) => ({
                        ...prev,
                        priceError: '',
                        priceQuickItem: text,
                      }));
                    }}
                    label={LABELS.price}
                    mt={16}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={[styles.rowButtons, !isEdit && styles.rowButtonsCreate]}>
            <Button
              onPress={addQuickItemToArray}
              text={LABELS.continue}
              buttonStyle={styles.btnContinueService}
              textStyle={styles.textContinueService}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalService}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardStyle}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.posHeader}>
                <View style={styles.titleNewCenter}>
                  <Text style={styles.titleNewService}>
                    {isEdit
                      ? t(translations.createSale.editSaleService)
                      : t(translations.createSale.addSaleService)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setState((prev: any) => ({
                      ...prev,
                      isEdit: false,
                      isEditIndex: 0,
                      selectedServiceId: undefined,
                      price: '',
                      quantitySold: '1',
                      salesSpecial: [],
                      showModalService: false,
                    }))
                  }}
                >
                  <Image
                    source={require('assets/global/close.png')}
                    style={styles.closeImage}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.paddingContentScroll}>
                  <View style={styles.rowSpace}>
                    <View style={styles.row}>
                      <TouchableOpacity
                        style={[
                          styles.containerTypeService,
                          activeTypeService === 'service' &&
                          styles.containerTypeServiceActive,
                        ]}
                        onPress={() => setState((prev: any) => ({
                          ...prev, activeTypeService: 'service'
                        }))}
                      >
                        <Text
                          style={[
                            styles.textTypeService,
                            activeTypeService === 'service' &&
                            styles.textTypeServiceActive,
                          ]}
                        >
                          {LABELS.service}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.containerTypeService,
                          activeTypeService === 'item' &&
                          styles.containerTypeServiceActive,
                        ]}
                        onPress={() => setState((prev: any) => ({
                          ...prev, activeTypeService: 'item'
                        }))}
                      >
                        <Text
                          style={[
                            styles.textTypeService,
                            activeTypeService === 'item' &&
                            styles.textTypeServiceActive,
                          ]}
                        >
                          {LABELS.item}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {!isEdit && (
                      <TouchableOpacity
                        style={[
                          styles.containerTypeService,
                          styles.containerTypeServiceActive,
                        ]}
                        onPress={() => {
                          setState((prev: any) => ({
                            ...prev,
                            showModalService: false,
                          }));
                          setTimeout(() => dispatch(openEditModal(null)), 500);
                        }}
                      >
                        <Text
                          style={[
                            styles.textTypeService,
                            styles.textTypeServiceActive,
                          ]}
                        >
                          {LABELS.createNew}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Box jc='center'>
                    <DropMenu
                      placeholder={LABELS.serviceForSale}
                      onChange={handleChangeService}
                      items={
                        products
                          ?.filter(
                            (item: any) =>
                              item.type === activeTypeService && item.isActive,
                          )
                          ?.map((item: any) => ({
                            label: (isPremiumProvider && item.saleSpecial?.length > 0) ? `${item.name} (On Sale)` : item.name,
                            value: item.name,
                          })) || []
                      }
                      value={
                        products?.find(
                          (item: any) => item.id === selectedServiceId,
                        )?.name
                      }
                    />
                    {(salesSpecial?.length > 0) && (
                      <TouchableOpacity
                        style={{ position: 'absolute', paddingTop: 16, right: 36 }}
                        hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
                        onPress={() => onSalePress()}>
                        <Box pv={2} ph={8} jc="center" ai="center" r={15} bc={COLORS.greenblue}>
                          <Paragraph color={COLORS.white} type='book' size='xs'>
                            {(salesSpecial?.length == 1)
                              ? I18n.t<string>('products.saleBadge', { salePrice: `$${salesSpecial?.[0]?.salePrice?.toString()}` })
                              : I18n.t<string>('products.saleBadge', { salePrice: '' })
                            }
                          </Paragraph>
                        </Box>
                      </TouchableOpacity>
                    )}
                  </Box>
                  {isDetailsModalOpened && <ProviderSalesSpecialDetails />}
                  <View style={styles.textBoxContainerSold}>
                    <Field
                      value={quantitySold}
                      label={LABELS.quantitySold}
                      disabled={!selectedServiceId}
                      keyboardType="numeric"
                      onChange={(value) =>
                        setState((prev: any) => ({
                          ...prev, quantitySold: value
                        }))}
                      mt={16}
                    />
                  </View>
                  <Field
                    startAdornment={
                      <Icon
                        src={require('assets/global/dollar.png')}
                        size={18}
                      />
                    }
                    disabled={!selectedServiceId}
                    error={priceError}
                    keyboardType="numeric"
                    value={price?.toString()}
                    onChange={(text: string) => {
                      setState((prev: any) => ({
                        ...prev,
                        priceError: '',
                        price: text,
                      }));
                    }}
                    label={LABELS.price}
                    mt={16}
                  />
                  <CheckBox
                    styleContainer={styles.checkboxQuickSale}
                    styleLabel={styles.checkBoxLabel}
                    checked={
                      products?.find(
                        (item: any) => item.id === selectedServiceId,
                      )?.isQuickSale
                    }
                    onChange={() => { }}
                    disabled
                    label={LABELS.quickSale}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={[styles.rowButtons, !isEdit && styles.rowButtonsCreate]}>
            {isEdit && (
              <Button
                onPress={() => {
                  setState((prev: any) => ({
                    ...prev,
                    salesSpecial: []
                  }));
                  deleteServiceFromArray(isEditIndex)
                }}
                text={LABELS.deleteItem}
                buttonStyle={styles.btnDeleteService}
                textStyle={styles.textDeleteService}
              />
            )}
            <Button
              onPress={() => {
                setState((prev: any) => ({
                  ...prev,
                  salesSpecial: []
                }));
                addServiceToArray()
              }}
              text={LABELS.continue}
              buttonStyle={styles.btnContinueService}
              textStyle={styles.textContinueService}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rewardModalState.isVisible}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardStyle}
        >
          <View style={[styles.centeredView, { justifyContent: 'center', paddingHorizontal: 32 }]}>
            <View style={[styles.modalView, { height: '65%', borderRadius: 20, }]}>
              <View style={styles.posHeader}>
                <View style={styles.titleNewCenter}>
                  <Text style={styles.titleNewService}>{'Do you want to apply client rewards ?'}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setRewardModalState((prev: any) => ({ ...prev, applicableRewards: [], isVisible: false, saleData: null, rewardData: null }))
                  }}
                >
                  <Image
                    source={require('assets/global/close.png')}
                    style={styles.closeImage}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.rewardModalContainer}>
                <View style={[styles.paddingContentScroll, { flex: 1 }]}>
                  <View>
                    {rewardModalState?.applicableRewards?.map((item: any, index: any) => {
                      const active = item?.type == rewardModalState.rewardData?.['type']
                      return (
                        <TouchableOpacity
                          key={item?.id}
                          style={styles.rewardCard}
                          onPress={() =>
                            setRewardModalState((prev: any) => ({ ...prev, rewardData: active ? null : item }))
                          }
                        >
                          <Text style={[styles.firstName, styles.rewardText]}>
                            {item?.type}{' Reward'}
                          </Text>
                          <Image
                            source={
                              active
                                ? require('assets/global/checked.png')
                                : require('assets/global/unChecked.png')
                            }
                            // tintColor={COLORS.black50}
                            style={[styles.selectedRewardIcon, { tintColor: COLORS.black50 }]}
                          />
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                  {rewardModalState?.rewardData ? (
                    <View style={[styles.rewardCard, {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }]}>
                      {(rewardModalState?.rewardData?.type == 'loyalty') ? (
                        (rewardModalState?.rewardData?.rewardSpending) ? (
                          <Text style={[styles.rewardDescriptionText]}>
                            {`Reward For: Total money spent of [$${rewardModalState?.rewardData?.rewardSpending}]`}
                          </Text>
                        ) : (
                          <Text style={[styles.rewardDescriptionText]}>
                            {`Reward For: Total appointments completed [${rewardModalState?.rewardData?.rewardAfterCompleting}]`}
                          </Text>
                        )
                      ) : (
                        <Text style={[styles.rewardDescriptionText]}>
                          {`Reward For: Birthday`}
                        </Text>
                      )}
                      {(rewardModalState?.rewardData?.rewardType === "discount amount") ? (
                        <Text style={[styles.rewardDescriptionText]}>
                          {`Reward: ${rewardModalState?.rewardData?.rewardType} of [$${rewardModalState?.rewardData?.discount}]`}
                        </Text>
                      ) : (
                        <Text style={[styles.rewardDescriptionText]}>
                          {`Reward: ${rewardModalState?.rewardData?.rewardType} of [${rewardModalState?.rewardData?.discountRate}%]`}
                        </Text>
                      )}
                      <Text style={[styles.rewardDescriptionText]}>
                        {`Sale amount after reward: [$${saleAmountAfterReward}]`}
                      </Text>
                      {/* {(rewardModalState?.rewardData?.rewardType === "discount amount") ? (
                        <Text style={[styles.rewardDescriptionText]}>
                          {`Sale amount after reward: [$${saleTotal - rewardModalState?.rewardData?.discount}]`}
                        </Text>
                      ) : (
                        <Text style={[styles.rewardDescriptionText]}>
                          {`Sale amount after reward: [$${saleTotal - rewardModalState?.rewardData?.discountRate / 100 * saleTotal}]`}
                        </Text>
                      )} */}
                      <Text style={[styles.rewardDescriptionText]}>
                        {`Description: ${rewardModalState?.rewardData?.description}`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </ScrollView>
              <View style={styles.saveButtonContainer}>
                <Button
                  text={LABELS.noApplyReward}
                  onPress={() => {
                    dispatch(createSale({ ...rewardModalState.saleData }))
                    setRewardModalState((prev: any) => ({ ...prev, isVisible: false }))
                  }}
                  buttonStyle={styles.noApplyReward}
                />
                <Button
                  text={LABELS.applyReward}
                  onPress={() => {
                    if (rewardModalState.rewardData?.type) {
                      dispatch(createSale({ ...rewardModalState.saleData, rewardType: rewardModalState.rewardData.type, rewardsId: rewardModalState.rewardData.rewardsId }))
                      setRewardModalState((prev: any) => ({ ...prev, isVisible: false }))
                    } else {
                      alert.info('Please choose a reward.', I18n.t('common.warning'))
                    }
                  }}
                  buttonStyle={styles.applyReward}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {isModalOpened && (
        <EditProducts
          fromAppointment
          onCreateProduct={(data) => createService(data)}
        />
      )}
      <View style={styles.bottomBlock}>
        <Button
          onPress={() => createSaleAction(false)}
          text={LABELS.saveSale}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
        />
      </View>
    </MainPageTemplate>
  );
};

export default AddSale;