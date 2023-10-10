import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Box } from 'shared/box';
import Button from 'shared/button';

import { buttonStyles as S } from './style';

interface Props {
  title: string;
  onPress?: () => void;
  icon?: ImageSourcePropType;
}

const AddButton: React.FC<Props> = ({
  title,
  onPress,
  icon = require('assets/global/add.png'),
}) => (
  <Box pv={20} ph={24}>
    <Button
      text={title}
      onPress={onPress}
      image={icon}
      buttonStyle={S.addButton}
      textStyle={S.addButtonText}
    />
  </Box>
);

export { AddButton };
