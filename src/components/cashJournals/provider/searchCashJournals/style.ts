import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { shadow } from 'utils/styles';

export const searchCashJournalsStyles = StyleSheet.create({
  searchBar: {
    zIndex: 2,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    ...shadow(),
  },
});
