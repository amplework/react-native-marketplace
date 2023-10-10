import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const notificationsStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  allAppointmentsButton: {
    maxWidth: 100,
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
  allAppointmentsButtonText: {
    color: COLORS.orange,
    fontSize: 12,
  },
  cancelButton: {
    maxWidth: 80,
    marginRight: 10,
    paddingVertical: 0,
    height: 32,
    borderColor: COLORS.orange,
    borderWidth: 2,
    backgroundColor: COLORS.white,
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: 12,
  },
  confirmButton: {
    maxWidth: 80,
    paddingVertical: 0,
    height: 32,
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orange,
  },
  confirmButtonText: {
    fontSize: 12,
  },
  loader: {
    paddingTop: 4,
    paddingBottom: 20,
  },
});
