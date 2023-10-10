import { StyleSheet } from 'react-native';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    fontFamily: FONTS.bold,
  },
});
