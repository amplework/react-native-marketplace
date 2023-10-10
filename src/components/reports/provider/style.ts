import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const reportsStyles = StyleSheet.create({
  content: {
    padding: 24,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
});
