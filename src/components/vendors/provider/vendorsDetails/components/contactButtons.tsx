import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LinkingHelper } from 'service/linkingHelper';
import { alert } from 'shared/alert';
import { Box } from 'shared/box';
import Button from 'shared/button';

import { vendorStyles as S } from '../style';

type Props = {
  phone?: string;
};

const ContactButtons: React.FC<Props> = ({ phone }) => {
  const { t } = useTranslation();

  const onCall = () => {
    if (phone) {
      return LinkingHelper.telprompt(phone);
    }

    alert.info(t(translations.common.alerts.mobileWarning));
  };

  const onMessage = () => {
    if (phone) {
      return LinkingHelper.sms(phone);
    }

    alert.info(t(translations.common.alerts.mobileWarning));
  };

  return (
    <Box row>
      <Button
        onPress={onCall}
        image={require('assets/global/call.png')}
        buttonStyle={S.buttonCall}
        imageStyle={{ mr: 0 }}
      />
      <Button
        onPress={onMessage}
        image={require('assets/global/chat.png')}
        buttonStyle={S.buttonChat}
        imageStyle={{ mr: 0 }}
      />
    </Box>
  );
};

export { ContactButtons };
