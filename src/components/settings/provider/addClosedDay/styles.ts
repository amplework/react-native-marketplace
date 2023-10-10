import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    paddingLeft: 40,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  extraPadding: {
    paddingLeft: 80,
  },
  textPrimary: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  checkbox: {
    paddingHorizontal: 2,
  },
  deleteIcon: {
    marginRight: 16,
  },
  saveButton: {
    alignSelf: 'flex-end',
    width: 166,
    marginTop: 12,
  },
});
