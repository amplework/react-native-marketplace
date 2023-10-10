import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 92,
  },
  contentContainer: {
    padding: 24,
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 50,
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
  btnAdd: {
    width: '100%',
  },
  textAdd: {
    color: COLORS.white,
  },
  taskCard: {
    flexDirection: 'row',
    borderRadius: 7,
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
  },
  saleCardTouchable: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
    marginRight: 8,
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  checkbox: {
    marginTop: isIOS ? 12 : 8,
  },
  weekSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.orange10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    marginVertical: 12,
  },
  paymentButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  chooseModalView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseView: {
    width: '90%',
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
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
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleChooseModal: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  createNew: {
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: COLORS.red,
  },
  connectClient: {
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: COLORS.forestgreen,
  },
  refundRequestedButtonColor: {
    backgroundColor: COLORS.clearBlue50,
  },
  image: {
    borderRadius: 5,
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  qrImage: {
    width: 150,
    height: 120,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
  },
  qrImageContainer: {
    width: 150,
    height: 120,
    marginTop: 20,
    borderColor: COLORS.whiteGray,
  },
  downloadImageText: {
    fontSize: 15,
    color: 'skyblue',
    textDecorationLine: 'underline',
  },
  imagesList: {
    marginBottom: 20,
    top: 20,
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
  // closeImage: {
  //   width: 24,
  //   height: 24,
  //   resizeMode: 'contain',
  // },
  titleNewService: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  titleNewCenter: {
    alignItems: 'center',
    flex: 1,
  },
});
