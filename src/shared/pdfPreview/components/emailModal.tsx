import React, { useState } from 'react';
import Button from 'shared/button';
import { Field } from 'shared/field';
import { Modal, ModalBody, ModalHeader } from 'shared/modal';
import REGEX from 'utils/regex';

import { pdfPreviewStyles as S } from '../style';

type Props = {
  onSubmit?: (email: string) => void;
  onClose: () => void;
};

const EmailModal: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (REGEX.email.test(String(email).trim().toLowerCase())) {
      setError('');

      onSubmit && onSubmit(email);
      onClose();
    } else {
      setError('Email is not valid');
    }
  };

  return (
    <Modal>
      <ModalHeader onClose={onClose}>Please enter email address</ModalHeader>
      <ModalBody>
        <Field
          value={email}
          onChange={setEmail}
          label="Email"
          required
          error={error}
          autoCapitalize="none"
          keyboardType="email-address"
          mb={24}
        />
        <Button text="Send" onPress={handleSubmit} buttonStyle={S.sendButton} />
      </ModalBody>
    </Modal>
  );
};

export { EmailModal };
