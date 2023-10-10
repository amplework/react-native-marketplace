import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  getStartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 50,
  },
  getStartText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  image: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
});

export default styles;
