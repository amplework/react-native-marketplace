import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'flex-start',
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginBottom: 20,
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
  rowInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specialSpace: {
    paddingLeft: 20,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 32,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 35,
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
  chooseVariant: {
    marginBottom: 20,
    color: COLORS.clearBlue,
    fontSize: 18,
  },
  textCancel: {
    marginBottom: 0,
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
  phoneInputContainer: {
    height: '9%',
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
  textError: {
    marginTop: 2,
    color: COLORS.red,
    fontFamily: FONTS.book,
    fontSize: 12,
    width: '100%',
  },
  extraPadding: {
    paddingBottom: 300,
  },
  paddingAddress: {
    paddingTop: 16,
  },
});

export default styles;
