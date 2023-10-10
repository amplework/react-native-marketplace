import { StackScreenProps } from '@react-navigation/stack';
import { getRepeatDetails, getRepeatOption } from 'components/tasks/helpers/adapters';
import { REMIND_ME_INTERVALS } from 'components/tasks/helpers/options';
import moment from 'moment-timezone';
import { usePrevious } from 'hooks';
import { RootStackParamList } from 'index';
import I18n, { t, translations } from 'locales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Datepicker } from 'shared/datepicker';
import DropMenu from 'shared/dropMenu';
import { Field } from 'shared/field';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Toggle } from 'shared/toggle';
import {
  calendarSetupSelectors,
  getCalendarSettings,
} from 'store/entities/calendarSetup';
import { createTask, editTask, tasksSelectors } from 'store/entities/tasks';
import { RepeatValues, TaskValues } from 'types/tasks';
import COLORS from 'utils/colors';
import {
  dateWithoutTz,
  isBefore,
  isToday,
  minutes,
  parseApiTime,
  parseDate,
} from 'utils/dates';

import { RepeatModal } from './components/repeatModal';
import { styles } from './style';
import { toast } from 'shared/toast';
import { isIOS } from 'utils/device';
import REGEX from 'utils/regex';
import { SHORT_FIELD_MAX_LENGTH } from 'utils/constants';

interface Props extends StackScreenProps<RootStackParamList, 'AddEditTask'> { }

