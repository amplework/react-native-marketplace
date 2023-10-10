import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  header: {
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  headerTitle: {
    paddingVertical: 16,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    lineHeight: 20,
  },
  paddingContent: { paddingHorizontal: 24, width: '100%' },
  paddingContentTop: { marginTop: 24 },
  bottomIndicator: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.orange,
  },
  containerHeaderItem: {
    width: '50%',
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
  numberContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
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
    right: -5,
    bottom: -5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 10,
  },
  filepicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.clearBlue50,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  btnLinks: {
    width: '100%',
    height: '7%',
    padding: 0,
    borderWidth: 1,
    marginTop: 30,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    borderColor: COLORS.clearBlue
  },
  textLink: {
    color: COLORS.clearBlue,
    fontFamily: FONTS.book
  },
});

export default styles;
