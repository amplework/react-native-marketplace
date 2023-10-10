import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  selectedDateContainer: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
  },
  paddingContainer: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: 24,
  },
  scrollContainer: {
    backgroundColor: COLORS.white,
    marginTop: 10,
    paddingTop: 0
  },
  buttonSpace: {
    backgroundColor: COLORS.white,
    marginBottom: 20
  },
  buttonTitle: {
    color: COLORS.orange,
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
  extraBtnStyles: {
    borderWidth: 0.2,
    borderColor: COLORS.pinkishGrey
  },
  appointmentText: {
    marginLeft: 24,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.brownishGrey,
    lineHeight: 20,
    fontFamily: FONTS.book,
  },
  appointmentContainer: {
    borderRadius: 7,
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blockedContainer: {
    backgroundColor: COLORS.border,
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
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  manageDayCardContainer: {
    flexDirection: 'row',
    borderColor: COLORS.battleshipGrey32,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    // paddingVertical: 15, 
    paddingHorizontal: 15
  },
  manageDayCard: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 25,
    paddingHorizontal: 100,
    marginVertical: 10
  },
  timeSlotContainer: {
    paddingTop: 10,
    width: '15%',
    paddingRight: 10
  },
  extraTimeSlotContainerStyle: {
    justifyContent: 'center',
    paddingTop: 0
  },
  timeSlotText: {
    textAlign: 'right',
    fontFamily: FONTS.medium
  },
  cardContainer: { paddingVertical: 5, width: '85%' }
});

export default styles;
