import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  buttonSpace: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    paddingVertical: 12,
    marginBottom: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonTitle: {
    color: COLORS.orange,
  },
  paddingContent: {
    padding: 24,
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
  rowInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textError: {
    marginTop: 2,
    color: COLORS.red,
    fontFamily: FONTS.book,
    fontSize: 12,
    width: '100%'
  },
  phoneInputContainer: {
    height: '7%',
    top: 10,
    bottom: 2,
    width: '100%',
    borderRadius: 5, 
    borderColor: COLORS.whiteGray, 
    borderWidth: 1
  },
  textInput: {
    height: 30,
  },
  notifyContainer: {
    marginTop: 16,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    paddingLeft: 16,
  },
  rowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingVertical: 10,
  },
  switchTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  separator: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteTwo,
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
  paddingAddress: {
    paddingTop: 16,
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  checkbox: {
    height: 16,
    width: 16,
    marginRight: 8,
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
  dropInput: {
    marginTop: 16,
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.border,
    borderWidth: 1,
    color: COLORS.black,
    padding: 8,
  },
  positionIcon: {
    top: 26,
    right: 8,
  },
  chevronStyle: {
    height: 20,
    width: 20,
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
  yourTitle: {
    paddingTop: 8,
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  paddingContentScroll: {
    padding: 16,
    paddingBottom: 0,
  },
  itemsContainer: { width: '100%', paddingBottom: 24 },
  letterStyle: { height: 25 },
  paddingItem: {
    paddingLeft: 4,
    paddingRight: 12,
  },
  listItemContainer: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.bold,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 8,
  },
  paddingExtra: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 200,
    backgroundColor: COLORS.transparent,
  },
  textBoxContainer: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  inputSearch: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 8,
  },
  searchPosition: {
    height: '100%',
    position: 'absolute',
    right: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
});

export default styles;
