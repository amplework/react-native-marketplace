import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const addEditRemindersStyles = StyleSheet.create({
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
});
