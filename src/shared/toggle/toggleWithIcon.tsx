import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';

interface Props {
  checked?: boolean;
  onChange?: () => void;
  activeIcon?: any;
  inactiveIcon?: any;
  toggleStyle?:any;
}

const ToggleWithIcon: React.FC<Props> = ({
  checked,
  onChange,
  activeIcon, 
  inactiveIcon,
  toggleStyle,
}) => {
  
  return (
    <TouchableOpacity
      onPress={onChange}
      activeOpacity={1}
      style={[styles.container,toggleStyle,{
        justifyContent: checked ? 'flex-end' : 'flex-start',
        backgroundColor: checked ? COLORS.orange : COLORS.brownishGrey
      }]}>
      {checked ? (
        <Icon
          src={activeIcon}
          color={COLORS.white}
          size={12}
          mr={3}
        />
      ) : (
        <View style={styles.circle} />
      )}
      {checked ? (
        <View style={styles.circle} />
      ) : (
        <Icon
          src={inactiveIcon}
          color={COLORS.white}
          size={15}
          ml={4}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 45,
    paddingHorizontal: 2,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
  },
  circle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  }
})

export { ToggleWithIcon };