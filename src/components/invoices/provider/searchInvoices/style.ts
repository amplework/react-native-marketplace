import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding, shadow } from 'utils/styles';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  searchButton: {
    flex: 1,
    padding: 12,
  },
  resetButton: {
    marginRight: 12,
    padding: 12,
  },
  section: {
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  loader: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  list: {
    ...padding(0, 24, 24, 24),
  },
  content: {
    flexGrow: 1,
  },
  searchBar: {
    zIndex: 2,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    ...shadow(),
  },
});
