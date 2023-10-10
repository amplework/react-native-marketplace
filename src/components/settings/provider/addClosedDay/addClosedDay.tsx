import { REASONS } from 'components/settings/helpers/options';
import I18n from 'locales';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { calendarSetupSelectors } from 'store/entities/calendarSetup';
import {
  closeModal,
} from 'store/entities/closedDays';
import { createClosedDays } from 'store/entities/closedDays';
import { days } from 'utils/dates';

import { EditHeader } from './components/editHeader';
import { styles } from './styles';
import { toast } from 'shared/toast';

const AddClosedDays: React.FC = () => {
  const provider = useSelector((state: any) => state.provider.provider);
  const settings = useSelector(calendarSetupSelectors.settings);
  const providerOffset = provider?.utcOffset;
  const providerTimezone = provider?.address?.utctimezone;
  const [fromDate, setFromDate] = useState<any>(moment().format(''));
  const [fromDateValue, setFromDateValue] = useState(moment().toDate());
  const [isMultipleDays, setMultipleDays] = useState(false);
  const [toDate, setToDate] = useState<any>(moment().add(1, 'day').format(''));
  const [toDateValue, setToDateValue] = useState(moment().add(1, 'day').toDate());
  const [reason, setReason] = useState('holiday');
  const [description, setDescription] = useState('');
  const [shouldSendClientsNotification, setSendClientsNotification] =
    useState(false);

  const dispatch = useDispatch();  

  const handleClose = () => dispatch(closeModal());

  const confirmSave = () =>
    Alert.alert(
      I18n.t('common.warning'),
      I18n.t('closedDays.saveWarningMessage'),
      [
        { text: I18n.t('common.cancel'), style: 'cancel' },
        {
          text: I18n.t('common.save'),
          onPress: handleCreate,
        },
      ],
    );

  const handleCreate = () => {
    if(moment(fromDate).format('') < moment().format('')) {
      toast.info('Closed day can not be created in past date.');
      return;
    }
    dispatch(
      createClosedDays({
        fromDate: moment(fromDate).startOf('day').hour(12)
        .minute(0)
        .toISOString(),
        toDate: isMultipleDays ? moment(toDate).startOf('day').hour(12)
        .minute(0)
        .toISOString() : null,
        description,
        reason,
        shouldSendClientsNotification,
      }),
    ); 
  }
  
  const dayStart = settings?.dayStart;
  const dayStartHour = moment(dayStart, 'hh:mm:ss').hour();
  const dayStartMinute = moment(dayStart, 'hh:mm:ss').minute();
  const dayStartSecond = moment(dayStart, 'hh:mm:ss').second();

  // const dayEnd = settings?.dayEnd;
  // const dayEndHour = moment(dayEnd, 'hh:mm:ss').hour();
  // const dayEndMinute = moment(dayEnd, 'hh:mm:ss').minute();
  // const dayEndSecond = moment(dayEnd, 'hh:mm:ss').second();

  return (
    <BottomSheet>
      <EditHeader
        onClose={handleClose}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box flex>
          <Datepicker
            editable
            timeZoneOffset={providerOffset}
            title={moment.tz(fromDate, providerTimezone).format('Do MMM YYYY')}
            label={I18n.t('closedDays.fromDate')}
            required
            mode="date"
            date={fromDateValue}
            onConfirm={(value) => {       
              const selectedValue = moment(value).set({
                hour: dayStartHour,
                minute: dayStartMinute,
                second: dayStartSecond
              }).format('');
              // const selectedExtendedValue = moment(value).add(1, 'day').set({
              //   hour: dayEndHour,
              //   minute: dayEndMinute,
              //   second: dayEndSecond
              // }).format('');
              setFromDate(value)
              setFromDateValue(value)
              setToDate(moment(value).add(1, 'day').startOf('day').format(''))
              setToDateValue(moment(value).add(1, 'day').toDate())
            }}
            icon={require('assets/bottomBar/calendar.png')}
            mb={16}
          />
          <CheckBox
            checked={isMultipleDays}
            onChange={setMultipleDays}
            label={I18n.t('closedDays.multipleDays')}
            styleContainer={styles.checkbox}
            styleLabel={styles.textPrimary}
          />
          {isMultipleDays && (
            <Datepicker
              editable
              timeZoneOffset={providerOffset}
              title={moment.tz(toDate, providerTimezone).format('Do MMM YYYY')}
              label={I18n.t('closedDays.toDate')}
              required
              mode="date"
              date={toDateValue}
              minimumDate={days.increment(fromDate)}
              onConfirm={(value) => {
                setToDate(value)
                setToDateValue(moment(value).toDate())
              }}
              icon={require('assets/bottomBar/calendar.png')}
              mt={16}
            />
          )}
          <DropMenu value={reason} onChange={setReason} items={REASONS} />
          <Field
            value={description}
            onChange={setDescription}
            label={I18n.t('closedDays.fields.description')}
            size="xl"
            multiline
            mv={16}
          />
          <CheckBox
            checked={shouldSendClientsNotification}
            onChange={setSendClientsNotification}
            label={I18n.t('closedDays.sendNotifications')}
            styleContainer={styles.checkbox}
            styleLabel={styles.textPrimary}
          />
        </Box>
        <Button
          text={I18n.t('common.saveChanges')}
          onPress={confirmSave}
          buttonStyle={styles.saveButton}
        />
      </ScrollView>
    </BottomSheet>
  );
};

export { AddClosedDays };