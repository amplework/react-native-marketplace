import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 22,
    color: COLORS.black,
    fontSize: 28,
    fontFamily: FONTS.bold,
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    color: COLORS.brownishGrey,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: FONTS.book,
  },
  positionGetStarted: {
    width: '100%',
    paddingHorizontal: 32,
    position: 'absolute',
    bottom: 30,
  },
  image: {
    resizeMode: 'contain',
    overflow: 'visible',
  },
  positionIndicators: {
    marginTop: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    marginHorizontal: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.clearBlueOpacity,
  },
  circleLong: {
    width: 20,
    backgroundColor: COLORS.clearBlue,
  },
  rowButtons: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnFacebook: {
    width: '48%',
    backgroundColor: COLORS.duskyBlue,
  },
  btnGoogle: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textGoogle: {
    color: COLORS.black,
    marginLeft: 4,
  },
  textFacebook: {
    marginLeft: 4,
  },
  rowNewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  styleButton: { borderRadius: 10 },
  getStartTitle: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  getStartActive: {
    marginLeft: 4,
    color: COLORS.clearBlue,
    fontFamily: FONTS.bold,
  },
});

export default styles;
