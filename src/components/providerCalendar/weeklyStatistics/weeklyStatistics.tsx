import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ProgressTile,
  ProgressTileSubtitle,
  ProgressTileTitle,
} from 'shared/progress';
import { appointmentsSelector } from 'store/entities/appointments';

const WeeklyStatistics: React.FC = () => {
  const overview = useSelector(appointmentsSelector.overview);

  const { t } = useTranslation();

  return (
    <ProgressTile
      progress={overview.busyScheduleToday}
      elevation
      mh={24}
      mt={20}
      mb={8}
    >
      <ProgressTileSubtitle
        label={t(translations.calendar.weekBookingProgress)}
        mb={6}
      />
      <ProgressTileTitle
        label={t(translations.calendar.daysWithoutBooking)}
        value={overview.daysWithoutBooking}
        mb={0}
      />
    </ProgressTile>
  );
};

export { WeeklyStatistics };
