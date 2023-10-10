import { translations } from 'locales';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';

type Type =
  | 'default'
  | 'short'
  | 'date'
  | 'week'
  | 'month'
  | 'year'
  | 'deleted'
  | 'image'
  | 'empty';

interface Props {
  entities?: string;
  type?: Type;
  image?: ReactNode;
  header?: string;
  description?: string;
  mt?: number;
  ph?: number;
  pv?: number;
}

const EmptyState: React.FC<Props> = ({
  entities,
  type = 'default',
  image,
  header,
  description,
  mt,
  ph,
  pv,
}) => {
  const { t } = useTranslation();

  if (type === 'image') {
    return (
      <Box flex jc="center" ai="center" mt={mt} ph={ph} pv={pv}>
        <Box mb={20}>{image}</Box>
        <Paragraph centered mb={4}>
          {header}
        </Paragraph>
        <Paragraph centered size="s" type="book">
          {description + ' '}
        </Paragraph>
      </Box>
    );
  }

  return (
    <Box flex jc="center" ai="center" mt={mt} ph={ph}>
      <Paragraph centered type="book">
        {type == 'empty' ? '' : t(translations.common.placeholders.list[type], { entities })}
      </Paragraph>
    </Box>
  );
};

export { EmptyState };
