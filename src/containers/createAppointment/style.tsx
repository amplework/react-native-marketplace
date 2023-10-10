import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const PILL_BUTTON_WIDTH = 55;
export const PILL_BUTTON_MARGIN = 12;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  notifyContainer: {
    marginTop: 16,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    padding: 16,
  },
  rowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteTwo,
  },
  blockoutTimeText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  scrollContainer: {
    paddingTop: 0,
    padding: 24,
    paddingBottom: 300,
  },
  textSelect: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  arrowDown: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  keyboardStyle: {
    height: '100%',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  posHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteTwo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleNewService: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  titleNewCenter: {
    alignItems: 'center',
    flex: 1,
  },
  paddingContentScroll: {
    padding: 16,
    paddingBottom: 0,
  },
  itemsContainer: { width: '100%', paddingBottom: 24 },
  letterStyle: { height: 25 },
  textBoxContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textBoxContainerSold: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  importButton: {
    position: 'absolute',
    width: '80%',
    bottom: 30,
    left: '10%',
    borderRadius: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.clearBlue,
  },
  titleImport: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    height: 16,
    width: 16,
    marginRight: 8,
  },
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  addImage: {
    marginRight: 8,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  firstName: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  phoneNumber: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  showMore: {
    width: '40%', 
    marginVertical: 10
  },
  serviceDetailsTitle: {
    marginTop: 16,
    fontSize: 14,
    color: COLORS.brownishGrey,
  },
  addServiceText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.clearBlue,
  },
  checkboxContainer: {
    marginTop: 16,
    marginLeft: 2,
  },
  checkBoxLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
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
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.border,
    borderWidth: 1,
    color: COLORS.black,
    padding: 8,
  },
  birthdateLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  bottomBlock: {
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    paddingHorizontal: 32,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  btnTrial: {
    width: '100%',
  },
  textTrial: {
    color: COLORS.white,
  },
  containerTypeService: {
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 16,
  },
  containerTypeServiceActive: {
    borderColor: COLORS.clearBlue,
  },
  textTypeService: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.brownishGrey,
  },
  textTypeServiceActive: {
    color: COLORS.clearBlue,
  },
  specialSpace: {
    paddingLeft: 20,
  },
  selectedImage: {
    marginTop: 8,
    marginRight: 8,
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  checkboxQuickSale: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  rowButtons: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 30,
  },
  rowButtonsCreate: {
    width: '100%',
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: 30,
  },
  btnDeleteService: {
    width: '40%',
    padding: 16,
    left: 16,
    borderWidth: 2,
    borderColor: COLORS.red,
    backgroundColor: COLORS.white,
  },
  textDeleteService: {
    color: COLORS.red,
  },
  btnContinueService: {
    right: 16,
    width: '40%',
    padding: 16,
    backgroundColor: COLORS.clearBlue,
  },
  textContinueService: {
    color: COLORS.white,
  },
  serviceNameSelected: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  servicePriceSelected: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  rowInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  textError: {
    marginTop: 2,
    color: COLORS.red,
    fontFamily: FONTS.book,
    fontSize: 12,
    width: '100%',
  },
  submitButton: {
    paddingVertical: 12,
    marginBottom: 12,
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
  card: {
    paddingLeft: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
});

export default styles;
