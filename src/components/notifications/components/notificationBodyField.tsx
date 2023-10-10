import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { LabeledValue } from 'types/notifications';
import { getValueOrNA } from 'utils/fields';

type Props = {
  data: LabeledValue;
};

const NotificationBodyField: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Box flex row>
      <Paragraph size="xs" type="book" mr={5}>
        {t(data.label)}
      </Paragraph>
      <Paragraph flex size="xs" type="bold">
        {getValueOrNA(data.value)}
      </Paragraph>
    </Box>
  );
};

export { NotificationBodyField };
