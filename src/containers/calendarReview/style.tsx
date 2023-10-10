import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.white,
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
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -32,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  titleOfHeader: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  valueOfHeader: {
    marginTop: 4,
    fontSize: 28,
    fontFamily: FONTS.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  subValue: {
    fontFamily: FONTS.book,
    fontSize: 14,
    marginLeft: 8,
  },
  topText: {
    paddingTop: 24,
    paddingBottom: 12,
    fontFamily: FONTS.book,
    fontSize: 14,
    color: COLORS.brownishGrey,
  },
  notice: {
    textAlign: 'center',
    fontFamily: FONTS.book,
    fontSize: 14,
    color: COLORS.brownishGrey,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleItem: {
    flex: 1,
    marginRight: 5,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  valueItem: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.medium,
  },
  logoPosition: {
    marginTop: 50,
    marginBottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  titleLogo: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.book,
    color: COLORS.warmGrey,
  },
  titleReview: {
    color: COLORS.white60,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONTS.book,
  },
  headerReview: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
});

export default styles;
