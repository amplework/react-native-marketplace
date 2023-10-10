import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 16,
  },
  label: {
    fontSize: 10,
    fontFamily: FONTS.medium,
  },
  container: {
    flex: 1,
  },
  rowItems: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameUser: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  paddingEmail: { paddingRight: 24 },
  emailUser: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: FONTS.book,
    color: COLORS.white70,
  },
  titleItem: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  titleItemDisabled: {
    color: COLORS.white60,
  },
  separatorTop: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white10,
    marginBottom: 36,
  },
  separatorBottom: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white10,
    marginTop: 52,
  },
  menuItems: {
    flex: 1,
    paddingLeft: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.twilightBlue,
  },
  nameContainer: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerStyles: { flex: 1, width: '60%', backgroundColor: COLORS.transparent },
  resetStyle: {
    marginRight: 8,
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  titleLeftStyle: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  imageLock: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  loaderPosition: {
    position: 'absolute',
  },
});


