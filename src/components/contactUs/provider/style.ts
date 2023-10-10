import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const contactUsStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 95,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  image: {
    alignSelf: 'center',
    height: 91,
    width: 150,
    marginBottom: 55,
  },
  primaryButton: {
    flex: 1,
    marginRight: 16,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryText: {
    color: COLORS.brownishGrey,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
});
