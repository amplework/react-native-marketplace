import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

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
});
