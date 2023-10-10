import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
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
  spaceTop: {
    marginTop: 16,
  },
  subBlock: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    width: '100%',
    marginBottom: 12,
  },
  subBlockActive: {
    borderColor: COLORS.orange,
  },
  subBlockBorder: {
    borderWidth: 5,
    borderColor: COLORS.white,
    borderRadius: 5,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  subBlockBorderActive: {
    backgroundColor: COLORS.orange,
  },
  titleSub: {
    fontSize: 14,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  titleSubActive: {
    color: COLORS.white,
  },
  offerInfoContainer: { 
    right: 10,
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center', 
   },
  offerAppliedActive: {
    fontSize: 12, 
    color: COLORS.white,
    fontFamily: FONTS.bold, 
  },
  offerAppliedInactive: {
    color: COLORS.clearBlue,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
  infoIconActive: {
    color: COLORS.white, 
    right: 2,
  },
  infoIconInactive: {
    color: COLORS.clearBlue, 
    right: 2,
  },
  priceSub: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: FONTS.bold,
    lineHeight: 24,
    color: COLORS.black,
  },
  crossedPriceSub: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: FONTS.bold,
    lineHeight: 24,
    color: COLORS.brownishGrey,
  },
  priceSubActive: {
    color: COLORS.white,
  },
  priceCount: {
    fontSize: 24,
  },
  crossedPriceCount: {
    fontSize: 14,
    textDecorationLine: 'line-through'
  },
  circleImage: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  mostPopularBox: { 
    backgroundColor: COLORS.white, 
    paddingHorizontal: 8, 
    // paddingVertical: 5, 
    borderRadius: 25, 
    left: 5 
  },
  mostPopularBoxActive: { 
    backgroundColor: COLORS.orange, 
  },
  separator: {
    width: '120%',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  titleColumn: {
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  positionColumn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionTariff: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTariff: {
    padding: 10,
    fontSize: 12,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    lineHeight: 16,
  },
  iconCheck: {
    marginHorizontal: 22,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  itemColumn: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
    fontFamily: FONTS.medium,
  },
  textAlign: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  positionItems: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 8,
  },
  bgItem: {
    backgroundColor: COLORS.whiteTwo,
  },
  bottomBlock: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    bottom: 0,
    width: '120%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
  },
  extraSpace: { width: '100%', height: 150 },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  btnTrial: {
    backgroundColor: COLORS.orange,
    borderWidth: 2,
    borderColor: COLORS.orange,
    marginVertical: 2,
  },
  textTrial: {
    color: COLORS.white,
  },
  btnPay: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.orange,
    marginVertical: 2,
  },
  textPay: {
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
  separator2: {
    width: '120%',
    marginTop: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  paddingContent: {
    width: '100%',
    paddingHorizontal: 16,
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
  savedPaymentMethodContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  savedPaymentMethod: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedPaymentMethodHeading: {
    alignSelf: 'flex-start',
    fontFamily: FONTS.book,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.brownishGrey,
    marginVertical: 16,
  },
  paymentMethodImageContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.whiteGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  selectedCheck: {
    tintColor: COLORS.orange,
  },
  unselectedCheck: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    tintColor: COLORS.whiteGray,
  },
  titlePaymentMethod: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    flex: 1,
    color: COLORS.black,
  },
  titleSelectedPaymentMethod: {
    color: COLORS.orange,
  },
  btnAlign: {
    alignSelf: 'flex-end',
  },
  chooseModalView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'center',
    alignItems: 'center',
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
  chooseView: {
    width: '90%',
    height: '70%',
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  headingPolicy: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  titleChooseModal: {
    fontSize: 14,
    fontFamily: FONTS.book,
    textAlign: 'left',
  },
  link: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    textAlign: 'left',
    color: COLORS.clearBlue,
    textDecorationLine: 'underline'
  },
  connectClient: {
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: COLORS.forestgreen,
  },
});

export default styles;
