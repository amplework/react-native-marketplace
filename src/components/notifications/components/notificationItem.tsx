import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardHeader } from 'shared/card';
import { Unread } from 'shared/icon/icons';
import { Paragraph } from 'shared/paragraph';
import { FormattedNotification } from 'types/notifications';
import { capitalize } from 'utils/strings';

import {
  isAppointmentChange,
  isClosedDaysChanged,
  isReminders,
} from '../helpers/utils';
import { NotificationBody } from './notificationBody';
import { NotificationBodyField } from './notificationBodyField';

type Props = {
  data: FormattedNotification;
  isFirstNotification: boolean;
  onPress: (notification: FormattedNotification) => () => void;
};

const NotificationItem: React.FC<Props> = ({
  data,
  isFirstNotification,
  onPress,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      spacing="both"
      isClickable={data?.isClickable}
      mt={isFirstNotification ? 4 : 0}
      onPress={onPress(data)}
    >
      <CardHeader flex row ai="center" jc="space-between">
        <Paragraph mr={10}>
          {isReminders(data.type)
            ? capitalize(t(translations.common.entities.reminder))
            : data.title}
        </Paragraph>
        {!data.hasRead && <Unread height={10} width={10} />}
      </CardHeader>
      <CardBody flex row>
        <NotificationBody user={data.user}>
          {data.text && (
            <Paragraph size="s" type="book">
              {data.text}
            </Paragraph>
          )}
          {isAppointmentChange(data.type) && (
            <Paragraph size="xs" type="book">
              {t(translations.notifications.labels.newAppointmentDetails)}:
            </Paragraph>
          )}
          {data.title && isClosedDaysChanged(data.title) && (
            <Paragraph size="xs" type="book">
              {t(translations.notifications.labels.newClosedDaysDetails)}:
            </Paragraph>
          )}
          {data.fields &&
            data.fields.map((field) => (
              <NotificationBodyField key={field.label} data={field} />
            ))}
        </NotificationBody>
      </CardBody>
    </Card>
  );
};

export { NotificationItem };
