import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const vendorStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
  },
  detailsCard: {
    paddingVertical: 4,
    paddingLeft: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  buttonCall: {
    padding: 12,
    width: 'auto',
    backgroundColor: COLORS.orange,
    marginRight: 15,
  },
  buttonChat: {
    padding: 12,
    width: 'auto',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black60,
  },
});
