import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const invoiceDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    marginBottom: 92,
  },
  content: {
    padding: 24,
  },
  section: {
    ...padding(16, 0, 16, 16),
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
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
  addButton: {
    padding: 12,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.clearBlue,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
  productsList: {
    paddingTop: 16,
    paddingBottom: 4,
    paddingLeft: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
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
    top:20
  },
  permissionButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
  approveBtn: { 
    width: '48%' 
  },
  rejectBtn: { width: '48%', 
  backgroundColor: COLORS.orangeRed 
  },
  disabledBtn: { 
    backgroundColor: COLORS.pinkishGrey 
  },
});
