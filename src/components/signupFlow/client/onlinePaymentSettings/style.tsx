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
  paymentSwitchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  titlePaymentMethod: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    flex: 1,
    color: COLORS.black,
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
  btnSkip: {
    width: '48%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
  },
  textSkip: {
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
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
  btnContinueServiceInactive: {
    marginTop: 16,
    alignSelf: 'flex-end',
    width: '40%',
    right: 16,
    padding: 16,
    backgroundColor: COLORS.brownishGrey,
  },
  btnContinueService: {
    marginTop: 16,
    width: '40%',
    alignSelf: 'flex-end',
    right: 16,
    padding: 16,
    backgroundColor: COLORS.orange,
  },
  textContinueService: {
    color: COLORS.white,
  },
});

export default styles;
