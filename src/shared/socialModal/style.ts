import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
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
  listItemContainer: {
    width: '100%', height: 50,
    alignItems: 'center',
    flexDirection: 'row'
  },
  saveButton: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 40,
  },
});