import { Dimensions, StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isSmallDevice } from 'utils/device';
import FONTS from 'utils/fonts';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  imageMore: {
    marginTop: 7,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  addIconWrapper: {
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageItem: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  imageBack: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  imageUpload: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 16,
  },
  imagePerfomance: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 20,
  },
  imageSearch: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 24,
  },
  label: {
    fontSize: 10,
    fontFamily: FONTS.medium,
  },
  labelMore: {
    fontSize: 10,
    fontFamily: FONTS.medium,
    color: COLORS.brownishGrey,
  },
  labelMoreActive: {
    color: COLORS.clearBlue,
  },
  positionTabIcon: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleLeftStyle: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 16,
    marginRight: 16,
    fontFamily: FONTS.bold,
  },
  imageClose: {
    marginHorizontal: 16,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  importButton: {
    backgroundColor: COLORS.clearBlue,
    padding: 2,
    borderRadius: 5,
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
  resetStyle: {
    marginRight: 8,
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  drawerStyles: { flex: 1, width: '60%', backgroundColor: COLORS.transparent },
  container: {
    flex: 1,
  },
  menuItems: {
    flex: 1,
    paddingLeft: 24,
    paddingVertical: isSmallDevice ? 60 : 75,
    justifyContent: 'space-between',
    backgroundColor: COLORS.twilightBlue,
  },
  nameContainer: {
    marginBottom: isSmallDevice ? 16 : 26,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 16,
  },
  paddingEmail: { flex: 1, paddingRight: 8 },
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
    // marginBottom: isSmallDevice ? 26 : 36,
  },
  separatorBottom: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white10,
    marginBottom: isSmallDevice ? 16 : 26,
  },
  nameUser: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  rowItems: {
    // marginTop: isSmallDevice ? 14 : 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItemsActive: {
    left: -12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: COLORS.black10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleReview: {
    color: COLORS.white60,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONTS.book,
  },
  headerReview: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  drawerMenuContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: isSmallDevice ? 20 : 32
  }
});

export default styles;
