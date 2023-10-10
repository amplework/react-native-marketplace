import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  safe: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  positionTopContainer: {
    padding: 24,
    backgroundColor: COLORS.white,
  },
  containerOfDays: {
    width: '100%',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.orange10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },
  date: {
    fontSize: 14,
    color: COLORS.orange,
    fontFamily: FONTS.medium,
  },
  contentContainer: {
    width: '100%',
    paddingBottom: 24,
  },
  appointmentContainer: {
    borderRadius: 7,
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
  },
  blockedContainer: {
    backgroundColor: COLORS.border,
  },
  rowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
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
  appointmentText: {
    marginLeft: 24,
    paddingBottom: 12,
    fontSize: 14,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    marginVertical: 12,
  },
  dark: {
    borderColor: COLORS.battleshipGrey32,
  },
  dateUnder: {
    fontSize: 12,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  timeUnder: {
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
});

export default styles;
