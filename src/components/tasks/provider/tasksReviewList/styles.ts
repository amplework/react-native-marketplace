import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 4,
  },
});
