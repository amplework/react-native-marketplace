import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 32,
  },
  buttonSpace: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    paddingVertical: 12,
    marginBottom: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonTitle: {
    color: COLORS.orange,
  },
  input: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.whiteGray,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
});
