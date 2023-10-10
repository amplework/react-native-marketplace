import { StackScreenProps } from '@react-navigation/stack';
import { InvoicesApi } from 'api/invoices';
import { PaymentsApi } from 'api/payments';
import { RootStackParamList } from 'index';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import RNlocalize from 'react-native-localize';
import { useDispatch, useSelector } from 'react-redux';
import libphonenumber from "google-libphonenumber";
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { PdfPreview } from 'shared/pdfPreview';
import ScrollContainer from 'shared/scrollContainer';
import SubClientsModal from 'shared/subClientsModal';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  getPaymentMethods,
  paymentMethodsSelectors,
} from 'store/entities/paymentMethods';
import {
  createPayment,
  paymentsSelectors,
  updatePayment,
} from 'store/entities/payments';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import COLORS from 'utils/colors';
import { countryCodes } from 'utils/countryCodes';
import { dateFormatWithoutTz, dateWithoutTz, parseDate } from 'utils/dates';
import REGEX from 'utils/regex';

import { LABELS } from './labels';
import styles from './style';
import { isIOS } from 'utils/device';
import { closeCountryModal, userSelectors, openCountryModal } from 'store/entities/user';
import { CountryPicker } from 'shared/countryPicker';
import { Pressable } from 'shared/pressable';
import { subscriptionSelectors } from 'store/entities/subscription';
import { isOnlinePaymentOption } from 'utils/onlinePaymentOptions';
import { t, translations } from 'locales';
import { EstimatesApi } from 'api/estimates';

type Props = StackScreenProps<RootStackParamList, 'AddPayments'>;

