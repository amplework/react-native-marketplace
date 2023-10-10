import I18n from 'locales';
import React from 'react';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { formatTime, range } from 'utils/dates';

interface Props {
  closed?: boolean;
  dayStart: Date;
  dayEnd: Date;
}

const WorkingHours: React.FC<Props> = ({ closed, dayStart, dayEnd }) => (
  <Box row ai="center">
    <Icon src={require('assets/global/timer.png')} size={20} mr={8} />
    {closed ? (
      <Paragraph size="xs" type="book">
        {I18n.t('providers.currentlyClosed')}
      </Paragraph>
    ) : (
      <>
        <Paragraph size="xs" type="book">
          {I18n.t('providers.standardHours')}
        </Paragraph>
        <Paragraph size="xs" color={COLORS.eerieBlack}>
          {range(formatTime, { from: dayStart, to: dayEnd })}
        </Paragraph>
      </>
    )}
  </Box>
);

export { WorkingHours };
