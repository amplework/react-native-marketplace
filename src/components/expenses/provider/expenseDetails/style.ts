import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding } from 'utils/styles';

export const expenseDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    marginBottom: 92,
  },
  content: {
    ...padding(50, 24, 24, 24),
  },
  section: {
    ...padding(16, 0, 16, 16),
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
});
