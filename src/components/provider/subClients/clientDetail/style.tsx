import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  body: {
    paddingHorizontal: 24,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: COLORS.whiteFour,
    paddingTop: 52,
    paddingHorizontal: 24,
    width: '100%',
    height: '100%',
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
    fontSize: 16,
    lineHeight: 24,
  },
  phone: {
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    fontSize: 14,
    lineHeight: 20,
  },
  paddingHorizontal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  rowSpace: {
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
  navContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callContainer: {
    backgroundColor: COLORS.orange,
    borderRadius: 50,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  chatContainer: {
    borderWidth: 1,
    borderColor: COLORS.black60,
    marginLeft: 16,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 12,
  },
  imageContainer: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  header: {
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.whiteGray,
    borderTopWidth: 1,
  },
  headerTitle: {
    paddingVertical: 16,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: FONTS.medium,
    lineHeight: 20,
  },
  bottomIndicator: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.orange,
  },
  containerHeaderItem: {
    width: '33.3%',
  },
  titleContainer: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  titleValue: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.medium,
  },
  titleInfo: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  infoContainer: {
    marginTop: 12,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 16,
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
    marginVertical: 24,
  },
  buttonInvite: {
    paddingVertical: 8,
    width: '50%',
  },
  buttonBlock: {
    paddingVertical: 8,
    width: '50%',
    backgroundColor: COLORS.orangeRed
  },
  buttonConnected: {
    backgroundColor: COLORS.greenblue,
  },
  buttonBlocked: {
    backgroundColor: COLORS.warmGrey,
  },
  textStatus: {
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
});

export default styles;
