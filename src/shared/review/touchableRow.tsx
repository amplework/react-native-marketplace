import React from 'react';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';

type Props = {
  label: string;
  onPress?: () => void;
};

const TouchableRow: React.FC<Props> = ({ label, onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      row
      jc="space-between"
      ai="center"
      pr={16}
      pv={12}
    >
      <Paragraph size="s" type="book">
        {label}
      </Paragraph>
      <Box row ai="center">
        <Paragraph size="s" mr={2}>
          {children}
        </Paragraph>
        <Icon src={require('assets/global/arrowRight.png')} />
      </Box>
    </Pressable>
  );
};

export { TouchableRow };
