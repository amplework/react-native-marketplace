import { StackScreenProps } from '@react-navigation/stack';
//@ts-ignore
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Datepicker } from 'shared/datepicker';
import { Field } from 'shared/field';
import { Paragraph } from 'shared/paragraph';
import { PdfPreview } from 'shared/pdfPreview';
import { Radio } from 'shared/radio';
import ScrollContainer from 'shared/scrollContainer';
import { MainPageTemplate } from 'shared/templates';
import {
  generateReport,
  reportSelectors,
  resetReport,
} from 'store/entities/report';
import { subscriptionSelectors } from 'store/entities/subscription';
import { userSelectors } from 'store/entities/user';
import { ReportValues, SendOption } from 'types/report';
import COLORS from 'utils/colors';
import { parseDate } from 'utils/dates';
import { getFullName } from 'utils/strings';

import {
  DATE_OPTIONS,
  SENDER_OPTIONS,
  TYPE_OF_TRANSACTIONS,
  TYPE_OF_TRANSACTIONS_LITE_USER,
} from '../../helpers/constants';
import { formatReport, getDateRange } from '../../helpers/utils';
import { reportSchema } from '../../helpers/validation';
import { reportsStyles as S } from '../style';

type Props = StackScreenProps<RootStackParamList> & {
  title: string;
  pdfTitle: string;
  isSummary?: boolean;
};

const TransactionReport: React.FC<Props> = ({
  navigation,
  title,
  pdfTitle,
  isSummary,
}) => {
  const user = useSelector(userSelectors.user);
  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;
  const providerTimezone = provider?.address?.utctimezone;
  const pdfUrl = useSelector(reportSelectors.pdfUrl);
  const loading = useSelector(reportSelectors.loading);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { values, errors, setFieldValue, handleSubmit } =
    useFormik<ReportValues>({
      initialValues: {
        period: 'month',
        fromDate: parseDate(),
        toDate: parseDate(),
        typeOfTransaction: 'all',
        sendOption: 'show',
        email: null,
      },
      validationSchema: reportSchema,
      validateOnChange: false,
      onSubmit: (formValues: any) => {
        const formattedValues = formatReport(formValues);
        dispatch(generateReport({ ...formattedValues, isSummary }));
      },
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={t(title)} />,
    });
  }, [navigation, t, title]);

  const handleFieldChange =
    <F extends keyof ReportValues>(field: F) =>
      (value: ReportValues[F]) =>
        setFieldValue(field, value);

  const handleSentOptionChange = (value: SendOption) => () => {
    if (value === 'show') {
      setFieldValue('email', null);
    }

    setFieldValue('sendOption', value);
  };

  const handleDateChange = (date: Date) => {
    setFieldValue('fromDate', date);

    if (date > values.toDate) {
      setFieldValue('toDate', date);
    }
  };

  const handleRadioChange =
    <F extends keyof ReportValues>(field: F, value: ReportValues[F]) =>
      () =>
        setFieldValue(field, value);

  const closePdf = () => {
    dispatch(resetReport());
  };

  return (
    <MainPageTemplate bc={COLORS.white}>
      {pdfUrl && (
        <PdfPreview
          visible={!!pdfUrl}
          pdfUrl={pdfUrl}
          title={t(translations.reports.preview)}
          shareable
          pdfName={t(pdfTitle, {
            name: user ? getFullName(user) : '',
            type: values.typeOfTransaction,
            ...getDateRange(values),
          })}
          onClose={closePdf}
        />
      )}
      <ScrollContainer styleExtra={S.content}>
        <Box>
          <Paragraph type="bold" mb={5}>
            {t(translations.reports.dateRange)}
          </Paragraph>
          {DATE_OPTIONS.map((dateOption) => (
            <Radio
              key={dateOption.value}
              checked={dateOption.value === values.period}
              mt={10}
              onChange={handleRadioChange('period', dateOption.value)}
            >
              <Paragraph type="book" ml={8}>
                {t(dateOption.label)}
              </Paragraph>
            </Radio>
          ))}
        </Box>
        {values.period === 'date' && (
          <Box row jc="space-between" mt={20}>
            <Datepicker
              flex
              editable
              timeZoneOffset={providerOffset}
              title={moment.tz(values.fromDate, providerTimezone).format('Do MMM YYYY')}
              label={t(translations.reports.startDate)}
              required
              mode="date"
              date={values.fromDate}
              onConfirm={handleDateChange}
              icon={require('assets/global/calendar.png')}
              mr={15}
            />
            <Datepicker
              flex
              editable
              timeZoneOffset={providerOffset}
              title={moment.tz(values.toDate, providerTimezone).format('Do MMM YYYY')}
              label={t(translations.reports.endDate)}
              required
              mode="date"
              date={values.toDate}
              minimumDate={values.fromDate}
              onConfirm={handleFieldChange('toDate')}
              icon={require('assets/global/calendar.png')}
            />
          </Box>
        )}
        <Box mt={20}>
          <Paragraph type="bold" mb={5}>
            {t(translations.reports.typeOfTransaction)}
          </Paragraph>
          {(liteSubcription ? TYPE_OF_TRANSACTIONS_LITE_USER : TYPE_OF_TRANSACTIONS).map((type) => (
            <Radio
              key={type.value}
              checked={type.value == values.typeOfTransaction}
              mt={10}
              onChange={handleRadioChange('typeOfTransaction', type.value)}
            >
              <Paragraph type="book" ml={8}>
                {t(type.label)}
              </Paragraph>
            </Radio>
          ))}
        </Box>
        <Box mt={20}>
          <Paragraph type="bold" mb={5}>
            {t(translations.reports.sendReportTo)}
          </Paragraph>
          {SENDER_OPTIONS.map((option) => (
            <Radio
              key={option.label}
              checked={option.value === values.sendOption}
              mt={10}
              onChange={handleSentOptionChange(option.value)}
            >
              <Paragraph type="book" ml={8}>
                {t(option.label)}
              </Paragraph>
            </Radio>
          ))}
        </Box>
        {values.sendOption === 'send' && (
          <Field
            label={t(translations.form.email)}
            required
            value={values?.email || ''}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChange={handleFieldChange('email')}
            mt={20}
          />
        )}
      </ScrollContainer>
      <View style={S.saveButtonContainer}>
        <Button
          text={
            values.sendOption === 'send'
              ? t(translations.reports.sendReport)
              : t(translations.reports.displayReport)
          }
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </MainPageTemplate>
  );
};

export { TransactionReport };
