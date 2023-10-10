import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const vendorsStyles = StyleSheet.create({
  paddingHeader: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 32,
  },
  addTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.orange,
  },
  addImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  paddingExtra: {
    width: '100%',
    paddingBottom: 50,
    backgroundColor: COLORS.transparent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsContainer: {
    width: '100%',
    paddingLeft: 22,
    paddingRight: 26,
    paddingBottom: 24,
  },
  styleLetter: { height: 25 },
  userName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.bold,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
});
