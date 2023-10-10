import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 32,
    paddingBottom: 50,
  },
  saveButton: {
    alignSelf: 'flex-end',
    width: 166,
    marginTop: 48,
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
  iconedInput: {
    height: 42,
    ...padding(12, 12, 12, 23),
  },
  textPrimary: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  checkBoxPosition: {
    marginTop: 16,
  },
  filepicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.clearBlue50,
    borderRadius: 5,
    borderStyle: 'dashed',
  },
  selectedImage: {
    marginRight: 8,
    borderRadius: 5,
  },
  image: {
    borderRadius: 5,
    width: 100,
    height: 80,
    resizeMode: 'cover',
  },
  containerEdit: {
    position: 'absolute',
    right: 0,
    top: 1,
    width: 22,
    height: 22,
  },
  imagesList: {
    marginTop: 16,
    marginBottom: 28,
  },
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '40%',
    borderRadius: 20,
    backgroundColor: COLORS.white,
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
});
