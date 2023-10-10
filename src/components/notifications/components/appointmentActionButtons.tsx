import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import Button from 'shared/button';

import { notificationsStyles as S } from '../style';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const AppointmentActionButtons: React.FC<Props> = ({ onConfirm, onCancel }) => {
  const { t } = useTranslation();

  const navigateToAppointments = () =>
    Navigator.navigate('AppointmentRequests');

  return (
    <Box flex row ai="center" jc="space-between">
      <Button
        text={t(translations.appAppointments.allAppointments)}
        buttonStyle={S.allAppointmentsButton}
        textStyle={S.allAppointmentsButtonText}
        onPress={navigateToAppointments}
      />
      <Box flex row ai="center" jc="flex-end">
        <Button
          text={t(translations.common.cancel)}
          buttonStyle={S.cancelButton}
          textStyle={S.cancelButtonText}
          onPress={onCancel}
        />
        <Button
          text={t(translations.common.confirm)}
          buttonStyle={S.confirmButton}
          textStyle={S.confirmButtonText}
          onPress={onConfirm}
        />
      </Box>
    </Box>
  );
};

export { AppointmentActionButtons };
