import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
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
    marginBottom: 10,
  },
  rowInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'flex-end',
  },
  btnContinue: {
    width: '38%',
    backgroundColor: COLORS.orange,
  },
  btnLinks: {
    width: '58%',
    height: '7%',
    padding: 0,
    borderWidth: 1,
    marginTop: 30,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    borderColor: COLORS.clearBlue
  },
  btnContinueDisabled: {
    backgroundColor: COLORS.brownishGrey,
  },
  textContinue: {
    color: COLORS.white,
  },
  textLink: {
    color: COLORS.clearBlue,
    fontFamily: FONTS.book
  },
  avatarPosition: {
    alignSelf: 'flex-start',
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
    shadowColor: '#000',
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
  phoneInputContainer: {
    height: '8%',
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
  paddingAddress: {
    paddingTop: 16,
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
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  businessLogo: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 10,
  },
  filepicker: {
    width: '100%',
    height: 130,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.clearBlue50,
    borderStyle: 'dashed',
    marginVertical: 20
  },
  bannerContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.black80,
    width: "98%",
    height: "auto",
    aspectRatio: 3 / 1.4,
    borderRadius: 7,
    marginVertical: 20
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    // aspectRatio: 4 / 3,
    // borderRadius: 7,
  },
  checkboxContainer: {
    marginTop: 16,
    marginLeft: 2,
  },
  checkBoxLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 20,
    color: COLORS.black,
  },
});

export default styles;
