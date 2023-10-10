import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { modalSelectors } from 'store/entities/modal';

type HeaderProps = {
  onClose?: () => void;
};

const ModalHeader: React.FC<HeaderProps> = ({ onClose, children }) => (
  <>
    <Box row jc="space-between" ph={24} pv={20}>
      <Paragraph type="bold">{children}</Paragraph>
      {!!onClose && (
        <Icon src={require('assets/global/close.png')} onPress={onClose} />
      )}
    </Box>
    <Separator />
  </>
);

export { ModalHeader };

type BodyProps = {
  children: ((content: any) => ReactNode) | ReactNode;
};

const ModalBody: React.FC<BodyProps> = ({ children }) => {
  const content = useSelector(modalSelectors.content);

  return (
    <Box ph={24} pv={20}>
      {typeof children === 'function' ? children(content) : children}
    </Box>
  );
};

export { ModalBody };
