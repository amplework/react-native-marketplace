import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  searchButton: {
    padding: 12,
  },
  resetButton: {
    marginRight: 12,
    padding: 12,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 8,
  },
});
