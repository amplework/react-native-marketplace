import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  titleHeader: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.whiteTwo,
  },
  scrollContent: {
    padding: 24,
  },
  listItemContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemLabel: {
    color: COLORS.black,
    fontSize: 14,
  },
  itemsContainer: { width: '100%', paddingBottom: 24 },
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
  separator: {
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteTwo,
  },
  lastTitle: {
    fontSize: 12,
    fontFamily: FONTS.book,
    lineHeight: 18,
    color: COLORS.brownishGrey,
  },
  lastValueTitle: {
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 8,
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  arrorContainer: {
    justifyContent: 'space-around', 
    alignItems: 'center', 
    flexDirection: 'row',
  },
  unblockContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: COLORS.greenblue,
    borderRadius: 5,
    marginRight: 10,
  },
  unblockText: {
    fontSize: 10,
    lineHeight: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white
  }
});
