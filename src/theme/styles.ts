import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding } from 'utils/styles';

export const commonStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  listLoader: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeView: {
    backgroundColor: COLORS.whiteFour,
  },
  section: {
    ...padding(16, 0, 16, 16),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  tuneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    marginRight: 16,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
