import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBack: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 24,
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleLeftStyle: {
    fontSize: 18,
    marginLeft: 8,
    fontFamily: FONTS.bold,
  },
  title: {
    paddingHorizontal: 24,
    paddingTop: 24,
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  appointmentContainer: {
    borderRadius: 7,
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: COLORS.white,
    padding: 12,
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
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  appointmentTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  appointmentDateTitle: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  appointmentDateValue: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  appointmentServiceTitle: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  anotherTimeSlots: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.red,
    fontFamily: FONTS.book,
  },
  appointmentServiceValue: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    marginVertical: 12,
  },
  styleButton: {
    paddingVertical: 10,
    width: '40%',
  },
  styleCancel: {
    borderWidth: 2,
    borderColor: COLORS.orange,
    backgroundColor: COLORS.white,
  },
  textCancel: {
    fontSize: 14,
    color: COLORS.black,
  },
  styleConfirm: {
    marginLeft: 12,
    borderWidth: 2,
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orange,
  },
  textConfirm: {
    fontSize: 14,
  },
  endPosition: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
});

export default styles;
