import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  paymentSwitchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  titlePaymentMethod: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    flex: 1,
    color: COLORS.black,
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
    paddingHorizontal: 24,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  addButton: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  addButtonText: {
    color: COLORS.orange,
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
  scrollView: {
    flex: 1,
    marginBottom: 92,
  },
  scrollContainer: {
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
  btnDelete: {
    width: '100%',
    backgroundColor: COLORS.orangeRed,
  },
  textDelete: {
    color: COLORS.white,
  },
});

export default styles;
