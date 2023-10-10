import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
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
  cardContainer: {
    width: '100%',
    borderRadius: 7,
    marginVertical: 6,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  blockedContainer: {
    borderColor: COLORS.clearBlue,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  cardNumber: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.book,
  },
  defaultText: {
    paddingHorizontal: 8,
    lineHeight: 24,
    color: COLORS.clearBlue,
    fontFamily: FONTS.boldItalic,
  },
  defaultCheckContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.7,
    borderColor: COLORS.clearBlue,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultCheck: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: COLORS.clearBlue,
  },
  listContainer: {
    width: '100%',
  },
  contentContainerStyle: {
    width: '100%',
    padding: 8,
  },
  buttonContainer: {
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.clearBlue,
    borderRadius: 5,
    borderStyle: 'dotted',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceButton: {
    marginTop: 16,
  },
  plusImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  addTitle: {
    marginLeft: 8,
    color: COLORS.brightBlue,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  rowButtons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 32,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.white,
    width: '120%',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
  },
  btnContinue: {
    width: '48%',
    backgroundColor: COLORS.orange,
  },
  textContinue: {
    color: COLORS.white,
  },
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleNewCenter: {
    alignItems: 'center',
    flex: 1,
  },
  titleNewService: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  separator: {
    width: '120%',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContinueServiceInactive: {
    marginTop: 48,
    width: '40%',
    right: 16,
    padding: 16,
    backgroundColor: COLORS.brownishGrey,
  },
  btnContinueService: {
    marginTop: 48,
    width: '40%',
    right: 16,
    padding: 16,
    backgroundColor: COLORS.orange,
  },
  btnAlign: {
    alignSelf: 'flex-end',
  },
  btnMakeDefault: {
    backgroundColor: COLORS.clearBlue,
    right: -16,
  },
  textContinueService: {
    color: COLORS.white,
  },
});

export default styles;
