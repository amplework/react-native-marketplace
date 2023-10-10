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
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    height: 50,
    borderBottomWidth: 3,
    borderColor: COLORS.white,
  },
  activeTab: {
    borderColor: COLORS.orange,
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
});
