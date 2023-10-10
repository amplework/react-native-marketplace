import { StyleSheet, Dimensions } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: (height < 570) ? 0 : 32,
    backgroundColor: COLORS.white,
  },
  logo: {
    alignSelf: 'flex-start',
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    marginBottom: 32,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRole: {
    fontSize: 20,
    marginVertical: (height < 570) ? 10 : 16,
    fontFamily: FONTS.book,
  },
  circle: {
    width: (height < 570) ? 80 : 110,
    height: (height < 570) ? 80 : 110,
    borderRadius: 60,
    backgroundColor: COLORS.whiteGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleActive: {
    backgroundColor: COLORS.clearBlue,
  },
  circleImage: {
    width: (height < 570) ? 40 : 50,
    height: (height < 570) ? 40 : 50,
    resizeMode: 'contain',
  },
});

export default styles;
