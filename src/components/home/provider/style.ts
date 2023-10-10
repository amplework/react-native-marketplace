import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const homeStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingVertical: '35%',
    paddingHorizontal: 24,
    backgroundColor: COLORS.black50,
  },
  showAllButton: {
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 24,
  },
  profileStepContainer: {
    // justifyContent: 'center', 
  },
  emptyScrollContainer: { 
    flex: 1 
  }
});
