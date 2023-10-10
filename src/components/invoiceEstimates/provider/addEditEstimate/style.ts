import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    ...padding(32, 32, 40, 32),
  },
  scrollView: {
    marginBottom: 92,
  },
  section: {
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  checkbox: {
    marginBottom: 20,
  },
  textPrimary: {
    fontFamily: FONTS.medium,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
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
  addButton: {
    padding: 12,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  input: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.whiteGray,
    textAlignVertical: 'top',
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.clearBlue,
  },
  modalScrollView: {
    flex: 1,
    flexGrow: 1,
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 32,
  },
  pillButton: {
    width: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.whiteGray,
    borderRadius: 20,
  },
  pillButtonActive: {
    borderColor: COLORS.clearBlue,
  },
  mr12: {
    marginRight: 12,
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
  checkboxText: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  continue: {
    width: 130,
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  productsList: {
    paddingTop: 16,
    paddingLeft: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  productsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  setupTaxesButton: {
    marginBottom: 20,
  },
  taxesList: {
    ...padding(16, 0, 16, 16),
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  taxesItemText: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.black,
  },
  filepicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.clearBlue50,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  image: {
    borderRadius: 5,
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    top: 1,
    width: 22,
    height: 22,
  },
  imagesList: {
    marginBottom: 20,
  },
});
