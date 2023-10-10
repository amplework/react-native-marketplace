import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Card, CardBody, CardTitle } from 'shared/card';
import { Icon } from 'shared/icon';
import { Toggle } from 'shared/toggle';
import COLORS from 'utils/colors';

interface Props {
  title: string;
  iconName: string;
  onPress: () => void;
  toggleState: boolean;
  onPressToggle: () => void;
}

const SocialMediaItem: React.FC<Props> = ({
  title,
  onPress,
  iconName,
  toggleState,
  onPressToggle
}) => {
  return (
    <Card bg={COLORS.whiteGray} isClickable={!toggleState} onPress={onPress}>
      <CardBody row jc="space-between" ai="center">
        <Toggle checked={toggleState} onChange={onPressToggle} />
        <CardTitle>{title}</CardTitle>
        <Ionicons
          size={22}
          name={iconName}
        />
        <Icon src={require('assets/global/arrowRight.png')} />
      </CardBody>
    </Card>
  );
}

export { SocialMediaItem };
