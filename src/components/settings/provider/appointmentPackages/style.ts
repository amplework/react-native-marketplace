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
});
