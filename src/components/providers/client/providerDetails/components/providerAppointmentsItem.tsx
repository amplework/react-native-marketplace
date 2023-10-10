import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { providersSelectors } from 'store/entities/providers';
import { IAppointment } from 'types/appointments';
import { formatDatetime } from 'utils/dates';
import { getFullName } from 'utils/strings';

type Props = {
  appointment: IAppointment;
  onPress: () => void;
};

const ProviderAppointmentsItem: React.FC<Props> = ({
  appointment,
  onPress,
}) => {
  const provider = useSelector(providersSelectors.provider)!;

  const { t } = useTranslation();

  const date = formatDatetime(appointment.startDate);

  return (
    <Card onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Avatar src={provider.photo} size={40} mr={12} />
        <Box flex>
          <CardTitle>{getFullName(provider)}</CardTitle>
          <CardSubTitle>
            {appointment.product
              ? t(translations.providers.appointments.withProduct, {
                  product: appointment.product.name,
                  date,
                })
              : t(translations.providers.appointments.withoutProduct, { date })}
          </CardSubTitle>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
    </Card>
  );
};

export { ProviderAppointmentsItem };
