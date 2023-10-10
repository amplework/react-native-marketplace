import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
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
  titleNewCenter: {
    alignItems: 'center',
    flex: 1,
  },
});
