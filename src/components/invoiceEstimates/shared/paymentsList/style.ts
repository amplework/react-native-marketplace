import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding } from 'utils/styles';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  list: {
    ...padding(0, 24, 24, 24),
  },
  content: {
    flexGrow: 1,
  },
});
