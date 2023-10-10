import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.white,
  },
  resetHeader: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    marginRight: 24,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteTwo,
  },
  datepicker: {
    marginTop: 16,
    ...padding(12, 8, 12, 8),
  },
  datepickerWithMargin: {
    marginRight: 15,
  },
  datepickerText: {
    fontSize: 14,
    lineHeight: 18,
  },
  infoContainer: {
    width: '48%',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightSpace: {
    marginRight: 8,
  },
  leftSpace: {
    marginLeft: 8,
  },
  positionTopContainer: {
    padding: 24,
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
  arrowDown: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  valueContainer: {
    fontFamily: FONTS.medium,
    fontSize: 14,
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
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  containerSearchInfo: {
    marginTop: 8,
    marginRight: 8,
    borderRadius: 5,
    backgroundColor: COLORS.clearBlue10,
    padding: 8,
  },
  refine: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  searchInfo: {
    fontSize: 12,
    color: COLORS.clearBlue,
    fontFamily: FONTS.medium,
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
    paddingVertical: 16,
    fontSize: 14,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  backgroundList: {
    backgroundColor: COLORS.whiteFour,
    height: '100%',
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
  searchButton: {
    marginTop: 16,
    paddingVertical: 12,
  },
});

export default styles;
