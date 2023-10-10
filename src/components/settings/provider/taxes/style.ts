import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 24,
  },
  content: {
    flexGrow: 1,
  },
  addButton: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: COLORS.orange,
  },
  statusContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    borderRadius: 15,
    backgroundColor: COLORS.greenblue,
  },
  borderPending: {
    backgroundColor: COLORS.orange,
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
