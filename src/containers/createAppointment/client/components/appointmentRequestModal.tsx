import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigator } from 'service/navigator';
import Button from 'shared/button';
import { Description } from 'shared/description';
import { Modal, ModalBody, ModalHeader } from 'shared/modal';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { closeModal } from 'store/entities/modal';
import { PartialAppointment } from 'types/appointments';
import COLORS from 'utils/colors';
import moment from 'moment';
import { formatDatetime } from 'utils/dates';

import S from '../../style';

const AppointmentRequestModal: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = () => {
    dispatch(closeModal());

    Navigator.goBack();
    Navigator.goBack();
  };

  const navigateToAppointment =
    ({ id }: PartialAppointment) =>
    () => {
      dispatch(closeModal());

      Navigator.stack.replace('AppointmentDetails', { id });
    };

  return (
    <Modal>
      <ModalHeader>{t(translations.appAppointments.modal.header)}</ModalHeader>
      <ModalBody>
        {(appointment: PartialAppointment) => (
          <>
            <Paragraph size="s" mb={12}>
              {t(translations.appAppointments.modal.title)}
            </Paragraph>
            <Description
              flex
              label={t(translations.appAppointments.modal.service)}
              size="s"
            >
              {appointment.product.name}
            </Description>
            {appointment.provider.address?.formattedAddress && (
              <Description
                flex
                label={t(translations.appAppointments.modal.location)}
                size="s"
              >
                {appointment.provider.address.formattedAddress}
              </Description>
            )}
            <Description
              label={t(translations.appAppointments.modal.date)}
              size="s"
              mb={24}
            >
              {moment(appointment?.startDate).format('LLL')}
            </Description>
            <Button
              text={t(translations.common.ok)}
              onPress={handleSubmit}
              buttonStyle={S.submitButton}
            />
            <Pressable onPress={navigateToAppointment(appointment)} ai="center">
              <Paragraph color={COLORS.clearBlue}>
                {t(translations.appAppointments.modal.viewAppointment)}
              </Paragraph>
            </Pressable>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export { AppointmentRequestModal };
