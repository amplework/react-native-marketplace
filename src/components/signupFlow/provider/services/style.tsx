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
  rowButtons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    width: '120%',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
  },
  btnSkip: {
    width: '38%',
    backgroundColor: COLORS.clearBlue,
  },
  textSkip: {
    color: COLORS.white,
  },
  btnContinue: {
    width: '38%',
    backgroundColor: COLORS.orange,
  },
  textContinue: {
    color: COLORS.white,
  },
  centerOfScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    top: '20%',
  },
  buttonContainer: {
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.clearBlue,
    borderRadius: 5,
    borderStyle: 'dotted',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceButton: {
    marginTop: 16,
  },
  plusImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  addLogo: {
    width: 150,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  addTitle: {
    marginLeft: 8,
    color: COLORS.brightBlue,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  keyboardStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
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
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  titleNewService: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  titleNewCenter: {
    alignItems: 'center',
    flex: 1,
  },
  separator: {
    width: '120%',
    marginTop: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  checkboxContainer: {
    alignSelf: 'flex-start',
  },
  checkboxQuickSale: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  checkBoxLabel: {
    color: COLORS.black,
  },
  paddingContent: {
    width: '100%',
    paddingHorizontal: 16,
  },
  specialSpace: {
    paddingLeft: 20,
  },
  emptyPhoto: {
    width: 80,
    height: 80,
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.clearBlue,
    borderRadius: 5,
    borderStyle: 'dotted',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleAddPhoto: {
    fontSize: 10,
    color: COLORS.clearBlue,
    fontFamily: FONTS.bold,
  },
  selectedImage: {
    marginTop: 8,
    marginRight: 8,
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  btnContinueService: {
    marginTop: 16,
    width: '40%',
    alignSelf: 'flex-end',
    right: 16,
    padding: 16,
    backgroundColor: COLORS.orange,
  },
  btnContinueServiceInactive: {
    marginTop: 16,
    alignSelf: 'flex-end',
    width: '40%',
    right: 16,
    padding: 16,
    backgroundColor: COLORS.brownishGrey,
  },
  textContinueService: {
    color: COLORS.white,
  },
  positionContinue: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
    right: 32,
  },
  itemContainer: {
    width: '100%',
    paddingVertical: 16,
  },
  serviceItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceItemIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  editImage: {
    marginRight: 16,
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  deleteImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  itemSeparator: {
    width: '120%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  serviceDescription: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  servicePrice: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: FONTS.book,
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
  },
  containerEdit: {
    position: 'absolute',
    right: 0,
    top: 1,
    width: 22,
    height: 22,
  },
  imageCancel: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
});

export default styles;
