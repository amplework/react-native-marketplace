import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteFour,
    paddingTop: 52,
    paddingHorizontal: 24,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonSpace: {
    backgroundColor: COLORS.white,
    marginBottom: 24,
  },
  buttonTitle: {
    color: COLORS.orange,
  },
  bottomContainer: {
    width: '100%',
    height: 200,
  },
  appointmentContainer: {
    borderRadius: 7,
    marginBottom: 24,
    backgroundColor: COLORS.white,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appointmentTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  appointmentDate: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default styles;
