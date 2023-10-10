import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  body: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'cover',
  },
  userName: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 26,
  },
  chooseModalView: {
    flex: 1,
    backgroundColor: COLORS.backgroundModal,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chooseView: {
    width: '90%',
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
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
  imageConnected: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  closeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

 titleChooseModal: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },

createNew: {
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: COLORS.red,
  },

connectClient: {
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: COLORS.forestgreen,
  },

  phone: {
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    fontSize: 16,
    lineHeight: 20,
  },
  paddingHorizontal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  rowSpace: {
    paddingHorizontal: 24,
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCall: {
    paddingVertical: 12,
    width: '47%',
    backgroundColor: COLORS.orange,
  },
  buttonInvite: {
    width: '100%',
    paddingVertical: 12,
    marginTop: 16,
    backgroundColor: COLORS.clearBlue,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  buttonChat: {
    paddingVertical: 12,
    width: '47%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black60,
  },
  textChat: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  textInvite: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  navContent: {
    padding: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callContainer: {
    backgroundColor: COLORS.orange,
    borderRadius: 50,
    padding: 12,
    // height: 50, width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  chatContainer: {
    borderWidth: 1,
    borderColor: COLORS.black60,
    marginLeft: 16,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    // height: 50, width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  imageContainer: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.whiteGray,
    borderTopWidth: 1,
    height: '100%',
    minHeight: 55,
    maxHeight: 55,
  },
  headerTitle: {
    paddingVertical: 16,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    lineHeight: 20,
  },
  activeIndicator: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.orange,
  },
  hitSlop: {
    top: 10,
    right: 10,
    left: 10,
    bottom: 10,
  },
  containerHeaderItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderColor: COLORS.white,
  },
  marginContent: {
    marginRight: 50,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardBadgeContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...padding(12, 4, 12, 10),
    borderRadius: 50,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black60,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  listItemText: {
    fontFamily: FONTS.medium,
    color: COLORS.black,
    fontSize: 14,
    marginHorizontal: 4,
  },
  scrollView: {
    // flex: 1,
    // height: '75%',
    // paddingBottom: 100,
    backgroundColor: COLORS.whiteGray,
  },
});

export default styles;
