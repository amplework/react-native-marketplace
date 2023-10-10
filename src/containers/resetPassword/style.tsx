import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.white,
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
  input: {
    height: 40,
  },
  containerInput: {
    marginTop: 0,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
