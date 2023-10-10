import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    paddingHorizontal: 4,
    backgroundColor: COLORS.white,
  },
  input: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  startAdornment: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    padding: 12,
  },
  endAdornment: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    padding: 12,
  },
});
