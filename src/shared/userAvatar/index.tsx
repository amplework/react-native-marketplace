import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import styles from './style';

export interface Props {
  onPress: () => void;
  avatar?: any;
  styleAvatar?: any;
}

const UserAvatar: React.FC<Props> = (props) => {
  const { avatar, onPress, styleAvatar } = props;
  return (
    <TouchableOpacity style={styles.avatarPosition} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={[styles.profileContainer, styleAvatar]}>
          <Image
            style={
              avatar
                ? [styles.imageProfileFull, styleAvatar]
                : styles.imageProfile
            }
            source={
              avatar
                ? { uri: avatar?.path || avatar }
                : require('assets/global/emptyProfile.png')
            }
          />
          <View style={styles.containerEdit}>
            <Image
              style={styles.imageEdit}
              source={require('assets/global/pencil.png')}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserAvatar;
