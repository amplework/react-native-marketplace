import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const ClientBirthdayRewardStyles = StyleSheet.create({
  content: {
    ...padding(4, 0, 20, 0),
  },
  scrollView: {
    marginBottom: 92,
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.whiteGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginTop: 16,
  },
  textPrimary: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  textSecondary: {
    fontFamily: FONTS.book,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  checkBoxPosition: {
    marginTop: 16,
  },
  saveButtonContainer: {
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    borderTopColor: COLORS.whiteGray,
  },
  service: {
    borderColor: COLORS.whiteGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    paddingHorizontal: 8,
    marginTop: 16,
  },
  servicesList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteTwo,
    marginTop: 16,
    paddingBottom: 16,
  },
  chooseModalView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardStyle: {
    height: '100%',
    width: '100%',
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
    // paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  upperContainer: { 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    paddingBottom: 10 
  },
  socialView: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  fbButton: {
    height: 50, width: 50,
    borderRadius: 25,
    borderWidth: 1, 
    justifyContent: 'center', alignItems: 'center',
    borderColor: COLORS.clearBlue,
    backgroundColor: COLORS.white,
  },
  instaButton: {
    height: 50, width: 50,
    borderRadius: 25,
    borderWidth: 1, 
    justifyContent: 'center', alignItems: 'center',
    borderColor: COLORS.orangeRed,
    backgroundColor: COLORS.white,
  },
  twitterButton: {
    height: 55, width: 55,
    borderRadius: 55/2,
    borderWidth: 1, 
    justifyContent: 'center', alignItems: 'center',
    borderColor: COLORS.clearBlue50,
    backgroundColor: COLORS.white,
  },
  allButton: {
    height: 55, width: 55,
    borderRadius: 55/2,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: COLORS.orange,
  },
});
