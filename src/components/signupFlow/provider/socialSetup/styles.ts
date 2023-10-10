import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white70
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    lineHeight: 32,
    paddingLeft: 24,
    paddingTop: 24,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    fontFamily: FONTS.book,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.brownishGrey,
    marginBottom: 10,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  btnContinue: {
    width: '38%',
    backgroundColor: COLORS.orange,
  },
  btnSkip: {
    width: '38%',
    backgroundColor: COLORS.clearBlue,
  },
  btnContinueDisabled: {
    backgroundColor: COLORS.brownishGrey,
  },
  textContinue: {
    color: COLORS.white,
  },
});

export default styles;
