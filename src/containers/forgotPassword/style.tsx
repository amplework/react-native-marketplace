import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.white,
  },
  header: {
    shadowOpacity: 0,
  },
});

export default styles;
