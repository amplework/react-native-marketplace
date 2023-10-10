import React, { ReactText } from 'react';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';

type Props = {
  name: any;
  value: any;
  touchable?: boolean;
  onPress?: () => void;
};

const Row: React.FC<Props> = ({ name, value, touchable, onPress }) => (
  <Pressable onPress={onPress} disabled={touchable ? false : true} row jc="space-between" ai="center" pr={16} pv={12}>
    <Paragraph size="s" type="book">
      {name}
    </Paragraph>
    <Box row jc='center' ai='center' >
      <Paragraph size="s">{value}</Paragraph>
      {touchable && <Icon src={require('assets/global/arrowRight.png')} />}
    </Box>
  </Pressable>
);

export { Row };