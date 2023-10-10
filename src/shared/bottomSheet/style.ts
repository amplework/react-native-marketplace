import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.black50,
  },
  keyboardView: {
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
