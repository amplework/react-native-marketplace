import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  safe: {
    backgroundColor: COLORS.whiteFour,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePerfomance: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  imageSearch: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 24,
  },
  titleLeftStyle: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    marginRight: 16,
    fontFamily: FONTS.bold,
  },
  positionTopContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
  },
  containerOfDays: {
    width: '100%',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.orange10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },
  date: {
    fontSize: 14,
    color: COLORS.orange,
    fontFamily: FONTS.medium,
  },
});

export default styles;
