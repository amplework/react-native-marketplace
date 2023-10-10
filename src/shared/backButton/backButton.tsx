import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { BackHandler, Text, TouchableOpacity } from 'react-native';
import { Navigator } from 'service/navigator';
import { Icon } from 'shared/icon';

import { styles } from './style';

export type BackButtonProps = {
  title?: string;
  onPress?: () => void;
  light?: boolean;
  ml?: number;
};

const BackButton: React.FC<BackButtonProps> = ({ title, onPress, light, ml }) => {
  const savedOnPress = useRef<() => void>();

  useEffect(() => {
    savedOnPress.current = onPress;
  }, [onPress]);

  useFocusEffect(
    useCallback(() => {
      const listener = () => {
        if (savedOnPress.current) {
          savedOnPress.current();

          return true;
        }

        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', listener);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', listener);
      };
    }, []),
  );

  const handlePress = () =>
    savedOnPress.current ? savedOnPress.current() : Navigator.goBack();

  return (
    <TouchableOpacity onPress={handlePress} style={styles.backButton}>
      <Icon
        src={
          light
            ? require('assets/global/backTransparent.png')
            : require('assets/global/back.png')
        }
      />
      {title && <Text style={[styles.text, {marginLeft: ml}]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export { BackButton };
