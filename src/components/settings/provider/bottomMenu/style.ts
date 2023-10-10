import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const bottomMenuStyles = StyleSheet.create({
  content: {
    padding: 24,
  },
  safeArea: {
    backgroundColor: COLORS.white,
  },
  saveButtonContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
  menuStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 7,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: COLORS.border,
  },
  containerBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    marginTop: -7,
    backgroundColor: COLORS.clearBlue20,
    borderRadius: 40,
  },
  buttonBlue: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 40,
  },
  dropDown: {
    backgroundColor: COLORS.white,
  },
});
