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
    marginTop: 32,
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
    paddingHorizontal: 32,
    width: '100%',
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
});

export default styles;
