import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    paddingLeft: 40,
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
  extraPadding: {
    paddingLeft: 80,
  },
  textPrimary: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  checkbox: {
    paddingHorizontal: 2,
  },
  deleteIcon: {
    marginRight: 16,
  },
  saveButton: {
    alignSelf: 'flex-end',
    width: 166,
    marginTop: 12,
  },
  input: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    top: 10,
    borderColor: COLORS.whiteGray,
    textAlignVertical: 'top',
  },
  mapContainer: { 
    height: '60%', 
    width: '100%', 
    borderWidth: 1, 
    top: 10,
    marginBottom: 40,
    borderRadius: 5,
    borderColor: COLORS.pinkishGrey 
  },
  compassContainer: {
    height: 40, 
    width: 40, 
    alignSelf: 'flex-end', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.white, 
    position: 'absolute', 
    right: 15,
    top: 15,
    borderRadius: 5,
    shadowColor: COLORS.black,
    elevation: 10,
  }
});