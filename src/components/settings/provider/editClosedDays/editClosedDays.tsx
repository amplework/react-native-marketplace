import { REASONS } from 'components/settings/helpers/options';
import I18n from 'locales';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BottomSheet } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import {
  closedDaysSelectors,
  closeEditModal,
  editClosedDays,
} from 'store/entities/closedDays';
import { deleteClosedDays } from 'store/entities/closedDays';
import { days } from 'utils/dates';

import { EditHeader } from './components/editHeader';
import { styles } from './style';

const EditClosedDays: React.FC = () => {
  const closedDays: any = useSelector(closedDaysSelectors.closedDays);
  const provider = useSelector((state: any) => state.provider.provider);
  const providerOffset = provider?.utcOffset;
  const [fromDate, setFromDate] = useState(moment().toDate());
  const [isMultipleDays, setMultipleDays] = useState(false);
  const [toDate, setToDate] = useState(days.increment(fromDate));
  const [reason, setReason] = useState('holiday');
  const [description, setDescription] = useState('');
  const [shouldSendClientsNotification, setSendClientsNotification] =
    useState(false);

  const dispatch = useDispatch();  

  useEffect(() => {
    if (!closedDays) {
      return;
    }

    const initialToDate = days.increment(closedDays.fromDate);

    setFromDate(closedDays.fromDate);
    setMultipleDays(!!closedDays.toDate);
    setToDate(closedDays.toDate ? closedDays.toDate : initialToDate);
    setReason(closedDays.reason);
    setDescription(closedDays.description || '');
  }, [closedDays]);

  useEffect(() => {
    if (days.isSameOrAfter(fromDate, toDate)) {
      setToDate(days.increment(fromDate));
    }
  }, [fromDate, toDate]);

  const confirmDelete = () =>
    alert.deletion({
      entity: I18n.t('common.entities.closedDays'),
      onDelete: handleDelete,
    });

  const handleDelete = () => dispatch(deleteClosedDays(closedDays!.id));

  const handleClose = () => dispatch(closeEditModal());

  const confirmSave = () =>
    Alert.alert(
      I18n.t('common.warning'),
      I18n.t('closedDays.saveWarningMessage'),
      [
        { text: I18n.t('common.cancel'), style: 'cancel' },
        {
          text: I18n.t('common.save'),
          onPress: handleEdit,
        },
      ],
    );

  const handleEdit = () => {
    dispatch(
      editClosedDays({
        id: closedDays!.id,
        fromDate: moment(fromDate).startOf('day').hour(12)
        .minute(0)
        .toISOString(),
        toDate: isMultipleDays ? moment(toDate).startOf('day').hour(12)
        .minute(0)
        .toISOString() : null,
        reason,
        description,
        shouldSendClientsNotification,
      }),
    );
  }
    
  return (
    <BottomSheet>
      <EditHeader
        deletable={!!closedDays}
        onClose={handleClose}
        onDelete={confirmDelete}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <Box flex>
          <Datepicker
            editable
            timeZoneOffset={providerOffset}
            title={moment(fromDate).format('Do MMM YYYY')}
            label={I18n.t('closedDays.fromDate')}
            required
            mode="date"
            date={moment(fromDate).toDate()}
            onConfirm={(value) => {
              setFromDate(value)
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
              title={moment(toDate).format('Do MMM YYYY')}
              label={I18n.t('closedDays.toDate')}
              required
              mode="date"
              date={moment(toDate).toDate()}
              minimumDate={days.increment(fromDate)}
              onConfirm={(value) => {
                setToDate(value)
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

export { EditClosedDays };