import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'shared/box';
import { Card, CardBody } from 'shared/card';
import { Description } from 'shared/description';
import { Paragraph } from 'shared/paragraph';
import { Reminder } from 'types/settings';

type Props = {
  reminder: Reminder;
  onPress: () => void;
};

const RemindersItem: React.FC<Props> = ({ reminder, onPress }) => {
  const { t } = useTranslation();

  return (
    <Card spacing="both" onPress={onPress}>
      <CardBody row>
        <Box>
          <Paragraph>
            {t(translations.reminders.entity[reminder.entity])}
          </Paragraph>
          <Description
            label={t(translations.reminders.fields.reminderTime)}
            size="s"
          >
            {t(translations.reminders.day, { count: reminder.reminderTime })}
          </Description>
        </Box>
      </CardBody>
    </Card>
  );
};

export { RemindersItem };
