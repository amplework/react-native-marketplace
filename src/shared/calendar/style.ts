import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const calendarStyles = StyleSheet.create({
  calendarContainer: {
    height: 160,
    paddingTop: 20,
    paddingBottom: 10,
    // borderBottomColor: COLORS.whiteGray,
    // borderBottomWidth: 1,
    borderRadius: 10,
  },
  rounded: {
    borderRadius: 10,
  },
  calendarHeader: {
    color: COLORS.orange,
  },
  calendarNumber: {
    color: COLORS.black,
    fontSize: 24,
    fontFamily: FONTS.medium,
  },
  dotStyle: {
    height: 7, 
    width: 7, 
    borderRadius: 25, 
  },
  calendarNumberSelected: {
    color: COLORS.white,
  },
  calendarName: {
    textTransform: 'lowercase',
    color: COLORS.brownishGrey,
    fontSize: 12,
    fontFamily: FONTS.book,
  },
  calendarNameSelected: {
    color: COLORS.white,
  },
  sliderArrow: { width: 24, height: 24, resizeMode: 'contain' },
  selectedDateContainer: {
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    height: 65
  },
});
