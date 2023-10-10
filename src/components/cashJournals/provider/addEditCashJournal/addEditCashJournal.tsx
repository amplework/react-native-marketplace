import { StackScreenProps } from '@react-navigation/stack';
import { adaptCashJournal } from 'components/cashJournals/helpers/adapters';
import { cashJournalSchema } from 'components/cashJournals/helpers/validation';
//@ts-ignore
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Datepicker } from 'shared/datepicker';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { AddPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import {
  cashJournalsSelectors,
  createCashJournal,
  editCashJournal,
} from 'store/entities/cashJournals';
import { CashJournalValues } from 'types/cashJournals';
import { IProviderUser } from 'types/users';
import { dateFormatWithoutTz, dateWithoutTz } from 'utils/dates';
import { isIOS } from 'utils/device';

type Props = StackScreenProps<RootStackParamList, 'AddEditCashJournal'>;

type State = {
  provider: {
    provider: IProviderUser;
  };
};

const AddEditCashJournal: React.FC<Props> = ({ navigation, route }) => {
  const { journal, onEdit } = route.params || {};

  const provider = useSelector((state: State) => state.provider.provider);
  const providerTimezone: any = provider?.address?.utctimezone;
  const providerOffset = provider?.utcOffset;

  const isAddressExist = (provider?.address?.location?.lat == null
    && provider?.address?.location?.lat == null)
    ? false : true;

  const loading = useSelector(cashJournalsSelectors.addEditLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { values, errors, setFieldValue, setFieldError, handleSubmit }: any = useFormik({
    initialValues: journal
      ? adaptCashJournal(journal)
      : {
        description: t(translations.cashJournals.initialDescription),
        date: moment().toDate(),
        total: '',
        notes: '',
      },
    validationSchema: cashJournalSchema,
    validateOnChange: false,
    onSubmit: (cashJournalValues: any) => {
      if (!isAddressExist) {
        toast.info(t(translations.cashJournals.errors.timezoneError))
        return;
      }
      if (cashJournalValues?.total.includes('.')) {
        setFieldError('total', t(translations.cashJournals.errors.roundFigureError))
        return;
      }
      if (cashJournalValues?.total.trim().length > 6) {
        setFieldError('total', t(translations.cashJournals.errors.lengthError))
        return;
      }
      if (!cashJournalValues?.description.trim().length) {
        setFieldError('description', 'Description is a required field.')
        return;
      }

      if (journal) {
        dispatch(
          editCashJournal({
            id: journal.id,
            values: cashJournalValues,
            onSuccess: onEdit,
          }),
        );
      } else {
        const newCashJournal = {
          description: cashJournalValues?.description,
          date: moment(cashJournalValues?.date).format('YYYY-MM-DD'),
          total: cashJournalValues?.total,
          notes: cashJournalValues?.notes,
        }
        dispatch(createCashJournal(newCashJournal));
      }
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={20}>
          {t(translations.cashJournals.details.title)}
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
  }, [navigation, t]);

  const handleChange =
    <F extends keyof CashJournalValues>(field: F) =>
      (value: CashJournalValues[F]) =>
        setFieldValue(field, value);

  const cashJournalDate = dateWithoutTz(values.date, providerOffset);

  return (
    <>
      <AddPageTemplate
        loading={loading}
        entity={translations.common.entities.cashJournal}
        onSavePress={handleSubmit}
      >
        {journal ? (
          <Datepicker
            flex
            editable
            title={isIOS ? dateFormatWithoutTz(cashJournalDate) :
              moment(values.date, 'YYYY-MM-DD').format('Do MMM YYYY')}
            timeZoneOffset={0}
            label={t(translations.form.date)}
            date={moment(values.date).toDate()}
            onConfirm={handleChange('date')}
            mode="date"
            required
            icon={require('assets/global/calendar.png')}
            mb={20}
            mt={20}
          />
        ) : (
          <Datepicker
            flex
            editable
            title={moment.tz(values.date, providerTimezone).format('Do MMM YYYY')}
            timeZoneOffset={providerOffset}
            label={t(translations.form.date)}
            date={moment(values.date).toDate()}
            onConfirm={handleChange('date')}
            mode="date"
            required
            icon={require('assets/global/calendar.png')}
            mb={20}
            mt={20}
          />
        )}
        <Field
          value={values.total}
          label={t(translations.form.total)}
          onChange={handleChange('total')}
          error={errors.total}
          required
          keyboardType="numeric"
          mb={20}
        />
        <Field
          value={values.description}
          label={t(translations.form.description)}
          onChange={handleChange('description')}
          error={errors.description}
          maxLength={255}
          required
          size="xl"
          multiline
          mb={20}
        />
        <Field
          value={values.notes}
          label={t(translations.form.notes)}
          onChange={handleChange('notes')}
          error={errors.notes}
          multiline
          size="xl"
          mb={20}
        />
      </AddPageTemplate>
    </>
  );
};

export { AddEditCashJournal };
