import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  bannerImage: {
    width: "100%",
    height: "auto",
    aspectRatio: 4 / 3,
    borderRadius: 7,
    // width: '100%',
    // resizeMode: 'contain',
    // height: 130,
    // borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  bookAppointmentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.white,
  },
  bookAppointmentButton: {
    backgroundColor: COLORS.orange,
  },
  modalStyle: {
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  containerStyle: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: '60%',
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
