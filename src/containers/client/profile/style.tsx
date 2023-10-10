import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.white,
  },
  headerContainer: { overflow: 'hidden', paddingBottom: 5 },
  header: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 24,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  back: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logout: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  userContainer: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    lineHeight: 26,
  },
  email: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.warmGrey,
    lineHeight: 20,
  },
  imageContainer: {
    justifyContent: 'flex-end',
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.clearBlueOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerWithButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 15,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleItemMenu: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  titleLogo: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.book,
    color: COLORS.warmGrey,
  },
  separator: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  containerLogout: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerPosition: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPosition: {
    position: 'absolute',
    bottom: 20,
    left: '35%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
