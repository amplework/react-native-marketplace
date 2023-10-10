import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const PILL_BUTTON_WIDTH = 55;
export const PILL_BUTTON_MARGIN = 12;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 32,
  },
  scrollView: {
    marginBottom: 92,
  },
  repeatScrollView: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: 40,
  },
  repeatContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 40,
  },
  select: {
    marginBottom: 20,
  },
  card: {
    paddingLeft: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
  textBook: {
    fontFamily: FONTS.book,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.brownishGrey,
  },
  pillButton: {
    height: 30,
    width: PILL_BUTTON_WIDTH,
    padding: 0,
    paddingHorizontal: 5,
    marginRight: PILL_BUTTON_MARGIN,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.whiteGray,
  },
  pillButtonActive: {
    borderColor: COLORS.clearBlue,
  },
  pillButtonDisabled: {
    borderColor: COLORS.whiteGray,
    backgroundColor: COLORS.whiteGray,
  },
  pillButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black60,
  },
  pillButtonTextActive: {
    color: COLORS.clearBlue,
  },
  pillButtonTextDisabled: {
    color: COLORS.warmGrey,
  },
  repeatDatepicker: {
    maxHeight: 57,
    paddingVertical: 12,
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteTwo,
  },
  continue: {
    width: 130,
    alignSelf: 'flex-end',
    marginRight: 32,
  },
});
