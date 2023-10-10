import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const appointmentsStyles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.white,
  },
  scrollContainer: { flex: 1, paddingVertical: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  callImage: {
    marginRight: 16,
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  imagePerfomance: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  imageSearch: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 24,
  },
  back: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 24,
  },
  lock: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  checkCircle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  titleLeftStyle: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    marginRight: 16,
    fontFamily: FONTS.bold,
  },
  clientContainer: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  userPhone: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  checkInContainer: {
    marginTop: 20,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 7,
    backgroundColor: COLORS.greenblue10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkInText: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.greenblue,
  },
  titleContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  infoContainer: {
    marginHorizontal: 24,
    marginTop: 12,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  titleValue: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.medium,
  },
  rowSpace: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    marginVertical: 16,
  },
  extraBottom: { paddingBottom: 200 },
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
  btnCheckIn: {
    backgroundColor: COLORS.orange,
    width: '100%',
    marginBottom: 16,
  },
  btnTrial: {
    width: '100%',
  },
  textTrial: {
    color: COLORS.white,
  },
  twinBtnText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.medium
  },
  directionButton: {
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: COLORS.orange,
  },
  directionButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  twinButtonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20, 
    marginHorizontal: 24 
  },
  payForAppointmentBtn: {
    backgroundColor: COLORS.orange, 
    borderRadius: 5
  }
});