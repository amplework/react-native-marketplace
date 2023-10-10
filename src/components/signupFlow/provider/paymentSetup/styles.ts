import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: COLORS.white70
  },
  list: {
    // paddingHorizontal: 24,
    marginTop: 20,
    width: '100%'
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
    marginBottom: 10,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
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
