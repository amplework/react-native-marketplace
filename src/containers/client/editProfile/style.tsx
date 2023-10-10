import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  keyboardContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 24,
  },
  scrollContainer: {
    marginTop: 24,
    padding: 0,
    paddingBottom: 300,
  },
  imageClose: {
    marginHorizontal: 16,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  profileContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.clearBlueOpacity,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
  },
  checkboxContainer: {
    marginTop: 16,
    marginLeft: 2,
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
  checkBoxLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  imageEdit: {
    resizeMode: 'contain',
    width: 10,
    height: 10,
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
  servicesTitle: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 20,
  },
  servicesContainer: {
    marginTop: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    borderColor: COLORS.whiteGray,
  },
  servicesField: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  phoneInputContainer: {
    height: '7%',
    top: 10,
    bottom: 4,
    width: '100%',
    borderRadius: 5, 
    borderColor: COLORS.whiteGray, 
    borderWidth: 1
  },
  textInput: {
    height: 30,
  },
  imagePen: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginLeft: '95%',
  },
  serviceTitle: {
    fontSize: 14,
    fontFamily: FONTS.book,
    lineHeight: 20,
    color: COLORS.brownishGrey,
  },
});

export default styles;
