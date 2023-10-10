import { StackScreenProps } from '@react-navigation/stack';
import { useFormik } from 'formik';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import CheckBox from 'shared/checkbox';
import SafeContainer from 'shared/container';
import DropMenu from 'shared/dropMenu';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import {
  getNotificationSettings,
  notificationSettingsSelectors,
  updateNotificationSettings,
} from 'store/entities/notificationSettings';
import { subscriptionSelectors } from 'store/entities/subscription';
import { userSelectors } from 'store/entities/user';
import { theme } from 'theme';
import { NotificationSettingsValues } from 'types/settings';
import { isClient } from 'types/users';
import { exclude } from 'utils/array';

import {
  CLIENT_NOTIFICATION_SERVICES,
  NotificationOption,
  NotificationSubOption,
  PROVIDER_NOTIFICATION_SERVICES,
  PROVIDER_NOTIFICATION_SERVICES_LITE,
  REMINDER_TIME_OPTIONS,
} from './helpers/constants';
import { notificationSettingsStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const NotificationSettings: React.FC<Props> = ({ navigation }) => {
  const user = useSelector(userSelectors.user);
  const settings = useSelector(notificationSettingsSelectors.settings);
  const reminderTime = useSelector(notificationSettingsSelectors.reminderTime);
  const loading = useSelector(notificationSettingsSelectors.loading);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const updateLoading = useSelector(
    notificationSettingsSelectors.updateLoading,
  );

  const dispatch = useDispatch();

  const { values, setFieldValue, setValues, handleSubmit } =
    useFormik<NotificationSettingsValues>({
      initialValues: {
        settings: {
          sms: [],
          push: [],
          email: [],
        },
        reminderTime: 60,
        isFromSignup: false,
      },
      onSubmit: (notificationSettingsValues) => {
        const notifications = Object.values(
          notificationSettingsValues.settings,
        );
        const isAllDisabled = notifications.every((types) => !types.length);

        if (isAllDisabled) {
          return alert.editing({
            message: t(translations.notificationSettings.alerts.save),
            onEdit: () =>
              dispatch(updateNotificationSettings(notificationSettingsValues)),
          });
        }

        dispatch(updateNotificationSettings(notificationSettingsValues));
      },
    });

  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.notificationSettings.header)} />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    dispatch(getNotificationSettings());
  }, [dispatch]);

  useEffect(() => {
    setValues({ settings, reminderTime });
  }, [settings, reminderTime, setValues]);

  const handleChange =
    <F extends keyof NotificationSettingsValues>(field: F) =>
    (value: NotificationSettingsValues[F]) =>
      setFieldValue(field, value);

  const handleOptionChange =
    (service: NotificationOption) => (checked: boolean) => {
      const allNotifications = service.notifications.map(({ value }) => value);
      const newSelectedNotifications = checked ? allNotifications : [];

      setFieldValue(`settings.${service.value}`, newSelectedNotifications);
    };

  const handleSubOptionChange =
    (service: NotificationOption) =>
    (notification: NotificationSubOption) =>
    (checked: boolean) => {
      const selectedNotifications = values.settings[service.value];
      const newSelectedNotifications = checked
        ? [...selectedNotifications, notification.value]
        : exclude(notification.value)(selectedNotifications);

      setFieldValue(`settings.${service.value}`, newSelectedNotifications);
    };

  const notificationServices = isClient(user)
    ? CLIENT_NOTIFICATION_SERVICES
    : liteSubcription
    ? PROVIDER_NOTIFICATION_SERVICES_LITE
    : PROVIDER_NOTIFICATION_SERVICES;

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <Loader loading={loading} />
      <ScrollView contentContainerStyle={S.scrollView}>
        {notificationServices.map((service) => {
          const selectedNotifications = values.settings[service.value];
          const isActive = selectedNotifications.length > 0;

          return (
            <>
              <CheckBox
                key={service.value}
                checked={isActive}
                onChange={handleOptionChange(service)}
                label={service.label}
                styleContainer={theme.spacing.mb(14)}
                styleLabel={S.primaryLabel}
              />
              {isActive &&
                service.notifications.map((notification) => (
                  <CheckBox
                    key={`${service.value}-${notification.value}`}
                    checked={selectedNotifications.includes(notification.value)}
                    onChange={handleSubOptionChange(service)(notification)}
                    label={notification.label}
                    styleContainer={S.secondaryCheckbox}
                    styleLabel={S.secondaryLabel}
                  />
                ))}
              <Separator mt={8} mb={24} />
            </>
          );
        })}
        {isClient(user) && (
          <>
            <Paragraph size="l" mb={14}>
              {t(translations.notificationSettings.appointmentReminderTime)}
            </Paragraph>
            <DropMenu
              mt={-16}
              items={REMINDER_TIME_OPTIONS.map((status) => ({
                label: status.name,
                inputLabel: status.name,
                value: status.value,
              }))}
              value={values.reminderTime}
              onChange={handleChange('reminderTime')}
            />
            <Separator mt={24} mb={24} />
          </>
        )}
      </ScrollView>
      <View style={S.saveButtonContainer}>
        <Button
          text={t(translations.common.save)}
          onPress={handleSubmit}
          loading={updateLoading}
        />
      </View>
    </SafeContainer>
  );
};

export { NotificationSettings };
