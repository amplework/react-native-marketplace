import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 24,
    backgroundColor: COLORS.black70,
  },
});
