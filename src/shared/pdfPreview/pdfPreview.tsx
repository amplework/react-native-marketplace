import { translations } from 'locales';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { useDispatch } from 'react-redux';
import { ShareHelper } from 'service/shareHelper';
import { alert } from 'shared/alert';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { closeModal, openModal } from 'store/entities/modal';
import COLORS from 'utils/colors';

import { EmailModal } from './components/emailModal';
import { pdfPreviewStyles as S } from './style';

type Props = {
  visible?: boolean;
  pdfUrl: string;
  title: string;
  onClose: () => void;
  shareable?: boolean;
  pdfName?: string;
  email?: string | null;
  onEmail?: (email: string) => void;
};

const PdfPreview: React.FC<Props> = ({
  visible = true,
  pdfUrl,
  title,
  onClose,
  shareable = false,
  pdfName = '',
  email,
  onEmail,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const closeEmailModal = () => dispatch(closeModal());

  const sendEmail = (address: string) => {
    onEmail && onEmail(address);
    onClose();
  };

  const confirmSendEmail = (address: string) =>
    alert.sending({
      entity: t(translations.common.entities.document),
      recipient: t(translations.common.entities.client),
      onSend: () => sendEmail(address),
    });

  const handleShareByEmail = () => {
    if (email) {
      return confirmSendEmail(email);
    }

    dispatch(openModal());
  };

  const handleShare = () =>
    ShareHelper.sharePdf({ name: pdfName, url: pdfUrl });

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <>
        <SafeContainer safeStyle={S.safe} containerStyle={S.shareModalContent}>
          <View style={S.rowSpace}>
            <Paragraph size="xl" type="bold" color={COLORS.white}>
              {title}
            </Paragraph>
            <Icon
              src={require('assets/global/closeWhite.png')}
              onPress={onClose}
              size={50}
            />
          </View>
          <Box flex jc="space-between" w="100%">
            <View style={[S.centralContent, !shareable && S.large]}>
              <Pdf source={{ uri: pdfUrl }} style={S.pdf} />
            </View>
            {shareable && (
              <Box row>
                {onEmail && (
                  <Button
                    text={`Email to${email ? ': ' + email : ''}`}
                    onPress={handleShareByEmail}
                    buttonStyle={S.button}
                    lines={1}
                  />
                )}
                <TouchableOpacity onPress={handleShare} style={S.circleButton}>
                  <Icon
                    src={require('assets/global/share.png')}
                    size={20}
                    mr={3}
                  />
                </TouchableOpacity>
              </Box>
            )}
          </Box>
        </SafeContainer>
        <EmailModal onSubmit={sendEmail} onClose={closeEmailModal} />
      </>
    </Modal>
  );
};

export { PdfPreview };
