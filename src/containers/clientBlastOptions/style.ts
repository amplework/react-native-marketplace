import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  list: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  content: {
    flexGrow: 1,
  },
  notice: {
    width: '100%', 
    marginTop: 30, 
    borderRadius: 10, 
    paddingVertical: 20, 
    justifyContent: 'space-around'
  }
});