import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const expensesReviewStyles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  header: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pressable: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  blockContent: {
    marginTop: 25,
  },
  counterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -32,
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
  section: {
    marginTop: 25,
    ...padding(6, 0, 6, 16),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
