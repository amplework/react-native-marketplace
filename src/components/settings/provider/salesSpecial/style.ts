import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 24,
  },
  content: {
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
    elevation: 5,
  },
  addButtonText: {
    color: COLORS.orange,
  },
  statusContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    borderRadius: 15,
    backgroundColor: COLORS.greenblue,
  },
  borderPending: {
    backgroundColor: COLORS.orange,
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  shareButton: {
    backgroundColor: COLORS.clearBlue,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 15
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
  chipContainer: {
    width: '100%', 
    paddingVertical: 2, 
    borderRadius: 5, 
    // backgroundColor: COLORS.greenblue10, 
    alignItems: 'center'
  }
});
