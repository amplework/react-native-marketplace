import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
  scrollViewContainer: {
    flex: 1,
    width: '100%',
  },
  containerCategory: {
    marginTop: 24,
    alignSelf: 'flex-start',
    width: '100%',
  },
  extraBottom: {
    paddingBottom: 100,
  },
  titleCategory: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.book,
    color: COLORS.warmGrey,
  },
  rowItems: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  containerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginTop: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  containerItemActive: {
    borderColor: COLORS.clearBlue,
  },
  textItem: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.brownishGrey,
  },
  textItemActive: {
    color: COLORS.clearBlue,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 32,
    backgroundColor: COLORS.white,
    width: '120%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
  },
  btnContinue: {
    width: '48%',
    backgroundColor: COLORS.orange,
  },
  btnContinueDisabled: {
    backgroundColor: COLORS.brownishGrey,
  },
  textContinue: {
    color: COLORS.white,
  },
  btnSelected: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '48%',
    backgroundColor: COLORS.white,
  },
  textSelected: {
    color: COLORS.brownishGrey,
  },
});

export default styles;