const AddEditTask: React.FC<Props> = ({ navigation, route }) => {
  const settings = useSelector(calendarSetupSelectors.settings);
  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerOffset = providerDetails?.utcOffset;
  const providerTimezone = providerDetails?.address?.utctimezone;
  const isAddressExist = (providerDetails?.address?.location?.lat == null
    && providerDetails?.address?.location?.lat == null)
    ? false : true

  const [state, setState] = useState<any>({
    name: '',
    description: '',
    dueDate: moment().startOf('day').toDate(),
    time: minutes.add(moment().toDate(), 10),
    remindProvider: null,
    dueTime: minutes.add(moment().toDate(), 10),
    repeat: false,
    repeatModal: false,
    repeatOption: 0,
    repeatWeekday: null,
    repeatMonthDay: null,
    repeatMonth: null,
    timeError: '',
    nameError: '',
    descriptionError: '',
  });

  const taskDetailValues = {
    name: state.name,
    description: state.description,
    dueDate: state.dueDate,
    time: state.time,
    remindProvider: state.remindProvider,
    repeat: state.repeat,
    repeatModal: state.repeatModal,
    repeatOption: state.repeatOption,
    repeatWeekday: state.repeatWeekday,
    repeatMonthDay: state.repeatMonthDay,
    repeatMonth: state.repeatMonth,
  }

  const loading = useSelector(tasksSelectors.addEditLoading);

  const handleSubmit = () => {
    if (!isAddressExist) {
      toast.info(t(translations.tasks.errors.timezoneError));
      return;
    }

    if (moment(state.dueDate).isBefore(moment(), 'date') == true) {
      toast.info('Task can not be created in past date.')
      return;
    }

    if (isToday(state.dueDate) && moment.utc(state.time).format() < moment.utc().format()) {
      toast.info('Task can not be created in past time.')
      return;
    }

    if (!state.name.trim()) {
      setState((prev: any) => ({ ...prev, nameError: I18n.t('common.errors.required', { field: 'name' }) }));
      return;
    }

    if (!REGEX.title.test(state.name)) {
      setState((prev: any) => ({ ...prev, nameError: I18n.t('common.errors.forbiddenSymbols', { field: 'name' }) }));
      return;
    }

    if (state.name.trim().length > SHORT_FIELD_MAX_LENGTH) {
      setState((prev: any) => ({ ...prev, nameError: I18n.t('common.errors.maxLength', { field: 'name', length: SHORT_FIELD_MAX_LENGTH }) }));
      return;
    }

    if (state.description.trim().length > SHORT_FIELD_MAX_LENGTH) {
      setState((prev: any) => ({ ...prev, description: I18n.t('common.errors.maxLength', { field: 'name', length: SHORT_FIELD_MAX_LENGTH }) }));
      return;
    }

    const taskDetail = {
      name: state.name,
      description: state.description,
      dueDate: state.dueDate,
      time: state.time,
      remindProvider: state.remindProvider,
      repeat: state.repeat,
      repeatModal: state.repeatModal,
      repeatOption: state.repeatOption,
      repeatWeekday: state.repeatWeekday,
      repeatMonthDay: state.repeatMonthDay,
      repeatMonth: state.repeatMonth,
    }
    console.log("taskDetail ==== >>> ", taskDetail);

    if (route.params?.task) {
      dispatch(
        editTask({ values: taskDetail, onSuccess: route.params.onEdit }),
      );
    } else {
      !Date ? toast.info(`You cannot create tasks in the past`) : dispatch(createTask(taskDetail));
    }
  }

  const previousDueDate = usePrevious(state.dueDate);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Paragraph size="l" type="bold" ml={20}>
          {I18n.t('tasks.details')}
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
    if (route.params?.task) {

      let task = route.params?.task;
      console.log("task +++ >>> ", task);
      // let taskDueTime = parseApiTime(task.time);
      setState((prev: any) => ({
        ...prev,
        name: task.name,
        description: task.description || '',
        dueDate: moment(task.date).toDate(),
        dueTime: task.time,
        time: task.time,
        remindProvider: task.remindProvider,
        repeat: !!task.repeatFrequency,
        repeatModal: false,
        repeatOption: getRepeatOption(task),
        repeatWeekday: task.repeatWeekday,
        repeatMonthDay: task.repeatMonthDay,
        repeatMonth: task.repeatMonth,
      }));
    }

  }, [route.params]);

  useEffect(() => {
    console.log("+++++++++===>>> ", state.dueTime);
    
  }, [state.dueTime]);

  useEffect(() => {
    if (route.params?.task) {
      return;
    }

    dispatch(getCalendarSettings());
  }, [route.params, dispatch]);

  useEffect(() => {
    if (state.repeat) {
      return;
    }

    const fromCurrentToOtherDate =
      previousDueDate && isToday(previousDueDate) && !isToday(state.dueDate);

    if (fromCurrentToOtherDate) {
      setState((prev: any) => ({ ...prev, time: parseApiTime(settings.dayStart) }))
    }
  }, [previousDueDate, settings, state.dueDate, state.repeat]);

  useEffect(() => {
    if (state.repeat) {
      return;
    }

    const fromOtherToCurrentDate =
      previousDueDate && !isToday(previousDueDate) && isToday(state.dueDate);

    if (fromOtherToCurrentDate) {
      setState((prev: any) => ({ ...prev, time: parseApiTime(minutes.add(parseDate(), 10)) }))
    }
  }, [previousDueDate, state.dueDate, state.repeat]);

  const toggleRepeat = (checked: boolean) =>
    checked
      ? setState((prev: TaskValues) => ({ ...prev, repeatModal: checked }))
      : setState((prev: TaskValues) => ({ ...prev, repeat: checked }));

  const openRepeatModal = () => setState((prev: TaskValues) => ({ ...prev, repeatModal: true }));

  const closeRepeatModal = () => setState((prev: TaskValues) => ({ ...prev, repeatModal: false }));

  const handleTimeConfirm = (date: Date) => {
    const { params } = route;

    setState((prev: any) => ({ ...prev, time: date, dueTime: date }))

    const canUsePastTime =
      params?.task && minutes.isSame(parseApiTime(params.task.time), date);
    const outOfTimeRange =
      isToday(state.dueDate) && isBefore(minutes.increment(date), parseDate());

    if (!canUsePastTime && !state.repeat && outOfTimeRange) {
      setState((prev: any) => ({ ...prev, timeError: I18n.t('tasks.errors.time') }))
      // setErrors({ ...errors, time: I18n.t('tasks.errors.time') });
    } else {
      setState((prev: any) => ({ ...prev, timeError: '' }))
    }
  };

  const handleRepeatFormSubmit = (repeatValues: RepeatValues) => {
    setState((prev: TaskValues) => ({
      ...prev,
      repeatOption: repeatValues.repeatOption,
      repeatWeekday:
        repeatValues.repeatOption === 1
          ? [repeatValues.weekly.day]
          : repeatValues.repeatOption === 4
            ? repeatValues.weekly.days
            : null,
      repeatMonth:
        repeatValues.repeatOption === 3 ? repeatValues.yearly.month : null,
      repeatMonthDay:
        repeatValues.repeatOption === 2
          ? repeatValues.monthly.day
          : repeatValues.repeatOption === 3
            ? repeatValues.yearly.day
            : null,
      repeatModal: false,
      repeat: true,
    }))
  };

  const taskDueDate = dateWithoutTz(state.dueDate, providerOffset);
  // const taskDueTime = dateWithoutTz(taskTime, providerOffset);  

  return (
    <SafeContainer containerStyle={styles.container}>
      {state.repeatModal && (
        <RepeatModal
          initialValues={{
            repeatMonth: state.repeatMonth,
            repeatMonthDay: state.repeatMonthDay,
            repeatOption: state.repeatOption,
            repeatWeekday: state.repeatWeekday,
          }}
          onSubmit={handleRepeatFormSubmit}
          onClose={closeRepeatModal}
        />
      )}
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.scrollView}
      >
        <Box row jc="space-between" mb={4}>
          {
            route.params?.task ? (
              !state.repeat && <Datepicker
                flex
                editable
                title={moment(state.dueDate, 'YYYY-MM-DD').format('Do MMM YYYY')}
                timeZoneOffset={providerOffset}
                label={I18n.t('tasks.fields.date')}
                required
                mode="date"
                date={moment(state.dueDate).toDate()}
                minimumDate={parseDate()}
                onConfirm={(value: any) => setState((prev: TaskValues) => ({ ...prev, dueDate: value }))}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
            ) : (
              !state.repeat && <Datepicker
                flex
                editable
                title={moment(state?.dueDate).format('Do MMM YYYY')}
                label={I18n.t('tasks.fields.date')}
                timeZoneOffset={providerOffset}
                required
                mode="date"
                date={state.dueDate}
                minimumDate={parseDate()}
                onConfirm={(value: any) => setState((prev: TaskValues) => ({ ...prev, dueDate: moment(value).startOf('day').toDate() }))}
                icon={require('assets/global/calendar.png')}
                mr={15}
              />
            )
          }
          {
            route?.params?.task ? (
              <Datepicker
                flex
                editable
                title={moment.utc(state.time, 'HH:mm').local().format('LT')}
                // title={formatTime(state.dueTime, { utc: true })}
                label={I18n.t('tasks.fields.time')}
                required
                date={moment.utc(state.time, 'HH:mm').local().toDate()}
                minimumDate={
                  !state.repeat && isToday(state.dueDate)
                    ? parseDate()
                    : undefined
                }
                onConfirm={(handleTimeConfirm)}
                mode="time"
                icon={require('assets/global/reminders.png')}
              />
            ) : (
              <Datepicker
                flex
                editable
                title={moment.tz(state.time, providerTimezone).format('hh:mm A')}
                // title={formatTime(values.time, { utc: true })}
                label={I18n.t('tasks.fields.time')}
                required
                date={state.time}
                minimumDate={
                  !state.repeat && isToday(state.dueDate)
                    ? parseDate()
                    : undefined
                }
                onConfirm={handleTimeConfirm}
                mode="time"
                icon={require('assets/global/reminders.png')}
              />
            )
          }
        </Box>
        <DropMenu
          value={state.remindProvider}
          onChange={(value: any) => setState((prev: TaskValues) => ({ ...prev, remindProvider: value }))}
          items={REMIND_ME_INTERVALS}
          style={styles.select}
        />
        <Field
          value={state.name}
          label={I18n.t('tasks.fields.name')}
          onChange={(text: any) => setState((prev: TaskValues) => ({ ...prev, name: text }))}
          error={state.nameError}
          required
          mb={20}
        />
        <Field
          value={state.description}
          label={I18n.t('tasks.fields.description')}
          onChange={(text: any) => setState((prev: TaskValues) => ({ ...prev, description: text }))}
          error={state.descriptionError}
          size="xl"
          multiline
          mb={20}
        />
        <View style={styles.card}>
          <Box row jc="space-between" ai="center" pv={16} pr={16}>
            <Paragraph size="s" type="book">
              {I18n.t('tasks.fields.repeat')}
            </Paragraph>
            <Toggle checked={state.repeat} onChange={toggleRepeat} />
          </Box>
        </View>
        {state.repeat && (
          <>
            <Paragraph size="s" mb={6}>
              {getRepeatDetails(taskDetailValues)}
            </Paragraph>
            <TouchableOpacity onPress={openRepeatModal}>
              <Paragraph size="s" color={COLORS.clearBlue}>
                {I18n.t('tasks.editTaskSettings')}
              </Paragraph>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <View style={styles.saveButtonContainer}>
        <Button
          text={I18n.t('tasks.save')}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </SafeContainer>
  );
};

export { AddEditTask };