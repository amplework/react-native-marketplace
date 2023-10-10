import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding, shadow } from 'utils/styles';

export const expensesStyles = StyleSheet.create({
  loader: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  containerListStyle: {
    flexGrow: 1,
    ...padding(0, 24, 24, 24),
  },
  searchButton: {
    flex: 1,
    padding: 12,
  },
  resetButton: {
    marginRight: 12,
    padding: 12,
  },
  searchBar: {
    zIndex: 2,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
    marginBottom: 20,
    ...shadow(),
  },
  statisticSection: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  sign: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 24,
    marginRight: 4,
  },
});