const AddPayments: React.FC<Props> = ({ navigation, route }) => {
  const { params } = route;
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');
  const countryCodePicker = useSelector(userSelectors.countryPickerModal);
  const subClients = useSelector(subClientsSelectors.subClients);

  const locales = RNlocalize.getLocales()[0];

  const providerTimezone = providerDetails?.address?.utctimezone;
  const providerOffset = providerDetails?.utcOffset;

  const deviceCountryCode = locales.countryCode;
  const filterCountry = countryCodes.filter((e: any) => e.sortname == (providerDetails?.countryCode || deviceCountryCode))[0];
  const payment = useSelector(paymentsSelectors.payment);
  const loading = useSelector(paymentsSelectors.loading);
  const methods = useSelector(paymentMethodsSelectors.methods);
  const methodList = methods.filter((e: any) =>
    e.isActive != false &&
      (isPremiumProvider) ? true : (!(isOnlinePaymentOption(e?.shortName))))

  const dispatch = useDispatch();

  const isEditPayment: any = route?.params?.paymentId;

  const isAddressExist = (providerDetails?.address?.location?.lat == null
    && providerDetails?.address?.location?.lat == null)
    ? false : true

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

  const [newClient, setNewClient] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(
    isEditPayment ? !!payment?.invoiceId : !!params.invoiceId,
  );
  const [estimateDetails, setEstimateDetails] = useState(
    isEditPayment ? !!payment?.estimateId : !!params.estimateId,
  );
  const [showModal, setShowModal] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState(
    isEditPayment ? payment?.paymentMethod?.id : undefined,
  );
  const [invoiceId, setInvoiceId] = useState(
    isEditPayment ? payment?.invoiceId : params.invoiceId,
  );
  const [estimateId, setEstimateId] = useState(
    isEditPayment ? payment?.estimateId : params.estimateId,
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [invoices, setInvoices] = useState<any>([]);
  const [estimates, setEstimates] = useState<any>([]);
  const [total, setTotal] = useState(
    isEditPayment ? payment?.total.toString() : params.total,
  );
  const [notes, setNotes] = useState(isEditPayment ? payment?.notes : '');
  const [reason, setReason] = useState(isEditPayment ? payment?.reason : '');
  const [clientEmail, setClientEmail] = useState(
    isEditPayment
      ? payment?.emailRecipient || payment?.clientSubprofile?.email || ''
      : params.email,
  );
  const [clientEmailError, setClientEmailError] = useState('');
  const [fromDate, setFromDate] = useState(
    isEditPayment && payment ? moment(payment.date).toDate() : moment().toDate(),
  );
  const [fromDateValue, setFromDateValue] = useState(
    isEditPayment && payment ? payment.date : moment().format(''),
  );

  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialCode, setDialCode] = useState(filterCountry.phonecode);
  const [countryCode, setCountryCode] = useState(providerDetails?.countryCode || deviceCountryCode);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [totalError, setTotalError] = useState('');
  const [clients, setClients] = useState(subClients);
  const [selectedClient, setSelectedClient] = useState<any>(
    isEditPayment
      ? payment?.clientSubprofile
      : params?.clientId,
  );

  const [enableEmailReceipt, setEnableEmailReceipt] = useState<any>(
    (isEditPayment && payment?.emailRecipient) || false,
  );
  const [showPDF, setShowPDF] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [pdfURL, setPdfURL] = useState('');
  const [maxLength, setMaxLength] = useState(10);

  let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  var PhoneNumberType = libphonenumber.PhoneNumberType;
  let PNF = libphonenumber.PhoneNumberFormat;

  useEffect(() => {
    dispatch(getSubClients());
    dispatch(getPaymentMethods());
    // getInvoicesByStatuses();
  }, [dispatch]);

  useEffect(() => {
    const modifyArray = subClients
      ?.filter((client: any) => client?.isActive)
      ?.map((contact: any) => ({
        ...contact,
        value: contact?.firstName || LABELS.noName,
      }));
    setClients(modifyArray);
  }, [subClients]);

  const getInvoicesByStatuses = async (clientSubprofileId?: number) => {
    try {
      const { data } = await InvoicesApi.getInvoicesWithMultipleStatuses(
        'open',
        'overdue',
        100,
        clientSubprofileId,
      );

      setInvoices(
        data?.result?.filter((e: any) => !isOnlinePaymentOption(e?.expectedPaymentMethod?.description) && !isOnlinePaymentOption(e?.expectedPaymentMethod?.shortName))
      );
    } catch (error: any) {
      toast.info(error?.message);
    }
  };
  const getEstimatesByStatuses = async (clientSubprofileId?: number) => {
    try {
      const { data } = await EstimatesApi.getEstimatesWithMultipleStatuses(
        'open',
        'expired',
        100,
        clientSubprofileId,
      );

      setEstimates(
        data?.result?.filter((e: any) => !isOnlinePaymentOption(e?.expectedPaymentMethod?.description) && !isOnlinePaymentOption(e?.expectedPaymentMethod?.shortName))
      );
    } catch (error: any) {
      toast.info(error?.message);
    }
  };
  useEffect(() => {
    if (selectedClient?.id && invoiceDetails) {
      getInvoicesByStatuses(selectedClient?.id);
    }
    if (selectedClient?.id && estimateDetails) {
      getEstimatesByStatuses(selectedClient?.id);
    }
  }, [selectedClient?.id, invoiceDetails, estimateDetails]);

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

  const createPaymentAction = (goalPdf: boolean) => {

    if (!isAddressExist) {
      toast.info(t(translations.payments.errors.timezoneError))
      return;
    }

    if (!newClient || REGEX.fname.test(firstName)) {
      setFirstNameError('');
    } else {
      setFirstNameError(LABELS.notValidFirstName);
      return;
    }

    if (!newClient || REGEX.lname.test(lastName)) {
      setLastNameError('');
    } else {
      setLastNameError(LABELS.notValidLastName);
      return;
    }


    if (moment(fromDate).format('') > moment().format('')) {
      toast.info('Provider can not create payment in future');
      return;
    }
    if (!newClient && !selectedClient) {
      toast.info(LABELS.selectClient);
      return;
    }
    if (!total) {
      toast.info(LABELS.putTotal);
      return;
    }
    if (Number(total) <= 0) {
      setTotalError(t(translations.common.errors.zero, { field: t('Total') }));
      return;
    }
    if (!paymentMethodId) {
      toast.info(LABELS.selectMethod);
      return;
    }
    if (invoiceDetails && invoiceId === null) {
      toast.info(LABELS.selectInvoiceNote);
      return;
    }
    if (estimateDetails && estimateId === null) {
      toast.info(LABELS.selectEstimateNote);
      return;
    }
    if (enableEmailReceipt) {
      if (REGEX.email2.test(String(clientEmail).trim().toLowerCase())) {
        setClientEmailError('');
      } else {
        setClientEmailError('Email address is invalid');
        return
      }
    } else {
      setClientEmailError('');
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
            setPhoneError('Mobile number is not valid');
            toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
            return;
          }
          if (isValid == true) {
            setPhoneError('');
          } else {
            setPhoneError('Mobile number is not valid');
            toast.info(`Please enter valid number followed as : ${exNum}. Note: Please do not add country code with telephone number if it is selected.`)
            return;
          }
        } else {
          setPhoneError('');
        }
      } else {
        setPhoneError('Mobile number is not valid');
        return;
      }
    }
    let payment: any = {
      paymentMethodId: paymentMethodId,
      emailRecipient:
        enableEmailReceipt && !selectedClient?.isConnected ? clientEmail : null,
      total: Number(total),
      date: isEditPayment ? moment(fromDateValue, 'YYYY-MM-DD').format('YYYY-MM-DD') : moment.tz(fromDate, providerTimezone).format('YYYY-MM-DD'),
      notes,
      reason,
    };
    if (newClient) {
      payment = {
        ...payment,
        newClient: {
          firstName,
          lastName,
          phoneNumber: `+${dialCode}-${phoneNumber}`,
          countryCode: countryCode,
        },
      };
    }
    if (invoiceDetails && invoiceId !== null) {
      payment = {
        ...payment,
        invoiceId,
      };
    }
    if (estimateDetails && estimateId !== null) {
      payment = {
        ...payment,
        estimateId,
      };
    }
    if (isEditPayment && invoiceId !== null) {
      payment = {
        ...payment,
        invoiceId,
      };
    }
    if (!newClient) {
      payment = {
        ...payment,
        clientSubprofileId: selectedClient?.id,
      };
    }

    goalPdf && getPDFUrl(payment);

    !goalPdf &&
      dispatch(
        isEditPayment
          ? updatePayment({ ...payment, id: route?.params?.paymentId })
          : createPayment({ payment, onSuccess: route.params.onSuccess }),
      );
  };
  const getPDFUrl = async (dataPayment: any) => {
    try {
      setPreviewLoading(true);
      const { data } = await PaymentsApi.paymentPreviewReceipt(dataPayment);
      setPreviewLoading(false)
      setPdfURL(data?.pdf);
      setShowPDF(true);
    } catch (error: any) {
      setPreviewLoading(false)
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
          {!isEditPayment && invoiceId ? (
            <Text style={styles.userTotal}>
              Invoice Balance
              <Text style={styles.userTotalBold}>
                {' $ ' +
                  invoices?.find((invoice: any) => invoice.id === invoiceId)
                    ?.balance}
              </Text>
            </Text>
          ) : null}
          {isEditPayment && (payment?.invoice || invoiceId) ? (
            <Text style={styles.userTotal}>
              Invoice Balance
              <Text style={styles.userTotalBold}>
                {' $ ' +
                  (payment?.invoice?.balance ||
                    invoices?.find((invoice: any) => invoice.id === invoiceId)
                      ?.balance)}
              </Text>
            </Text>
          ) : null}
          {!isEditPayment && estimateId ? (
            <Text style={styles.userTotal}>
              Estimate Balance
              <Text style={styles.userTotalBold}>
                {' $ ' +
                  estimates?.find((estimate: any) => estimate.id === estimateId)
                    ?.balance}
              </Text>
            </Text>
          ) : null}
          {isEditPayment && (payment?.estimate || estimateId) ? (
            <Text style={styles.userTotal}>
              Estimate Balance
              <Text style={styles.userTotalBold}>
                {' $ ' +
                  (payment?.estimate?.balance ||
                    estimates?.find((estimate: any) => estimate.id === estimateId)
                      ?.balance)}
              </Text>
            </Text>
          ) : null}
        </View>
      </View>
    ) : (
      <Text style={styles.textSelect}>{LABELS.selectAClient}</Text>
    );
  };

  return (
    <MainPageTemplate loading={loading} bc={COLORS.white}>
      {
        countryCodePicker && (
          <CountryPicker
            onPress={(value: any) => {
              setCountryCode(value.countryCode);
              setDialCode(value.dialCode)
              dispatch(closeCountryModal());
            }}
          />
        )
      }
      <ScrollContainer styleExtra={styles.scrollContainer}>
        {!isEditPayment || (isEditPayment && !payment?.clientSubprofile) ? (
          <View style={styles.notifyContainer}>
            {renderToggle(
              LABELS.newClient,
              newClient,
              () => {
                setClientEmail(!newClient ? '' : selectedClient?.email || '');
                setNewClient(!newClient);
                setInvoiceDetails(false);
                setInvoiceId(null);
              },
              isEditPayment &&
              typeof payment?.clientSubprofile?.isConnected === 'boolean',
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
                  setFirstNameError('');
                  setFirstName(text);
                }}
                label={LABELS.firstName}
                w="48%"
                mt={16}
              />
              <Field
                value={lastName}
                error={lastNameError}
                onChange={(text: string) => {
                  setLastNameError('');
                  setLastName(text);
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
                  setPhoneError('');
                  setPhoneNumber(text);
                }
              }}
              label={LABELS.telephone}
              mt={16}
            />
          </>
        ) : isEditPayment && payment?.clientSubprofile ? (
          <View style={[styles.notifyContainer, styles.rowSpace]}>
            {renderClient()}
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.notifyContainer, styles.rowSpace]}
            onPress={() => setShowModal(true)}
          >
            {renderClient()}
            <Image
              source={require('assets/global/chevron.png')}
              style={styles.arrowDown}
            />
          </TouchableOpacity>
        )}
        <Field
          startAdornment={
            <Icon src={require('assets/global/dollar.png')} size={18} />
          }
          error={totalError}
          keyboardType="decimal-pad"
          // @ts-ignore
          value={total}
          onChange={(text: string) => {
            setTotalError('');
            setTotal(text);
          }}
          label={LABELS.receiptTotal}
          mt={16}
        />
        {isEditPayment ? (
          <Datepicker
            editable
            timeZoneOffset={0}
            title={isIOS ? dateFormatWithoutTz(dateWithoutTz(fromDate, providerOffset)) :
              moment(fromDateValue, 'YYYY-MM-DD').format('Do MMM YYYY')}
            label={LABELS.receiptDate}
            required
            mode="date"
            date={moment(fromDate).toDate()}
            maximumDate={parseDate()}
            onConfirm={(value: any) => {
              setFromDate(value)
              setFromDateValue(value);
            }}
            icon={require('assets/bottomBar/calendar.png')}
            mt={16}
          />) : (
          <Datepicker
            editable
            timeZoneOffset={providerOffset}
            title={moment.tz(fromDate, providerTimezone).format('Do MMM YYYY')}
            label={LABELS.receiptDate}
            required
            mode="date"
            date={fromDate}
            maximumDate={parseDate()}
            onConfirm={(value: any) => {
              setFromDate(value)
            }}
            icon={require('assets/bottomBar/calendar.png')}
            mt={16}
          />
        )
        }
        {!newClient && (
          <>
            {!params?.estimateId && <View style={styles.notifyContainer}>
              {renderToggle(
                LABELS.invoiceDetails,
                invoiceDetails,
                () => {
                  if (invoiceDetails) {
                    setInvoiceDetails(false);
                    setTotal('0');
                  } else {
                    setInvoiceDetails(true);
                    setEstimateDetails(false);
                  }
                },
                !selectedClient,
              )}
            </View>}
            {!params?.invoiceId && <View style={styles.notifyContainer}>
              {renderToggle(
                LABELS.estimateDetails,
                estimateDetails,
                () => {
                  if (estimateDetails) {
                    setEstimateDetails(false);
                    setTotal('0');
                  } else {
                    setEstimateDetails(true);
                    setInvoiceDetails(false);
                  }
                },
                !selectedClient,
              )}
            </View>}
          </>
        )}
        {(!isEditPayment || (isEditPayment && !payment?.invoice)) &&
          invoiceDetails && (
            <DropMenu
              placeholder={LABELS.selectInvoice}
              placeholderValue={null}
              disabled={isEditPayment && payment?.invoice}
              onChange={(value) => {
                setInvoiceId(value);
                value &&
                  setSelectedClient(
                    invoices?.find((invoice: any) => invoice.id === value)
                      ?.clientSubprofile,
                  );
                value &&
                  setTotal(
                    invoices
                      ?.find((invoice: any) => invoice.id === value)
                      ?.balance?.toString(),
                  );
              }}
              items={invoices?.map((item: any) => ({
                label: item.number.toString(),
                value: item.id,
                inputLabel: LABELS.invoice + item.number.toString(),
              }))}
              value={invoiceId}
            />
          )}
        {(!isEditPayment || (isEditPayment && !payment?.estimate)) &&
          estimateDetails && (
            <DropMenu
              placeholder={LABELS.selectEstimate}
              placeholderValue={null}
              disabled={isEditPayment && payment?.estimate}
              onChange={(value) => {
                setEstimateId(value);
                value &&
                  setSelectedClient(
                    estimates?.find((estimate: any) => estimate.id === value)
                      ?.clientSubprofile,
                  );
                value &&
                  setTotal(
                    estimates
                      ?.find((estimate: any) => estimate.id === value)
                      ?.balance?.toString(),
                  );
              }}
              items={estimates?.map((item: any) => ({
                label: item.number.toString(),
                value: item.id,
                inputLabel: LABELS.estimate + item.number.toString(),
              }))}
              value={estimateId}
            />
          )}
        <DropMenu
          placeholder={LABELS.paymentMethod}
          onChange={(value) => setPaymentMethodId(value)}
          items={methodList
            ?.filter((item: any) => item.isActive)
            ?.map((item: any) => ({
              label: item.shortName,
              value: item.id,
              inputLabel: LABELS.paymentMethod + item.shortName,
            }))}
          value={paymentMethodId}
        />

        {isEditPayment && payment?.invoice && invoiceDetails && (
          <View
            style={[
              styles.notifyContainer,
              { paddingHorizontal: 8, paddingVertical: 12 },
            ]}
          >
            <Text>{LABELS.invoice + payment?.invoice?.id}</Text>
          </View>
        )}
        <Field
          // @ts-ignore
          value={reason}
          onChange={(text: string) => {
            setReason(text);
          }}
          maxLength={1000}
          size="xl"
          multiline
          label={LABELS.reason}
          mt={16}
        />
        <Field
          // @ts-ignore
          value={notes}
          onChange={(text: string) => {
            setNotes(text);
          }}
          maxLength={1000}
          size="xl"
          multiline
          label={LABELS.notes}
          mt={16}
        />
        <CheckBox
          styleContainer={styles.positionCheckBox}
          checked={enableEmailReceipt}
          onChange={() => setEnableEmailReceipt(!enableEmailReceipt)}
          label={LABELS.sendReceipt}
          styleLabel={styles.emailReceiptTitle}
        />
        {enableEmailReceipt &&
          ((isEditPayment && payment?.emailRecipient) ||
            !selectedClient?.isConnected || selectedClient?.isConnected || newClient) && (
            <>
              <Field
                value={clientEmail}
                label={LABELS.email}
                error={clientEmailError}
                onChange={(text: string) => setClientEmail(text)}
                mt={16}
              />
              <TouchableOpacity onPress={() => createPaymentAction(true)}>
                <Text style={styles.setUpTaxesText}>{LABELS.preview}</Text>
                {
                  previewLoading && (
                    <ActivityIndicator color={COLORS.clearBlue} />
                  )
                }
              </TouchableOpacity>
            </>
          )}
      </ScrollContainer>
      <PdfPreview
        visible={showPDF}
        pdfUrl={pdfURL}
        title="Receipt preview"
        onClose={() => setShowPDF(false)}
      />
      <SubClientsModal
        subClients={clients}
        onModalShow={(show: boolean) => setShowModal(show)}
        showModal={showModal}
        onChangeSelectedClient={(client: any) => {
          setSelectedClient(client);
          setClientEmail(client?.email || '');
          setInvoiceId(null);
        }}
      />
      <View style={styles.bottomBlock}>
        <Button
          onPress={() => createPaymentAction(false)}
          text={LABELS.save}
          buttonStyle={styles.btnTrial}
          textStyle={styles.textTrial}
        />
      </View>
    </MainPageTemplate>
  );
};

export default AddPayments;