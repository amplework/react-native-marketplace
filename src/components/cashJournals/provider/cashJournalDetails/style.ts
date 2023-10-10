import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding } from 'utils/styles';

export const cashJournalDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    ...padding(50, 24, 24, 24),
    backgroundColor: COLORS.white,
  },
});
