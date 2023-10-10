import { StyleSheet, Platform } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const InputStyles = StyleSheet.create({
  textInputContainer: {
    height: 65,
    marginTop: Platform.OS === "ios" ? 50 : 60,
    shadowColor: 'lightgrey',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    backgroundColor: COLORS.white,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginBottom: 0,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingLeft: 40,
    borderWidth: 1,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    fontFamily: FONTS.bold,
    borderColor: COLORS.whiteGray,
    color: COLORS.brownishGrey,
    backgroundColor: COLORS.white,
  },
  searchIconContainer: {
    position: 'absolute',
    zIndex: 3,
    left: 36,
    top: Platform.OS == "ios" ? 64 : 74,
  },
});