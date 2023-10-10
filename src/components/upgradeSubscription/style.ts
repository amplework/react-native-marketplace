import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const renewSubscriptionStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  header: {
    shadowColor: 'transparent',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    fontFamily: FONTS.book,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.brownishGrey,
    marginBottom: 32,
  },
  spaceTop: {
    marginTop: 16,
  },
  subBlock: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    width: '100%',
    marginBottom: 12
  },
  subBlockActive: {
    borderColor: COLORS.orange,
  },
  subBlockBorder: {
    borderWidth: 5,
    borderColor: COLORS.white,
    borderRadius: 5,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  subBlockBorderActive: {
    backgroundColor: COLORS.orange,
  },
  titleSub: {
    fontSize: 14,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  titleSubActive: {
    color: COLORS.white,
  },
  priceSub: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: FONTS.bold,
    lineHeight: 24,
    color: COLORS.black,
  },
  priceSubActive: {
    color: COLORS.white,
  },
  priceCount: {
    fontSize: 24,
  },
  circleImage: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  titleColumn: {
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  positionColumn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionTariff: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTariff: {
    padding: 10,
    fontSize: 12,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    lineHeight: 16,
  },
  iconCheck: {
    marginHorizontal: 22,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  itemColumn: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
    fontFamily: FONTS.medium,
  },
  textAlign: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  positionItems: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 8,
  },
  bgItem: {
    backgroundColor: COLORS.whiteTwo,
  },
  bottomBlock: {
    backgroundColor: COLORS.white,
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  extraSpace: { width: '100%', height: 100 },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  btnRenew: {
    backgroundColor: COLORS.orange,
    borderWidth: 2,
    borderColor: COLORS.orange,
  },
  textRenew: {
    color: COLORS.white,
  },
  mostPopularBox: { 
    backgroundColor: COLORS.white, 
    paddingHorizontal: 8, 
    // paddingVertical: 5, 
    borderRadius: 25, 
    left: 5 
  },
  mostPopularBoxActive: { 
    backgroundColor: COLORS.orange, 
  },
});
