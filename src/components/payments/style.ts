import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 50,
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
  taskCard: {
    flexDirection: 'row',
    borderRadius: 7,
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  saleCardTouchable: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 7,
    marginVertical: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  titleOfHeader: {
    fontSize: 14,
    lineHeight: 26,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  valueOfHeader: {
    marginTop: 4,
    fontSize: 32,
    lineHeight: 32,
    fontFamily: FONTS.medium,
  },
  subValue: {
    fontFamily: FONTS.book,
    fontSize: 15,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    marginRight: 8,
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  checkbox: {
    marginTop: isIOS ? 12 : 8,
  },
  weekSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.orange10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    marginVertical: 12,
  },
});
