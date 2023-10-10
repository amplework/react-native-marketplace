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
    paddingTop: 32,
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
  langeInput: {
    height: 100,
    ...padding(12, 12),
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
  checkbox: {
    marginTop: 16,
  },
});
